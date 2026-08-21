#!/usr/bin/env bash

set -euo pipefail

tool_name="$(
  node -e '
    let input = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (input += chunk));
    process.stdin.on("end", () => {
      process.stdout.write(JSON.parse(input).toolName ?? "");
    });
  '
)"

if [[ "$tool_name" == "apply_patch" ]]; then
  npx prettier --write .
fi
