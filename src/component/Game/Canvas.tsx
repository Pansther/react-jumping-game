import React, { useEffect, useRef } from "react";

import { useGameContext } from "../../context/gameContext";

import styles from "./index.module.scss";

const GameCanvas = () => {
  const [, { setCanvas }] = useGameContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef?.current) return;

    setCanvas(canvasRef?.current?.getContext("2d"));
  }, []);

  return (
    <canvas
      width={600}
      height={400}
      ref={canvasRef}
      className={styles.canvas}
    />
  );
};

export default GameCanvas;
