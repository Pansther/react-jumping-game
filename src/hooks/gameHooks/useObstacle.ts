import { useEffect } from "react";
import { usePrevious } from "react-use";

import {
  boolRandom,
  randomObstacleType,
  randomObstacleEffect,
} from "../../component/Game/utils";
import { UPDATE_INTERVAL_TIME } from "../../component/Game/const";

import { useGameContext } from "../../context/gameContext";
import { ObstacleType, ObstacleEffectType } from "../../types/obstacle.model";

const ObstacleStyles: Record<ObstacleEffectType, string> = {
  "0": "black",
  "1": "blue",
  "2": "pink",
  "3": "limegreen",
};

const useObstacle = () => {
  const [{ obstacle, canvas, game }, { setObstacle, setGame }] =
    useGameContext();

  const prevObstacle = usePrevious(obstacle);

  const resetObstacle = () => {
    const type = randomObstacleType();
    const effect = randomObstacleEffect();
    const speed = boolRandom() ? 3 : 2;

    setGame(({ score }) => ({ score: score + 1 }));
    setObstacle((prev) => ({
      type,
      speed,
      effect,
      position: { ...prev.position, x: 600 + (boolRandom() ? 150 : 30) },
    }));
  };

  const drawObstacle = () => {
    const baseY = obstacle.type === ObstacleType.plain ? 340 : 160;

    canvas!.lineWidth = 0;
    canvas!.fillStyle = ObstacleStyles[obstacle.effect];

    if (obstacle.effect === ObstacleEffectType.bordered) {
      canvas!.lineWidth = 0.05;
      canvas?.clearRect(prevObstacle?.position.x ?? 540, baseY, 30, 60);
      canvas?.strokeRect(obstacle.position.x ?? 540, baseY + 1, 29, 58);
      return;
    }

    canvas?.clearRect(prevObstacle?.position.x ?? 540, baseY, 30, 60);
    canvas?.fillRect(obstacle.position.x ?? 540, baseY, 30, 60);
  };

  useEffect(() => {
    if (game.state === "pause") return;

    const updateObstacle = () => {
      setObstacle((prev) => ({
        position: { ...prev.position, x: prev.position.x - prev.speed },
      }));
    };

    const updateObstacleInterVal = setInterval(
      updateObstacle,
      UPDATE_INTERVAL_TIME
    );

    return () => clearInterval(updateObstacleInterVal);
  }, [game.state]);

  /// check obstacle effect.
  useEffect(() => {
    if (
      obstacle.effect === ObstacleEffectType.reverse &&
      obstacle.position.x <= 270
    ) {
      setObstacle(({ position }) => ({
        effect: randomObstacleEffect(),
        position: { ...position, x: 480 },
      }));
    }

    if (
      obstacle.effect === ObstacleEffectType.swap &&
      obstacle.position.x <= 270
    ) {
      setTimeout(() => {
        canvas?.clearRect(160, 0, 400, 400);
      }, 0);
      setObstacle(({ type, position }) => ({
        effect: randomObstacleEffect(),
        position: { ...position, x: 480 },
        type:
          type === ObstacleType.plain ? ObstacleType.fly : ObstacleType.plain,
      }));
    }
  }, [obstacle.effect, obstacle.position]);

  /// check obstacle position.
  useEffect(() => {
    if (!canvas) return;

    if (obstacle.position.x <= -90) {
      resetObstacle();
    }

    drawObstacle();
  }, [canvas, obstacle.position]);
};

export default useObstacle;
