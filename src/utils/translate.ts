import {Languages} from './const';

export interface SourceAndTargetProps {
  source: Languages;
  target: Languages;
}
export interface TranslateProps extends SourceAndTargetProps {
  sentence: string;
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
        body: JSON.stringify({
          q: props.sentence,
          source: props.source,
          target: props.target,
        }),
      })
    ).json();

    return response.translatedText;
  } catch (errors) {
    console.log('translate error:', errors);

    return null;
  }
};
