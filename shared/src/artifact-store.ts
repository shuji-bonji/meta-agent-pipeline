import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import type { Artifact, ArtifactKind, SubAgentRole } from './types.js';

/**
 * Artifact store: file-based handoff between Sub-agents.
 *
 * Design constraint (from the Issue→Deploy autonomy design doc):
 *
 *   "Sub-agents communicate ONLY through artifacts. The Meta-agent never
 *    reads artifact contents — it only passes paths."
 *
 * This class is intentionally minimal: it does not interpret artifact
 * contents. Sub-agents read/write Markdown / YAML / diff text directly.
 */
export class ArtifactStore {
  constructor(private readonly experimentDir: string) {}

  /**
   * Persist an artifact under the experiment directory.
   * Creates intermediate directories as needed.
   */
  async write(
    relPath: string,
    content: string,
    meta: { kind: ArtifactKind; producedBy: SubAgentRole },
  ): Promise<Artifact> {
    const abs = path.join(this.experimentDir, relPath);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, content, 'utf8');
    return {
      path: relPath,
      kind: meta.kind,
      producedBy: meta.producedBy,
      producedAt: new Date().toISOString(),
    };
  }

  /** Read an artifact by its relative path. */
  async read(artifact: Artifact): Promise<string> {
    const abs = path.join(this.experimentDir, artifact.path);
    return fs.readFile(abs, 'utf8');
  }

  /** Check whether an artifact exists at the given relative path. */
  async exists(relPath: string): Promise<boolean> {
    try {
      await fs.access(path.join(this.experimentDir, relPath));
      return true;
    } catch {
      return false;
    }
  }

  /** Absolute path resolver (for harness internals only). */
  resolve(relPath: string): string {
    return path.join(this.experimentDir, relPath);
  }
}
