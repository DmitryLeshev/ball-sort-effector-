import React from "react";

import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "shared/types";

export const Moves: React.FC<{ moves: number }> = ({ moves }) => {
  const classes = useStyles();

  return <span className={classes.moves}>Moves: {moves}</span>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    moves: {},
  })
);
