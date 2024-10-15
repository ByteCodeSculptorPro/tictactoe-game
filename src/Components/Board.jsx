import Square from "./Square";

export default function Board({ squares, handleSquareClick, winningSquares }) {
  const renderSquare = (clickedPosition) => {
    const isWinningSquare = winningSquares.includes(clickedPosition);
    return (
      <>
        <Square
          value={squares[clickedPosition]}
          onClick={() => handleSquareClick(clickedPosition)}
          isWinningSquare={isWinningSquare}
        />
      </>
    );
  };
  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
