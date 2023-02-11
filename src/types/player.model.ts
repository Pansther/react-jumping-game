import type { PositionType } from "./utils.model";

export interface PlayerStateType {
  isJumping: boolean;
  isOnPlatform: boolean;
  position: PositionType;
}

export const DefaultPlayerState = {
  isJumping: false,
  isOnPlatform: false,
  position: { x: 60, y: 0 },
};