import usePlayer from "./usePlayer";
import GameCanvas from "./Canvas";
import GameProvider from "../../context/gameContext";

const GameComponent = () => {
  usePlayer();

  return (
    <div>
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
