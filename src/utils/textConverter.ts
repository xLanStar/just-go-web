import { Converter } from 'opencc-js';

export const convertToTraditional = (text: string): string => {
  const converter = Converter({ from: 'cn', to: 'tw' });
  return converter(text);
}
