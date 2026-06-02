---
name: conventional-commits
description: Conventional Commits 規約に従ったコミットメッセージを生成する。対象 MCP 名をスコープに含める
---

# Conventional Commits Skill

Committer Sub-agent が使うコミットメッセージ作法。

## フォーマット

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみ
- `test`: テスト追加・修正
- `refactor`: 機能変更を伴わないコード整理
- `chore`: ビルド/依存/設定
- `perf`: パフォーマンス改善

### Scope

- 対象 MCP の **モジュール名** または `target/<mcp-name>` (対象 repo 操作時)
- 例:
  - 対象 repo 内: `feat(tools): add batch_fetch_rfcs`
  - meta-agent-pipeline 内: `feat(shared): add Doctrine type`

### Subject

- 命令形・現在形 (`add` not `added`)
- 50 字以内
- 末尾ピリオドなし

### Body

- 何を変更したか + **なぜ**
- 72 字で改行

### Footer

- `Refs: #123` (Issue 番号)
- `Co-Authored-By:` (人間と AI の協働、または AI 同士の協働)
- `BREAKING CHANGE:` (破壊的変更)

## 例

```
feat(tools): add batch RFC fetch

Add `batch_fetch_rfcs` tool that accepts an array of RFC numbers
and returns parsed content in parallel. Improves throughput for
agents collecting multiple specs.

Refs: #42
Co-Authored-By: Claude <noreply@anthropic.com>
```

## MUST NOT

- 抽象的すぎる subject (`update`, `fix bug`, `improve code`) — git log が機能しなくなる
- 複数の独立した変更を 1 コミットに詰める — `git bisect` が機能しなくなる
- Issue 番号を本文に書かず Footer の `Refs:` だけで済ます (どちらでも可だが規約で統一)
