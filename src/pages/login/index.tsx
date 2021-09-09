import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { reflect } from "@effector/reflect";

import { model, UI } from "entities/viewer";
import { UI as UILogo } from "features/logotype";

import { Theme } from "shared/types";
import { Molec } from "shared/ui";
import { useInput } from "shared/hooks";

type Props = RouteChildrenProps<{}> & {
  isLoading: boolean;
};

const View = ({ match, isLoading }: Props) => {
  const { t } = useTranslation();

  const classes = useStyles();
  const login = useInput("");
  const password = useInput("");

  async function logIn() {
    console.log("Login");
  }

  console.log("[Page] login", { isLoading });
  return (
    <Molec.Page className={classes.page} title={t("pages:login.title")}>
      <UILogo.Logotype className={classes.logotype} />
      <form className={classes.form} autoComplete="on">
        <UI.InputLogin {...login} />
        <UI.InputPassword {...password} />
        <UI.ButtonLogin isLoading={isLoading} action={logIn} />
      </form>
    </Molec.Page>
  );
};

const LoginPage = reflect({
  view: View,
  bind: {},
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      position: "relative",
    },
    logotype: {
      position: "absolute",
      top: "-80%",
      right: "50%",
      transform: "translateX(50%)",
    },
    form: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3),
      minWidth: 320,
    },
  })
);

export default LoginPage;
