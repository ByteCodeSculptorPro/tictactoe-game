export default function StatusMessage({ isXNext, noMovesLeft, winner }) {
  const nextPlayer = isXNext ? "X" : "0";

  const renderStatusMessage = () => {
    if (winner) {
      return (
        <>
          Winner is{" "}
          <span className={winner === "X" ? "text-green" : "text-orange"}>
            {winner}
          </span>
        </>
      );
    }

    if (!winner && noMovesLeft) {
      return (
        <>
          <span className="text-green">X </span>and
          <span className="text-orange"> 0</span> tied
        </>
      );
    }

    if (!winner && !noMovesLeft) {
      return (
        <>
          Next player is{" "}
          <span className={isXNext ? "text-green" : "text-orange"}>
            {nextPlayer}
          </span>
        </>
      );
    }
    return null;
  };
  return <h2 className="status-message">{renderStatusMessage()}</h2>;
}
