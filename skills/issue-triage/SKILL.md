---
name: issue-triage
description: GitHub Issue を読み解き、影響範囲・難易度・必要 Sub-agent を判定して instructions.md にまとめる
---

# Issue Triage Skill

Instructor Sub-agent が使う Issue 解読手順。

## 入力

- `target.repoUrl` の Issue URL または番号
- GitHub MCP からの Issue 本文・コメント・ラベル

## 出力

`instructions.md` に以下の 8 項目を含める:

1. **概要** — Issue が何を要求しているか (1〜3 行)
2. **目的** — なぜ必要か
3. **影響範囲 (仮)** — 修正対象ファイル/モジュールの仮見当
4. **難易度** — `trivial` / `small` / `medium` / `large` / `unknown`
5. **必要 Sub-agent 候補** — full pipeline か、部分パイプラインか
6. **依存** — 他の Issue / PR / 外部仕様への依存
7. **注意事項** — スコープ外への波及を防ぐ原則
8. **不確実性リスト** — 解読時に判断保留した項目 (Planner への申し送り)

## MUST

- スコープを **Issue に書かれていることに限定** すること。「ついでに直す」は MUST NOT
- Issue 本文に答えがない項目は **不確実性リスト** に記載し、Planner に判断を委ねる
- 影響範囲は **仮見当** であることを明示 (確定は Planner の役割)

## 終了条件

`instructions.md` が生成され、上記 8 項目が埋まっている。
