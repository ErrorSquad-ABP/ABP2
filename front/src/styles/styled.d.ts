// styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      background: string;
      text: {
        base: string;
        inverse: string;
      };
    };
    fonts: {
      body: string;
      size: {
        small: string;
        medium: string;
        large: string;
      };
      weight: {
        normal: number;
        bold: number;
      };
    };
    spacing: (factor: number) => string;
    borderRadius: string;
    shadows: {
      small: string;
      medium: string;
    };
  }
}
