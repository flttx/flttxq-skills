#!/usr/bin/env python3
"""
Generate a markdown scorecard from triple-store review findings.

Input JSON schema (minimal):
{
  "meta": {"app_name": "demo", "version": "1.0.0"},
  "operations": [
    {"step": "1", "goal": "...", "action": "...", "evidence": "...", "result": "PASS"}
  ],
  "findings": [
    {
      "platform": "apple|huawei|tencent|cross",
      "severity": "P0|P1|P2|INFO",
      "type": "risk|question|optimization|info",
      "title": "...",
      "description": "...",
      "evidence": "...",
      "suggestion": "..."
    }
  ]
}
"""

from __future__ import annotations

import argparse
import json
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List

SEVERITIES = ("P0", "P1", "P2", "INFO")
SEVERITY_ORDER = {"P0": 0, "P1": 1, "P2": 2, "INFO": 3}
PLATFORMS = ("huawei", "tencent", "apple", "cross")
PLATFORM_LABELS = {
    "huawei": "Huawei AppGallery",
    "tencent": "Tencent MyApp",
    "apple": "Apple App Store",
    "cross": "Cross-Platform",
}
TYPE_LABELS = {
    "risk": "Risk",
    "question": "Question",
    "optimization": "Optimization",
    "info": "Info",
}


def normalize_platform(raw: str) -> str:
    value = (raw or "").strip().lower()
    aliases = {
        "appstore": "apple",
        "app-store": "apple",
        "apple-app-store": "apple",
        "appgallery": "huawei",
        "myapp": "tencent",
        "yingyongbao": "tencent",
        "cross-platform": "cross",
    }
    value = aliases.get(value, value)
    return value if value in PLATFORMS else "cross"


def normalize_severity(raw: str) -> str:
    value = (raw or "").strip().upper()
    return value if value in SEVERITIES else "INFO"


def normalize_type(raw: str) -> str:
    value = (raw or "").strip().lower()
    return value if value in TYPE_LABELS else "risk"


def derive_status(counter: Counter) -> str:
    if counter["P0"] > 0:
        return "BLOCKED"
    if counter["P1"] > 0:
        return "PASS_WITH_QUESTIONS"
    return "PASS"


def derive_score(counter: Counter) -> int:
    score = 100 - counter["P0"] * 40 - counter["P1"] * 15 - counter["P2"] * 5
    return max(0, score)


def sanitize(text: str) -> str:
    return (text or "").replace("\n", " ").strip()


def build_markdown(payload: Dict) -> str:
    meta = payload.get("meta", {})
    operations = payload.get("operations", [])
    findings = payload.get("findings", [])

    overall = Counter()
    by_platform: Dict[str, Counter] = defaultdict(Counter)
    by_type = Counter()
    normalized_findings: List[Dict] = []

    for item in findings:
        platform = normalize_platform(item.get("platform", "cross"))
        severity = normalize_severity(item.get("severity", "INFO"))
        ftype = normalize_type(item.get("type", "risk"))

        by_platform[platform][severity] += 1
        overall[severity] += 1
        by_type[ftype] += 1

        normalized_findings.append(
            {
                "platform": platform,
                "severity": severity,
                "type": ftype,
                "title": sanitize(item.get("title", "Untitled finding")),
                "description": sanitize(item.get("description", "")),
                "evidence": sanitize(item.get("evidence", "")),
                "suggestion": sanitize(item.get("suggestion", "")),
            }
        )

    normalized_findings.sort(
        key=lambda x: (
            SEVERITY_ORDER[x["severity"]],
            x["platform"],
            x["type"],
            x["title"].lower(),
        )
    )

    generated_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    app_name = sanitize(meta.get("app_name", "unknown-app"))
    version = sanitize(meta.get("version", "unknown-version"))
    build = sanitize(meta.get("build", "unknown-build"))

    lines: List[str] = []
    lines.append("# Triple-Store Review Scorecard")
    lines.append("")
    lines.append(f"- App: `{app_name}`")
    lines.append(f"- Version: `{version}`")
    lines.append(f"- Build: `{build}`")
    lines.append(f"- Generated: `{generated_at}`")
    lines.append("")
    lines.append("## 1) Risk Score Summary")
    lines.append("")
    lines.append("| Total Score | P0 | P1 | P2 | INFO |")
    lines.append("|---|---|---|---|---|")
    lines.append(
        f"| {derive_score(overall)} | {overall['P0']} | {overall['P1']} | {overall['P2']} | {overall['INFO']} |"
    )
    lines.append("")
    lines.append("## 2) Platform Status Matrix")
    lines.append("")
    lines.append("| Platform | Status | P0 | P1 | P2 | INFO |")
    lines.append("|---|---|---|---|---|---|")

    for platform in ("huawei", "tencent", "apple", "cross"):
        counter = by_platform[platform]
        lines.append(
            f"| {PLATFORM_LABELS[platform]} | {derive_status(counter)} | {counter['P0']} | {counter['P1']} | {counter['P2']} | {counter['INFO']} |"
        )

    lines.append("")
    lines.append("## 3) Finding Type Summary")
    lines.append("")
    lines.append("| Type | Count |")
    lines.append("|---|---|")
    for ftype in ("risk", "question", "optimization", "info"):
        lines.append(f"| {TYPE_LABELS[ftype]} | {by_type[ftype]} |")

    if operations:
        lines.append("")
        lines.append("## 4) Key Operations")
        lines.append("")
        lines.append("| Step | Goal | Action | Evidence | Result |")
        lines.append("|---|---|---|---|---|")
        for op in operations:
            lines.append(
                "| {step} | {goal} | {action} | {evidence} | {result} |".format(
                    step=sanitize(str(op.get("step", ""))),
                    goal=sanitize(op.get("goal", "")),
                    action=sanitize(op.get("action", "")),
                    evidence=sanitize(op.get("evidence", "")),
                    result=sanitize(op.get("result", "")),
                )
            )

    lines.append("")
    lines.append("## 5) Sorted Findings")
    lines.append("")

    if not normalized_findings:
        lines.append("- No findings were provided.")
    else:
        for idx, item in enumerate(normalized_findings, start=1):
            lines.append(
                f"{idx}. [{item['severity']}] [{PLATFORM_LABELS[item['platform']]}] [{TYPE_LABELS[item['type']]}] {item['title']}"
            )
            if item["description"]:
                lines.append(f"   - Description: {item['description']}")
            if item["evidence"]:
                lines.append(f"   - Evidence: {item['evidence']}")
            if item["suggestion"]:
                lines.append(f"   - Suggestion: {item['suggestion']}")

    lines.append("")
    lines.append("## 6) Release Recommendation")
    lines.append("")
    lines.append(f"- Overall status: `{derive_status(overall)}`")
    lines.append("- Rule: `P0 > 0 => BLOCKED`, `P1 > 0 and P0 == 0 => PASS_WITH_QUESTIONS`, else `PASS`.")

    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate review scorecard markdown from JSON findings.")
    parser.add_argument("--input", required=True, help="Input JSON file path.")
    parser.add_argument("--output", help="Optional output markdown file path.")
    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.exists():
        raise SystemExit(f"[ERROR] Input file not found: {input_path}")

    payload = json.loads(input_path.read_text(encoding="utf-8"))
    markdown = build_markdown(payload)

    if args.output:
        output_path = Path(args.output)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(markdown, encoding="utf-8")
        print(f"[OK] Scorecard written: {output_path}")
    else:
        print(markdown)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
