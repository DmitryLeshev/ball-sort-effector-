import React from "react";
import {
  createTheme as createThemeBase,
  Theme as ThemeBase,
} from "@material-ui/core/styles";
import { ThemeCreate, ThemeTypes } from "shared/types";
import { theme } from "shared/config";

const { typography, background, drawer, header } = theme;

export function createTheme({ type, primary, secondary }: ThemeCreate) {
  const bg = type === ThemeTypes.DARK ? background.dark : background.light;
  return createThemeBase(
    {
      typography,
      palette: {
        type,
        primary: {
          main: primary,
        },
        secondary: {
          main: secondary,
        },
        background: bg,
      },
    },
    { drawer, header }
  );
}

export function useTheme({ type, primary, secondary }: ThemeCreate) {
  const [theme, setTheme] = React.useState<ThemeBase>();
  const changeTheme = React.useMemo(() => {
    const newTheme = createTheme({ type, primary, secondary });
    setTheme(newTheme);
  }, []);
  return { theme, changeTheme };
}
