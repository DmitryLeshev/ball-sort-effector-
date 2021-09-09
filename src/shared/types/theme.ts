import { Theme as MuTheme } from "@material-ui/core";

export type Theme = MuTheme & {
  drawer: {
    closeWidth: number;
    openWidth: number;
    transition: string;
  };
  header: {
    height: number;
  };
};

export enum ThemeTypes {
  DARK = "dark",
  LIGHT = "light",
}
export type ThemeType = ThemeTypes.DARK | ThemeTypes.LIGHT;

export type ThemeInitialState = {
  type: ThemeType;
  primary: string;
  secondary: string;
};

export type ThemeCreate = {
  type: ThemeType;
  primary: string;
  secondary: string;
};
