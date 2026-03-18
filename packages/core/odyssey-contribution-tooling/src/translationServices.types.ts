export const defaultSupportedLanguages = [
  "cs", // Czech
  "da", // Danish
  "de", // German
  "el", // Greek
  "en", // English
  "es", // Spanish
  "eu", // Euskara
  "fi", // Finnish
  "fr", // French
  "ht", // Haitian Creole
  "hu", // Hungarian
  "id", // Indonesian
  "it", // Italian
  "ja", // Japanese
  "ko", // Korean
  "ms", // Malaysian
  "nb", // Norwegian
  "nl_NL", // Dutch
  "ok_PL", // (Test Language) Pseudo-loc
  "ok_SK", // (Test Language) Show Keys
  "pl", // Polish
  "pt_BR", // Portuguese (Brazil)
  "ro", // Romanian
  "ru", // Russian
  "sv", // Swedish
  "th", // Thai
  "tr", // Turkish
  "uk", // Ukrainian
  "vi", // Vietnamese
  "zh_CN", // Chinese (PRC)
  "zh_TW", // Chinese
] as const;

export type DefaultSupportedLanguages =
  (typeof defaultSupportedLanguages)[number];
