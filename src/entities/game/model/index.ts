import { MouseEvent } from "react";
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

import _ from "lodash";

export interface Tube {
  balls: BallColor[];
}

const startClicked = createEvent<MouseEvent<HTMLButtonElement>>();
const restartClicked = createEvent<MouseEvent<HTMLButtonElement>>();
const toMainMenuClicked = createEvent<MouseEvent<HTMLButtonElement>>();
const tubeClicked = createEvent<MouseEvent<HTMLDivElement>>();

const tubeSelected = tubeClicked.map((event) =>
  Number(event.currentTarget.dataset.position)
);

export type BallColor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const COLORS_IN_GAME = 4;
const BALLS_IN_TUBE = 4;
const getCountOfTubes = (colors: number) => colors + 2; // magic

const $state = createStore<"start" | "ingame" | "won">("start");
const $moves = createStore(0);

const $tubes = createStore<Tube[]>([]);
const $currentSelectedTubeIndex = createStore<number | null>(null);

const $field = combine(
  $tubes,
  $currentSelectedTubeIndex,
  (tubes, selectedTubeIdx) => {
    return tubes.map(({ balls }, idx) => {
      const isCurrent = selectedTubeIdx === idx;
      const over = isCurrent ? _.head(balls) ?? null : null;
      const leftBalls = isCurrent ? balls.slice(1) : balls;
      return { balls: leftBalls, over };
    });
  }
);

const generateTubesFx = createEffect<{ colorsCount: number }, Tube[]>();

$state.on(startClicked, () => "ingame");

sample({
  clock: [startClicked, restartClicked],
  fn: () => ({ colorsCount: COLORS_IN_GAME }),
  target: generateTubesFx,
});

generateTubesFx.use(({ colorsCount }) => {
  const tubesCount = getCountOfTubes(colorsCount);
  const availableColors = _.shuffle(
    Array.from(
      { length: BALLS_IN_TUBE * colorsCount },
      (_, index) => (index % BALLS_IN_TUBE) as BallColor
    )
  );

  return Array.from({ length: tubesCount }, (_, index) => {
    if (index >= colorsCount) return { balls: [] };
    return {
      balls: Array.from({ length: BALLS_IN_TUBE }).map(
        () => availableColors.pop() ?? 0
      ),
    };
  });
});

$tubes.on(generateTubesFx.doneData, (_, tubes) => tubes);

sample({
  clock: tubeSelected,
  source: [$tubes, $currentSelectedTubeIndex],
  fn: ([tube, currentTubeIndex], tubeClicked) => {
    return tubeClicked;
  },
  target: $currentSelectedTubeIndex,
});

$state.reset(toMainMenuClicked);

export const stores = { $state, $moves, $tubes, $field };
export const events = {
  startClicked,
  restartClicked,
  toMainMenuClicked,
  tubeClicked,
};
export const effects = {};
