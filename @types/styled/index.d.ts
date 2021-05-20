import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    listWidth: number;
    colors: {
      primary: string;
      secondary: string;
      highlight: string;
      background: string;
    };
    offerColors: Array<number[]>;
    zIndices: {
      modal: number;
    };
    shadows: {
      modal: string;
    };
  }
}
