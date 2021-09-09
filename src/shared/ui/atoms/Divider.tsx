import React, { ReactElement } from "react";
import {
  createStyles,
  Divider,
  DividerProps,
  makeStyles,
} from "@material-ui/core";
import { Theme } from "shared/types";

interface Props extends DividerProps {}

export default function UIDivider(props: Props): ReactElement {
  const classes = useStyles();
  return <Divider className={classes.divider} {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: { backgroundColor: theme.palette.background.default },
  })
);
