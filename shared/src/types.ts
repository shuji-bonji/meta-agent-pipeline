/**
 * Core type definitions shared between cloud and local harness implementations.
 *
 * Sub-agents communicate ONLY through artifact files. The Meta-agent acts as
 * a state machine + router and never reads artifact contents.
 */

// -----------------------------------------------------------------------------
// Sub-agent roles & phases
// -----------------------------------------------------------------------------

export type SubAgentRole =
  | 'instructor'
  | 'planner'
  | 'coder'
  | 'test-designer'
  | 'test-runner'
  | 'reviewer'
  | 'committer';

export type PipelinePhase =
  | 'issue-read'
  | 'plan'
  | 'code'
  | 'test-design'
  | 'test-run'
  | 'review'
  | 'git-ops'
  | 'pr-create'
  | 'ci-wait'
  | 'deploy';

// -----------------------------------------------------------------------------
// Artifact (file-based handoff between Sub-agents)
// -----------------------------------------------------------------------------

export type ArtifactKind =
  | 'instructions'
  | 'implementation-plan'
  | 'e2e-test-spec'
  | 'checklist'
  | 'diff'
  | 'test-result'
  | 'review-report';

export interface Artifact {
  /** Path relative to the experiment directory. */
  path: string;
  kind: ArtifactKind;
  producedBy: SubAgentRole;
  /** ISO-8601 timestamp. */
  producedAt: string;
}

// -----------------------------------------------------------------------------
// Sub-agent interface
// -----------------------------------------------------------------------------

export interface SubAgent {
  readonly role: SubAgentRole;
  readonly phase: PipelinePhase;
  readonly model: ModelSelection;
  run(input: SubAgentInput): Promise<SubAgentOutput>;
}

export interface SubAgentInput {
  /** Absolute path to experiments/NNN-xxx/ */
  experimentDir: string;
  /** Artifact paths to read. */
  inputArtifacts: Artifact[];
  /** Which MCP repository we are operating on. */
  target: TargetSpec;
  /** SKILL.md to follow. */
  skill: SkillRef;
  /** Quality gates & retry limits. */
  doctrine: Doctrine;
}

export type Verdict = 'success' | 'failure' | 'escalate';

export interface SubAgentOutput {
  verdict: Verdict;
  outputArtifacts: Artifact[];
  notes?: string;
  tokenUsage?: TokenUsage;
}

export interface TokenUsage {
  input: number;
  output: number;
}

// -----------------------------------------------------------------------------
// Model abstraction (cloud and local both implement this)
// -----------------------------------------------------------------------------

export interface ModelProvider {
  /** e.g., "claude-sonnet-4-6", "qwen2.5-coder:32b" */
  readonly id: string;
  readonly kind: 'cloud' | 'local';
  invoke(prompt: ModelInvocation): Promise<ModelResponse>;
}

export interface ModelInvocation {
  systemPrompt: string;
  userPrompt: string;
  tools?: McpToolDef[];
  maxTokens?: number;
  temperature?: number;
}

export interface ModelResponse {
  content: string;
  toolCalls?: McpToolCall[];
  stopReason: 'end_turn' | 'tool_use' | 'max_tokens' | 'error';
  usage: TokenUsage;
}

export interface ModelSelection {
  primary: string;
  fallback?: string;
  /** MUST differ from `primary` for Reviewer Sub-agent (Sycophancy mitigation). */
  reviewer?: string;
}

// -----------------------------------------------------------------------------
// MCP abstraction (cloud and local share this)
// -----------------------------------------------------------------------------

export interface McpClient {
  readonly serverName: string;
  listTools(): Promise<McpToolDef[]>;
  callTool(name: string, args: Record<string, unknown>): Promise<unknown>;
  close(): Promise<void>;
}

export interface McpToolDef {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface McpToolCall {
  name: string;
  args: Record<string, unknown>;
}

// -----------------------------------------------------------------------------
// Target spec (which MCP repository we operate on)
// -----------------------------------------------------------------------------

export interface TargetSpec {
  name: string;
  repoUrl: string;
  localPath?: string;
  language: 'typescript' | 'python' | 'rust';
  testCommand: string;
  lintCommand: string;
  typecheckCommand?: string;
  buildCommand?: string;
  defaultBranch: string;
  featureBranchPrefix: string;
  caveats?: string[];
}

// -----------------------------------------------------------------------------
// Skill reference
// -----------------------------------------------------------------------------

export interface SkillRef {
  /** e.g., "impl-design" */
  name: string;
  /** Absolute path to SKILL.md */
  path: string;
}

// -----------------------------------------------------------------------------
// Doctrine (quality gates & governance)
// -----------------------------------------------------------------------------

export interface Doctrine {
  retryLimitPerStep: number;
  testCoverageMin: number;
  lintMustPass: boolean;
  typecheckMustPass: boolean;
  /** MUST be true: Reviewer uses a different model from Coder. */
  reviewMustUseDifferentModel: boolean;
  /** Max minutes per step before escalation. */
  stepTimeoutMinutes: number;
}

export const DEFAULT_DOCTRINE: Doctrine = {
  retryLimitPerStep: 3,
  testCoverageMin: 0.8,
  lintMustPass: true,
  typecheckMustPass: true,
  reviewMustUseDifferentModel: true,
  stepTimeoutMinutes: 30,
};
