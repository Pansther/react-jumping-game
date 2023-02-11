import {
  randomObstacleType,
  randomObstacleEffect,
} from "../component/Game/utils";
import type { PositionType } from "./utils.model";

export enum ObstacleType {
  plain,
  fly,
}

export enum ObstacleEffectType {
  plain,
  reverse,
  bordered,
  swap,
}

export interface ObstacleStateType {
  speed: number;
  type: ObstacleType;
  position: PositionType;
  effect: ObstacleEffectType;
}

export const DefaultObstacleState = {
  speed: 2,
  type: randomObstacleType(),
  position: { x: 1000, y: 340 },
  effect: randomObstacleEffect(),
};
