import React from "react";

import { RouteChildrenProps } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { reflect } from "@effector/reflect";
import { useList } from "effector-react";

import { model, UI } from "entities/game";

import { Theme } from "shared/types";
import { Molec, Atom } from "shared/ui";

type Props = RouteChildrenProps<{}> & {
  isWon: boolean;
  moves: number;
  toMainMenuClicked: () => void;
  restartClicked: () => void;
  tubeClicked: () => void;
};

const View = ({
  match,
  isWon,
  moves,
  toMainMenuClicked,
  restartClicked,
  tubeClicked,
}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const tubes = useList(
    model.stores.$field,
    ({ balls, over, complete }, index) => (
      <UI.Tube
        tube={{ balls, over, complete }}
        position={index}
        onClick={tubeClicked}
      />
    )
  );

  return (
    <Molec.Page className={classes.page} title={t("pages:game.title")}>
      <div className={classes.controller}>
        <Atom.IconButton onClick={toMainMenuClicked}>←</Atom.IconButton>
        <Atom.Button onClick={restartClicked}>Restart</Atom.Button>
        <UI.Moves moves={moves} />
      </div>
      <div className={classes.container}>{tubes}</div>
      {isWon && <UI.WonScreen moves={moves} />}
    </Molec.Page>
  );
};

const GamePage = reflect({
  view: View,
  bind: {
    isWon: model.stores.$state.map((state) => state === "won"),
    moves: model.stores.$moves.map((m) => m),
    toMainMenuClicked: model.events.toMainMenuClicked,
    restartClicked: model.events.restartClicked,
    tubeClicked: model.events.tubeClicked,
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      position: "relative",
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    controller: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: 200,
    },
  })
);

export default GamePage;
