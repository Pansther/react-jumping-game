import { useEffect } from "react";
import { useKey, usePrevious } from "react-use";

import { useGameContext } from "../../context/gameContext";

import { GRAVITY_SPEED, UPDATE_INTERVAL_TIME } from "./const";

const usePlayer = () => {
  const [{ player, canvas }, { setPlayer }] = useGameContext();

  const prevPlayer = usePrevious(player);

  const drawPlayer = () => {
    canvas!.fillStyle = "red";
    canvas?.clearRect(60, prevPlayer?.position.y ?? 0, 60, 60);
    canvas?.fillRect(60, player.position.y, 60, 60);
  };

  const setGravity = () => {
    setPlayer((prev) => ({
      position: { ...prev.position, y: prev.position.y + GRAVITY_SPEED },
    }));
  };

  useKey("ArrowUp", () => {
    setPlayer((prev) => {
      if (prev.isJumping || !prev.isOnPlatform) return prev;
      return { isJumping: true };
    });
  });

  useEffect(() => {
    const gravityInterval = setInterval(setGravity, UPDATE_INTERVAL_TIME);

    if (!player.isOnPlatform) {
      return () => clearInterval(gravityInterval);
    }

    clearInterval(gravityInterval);
  }, [player.isOnPlatform]);

  useEffect(() => {
    if (!player.isJumping) return;

    const jumping = () => {
      setPlayer((prev) => ({
        position: { ...prev.position, y: prev.position.y - GRAVITY_SPEED },
      }));
    };

    const jumpingInterVal = setInterval(jumping, UPDATE_INTERVAL_TIME);

    return () => clearInterval(jumpingInterVal);
  }, [player.isJumping]);

  useEffect(() => {
    if (!canvas) return;

    if (!player.isJumping) {
      setPlayer({ isOnPlatform: player.position.y >= 340 });
    } else {
      setPlayer({ isJumping: player.position.y >= 160 });
    }

    drawPlayer();
  }, [canvas, player.position, player.isJumping]);
};

export default usePlayer;
