import React from "react";

import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "shared/types";

import { BallColor } from "../config";

import { Ball } from "./ball";

type TubeProps = {
  tube: {
    balls: Array<BallColor>;
    over: BallColor | null;
    complete: boolean;
  };
  position: number;
  onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
};

export const Tube: React.FC<TubeProps> = ({ tube, position, onClick }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.tube_holder}
      onClick={onClick}
      data-position={position}
    >
      <div className={classes.tube_top}>
        {tube.over !== null ? <Ball ball={tube.over} /> : null}
      </div>
      <div className={classes.tubes_glass} data-complete={tube.complete}>
        {tube.balls.map((color, index) => (
          <Ball key={index} ball={color} />
        ))}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tube_holder: {
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
    },
    tube_top: {
      display: "flex",
      height: "3rem",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "4px solid lightgray",
    },
    tubes_glass: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      flexShrink: 0,
      alignItems: "center",
      border: "2px solid lightgray",
      borderTop: "none",
      width: "3rem",
      height: "10rem",
      paddingBottom: "0.4rem",
      paddingTop: "0.4rem",
      "border-bottom-left-radius": "2.4rem",
      "border-bottom-right-radius": "2.4rem",
      '&[data-complete="true"]': {
        backgroundColor: "lightgray",
      },
    },
  })
);
