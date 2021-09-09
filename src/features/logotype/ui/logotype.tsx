import React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core";
import { Theme } from "shared/types";
import { Icon } from "shared/assets";
import clsx from "clsx";

type Props = {
  className?: string;
  href?: string;
};

export const Logotype = ({ className, href }: Props) => {
  const classes = useStyles();
  if (!href) {
    return (
      <h3 className={clsx(classes.logotype, className)}>
        <Icon.Logotype.SvgLogo />
      </h3>
    );
  }
  return (
    <Link to={href} className={clsx(classes.logotype, className)}>
      <Icon.Logotype.SvgLogo />
    </Link>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logotype: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: 0,
      padding: 0,
    },
  })
);
