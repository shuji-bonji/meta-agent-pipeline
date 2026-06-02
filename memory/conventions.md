# conventions — shuji-bonji の MCP 開発規約

> shuji-mcp-patterns Skill から抽出した、TypeScript × MCP 開発の規約。Sub-agent はこのファイルを必ず参照する。

## 基本スタック

- TypeScript (ESM, `"type": "module"`)
- Node.js >= 20
- `@modelcontextprotocol/sdk` 最新版
- Build: `tsc`
- Test: Vitest または `node:test`
- Lint: ESLint
- Format: Prettier (config はリポジトリ依存)

## ファイル構成 (MCP サーバ側)

```
src/
├── index.ts          # MCP サーバのエントリポイント
├── server.ts         # Server インスタンス + tool registration
├── tools/            # 各 tool の実装
│   └── <tool-name>.ts
├── lib/              # 内部ユーティリティ
└── types.ts          # 共通型
test/
└── tools/
    └── <tool-name>.test.ts
```

## Tool 実装規約

- 1 tool = 1 ファイル
- input schema は Zod で定義
- handler は `async function` を export
- エラーは型付き Error を throw (`McpToolError` 等)
- secret/credential は環境変数経由のみ (`process.env.XXX`)
- 副作用 (file write、network call) は明示的にコメント

## TypeScript の方針

- `any` 型は MUST NOT。どうしても必要なら `unknown` + type guard
- `strict: true` 前提
- 公開 API には JSDoc コメントを付ける
- export はファイル末尾に集約せず、定義位置で export する

## コミット

- Conventional Commits ([[skills/conventional-commits]] 参照)
- scope は **モジュール名** で書く (例: `feat(tools): ...`, `fix(server): ...`)
- meta-agent-pipeline から対象 MCP を操作する場合は `feat(target/rfcxml): ...` のように対象を scope に含める

## テスト

- Unit test: 個別 tool の動作確認
- Integration test: MCP サーバ起動 → tool call → 期待出力
- カバレッジ最低 80%
- **failure 系のテストを必ず含める** (正常系だけはダメ)

## ドキュメント

- README.md には: 概要、インストール、設定例、tool 一覧
- 大きな変更は ADR (Architecture Decision Record) を `docs/adr/` に追加

## 禁止事項

- `any` 型 (MUST NOT)
- `console.log` 残し (MUST NOT) — debug は logger 経由
- secret のハードコード (MUST NOT)
- README なしの破壊的変更 (SHOULD NOT)
- 1 PR に複数の独立変更 (SHOULD NOT) — `git bisect` を壊す
