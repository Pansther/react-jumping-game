import random from "lodash/random";

export const boolRandom = (): boolean => {
  return Math.random() > 0.5;
};

export const randomObstacleType = () => {
  return random(0, 1);
};

export const randomObstacleEffect = () => {
  return random(0, 3);
};
