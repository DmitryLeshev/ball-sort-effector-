import React, { ReactElement } from "react";
import {
  createStyles,
  CircularProgress,
  CircularProgressProps,
  makeStyles,
} from "@material-ui/core";
import { Theme } from "shared/types";

interface Props extends CircularProgressProps {}

export default function UICircle(props: Props): ReactElement {
  const classes = useStyles();
  return <CircularProgress className={classes.circl} {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    circl: {},
  })
);
