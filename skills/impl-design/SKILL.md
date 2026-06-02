---
name: impl-design
description: instructions.md を読み、実装計画 (implementation-plan.md) を作成する。設計判断と不確実性を明示する
---

# Implementation Design Skill

Planner Sub-agent が使う実装設計手順。

## 入力

- `artifacts/instructions.md`
- 対象リポジトリ (read-only)
- `memory/conventions.md` (規約)
- `memory/adr/*` (過去の決定)

## 出力

`implementation-plan.md` に以下の 7 項目を含める:

1. **設計サマリ** — 3〜5 行
2. **却下した代替案** — **最低 1 案** を不採用にし、理由を明記 (思考停止防止)
3. **変更箇所一覧** — file path + 変更概要
4. **新規 API / 公開シグネチャ** — TypeScript で記述
5. **テスト方針** — 単体 / 統合 / E2E のどれを書くか
6. **不確実性リスト** — 設計時に判断保留した項目 (Coder への申し送り)
7. **依存追加の有無** — `package.json` の変更

## MUST

- **最初に書くのは「却下した代替案」**。最低 1 案を不採用にすること
- 不確実性は **必ず明示** し、隠さない (Sycophancy 防止)
- `conventions.md` の規約に違反する設計は MUST NOT 採用

## 終了条件

`implementation-plan.md` が生成され、上記 7 項目が埋まっている。
