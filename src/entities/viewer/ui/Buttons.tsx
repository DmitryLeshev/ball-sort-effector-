import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Theme } from "shared/types";
import { Atom } from "shared/ui";

type ButtonLoginProps = {
  action: () => void;
  isLoading: boolean;
};

export const ButtonLogin = ({ action, isLoading }: ButtonLoginProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Atom.Button className={classes.btn} onClick={action} color="primary">
      {isLoading && (
        <Atom.CircularProgress
          className={classes.circle}
          size={16}
          color="secondary"
        />
      )}
      {t(`viewer:login`)}
    </Atom.Button>
  );
};

type ButtonLogoutProps = {
  action: () => void;
};

export const ButtonLogout = ({ action }: ButtonLogoutProps) => {
  const { t } = useTranslation();
  return <Atom.Button onClick={action}>{t(`viewer:logout`)}</Atom.Button>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      position: "relative",
      display: "flex",
      borderRadius: theme.spacing(2),
    },
    circle: { position: "absolute", right: theme.spacing(2) },
  })
);
