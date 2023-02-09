import { createContext, useContext, useState } from "react";
import { useSetState } from "react-use";

export type CanvasType = CanvasRenderingContext2D | null;

export interface PlayerStateType {
  isJumping: boolean;
  isOnPlatform: boolean;
  position: { x: number; y: number };
}

export type CanvasStateType = [
  { player: PlayerStateType; canvas: CanvasType },
  {
    setPlayer: (
      state:
        | Partial<PlayerStateType>
        | ((prev: PlayerStateType) => Partial<PlayerStateType>)
    ) => void;
    setCanvas: (state: CanvasType) => void;
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
  const [player, setPlayer] = useSetState<PlayerStateType>({
    isJumping: false,
    isOnPlatform: false,
    position: { x: 0, y: 0 },
  });

  return (
    <GameContext.Provider
      value={[
        { player, canvas },
        { setCanvas, setPlayer },
      ]}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
