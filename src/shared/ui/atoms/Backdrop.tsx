import React, { ReactElement } from "react";
import { Backdrop, createStyles, makeStyles } from "@material-ui/core";
import { Theme } from "shared/types";
import clsx from "clsx";

interface Props {
  open: boolean;
  children?: React.ReactElement;
  handleClose?: () => void;
  className?: string;
}

export default ({
  children,
  handleClose,
  open,
  className,
}: Props): ReactElement => {
  const classes = useStyles();
  return (
    <Backdrop
      className={clsx(classes.backdrop, className)}
      open={open}
      onClick={handleClose}
    >
      {children}
    </Backdrop>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: { zIndex: 10000 },
  })
);
