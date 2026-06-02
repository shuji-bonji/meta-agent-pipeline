# CLAUDE.md — meta-agent-pipeline

このリポジトリは「Issue → Deploy 自律化パイプライン」の実装。クラウド LLM 版 (Claude Agent SDK) とローカル LLM 版 (自作 TS harness × Ollama) を持つ monorepo。

## ディレクトリ概要

- `shared/` — cloud/local が共有する型・抽象 (SubAgent, Artifact, McpClient)
- `cloud/` — Claude Agent SDK ベースの実装
- `local/` — Ollama + 自作 TS harness の実装
- `skills/` — Sub-agent が参照する SKILL.md (静的知識)
- `memory/` — 永続化された記憶 (conventions, ADR, failure catalog)
- `targets/` — 操作対象 MCP の宣言 (rfcxml-mcp.yml, xcomet-mcp.yml, ...)
- `experiments/` — 実証ログ (NNN-issue-name/)

## 技術スタック

- TypeScript (ESM, `"type": "module"`)
- Node.js >= 20
- npm workspaces
- Vitest (test)
- ESLint + Prettier
- (cloud) `@anthropic-ai/claude-agent-sdk` ※ Phase 1b
- (local) Ollama (OpenAI 互換 API)、自作 TS harness ※ Phase 1c

## コミット規約

Conventional Commits を使用。MCP の対象操作は scope に対象を明示:

- `feat(target/rfcxml): add batch fetch tool`
- `fix(shared): handle missing artifact gracefully`
- `chore: scaffold Phase 1a foundation`

## ガードレール (Doctrine)

- リトライ上限: 各 Sub-agent 3 回 → 超過したら escalate (Human-in-the-Loop)
- typecheck エラー = 0 (MUST)
- lint クリーン (MUST)
- Test coverage 80% (Phase 2 以降適用)
- secret は環境変数経由のみ (MUST NOT ハードコード)

## Sub-agent 化の方針

- **Reviewer は MUST 独立コンテキスト** + 異なるモデル (Coder と同モデルで自己レビューさせない = Sycophancy 防止)
- **Meta-agent は state machine + ルーターに徹する** — Sub-agent 出力を要約・統合しない (Context Rot 防止)
- **Sub-agent 間通信は artifact ファイルのみ** (口頭リレー禁止)
- 1 フェーズ = 1 Sub-agent (粒度を細かく刻みすぎない)

## 実証の取り扱い

- `experiments/NNN-issue-name/` に 1 Issue 完走ごとに記録
- 計測項目: 各ステップの成功率、人間介入箇所、所要時間、トークンコスト
- 失敗パターンは `memory/failures.md` に追記
- 知見は `memory/adr/` (ADR) に昇格させる

## 関連リポジトリ

- 設計サイト: [ai-agent-architecture](https://github.com/shuji-bonji/ai-agent-architecture)
- 原理サイト: [understanding-llm-through-claude-code](https://github.com/shuji-bonji/understanding-llm-through-claude-code)
- 操作対象 (初期): [rfcxml-mcp](https://github.com/shuji-bonji/rfcxml-mcp), [xcomet-mcp-server](https://github.com/shuji-bonji/xcomet-mcp-server)
