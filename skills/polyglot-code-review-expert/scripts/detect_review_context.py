#!/usr/bin/env python3
"""快速探测代码审查上下文：规范文档、框架线索、建议读取的 reference。"""

from __future__ import annotations

import json
import sys
from pathlib import Path


POLICY_FILES = {
    "AGENTS.md",
    "CLAUDE.md",
    "README.md",
    "package.json",
    "app.json",
    "app.config.js",
    "app.config.ts",
    "module.json5",
}

SKIP_DIRS = {
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    "coverage",
    ".expo",
    ".turbo",
    ".yarn",
    "Pods",
    ".idea",
    ".vscode",
}

REFERENCE_MAP = {
    "react": "references/framework-react.md",
    "vue2": "references/framework-vue2.md",
    "vue3": "references/framework-vue3.md",
    "react-native": "references/framework-react-native.md",
    "electron": "references/framework-electron.md",
    "harmonyos": "references/framework-harmonyos.md",
}


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except Exception:
        try:
            return path.read_text(encoding="utf-8-sig")
        except Exception:
            return ""


def detect_frameworks(root: Path) -> list[str]:
    frameworks: set[str] = set()
    package_json = root / "package.json"
    if package_json.exists():
        content = read_text(package_json)
        low = content.lower()
        if '"react-native"' in low or '"expo"' in low:
            frameworks.add("react-native")
        if '"electron"' in low:
            frameworks.add("electron")
        if '"vue"' in low and '"vue-template-compiler"' in low:
            frameworks.add("vue2")
        if '"vue"' in low and '"@vue/' in low:
            frameworks.add("vue3")
        if '"react"' in low and "react-native" not in frameworks:
            frameworks.add("react")

    if (root / "electron-builder.yml").exists() or (root / "electron.vite.config.ts").exists():
        frameworks.add("electron")

    found_vue = False
    found_ets = False
    found_app_tsx = False

    stack = [root]
    while stack:
        current = stack.pop()
        try:
            entries = list(current.iterdir())
        except Exception:
            continue
        for entry in entries:
            if entry.is_dir():
                if entry.name in SKIP_DIRS:
                    continue
                stack.append(entry)
                continue

            name = entry.name
            suffix = entry.suffix.lower()
            if name == "module.json5":
                found_ets = True
            elif name == "App.tsx":
                found_app_tsx = True
            elif suffix == ".vue":
                found_vue = True
            elif suffix == ".ets":
                found_ets = True

        if found_vue and found_ets and found_app_tsx:
            break

    if found_ets:
        frameworks.add("harmonyos")
    if found_app_tsx and ((root / "app.json").exists() or (root / "metro.config.js").exists()):
        frameworks.add("react-native")
    if found_vue:
        if (root / "vite.config.ts").exists() or (root / "vite.config.js").exists():
            frameworks.add("vue3")
        elif not frameworks.intersection({"vue2", "vue3"}):
            frameworks.add("vue2")

    return sorted(frameworks)


def collect_policy_docs(root: Path) -> list[str]:
    docs: list[str] = []
    stack = [root]
    while stack:
        current = stack.pop()
        try:
            entries = list(current.iterdir())
        except Exception:
            continue
        for entry in entries:
            if entry.is_dir():
                if entry.name in SKIP_DIRS:
                    continue
                stack.append(entry)
                continue
            if entry.name in POLICY_FILES:
                docs.append(str(entry))
                continue
            normalized = str(entry).replace("\\", "/").lower()
            if "/docs/" in normalized and entry.suffix.lower() in {".md", ".mdx", ".txt"}:
                docs.append(str(entry))
                continue
            if "/.cursor/rules/" in normalized:
                docs.append(str(entry))
    return sorted(docs)


def main() -> int:
    root = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path.cwd()
    frameworks = detect_frameworks(root)
    policy_docs = collect_policy_docs(root)

    suggested = [
        "references/common-review-baseline.md",
        "references/project-policy-scan.md",
    ]
    suggested.extend(REFERENCE_MAP[name] for name in frameworks if name in REFERENCE_MAP)

    payload = {
        "root": str(root),
        "frameworks": frameworks,
        "policy_docs": policy_docs[:80],
        "suggested_references": suggested,
    }
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
