import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";

import { Link } from "react-router-dom";
import { env } from "shared/config";
import { Theme } from "shared/types";
import { Atom } from "shared/ui";

export const SiteNavigation = () => {
  const { APP } = env;

  const classes = useStyles();
  return (
    <nav className={classes.nav}>
      {/* <Atom.ListItem component={Link} className={classes.link} to={'/home'}> */}
      <Atom.ListItem className={classes.link}>Home</Atom.ListItem>
    </nav>
  );
};

export const SettingsNavigation = () => {
  const classes = useStyles();
  return (
    <nav className={classes.nav}>
      <Link className={classes.link} to={"/home"}>
        Home
      </Link>
    </nav>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nav: () => ({
      display: "flex",
      flexDirection: "column",
    }),
    link: {
      textDecoration: "none",
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
  })
);
