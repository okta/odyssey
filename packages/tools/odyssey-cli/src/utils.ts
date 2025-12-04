import { type ChokidarOptions, watch } from "chokidar";
import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { basename } from "node:path";

export type LogOptions = {
  newLineAfter?: boolean;
  newLineBefore?: boolean;
};

type LogFunction = (message: string, options?: LogOptions) => void;

export type Logger = {
  error: LogFunction;
  info: LogFunction;
  processStart: LogFunction;
  success: LogFunction;
  warn: LogFunction;
};

export const getLogger = (logPrefix: string): Logger => {
  /**
   * Handler for all log messages.
   * This keeps the formatting logic (like newlines) in one place.
   */
  const logHandler = (
    method:
      | typeof console.log
      | typeof console.warn
      | typeof console.error
      | typeof console.info,
    messageParts: string[],
    options: LogOptions = {},
  ) => {
    const { newLineBefore = false, newLineAfter = false } = options;

    // ---- Construct the core message ----
    const message = messageParts.join(" ");
    let finalMessage = `[${logPrefix}] ${message}`;

    // ---- Apply options ----
    if (newLineBefore) {
      finalMessage = `\n${finalMessage}`;
    }
    if (newLineAfter) {
      finalMessage = `${finalMessage}\n`;
    }

    method(finalMessage);
  };

  const success: LogFunction = (message, options) =>
    logHandler(console.log, ["✅", message], options);

  const warn: LogFunction = (message, options) =>
    logHandler(console.warn, ["⚠️ ", message], options);

  const info: LogFunction = (message, options) =>
    logHandler(console.info, ["✨", message], options);

  const error: LogFunction = (message, options) => {
    // We merge options to keep the original behavior (newline after)
    // as a default, but allow the user to override it.
    const finalOptions = { newLineAfter: true, ...options };
    logHandler(console.error, ["❗️❗️", message], finalOptions);
  };

  const processStart: LogFunction = (message, options) =>
    logHandler(console.log, ["⏳", message], options);

  return {
    error,
    info,
    processStart,
    warn,
    success,
  };
};

export const getPackageName = () => {
  const pathSegments = process.cwd().split("/");

  return pathSegments[pathSegments.length - 1];
};

export const execAsync = async (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // spawn returns a ChildProcess object
    const child = spawn(command, {
      stdio: "inherit", // allows live output and relays signals (like CTRL+C) to the child process.
      shell: true, // use shell to automatically find `yarn`
    });

    // listen for the 'close' event (when the process exits)
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    // listen for an 'error' event (e.g., command not found)
    child.on("error", (err) => {
      reject(err);
    });
  });
};

/**
 * Asynchronously checks if a file or directory exists.
 */
export const getHasFileOrDirectory = async (path: string) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export type WatchTaskOptions = {
  /** Additional `chokidar` options passed the `watch` function */
  chokidarOptions?: ChokidarOptions;
  /** Your existing logger instance */
  logger: Logger;
  /** The async function to run when a change is detected */
  onChange: () => Promise<void>;
  path: string | string[];
};

export const runWatchTask = ({
  path,
  onChange,
  chokidarOptions,
  logger,
}: WatchTaskOptions) => {
  logger.info(
    `Watching for changes in: ${typeof path === "string" ? path : path.join(", ")}...`,
  );

  const watcher = watch(path, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100,
    },
    ...chokidarOptions,
  });

  let isRunning = false;
  let needsRerun = false;

  const runSafe = async () => {
    if (isRunning) {
      needsRerun = true;
      return;
    }

    isRunning = true;

    try {
      await onChange();
      logger.info("Rebuild complete.");
    } catch (error) {
      logger.error(`Error during watch execution: ${(error as Error).message}`);
    } finally {
      isRunning = false;

      // If a change happened while we were working, run again immediately
      if (needsRerun) {
        needsRerun = false;
        void runSafe();
      }
    }
  };

  watcher.on("change", (filePath) => {
    logger.info(`File changed: ${basename(filePath)}`);
    void runSafe();
  });

  return watcher;
};
