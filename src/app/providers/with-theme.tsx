import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import { material } from "shared/lib";
import { theme } from "shared/config";
import { ThemeTypes } from "shared/types";

export const withTheme = (component: () => React.ReactNode) => () =>
  (
    <ThemeProvider
      theme={material.createTheme({
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        type: ThemeTypes.DARK,
      })}
    >
      <CssBaseline />
      {component()}
    </ThemeProvider>
  );
