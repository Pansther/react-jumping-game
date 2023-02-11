import { createContext, useContext, useState } from "react";
import { useSetState } from "react-use";

import {
  DefaultPlayerState,
  type PlayerStateType,
} from "../types/player.model";
import {
  DefaultObstacleState,
  type ObstacleStateType,
} from "../types/obstacle.model";
import type { CanvasType } from "../types/canvas.model";
import type { SetStateType } from "../types/utils.model";
import { type GameStateType, DefaultGameState } from "../types/game.model";

export type CanvasStateType = [
  {
    canvas: CanvasType;
    game: GameStateType;
    player: PlayerStateType;
    obstacle: ObstacleStateType;
  },
  {
    setCanvas: (state: CanvasType) => void;
    setGame: SetStateType<GameStateType>;
    setPlayer: SetStateType<PlayerStateType>;
    setObstacle: SetStateType<ObstacleStateType>;
  }
];

export const GameContext = createContext<CanvasStateType>([
  {},
  {},
] as CanvasStateType);

export const useGameContext = () => useContext(GameContext);

export interface UseCanvasProps {
  children?: React.ReactElement;
}

const GameProvider = ({ children }: UseCanvasProps) => {
  const [canvas, setCanvas] = useState<CanvasType>(null);
  const [game, setGame] = useSetState<GameStateType>(DefaultGameState);
  const [player, setPlayer] = useSetState<PlayerStateType>(DefaultPlayerState);
  const [obstacle, setObstacle] =
    useSetState<ObstacleStateType>(DefaultObstacleState);

  return (
    <GameContext.Provider
      value={[
        { game, player, canvas, obstacle },
        { setGame, setCanvas, setPlayer, setObstacle },
      ]}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
