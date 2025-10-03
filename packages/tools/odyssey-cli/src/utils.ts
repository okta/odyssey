export const getLogger = (logPrefix: string) => {
  const success = (message: string) =>
    console.log(`[${logPrefix}] ✅ ${message}`);

  return {
    error: (message: string) =>
      console.error(`[${logPrefix}]❗️❗️ ${message}\n`),
    generationStart: (fileName: string) =>
      console.log(`[${logPrefix}] ⏳ Generating ${fileName}...`),
    generationSuccess: (filePath: string) =>
      success(`Successfully generated ${filePath}`),
    info: (message: string) => console.info(`\n[${logPrefix}] ✨ ${message}\n`),
    success,
  };
};
