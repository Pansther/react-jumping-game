import { useEffect, useRef, useState } from "react";
import { useKey, usePrevious, useSetState } from "react-use";

import "./App.css";
import styles from "./index.module.scss";

interface PlayerState {
  isJumping: boolean;
  isOnPlatform: boolean;
  position: { x: number; y: number };
}

const GRAVITY_SPEED = 2;
const UPDATE_INTERVAL_TIME = 4;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvas, setCanvas] = useState<CanvasRenderingContext2D | null>(null);
  const [player, setPlayer] = useSetState<PlayerState>({
    isJumping: false,
    isOnPlatform: false,
    position: { x: 0, y: 0 },
  });
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

  useEffect(() => {
    if (!canvasRef?.current) return;

    setCanvas(canvasRef?.current?.getContext("2d"));
  }, []);

  return (
    <div className="App">
      <canvas
        width={600}
        height={400}
        ref={canvasRef}
        className={styles.canvas}
      />
    </div>
  );
}

export default App;
