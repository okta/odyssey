import { execFile } from "node:child_process";

/**
 * Runs a git command in the given repo root and resolves with trimmed stdout.
 */
export const runGitCommand = ({
  args,
  repoRoot,
}: {
  args: string[];
  repoRoot: string;
}): Promise<string> =>
  new Promise((resolve, reject) => {
    execFile("git", args, { cwd: repoRoot }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
      } else {
        resolve(stdout.trim());
      }
    });
  });

/**
 * Returns the date the given path was first added to the git repo.
 * `filePath` must be relative to `repoRoot`.
 */
export const getFirstCommitDate = ({
  filePath,
  repoRoot,
}: {
  filePath: string;
  repoRoot: string;
}): Promise<Date> =>
  runGitCommand({
    args: [
      "log",
      "--diff-filter=A",
      "--follow",
      "--format=%aI",
      "--",
      filePath,
    ],
    repoRoot,
  }).then((output) => {
    const lines = output.split("\n").filter(Boolean);
    // git log is newest-first; the last line is the initial add.
    const earliest = lines[lines.length - 1];

    if (!earliest) {
      throw new Error(`No initial commit found for path: ${filePath}`);
    }

    return new Date(earliest);
  });

/**
 * Returns all files changed since `since` (a git date string, e.g.
 * "1 month ago") under `dirPath` (relative to `repoRoot`).
 *
 * `dirPath` is passed to git unchanged to preserve POSIX separators.
 * Do not run it through `path.join` first — on Windows that would convert
 * forward slashes to backslashes, causing git log to miss files.
 *
 * Returns null and calls onWarn if the git command fails.
 */
export const getChangesSince = ({
  dirPath,
  onWarn = () => {},
  repoRoot,
  since,
}: {
  dirPath: string;
  onWarn?: (message: string) => void;
  repoRoot: string;
  since: string;
}): Promise<string[] | null> =>
  runGitCommand({
    args: [
      "log",
      `--since=${since}`,
      "--name-only",
      "--format=",
      "--",
      dirPath,
    ],
    repoRoot,
  }).then(
    (output) => output.split("\n").filter(Boolean),
    (error: unknown) => {
      onWarn(
        `Could not fetch git changes for ${dirPath}: ${error instanceof Error ? error.message : String(error)}`,
      );
      return null;
    },
  );

/**
 * Returns the number of git tags matching `<packageName>@*`.
 * Used as a proxy for how many versions a contributions package has shipped.
 */
export const getVersionTagCount = ({
  packageName,
  repoRoot,
}: {
  packageName: string;
  repoRoot: string;
}): Promise<number> =>
  runGitCommand({ args: ["tag", "--list", `${packageName}@*`], repoRoot }).then(
    (output) => output.split("\n").filter(Boolean).length,
  );
