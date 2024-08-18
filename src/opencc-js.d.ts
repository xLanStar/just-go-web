declare module 'opencc-js' {
  interface OpenCCConverterOptions {
      from: string;
      to: string;
  }

  type OpenCCConverter = (text: string) => string;

  export function Converter(options: OpenCCConverterOptions): OpenCCConverter;
}
