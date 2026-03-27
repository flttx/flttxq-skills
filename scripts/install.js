#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline/promises");

const REPO_ROOT = path.resolve(__dirname, "..");
const SKILLS_ROOT = path.join(REPO_ROOT, "skills");

const PLATFORMS = [
  {
    key: "codex",
    displayName: "Codex",
    aliases: ["openai-codex"],
    description: "优先使用 CODEX_HOME/skills，否则回退 ~/.codex/skills",
  },
  {
    key: "opencode",
    displayName: "OpenCode",
    aliases: [],
    description: "默认建议目录 ~/.opencode/skills",
  },
  {
    key: "openclaw",
    displayName: "OpenClaw",
    aliases: [],
    description: "默认建议目录 ~/.openclaw/skills",
  },
  {
    key: "claude-code",
    displayName: "Claude Code",
    aliases: ["claude"],
    description: "默认建议目录 ~/.claude/skills",
  },
  {
    key: "gemmni",
    displayName: "Gemmni",
    aliases: ["gemini"],
    description: "按约定保留 gemmni 作为平台键，默认建议目录 ~/.gemini/skills",
  },
];

function getDefaultDir(platformKey) {
  const home = os.homedir();
  if (platformKey === "codex") {
    if (process.env.CODEX_HOME) {
      return path.join(process.env.CODEX_HOME, "skills");
    }
    return path.join(home, ".codex", "skills");
  }
  if (platformKey === "claude-code") {
    return path.join(home, ".claude", "skills");
  }
  if (platformKey === "opencode") {
    return path.join(home, ".opencode", "skills");
  }
  if (platformKey === "openclaw") {
    return path.join(home, ".openclaw", "skills");
  }
  if (platformKey === "gemmni") {
    return path.join(home, ".gemini", "skills");
  }
  return path.join(home, `.${platformKey}`, "skills");
}

function discoverSkills() {
  if (!fs.existsSync(SKILLS_ROOT)) {
    return [];
  }
  return fs
    .readdirSync(SKILLS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => fs.existsSync(path.join(SKILLS_ROOT, name, "SKILL.md")))
    .sort();
}

function resolvePlatform(name) {
  if (!name) {
    return null;
  }
  const normalized = String(name).trim().toLowerCase();
  return (
    PLATFORMS.find(
      (platform) =>
        platform.key === normalized || platform.aliases.includes(normalized),
    ) || null
  );
}

function printUsage() {
  console.log("用法：");
  console.log("  flttxq-skills");
  console.log("  flttxq-skills add <skill-name> [--platform codex] [--target-dir <path>] [--yes]");
  console.log("  flttxq-skills add --all [--platform codex] [--target-dir <path>] [--yes]");
  console.log("  flttxq-skills --list-skills");
  console.log("  flttxq-skills --list-platforms");
}

function parseArgs(argv) {
  const options = {
    positional: [],
    yes: false,
    listSkills: false,
    listPlatforms: false,
    help: false,
    all: false,
    platform: null,
    targetDir: null,
    skill: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--yes" || token === "-y") {
      options.yes = true;
      continue;
    }
    if (token === "--list-skills") {
      options.listSkills = true;
      continue;
    }
    if (token === "--list-platforms") {
      options.listPlatforms = true;
      continue;
    }
    if (token === "--help" || token === "-h") {
      options.help = true;
      continue;
    }
    if (token === "--all") {
      options.all = true;
      continue;
    }
    if (token === "--platform") {
      index += 1;
      options.platform = argv[index] || null;
      continue;
    }
    if (token.startsWith("--platform=")) {
      options.platform = token.slice("--platform=".length);
      continue;
    }
    if (token === "--target-dir") {
      index += 1;
      options.targetDir = argv[index] || null;
      continue;
    }
    if (token.startsWith("--target-dir=")) {
      options.targetDir = token.slice("--target-dir=".length);
      continue;
    }
    if (token === "--skill") {
      index += 1;
      options.skill = argv[index] || null;
      continue;
    }
    if (token.startsWith("--skill=")) {
      options.skill = token.slice("--skill=".length);
      continue;
    }
    options.positional.push(token);
  }

  return options;
}

async function chooseFromMenu(rl, title, options) {
  console.log(title);
  options.forEach((option, index) => {
    console.log(`  ${index + 1}. ${option}`);
  });

  while (true) {
    const raw = (await rl.question("请输入编号: ")).trim();
    const value = Number(raw);
    if (Number.isInteger(value) && value >= 1 && value <= options.length) {
      return options[value - 1];
    }
    console.log("输入无效，请重新输入编号。");
  }
}

async function confirm(rl, message, defaultValue) {
  const hint = defaultValue ? "Y/n" : "y/N";
  const raw = (await rl.question(`${message} [${hint}]: `)).trim().toLowerCase();
  if (!raw) {
    return defaultValue;
  }
  return raw === "y" || raw === "yes";
}

async function promptTargetDir(rl, suggested) {
  const raw = (await rl.question(`目标目录（回车使用 ${suggested}）: `)).trim();
  if (!raw) {
    return suggested;
  }
  return path.resolve(raw);
}

function copySkill(skillName, targetRoot) {
  const sourceDir = path.join(SKILLS_ROOT, skillName);
  const targetDir = path.join(targetRoot, skillName);

  fs.mkdirSync(targetRoot, { recursive: true });
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.cpSync(sourceDir, targetDir, { recursive: true });
  return targetDir;
}

function listPlatforms() {
  PLATFORMS.forEach((platform) => {
    console.log(`${platform.key}: ${platform.displayName} - ${platform.description}`);
  });
}

function listSkills(skills) {
  skills.forEach((skill) => console.log(skill));
}

async function runInteractive(options, skills) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    let platform = resolvePlatform(options.platform);
    if (options.platform && !platform) {
      throw new Error(`未知平台: ${options.platform}`);
    }

    if (!platform) {
      const chosen = await chooseFromMenu(
        rl,
        "请选择要安装到哪个平台：",
        PLATFORMS.map((item) => `${item.key} (${item.displayName})`),
      );
      platform = resolvePlatform(chosen.split(" ", 1)[0]);
    }

    let chosenSkills = null;
    if (options.all) {
      chosenSkills = skills;
    } else if (options.skill) {
      if (!skills.includes(options.skill)) {
        throw new Error(`未知 skill: ${options.skill}`);
      }
      chosenSkills = [options.skill];
    } else {
      const selected = await chooseFromMenu(
        rl,
        "请选择要安装的 skill：",
        ["安装全部 skills", ...skills],
      );
      chosenSkills = selected === "安装全部 skills" ? skills : [selected];
    }

    const suggestedTarget = options.targetDir
      ? path.resolve(options.targetDir)
      : getDefaultDir(platform.key);
    const targetRoot = options.targetDir
      ? suggestedTarget
      : options.yes
        ? suggestedTarget
        : await promptTargetDir(rl, suggestedTarget);

    console.log("");
    console.log("安装计划：");
    console.log(`- 平台: ${platform.key} (${platform.displayName})`);
    console.log(`- 目标目录: ${targetRoot}`);
    console.log(`- Skills: ${chosenSkills.join(", ")}`);

    if (!options.yes) {
      const accepted = await confirm(rl, "确认开始安装吗？", true);
      if (!accepted) {
        console.log("已取消。");
        return 0;
      }
    }

    const installed = chosenSkills.map((skillName) => copySkill(skillName, targetRoot));

    console.log("");
    console.log("安装完成：");
    installed.forEach((targetDir) => console.log(`- ${targetDir}`));
    console.log("");
    console.log("提示：如果目标平台有自己的 skill 缓存或重载机制，请在对应工具中重新加载或重启。");
    return 0;
  } finally {
    rl.close();
  }
}

function normalizeCommand(options) {
  const [first, second] = options.positional;
  if (first === "add") {
    if (!options.skill && second) {
      options.skill = second;
    }
    return options;
  }
  if (first === "list-skills") {
    options.listSkills = true;
    return options;
  }
  if (first === "list-platforms") {
    options.listPlatforms = true;
    return options;
  }
  if (!options.skill && first && !first.startsWith("-")) {
    options.skill = first;
  }
  return options;
}

async function main(argv = process.argv.slice(2)) {
  const options = normalizeCommand(parseArgs(argv));
  const skills = discoverSkills();

  if (options.help) {
    printUsage();
    return 0;
  }

  if (options.listPlatforms) {
    listPlatforms();
    return 0;
  }

  if (options.listSkills) {
    listSkills(skills);
    return 0;
  }

  if (!skills.length) {
    throw new Error("未发现可安装的 skills。");
  }

  let platform = resolvePlatform(options.platform);
  if (options.platform && !platform) {
    throw new Error(`未知平台: ${options.platform}`);
  }

  let chosenSkills = null;
  if (options.all) {
    chosenSkills = skills;
  } else if (options.skill) {
    if (!skills.includes(options.skill)) {
      throw new Error(`未知 skill: ${options.skill}`);
    }
    chosenSkills = [options.skill];
  }

  if (!platform || !chosenSkills || !options.yes) {
    return runInteractive(options, skills);
  }

  const targetRoot = options.targetDir
    ? path.resolve(options.targetDir)
    : getDefaultDir(platform.key);
  const installed = chosenSkills.map((skillName) => copySkill(skillName, targetRoot));

  console.log("安装计划：");
  console.log(`- 平台: ${platform.key} (${platform.displayName})`);
  console.log(`- 目标目录: ${targetRoot}`);
  console.log(`- Skills: ${chosenSkills.join(", ")}`);
  console.log("");
  console.log("安装完成：");
  installed.forEach((targetDir) => console.log(`- ${targetDir}`));
  console.log("");
  console.log("提示：如果目标平台有自己的 skill 缓存或重载机制，请在对应工具中重新加载或重启。");
  return 0;
}

module.exports = {
  main,
};

if (require.main === module) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
