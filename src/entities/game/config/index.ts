export type BallColor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export const colors: Record<BallColor, [string, string]> = {
  0: ["#8F7E22", "#FFE600"],
  1: ["#247516", "#70FF00"],
  2: ["#466799", "#00B2FF"],
  3: ["#29777C", "#00FFF0"],
  4: ["#17206F", "#4A72FF"],
  5: ["#BABABA", "#FFFFFF"],
  6: ["#4C3283", "#9D50FF"],
  7: ["#8B11C5", "#FF00F5"],
  8: ["#9D0D41", "#FF60B5"],
  9: ["#4B0000", "#FF0000"],
  10: ["#79480F", "#FF7A00"],
  11: ["#343434", "#B1B1B1"],
};

export interface Tube {
  balls: BallColor[];
}

export const COLORS_IN_GAME = 4;
export const BALLS_IN_TUBE = 4;
