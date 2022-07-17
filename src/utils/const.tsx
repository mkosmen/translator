export const LanguageText = {
  en: 'İngilizce',
  tr: 'Türkçe',
};

export type Languages = keyof typeof LanguageText;

export const getLanguageText = (text: Languages) => LanguageText[text];
