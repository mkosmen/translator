import 'react-native';
import {translate} from '@utils/translate';

it('renders correctly', async () => {
  const result = await translate({
    sentence: 'Merhaba',
    source: 'tr',
    target: 'en',
  });

  return result === null;
});
