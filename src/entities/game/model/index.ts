import { MouseEvent } from "react";
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  guard,
  sample,
} from "effector";

import _ from "lodash";

import { BALLS_IN_TUBE, COLORS_IN_GAME, BallColor, Tube } from "../config";
import { getCountOfTubes, isComplete } from "../lib";

const startClicked = createEvent<MouseEvent<HTMLButtonElement>>();
const restartClicked = createEvent<MouseEvent<HTMLButtonElement>>();
const toMainMenuClicked = createEvent<MouseEvent<HTMLButtonElement>>();
const tubeClicked = createEvent<MouseEvent<HTMLDivElement>>();
const gameFinishedSuccessfylly = createEvent();

const tubeSelected = tubeClicked.map((event) =>
  Number(event.currentTarget.dataset.position)
);

const $state = createStore<"start" | "ingame" | "won">("start");
const $moves = createStore<number>(0);

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
      return { balls: leftBalls, over, complete: isComplete({ balls }) };
    });
  }
);

const $filledTubesCount = $field.map(
  (tubes) => tubes.filter(({ complete }) => complete).length
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

const tubeWillChange = sample({
  clock: tubeSelected,
  source: [$tubes, $currentSelectedTubeIndex],
  fn: ([tubes, currentIndex], selectedIndex) => ({
    tubes,
    currentIndex,
    selectedIndex,
  }),
});

const ballUplift = guard({
  source: tubeWillChange,
  filter: ({ tubes, currentIndex, selectedIndex }) => {
    return currentIndex === null && tubes[selectedIndex].balls.length !== 0;
  },
});

$currentSelectedTubeIndex.on(
  ballUplift,
  (_, { selectedIndex }) => selectedIndex
);

const ballDownliftBack = guard({
  source: tubeWillChange,
  filter: ({ currentIndex, selectedIndex }) => {
    return currentIndex === selectedIndex;
  },
});

$currentSelectedTubeIndex.on(ballDownliftBack, () => null);

const ballMoved = guard({
  source: tubeWillChange,
  filter: ({ tubes, currentIndex, selectedIndex }) => {
    if (currentIndex === null) return false;
    if (currentIndex === selectedIndex) return false;

    const targetTube = tubes[selectedIndex];
    if (targetTube.balls.length >= BALLS_IN_TUBE) return false;
    const sourceTube = tubes[currentIndex];

    const sourceBall = _.head(sourceTube.balls);
    const targetBall = _.head(targetTube.balls);

    const isTargetTubeEmpty = targetBall === undefined;

    return isTargetTubeEmpty ? true : targetBall === sourceBall;
  },
});

$tubes.on(ballMoved, (__, { tubes, currentIndex, selectedIndex }) => {
  const sourceTube = tubes[currentIndex ?? 0];
  const sourceBall = _.head(sourceTube.balls)!;

  return tubes.map((tube, idx) => {
    if (idx === currentIndex) return { balls: tube.balls.slice(1) };
    if (idx === selectedIndex) return { balls: [sourceBall, ...tube.balls] };
    return tube;
  });
});

$moves.on(ballMoved, (count) => count + 1);
$currentSelectedTubeIndex.on(ballMoved, () => null);

guard({
  source: $filledTubesCount,
  filter: (count) => count === COLORS_IN_GAME,
  target: gameFinishedSuccessfylly,
});

$state.on(gameFinishedSuccessfylly, () => "won");

$state.reset(toMainMenuClicked);
$moves.reset(toMainMenuClicked, restartClicked);
$currentSelectedTubeIndex.reset(restartClicked);

export const stores = { $state, $moves, $tubes, $field };
export const events = {
  startClicked,
  restartClicked,
  toMainMenuClicked,
  tubeClicked,
};
export const effects = {};
