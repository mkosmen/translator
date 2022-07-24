import {Languages} from '@utils/const';

export type TranslationItem = {
  sentence: string;
  source: Languages;
  target: Languages;
};

export type SentenceItem = {
  rowid: number;
} & TranslationItem;
