import { useState } from "react";
import Board from "./Components/Board";
import History from "./Components/History";

import "./app.scss";
import { calculateWinner } from "./winner";
import StatusMessage from "./Components/StatusMessage";
const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: randomBool() }];
function randomBool() {
  return Math.random() >= 0.5;
}
function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);
  const noMovesLeft = gamingBoard.squares.every(
    (squareValue) => squareValue !== null
  );

  const handleSquareClick = (position) => {
    if (gamingBoard.squares[position] || winner) return;
    setHistory((currentHistory) => {
      const isTraversing = currentMove + 1 !== currentHistory.length;
      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];
      const nextSquaresState = lastGamingState.squares.map(
        (squareValue, idx) => {
          if (position === idx) return lastGamingState.isXNext ? "X" : "0";
          return squareValue;
        }
      );
      return [
        ...currentHistory.slice(0, currentMove + 1),
        { squares: nextSquaresState, isXNext: !lastGamingState.isXNext },
      ];
    });

    setCurrentMove((c) => c + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  };
  const newGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <StatusMessage
        isXNext={gamingBoard.isXNext}
        winner={winner}
        noMovesLeft={noMovesLeft}
      />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        className={`btn-reset ${winner ? "active" : ""}`}
        onClick={() => newGame()}
      >
        Start new Game
      </button>{" "}
      <h3 style={{ fontWeight: "normal" }}>Current game history</h3>
      <History history={history} currentMove={currentMove} moveTo={moveTo} />
    </div>
  );
}

export default App;
