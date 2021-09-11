import { BALLS_IN_TUBE, Tube } from "../config";

export function getCountOfTubes(colors: number) {
  return colors + 2; // magic
}
export function isComplete({ balls }: Pick<Tube, "balls">): boolean {
  if (balls.length < BALLS_IN_TUBE) return false;
  const firstBall = balls[0];
  return balls.every((ball) => ball === firstBall);
}
