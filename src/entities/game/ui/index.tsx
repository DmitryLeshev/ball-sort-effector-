import React from "react";

import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "shared/types";

import { BallColor } from "../model";
import { colors } from "../config";
import { Atom, Molec } from "shared/ui";

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

const Ball: React.FC<{ ball: BallColor }> = ({ children, ball }) => {
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

export const WonScreen: React.FC<{ moves: number }> = ({ moves }) => {
  const classes = useStyles();

  return (
    <Atom.Backdrop open={true}>
      <Molec.Card
        className={classes.won_screen}
        header={<Atom.Typography>You won!</Atom.Typography>}
        body={<Atom.Typography>In {moves} moves</Atom.Typography>}
        footer={<Atom.Button>Restart</Atom.Button>}
      />
    </Atom.Backdrop>
  );
};

export const Moves: React.FC<{ moves: number }> = ({ moves }) => {
  const classes = useStyles();

  return <span className={classes.moves}>Moves: {moves}</span>;
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
    won_screen: { minWidth: 400 },
    moves: {},
  })
);
