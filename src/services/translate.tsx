import {Languages} from '../utils/const';

interface TranslateProps {
  q: string;
  source: Languages;
  target: Languages;
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
          q: props.q,
          source: props.source,
          target: props.target,
        }),
      })
    ).json();

    return response.translatedText;
  } catch (errors) {
    return null;
  }
};
