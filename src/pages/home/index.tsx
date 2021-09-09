import React from "react";

import { RouteChildrenProps } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { reflect } from "@effector/reflect";

import { model } from "entities/game";

import { Theme } from "shared/types";
import { Molec, Atom } from "shared/ui";

type Props = RouteChildrenProps<{}> & {
  startClicked: () => void;
};

const View = ({ match, startClicked }: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Molec.Page className={classes.page} title={t("pages:login.title")}>
      <Atom.Typography className={classes.title}>
        <span>BALL</span> SORT
      </Atom.Typography>
      <Atom.Button onClick={startClicked}>Start game</Atom.Button>
    </Molec.Page>
  );
};

const HomePage = reflect({
  view: View,
  bind: { startClicked: model.events.startClicked },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 1,
    },
    title: { marginBottom: theme.spacing(2) },
  })
);

export default HomePage;
