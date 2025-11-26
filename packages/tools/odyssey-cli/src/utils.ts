import { spawn } from "node:child_process";
import { access } from "node:fs/promises";

export type LogOptions = {
  newLineAfter?: boolean;
  newLineBefore?: boolean;
};

export const getLogger = (logPrefix: string) => {
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

  const success = (message: string, options?: LogOptions) =>
    logHandler(console.log, ["✅", message], options);

  const warn = (message: string, options?: LogOptions) =>
    logHandler(console.warn, ["⚠️ ", message], options);

  const info = (message: string, options?: LogOptions) =>
    logHandler(console.info, ["✨", message], options);

  const error = (message: string, options?: LogOptions) => {
    // We merge options to keep the original behavior (newline after)
    // as a default, but allow the user to override it.
    const finalOptions = { newLineAfter: true, ...options };
    logHandler(console.error, ["❗️❗️", message], finalOptions);
  };

  return {
    error,
    generationStart: (fileName: string, options?: LogOptions) =>
      logHandler(console.log, ["⏳", `Generating ${fileName}...`], options),
    generationSuccess: (filePath: string, options?: LogOptions) =>
      success(`Successfully generated ${filePath}`, options),
    info,
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
