import react, { useEffect, useMemo, useState } from "react";
import styles from "./board.module.scss";
import { data } from "../../data";
import { winningPattern } from "./board.constants";

const Board = (props) => {
  const [tilesData, setTilesData] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState("X");
  const [strike, setStrike] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    for (const { pattern, strikeClass } of winningPattern) {
      const tileVal1 = tilesData[pattern[0]];
      const tileVal2 = tilesData[pattern[1]];
      const tileVal3 = tilesData[pattern[2]];
      if (tileVal1 !== null && tileVal1 === tileVal2 && tileVal1 === tileVal3) {
        setStrike(strikeClass);
        setPlayerTurn(tileVal1);
      }
    }
    if (!tilesData.includes(null)) setGameOver(true);
  }, [tilesData]);

  const handleRestart = () => {
    setGameOver(false)
    setTilesData(Array(9).fill(null));
    setPlayerTurn("X");
    setStrike("");
  };

  const handleClick = (idx) => {
    if (tilesData[idx] === null) {
      let newTiles = [...tilesData];
      newTiles[idx] = playerTurn;
      setTilesData(newTiles);
      if (playerTurn === "X") setPlayerTurn("O");
      else setPlayerTurn("X");
    }
  };

  const renderTiles = useMemo(() => {
    return (
      <div className={styles.boardTiles}>
        {tilesData.map((data, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            className={styles.tile}
          >
            {data}
          </div>
        ))}
      </div>
    );
  }, [tilesData]);

  return (
    <div className={styles.container}>
      {gameOver ? (
        <div className={styles.gameOver}>Game Over</div>
      ) : (
        <div className={styles.boardContainer}>
          <div className={styles[strike]}></div>
          {renderTiles}
        </div>
      )}
      {strike ? (
        <div className={styles.win}>Congratulation !! {playerTurn} won 🎊</div>
      ) : (
        <div className={styles.playerTurn}>{playerTurn} turn</div>
      )}
      <button className={styles.restart} onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
};
export default Board;
