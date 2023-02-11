import { useCallback, useEffect } from "react";

import { useGameContext } from "../../context/gameContext";

import { ObstacleType } from "../../types/obstacle.model";
import type { PositionType } from "../../types/utils.model";

const useCondition = () => {
  const [{ player, obstacle, game }, { setGame }] = useGameContext();

  const checkCollision = useCallback(
    (
      playerPosition: PositionType,
      obstaclePosition: PositionType,
      obstacleType: ObstacleType
    ) => {
      switch (obstacleType) {
        case ObstacleType.fly:
          if (
            playerPosition.y <= 220 &&
            obstaclePosition.x > 30 &&
            obstaclePosition.x <= 120
          ) {
            setGame({ state: "pause", isEnding: true });
          }
          break;
        case ObstacleType.plain:
        default:
          if (
            playerPosition.y > 280 &&
            obstaclePosition.x > 30 &&
            obstaclePosition.x <= 120
          ) {
            setGame({ state: "pause", isEnding: true });
          }
          break;
      }
    },
    []
  );

  useEffect(() => {
    if (game.state === "pause") return;

    checkCollision(player.position, obstacle.position, obstacle.type);
  }, [game.state, player.position, obstacle.position, obstacle.type]);
};

export default useCondition;
