# experiments — 実証ログ

> Phase 2 以降の Issue→Deploy 完走記録を蓄積する。1 Issue = 1 ディレクトリ。

## ディレクトリ命名

```
experiments/NNN-target-short-description/
```

- `NNN`: 連番 (3 桁)
- `target`: 操作対象 MCP 名 (例: `rfcxml`)
- `short-description`: kebab-case の短い説明

例: `experiments/001-rfcxml-batch-fetch/`

## ディレクトリ内容

```
experiments/NNN-xxx/
├── instructions.md            # Instructor Sub-agent 出力
├── implementation-plan.md     # Planner Sub-agent 出力
├── e2e-test-spec.md           # Test Designer 出力
├── checklist.md               # Test Designer 出力
├── diff/                      # Coder の変更内容
├── test-result.md             # Test Runner 出力
├── review-report.md           # Reviewer 出力
└── result.md                  # 完走後の総括 (KPI 記録)
```

## result.md フォーマット

```markdown
# Experiment NNN: <title>

**対象**: <target MCP name> (<repo URL>)
**Issue**: #<num> (<URL>)
**実施日**: YYYY-MM-DD
**Harness**: cloud (Claude Agent SDK) | local (Ollama × custom)
**モデル**: <Coder model> + <Reviewer model>

## KPI

- 所要時間: <分>
- 人間介入回数: <数>
- 各 Sub-agent の試行回数: <map>
- トークンコスト: input <num> / output <num>
- 推定 USD: $<num>

## 結果

- 最終 Verdict: success / failure / escalated
- PR URL: <URL>
- マージ済み: yes / no

## 学び

- 良かった点
- 改善点
- 失敗があれば → `memory/failures.md` に登録
- 知見が一般化できれば → `memory/adr/` に昇格
```

## エントリ

(まだ実証していないため空)
