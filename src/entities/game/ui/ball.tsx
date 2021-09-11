import React from "react";

import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "shared/types";

import { colors, BallColor } from "../config";

export const Ball: React.FC<{ ball: BallColor }> = ({ children, ball }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.ball}
      style={
        {
          "--main-color": colors[ball][0],
          "--light-color": colors[ball][1],
        } as React.CSSProperties
      }
      data-number={ball}
    >
      {children}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ball: {
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      border: "2px solid black",
      margin: "1px",
      flexShrink: 0,
      background:
        "radial-gradient(circle at 65% 15%,white 1px,var(--light-color) 3%,var(--main-color) 60%,var(--light-color) 100%)",
      position: "relative",
      "&::after": {
        content: "'' attr(data-number) ''",
        position: "absolute",
        top: "6px",
        left: "10px",
        color: "white",
        textShadow: "0 0 1px black",
        display: "none",
      },
    },
  })
);
