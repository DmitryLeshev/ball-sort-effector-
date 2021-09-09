import React, { ReactElement } from "react";
import {
  Button,
  ButtonProps,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { Theme } from "shared/types";

interface Props extends ButtonProps {}

export default (props: Props): ReactElement => {
  const classes = useStyles();
  return (
    <Button className={classes.btn} variant="outlined" size="small" {...props}>
      {props.children}
    </Button>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {},
  })
);
