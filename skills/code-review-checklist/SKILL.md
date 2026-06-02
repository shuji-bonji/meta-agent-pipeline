---
name: code-review-checklist
description: Coder の diff を独立コンテキストでレビューし、review-report.md にまとめる。Sycophancy 抑止のため Coder と異なるモデルで実行
---

# Code Review Checklist Skill

Reviewer Sub-agent が使う批判的レビュー手順。

## MUST 前提条件

- Reviewer は MUST Coder と **異なるコンテキスト** で実行されること
- 可能なら Coder と **異なる LLM** を使用すること (`doctrine.reviewMustUseDifferentModel === true`)
- Coder の思考プロセス・試行錯誤ログをレビュー時に読まないこと (バイアス防止)

## 入力

- `implementation-plan.md` (設計)
- `diff/` (実装結果)
- `test-result.md` (テスト結果)

## レビュー観点 (順番に確認)

### 1. 仕様準拠 (MUST)

- [ ] `implementation-plan.md` の変更箇所一覧と diff が一致するか
- [ ] スコープ外の変更が含まれていないか
- [ ] 新規 API シグネチャが計画通りか

### 2. テスト (MUST)

- [ ] テストが追加されているか
- [ ] テストが意味のあるアサーションを持つか (空テスト・self-affirming テストでないか)
- [ ] 失敗ケースのテストがあるか
- [ ] テストが実装より先に書かれている (Prove-It pattern)

### 3. 規約 (SHOULD)

- [ ] `memory/conventions.md` に従っているか
- [ ] エラーハンドリングが適切か
- [ ] ログ・コメントが必要十分か

### 4. セキュリティ (MUST)

- [ ] secret/credential のハードコードがないか
- [ ] 外部入力のバリデーションがあるか
- [ ] 依存追加に既知の脆弱性がないか (`npm audit` 確認)

## 出力

`review-report.md` に:

- **Verdict**: `approve` / `request-changes` / `escalate`
- **指摘リスト** (`file:line` + 種別 + 提案)
- **Approve 理由 / Request-changes 理由**

## Anti-rationalization (MUST NOT)

- 「動いてるからいいや」: テストの厳しさだけでなく、**仕様逸脱** を見逃さない
- 「Coder が頑張ったから」: 努力で評価しない。仕様と diff だけで判定する
- 「小さい問題だから」: 小さい問題こそ後で爆発する。指摘して残す

## 終了条件

`review-report.md` が生成され、Verdict が `approve` / `request-changes` / `escalate` のいずれか。
