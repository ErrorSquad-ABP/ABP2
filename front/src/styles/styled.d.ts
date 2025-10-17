// styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    /** 
     * Define o modo de cor ativo do tema 
     * (útil para componentes que mudam aparência dinamicamente)
     */
    mode: "light" | "dark";

    colors: {
      primary: string;
      primaryDark: string;
      background: string;
      text: {
        default: string;
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
