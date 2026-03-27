#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""交互式全局 skill 安装器。"""

from __future__ import annotations

import argparse
import os
import shutil
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_ROOT = REPO_ROOT / "skills"


@dataclass(frozen=True)
class PlatformSpec:
    key: str
    display_name: str
    aliases: tuple[str, ...]
    description: str

    def default_dir(self) -> Path:
        home = Path.home()
        if self.key == "codex":
            codex_home = os.environ.get("CODEX_HOME")
            if codex_home:
                return Path(codex_home).expanduser() / "skills"
            return home / ".codex" / "skills"
        if self.key == "claude-code":
            return home / ".claude" / "skills"
        if self.key == "opencode":
            return home / ".opencode" / "skills"
        if self.key == "openclaw":
            return home / ".openclaw" / "skills"
        if self.key == "gemmni":
            return home / ".gemini" / "skills"
        return home / f".{self.key}" / "skills"


PLATFORMS: tuple[PlatformSpec, ...] = (
    PlatformSpec("codex", "Codex", ("openai-codex",), "优先使用 CODEX_HOME/skills，否则回退 ~/.codex/skills"),
    PlatformSpec("opencode", "OpenCode", (), "默认建议目录 ~/.opencode/skills"),
    PlatformSpec("openclaw", "OpenClaw", (), "默认建议目录 ~/.openclaw/skills"),
    PlatformSpec("claude-code", "Claude Code", ("claude",), "默认建议目录 ~/.claude/skills"),
    PlatformSpec("gemmni", "Gemmni", ("gemini",), "按你的命名保留为 gemmni，默认建议目录 ~/.gemini/skills"),
)


def discover_skills() -> list[str]:
    skills: list[str] = []
    if not SKILLS_ROOT.exists():
        return skills
    for path in sorted(SKILLS_ROOT.iterdir()):
        if path.is_dir() and (path / "SKILL.md").exists():
            skills.append(path.name)
    return skills


def resolve_platform(name: str) -> PlatformSpec | None:
    normalized = name.strip().lower()
    for platform in PLATFORMS:
        if normalized == platform.key or normalized in platform.aliases:
            return platform
    return None


def choose_from_menu(title: str, options: list[str]) -> str:
    print(title)
    for idx, option in enumerate(options, start=1):
        print(f"  {idx}. {option}")
    while True:
        raw = input("请输入编号: ").strip()
        if raw.isdigit():
            index = int(raw)
            if 1 <= index <= len(options):
                return options[index - 1]
        print("输入无效，请重新输入编号。")


def confirm(message: str, default: bool = True) -> bool:
    hint = "Y/n" if default else "y/N"
    raw = input(f"{message} [{hint}]: ").strip().lower()
    if not raw:
        return default
    return raw in {"y", "yes"}


def prompt_target_dir(suggested: Path) -> Path:
    raw = input(f"目标目录（回车使用 {suggested}）: ").strip()
    if not raw:
        return suggested
    return Path(raw).expanduser()


def copy_skill(skill_name: str, target_root: Path) -> Path:
    source_dir = SKILLS_ROOT / skill_name
    target_dir = target_root / skill_name
    target_root.mkdir(parents=True, exist_ok=True)
    if target_dir.exists():
        shutil.rmtree(target_dir)
    shutil.copytree(source_dir, target_dir)
    return target_dir


def list_platforms() -> None:
    for platform in PLATFORMS:
        print(f"{platform.key}: {platform.display_name} - {platform.description}")


def list_skills(skills: Iterable[str]) -> None:
    for skill in skills:
        print(skill)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="全局 skill 安装器")
    parser.add_argument("--platform", help="目标平台，如 codex / opencode / openclaw / claude-code / gemmni")
    parser.add_argument("--skill", help="要安装的 skill 名称")
    parser.add_argument("--all", action="store_true", help="安装全部 skills")
    parser.add_argument("--target-dir", help="覆盖默认目标目录")
    parser.add_argument("--list-platforms", action="store_true", help="列出支持的平台")
    parser.add_argument("--list-skills", action="store_true", help="列出仓库中的 skills")
    parser.add_argument("--yes", action="store_true", help="非交互确认")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    skills = discover_skills()

    if args.list_platforms:
        list_platforms()
        return 0

    if args.list_skills:
        list_skills(skills)
        return 0

    if not skills:
        print("未发现可安装的 skills。", file=sys.stderr)
        return 1

    platform = resolve_platform(args.platform) if args.platform else None
    if args.platform and platform is None:
        print(f"未知平台: {args.platform}", file=sys.stderr)
        return 1

    if platform is None:
        chosen = choose_from_menu(
            "请选择要安装到哪个平台：",
            [f"{item.key} ({item.display_name})" for item in PLATFORMS],
        )
        platform_key = chosen.split(" ", 1)[0]
        platform = resolve_platform(platform_key)
        assert platform is not None

    if args.all:
        chosen_skills = skills
    elif args.skill:
        if args.skill not in skills:
            print(f"未知 skill: {args.skill}", file=sys.stderr)
            return 1
        chosen_skills = [args.skill]
    else:
        menu = ["安装全部 skills"] + skills
        selected = choose_from_menu("请选择要安装的 skill：", menu)
        chosen_skills = skills if selected == "安装全部 skills" else [selected]

    suggested_target = Path(args.target_dir).expanduser() if args.target_dir else platform.default_dir()
    target_root = suggested_target if args.yes else prompt_target_dir(suggested_target)

    print("")
    print("安装计划：")
    print(f"- 平台: {platform.key} ({platform.display_name})")
    print(f"- 目标目录: {target_root}")
    print(f"- Skills: {', '.join(chosen_skills)}")

    if not args.yes and not confirm("确认开始安装吗？", default=True):
        print("已取消。")
        return 0

    installed_paths: list[Path] = []
    for skill_name in chosen_skills:
        installed_paths.append(copy_skill(skill_name, target_root))

    print("")
    print("安装完成：")
    for path in installed_paths:
        print(f"- {path}")

    print("")
    print("提示：如果目标平台有自己的 skill 缓存或重载机制，请在对应工具中重新加载或重启。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
