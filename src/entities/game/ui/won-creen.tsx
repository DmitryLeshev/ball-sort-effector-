import React from "react";

import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "shared/types";

import { Atom, Molec } from "shared/ui";

export const WonScreen: React.FC<{ moves: number; action: () => void }> = ({
  moves,
  action,
}) => {
  const classes = useStyles();

  return (
    <Atom.Backdrop open={true}>
      <Molec.Card
        className={classes.won_screen}
        header={<Atom.Typography>You won!</Atom.Typography>}
        body={<Atom.Typography>In {moves} moves</Atom.Typography>}
        footer={
          <Atom.Button className={classes.btn} onClick={action}>
            New Game
          </Atom.Button>
        }
      />
    </Atom.Backdrop>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    won_screen: { minWidth: 400 },
    btn: { marginLeft: "auto" },
  })
);
