import GameCanvas from "./Canvas";

import {
  usePlayer,
  useObstacle,
  useKeyboard,
  useCondition,
} from "../../hooks/gameHooks";
import GameProvider from "../../context/gameContext";

import styles from "./index.module.scss";

const GameComponent = () => {
  usePlayer();
  useObstacle();
  useKeyboard();
  useCondition();

  return (
    <div className={styles.container}>
      <GameCanvas />
    </div>
  );
};

const MainGame = () => {
  return (
    <GameProvider>
      <GameComponent />
    </GameProvider>
  );
};

export default MainGame;
