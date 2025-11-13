export const getLogger = (logPrefix: string) => {
  const success = (message: string) =>
    console.log(`[${logPrefix}] ✅ ${message}`);

  const warn = (message: string) =>
    console.warn(`[${logPrefix}] ⚠️  ${message}`);

  const info = (message: string) =>
    console.info(`[${logPrefix}] ✨ ${message}`);

  const error = (message: string) =>
    console.error(`[${logPrefix}]❗️❗️ ${message}\n`);

  return {
    error,
    generationStart: (fileName: string) =>
      console.log(`[${logPrefix}] ⏳ Generating ${fileName}...`),
    generationSuccess: (filePath: string) =>
      success(`Successfully generated ${filePath}`),
    info,
    warn,
    success,
  };
};
