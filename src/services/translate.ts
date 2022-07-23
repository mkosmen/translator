import {Languages} from '../utils/const';

export interface SourceAndTargetProps {
  source: Languages;
  target: Languages;
}
export interface TranslateProps extends SourceAndTargetProps {
  q: string;
}

export const translate = async (props: TranslateProps) => {
  try {
    const response = await (
      await fetch('https://translate.argosopentech.com/translate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      })
    ).json();

    return response.translatedText;
  } catch (errors) {
    return null;
  }
};
