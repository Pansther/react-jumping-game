import { useKey } from "react-use";

import { useGameContext } from "../../context/gameContext";

import { DefaultGameState } from "../../types/game.model";
import { DefaultPlayerState } from "../../types/player.model";
import { DefaultObstacleState } from "../../types/obstacle.model";

const useKeyboard = () => {
  const [{ canvas }, { setGame, setPlayer, setObstacle }] = useGameContext();

  const resetGameState = () => {
    canvas?.clearRect(0, 0, 600, 400);
    setPlayer(DefaultPlayerState);
    setObstacle(DefaultObstacleState);
    setGame({ ...DefaultGameState, isStart: true, state: "playing" });
  };

  useKey("ArrowUp", () => {
    setPlayer((prev) => {
      if (prev.isJumping || !prev.isOnPlatform) return prev;
      return { isJumping: true };
    });
  });

  useKey(
    " ",
    () => {
      setGame((prev) => {
        if (prev.isEnding) {
          resetGameState();
        }

        if (!prev.isStart) {
          return {
            isStart: true,
            state: "playing",
          };
        }

        if (prev.isStart) {
          return {
            state: prev.state === "pause" ? "playing" : "pause",
          };
        }

        return prev;
      });
    },
    {},
    [canvas]
  );
};

export default useKeyboard;
