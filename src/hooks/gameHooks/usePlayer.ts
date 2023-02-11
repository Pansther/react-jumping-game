import { useEffect } from "react";
import { usePrevious } from "react-use";

import {
  GRAVITY_SPEED,
  UPDATE_INTERVAL_TIME,
} from "../../component/Game/const";

import { useGameContext } from "../../context/gameContext";

const usePlayer = () => {
  const [{ player, canvas, game }, { setPlayer }] = useGameContext();

  const prevPlayer = usePrevious(player);

  const drawPlayer = () => {
    canvas!.fillStyle = "red";
    canvas?.clearRect(60, prevPlayer?.position.y ?? 0, 60, 60);
    canvas?.fillRect(60, player.position.y, 60, 60);
  };

  /// check gravity.
  useEffect(() => {
    if (game.state === "pause") return;

    const setGravity = () => {
      setPlayer((prev) => ({
        position: { ...prev.position, y: prev.position.y + GRAVITY_SPEED },
      }));
    };

    const gravityInterval = setInterval(setGravity, UPDATE_INTERVAL_TIME);

    if (!player.isOnPlatform) {
      return () => clearInterval(gravityInterval);
    }

    clearInterval(gravityInterval);
  }, [game.state, player.isOnPlatform]);

  /// check player jumping.
  useEffect(() => {
    if (game.state === "pause") return;

    if (!player.isJumping) return;

    const jumping = () => {
      setPlayer((prev) => ({
        position: { ...prev.position, y: prev.position.y - GRAVITY_SPEED },
      }));
    };

    const jumpingInterVal = setInterval(jumping, UPDATE_INTERVAL_TIME);

    return () => clearInterval(jumpingInterVal);
  }, [game.state, player.isJumping]);

  /// check player position.
  useEffect(() => {
    if (!canvas) return;
    if (!game.isStart) return;

    if (!player.isJumping) {
      setPlayer({ isOnPlatform: player.position.y >= 340 });
    } else {
      setPlayer({ isJumping: player.position.y >= 160 });
    }

    drawPlayer();
  }, [canvas, player.position, player.isJumping]);
};

export default usePlayer;
