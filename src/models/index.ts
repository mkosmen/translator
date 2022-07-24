export type TranslationItem = {
  sentence: string;
  source: string;
  target: string;
};

export type SentenceItem = {
  rowid: number;
} & TranslationItem;
