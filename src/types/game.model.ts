export interface GameStateType {
  score: number;
  isStart: boolean;
  isEnding: boolean;
  state: "pause" | "playing";
}

export const DefaultGameState: GameStateType = {
  score: 0,
  state: "pause",
  isStart: false,
  isEnding: false,
};
