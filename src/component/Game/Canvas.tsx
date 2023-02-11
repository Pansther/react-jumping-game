import { useCallback, useEffect, useRef } from "react";
import cx from "clsx";

import { useGameContext } from "../../context/gameContext";

import styles from "./index.module.scss";

const getLabelText = (
  isStart: boolean,
  isEnding: boolean,
  isPause: boolean
) => {
  if (!isStart) return `PRESS "SPACE" TO START`;
  if (isEnding) return `PRESS "SPACE" TO RE-START`;
  if (isPause) return `PRESS "SPACE" TO CONTINUE`;
};

const GameCanvas = () => {
  const [
    {
      game: { isStart, isEnding, state, score },
    },
    { setCanvas },
  ] = useGameContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isPause = state === "pause";

  const setInitialCanvas = useCallback(() => {
    setCanvas(canvasRef?.current?.getContext("2d") ?? null);
  }, [canvasRef.current]);

  useEffect(() => {
    setInitialCanvas();
  }, []);

  return (
    <div className={styles.game_container}>
      <div
        className={cx(styles.label, {
          [styles.hidden]: isStart && !isEnding && !isPause,
        })}
      >
        {getLabelText(isStart, isEnding, isPause)}
      </div>
      <div className={styles.score}>{score}</div>
      <canvas
        width={600}
        height={400}
        ref={canvasRef}
        className={styles.canvas}
      />
    </div>
  );
};

export default GameCanvas;
