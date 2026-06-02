# meta-agent-pipeline

> 個人開発者のための自律 AI 開発パイプライン。Issue → Deploy を Meta-agent + Sub-agent で駆動する。クラウド LLM 版とローカル LLM 版の両方を提供。

## ステータス

`Phase 1a: foundation` — 雛形構築中。実証 (Phase 2) はまだ未実施。

## 目的

筆者 ([shuji-bonji](https://github.com/shuji-bonji)) の TypeScript × MCP 開発を、自律 AI に任せる **個人開発環境** を構築する。汎用ライブラリではなく、特定の MCP 群 ([rfcxml-mcp](https://github.com/shuji-bonji/rfcxml-mcp), [xcomet-mcp-server](https://github.com/shuji-bonji/xcomet-mcp-server), [w3c-mcp](https://github.com/shuji-bonji/w3c-mcp), [epsg-mcp](https://github.com/shuji-bonji/epsg-mcp), [pdf-spec-mcp](https://github.com/shuji-bonji/pdf-spec-mcp), ...) に最適化する。

## 設計の根拠

- 構造: [ai-agent-architecture / Issue→Deploy 自律化](https://shuji-bonji.github.io/ai-agent-architecture/ja/workflows/autonomous-dev-meta-agent)
- 原理: [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/)
- 手動運用版: [CLAUDE.md がなくても戦える (Zenn)](https://zenn.dev/shuji_bonji/articles/c9d325f1fd7646)

## ディレクトリ構造

```
meta-agent-pipeline/
├── shared/         # cloud/local が共有する型・抽象 (SubAgent, Artifact, McpClient)
├── cloud/          # Claude Agent SDK 実装 (TODO: Phase 1b)
├── local/          # Ollama + 自作 TS harness 実装 (TODO: Phase 1c)
├── skills/         # Sub-agent 用 SKILL.md (静的知識)
├── memory/         # 永続記憶 (conventions, ADR, failure catalog)
├── targets/        # 操作対象 MCP の宣言 (rfcxml-mcp.yml, xcomet-mcp.yml, ...)
└── experiments/    # 実証ログ (NNN-issue-name/)
```

## 構成要素

| 層 | 役割 | 実装位置 |
|---|---|---|
| **Doctrine** | 品質ゲート / リトライ上限 / 規約 | `shared/src/doctrine.ts`, `CLAUDE.md` |
| **Agent (Meta + Sub)** | 各役割の Sub-agent と Meta ルーター | `cloud/`, `local/` |
| **Skills** | 静的手順書 | `skills/<name>/SKILL.md` |
| **Memory** | 永続記憶 | `memory/` |
| **MCP** | 外部接続 | `shared/src/mcp-client.ts` (TODO) |

## 開発ロードマップ

| Phase | 内容 | 状態 |
|---|---|---|
| 1a | foundation 雛形 (本コミット) | 🔬 進行中 |
| 1b | cloud/ harness skeleton (Claude Agent SDK) | 📋 未着手 |
| 1c | local/ harness skeleton (自作 TS × Ollama) | 📋 未着手 |
| 1d | 実行サンドボックス (Docker) 組込 | 📋 未着手 |
| 2 | 初回実証: rfcxml-mcp に小機能追加 | 📋 未着手 |
| 2 | 2 週目: xcomet-mcp-server に小機能追加 | 📋 未着手 |

## 使い方

(まだ未実装。Phase 1b 以降で記述)

## ライセンス

MIT
