import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [six, setSix] = useState("");
  const [seven, setSeven] = useState("");
  const [eight, setEight] = useState("");
  const [nine, setNine] = useState("");
  const [winner, setWinner] = useState(null);
  const [isXTurn, setIsXTurn] = useState(true);  

  function toggleBox(box, setBox) {
    if (box !== "" || winner) return; 
    setBox(isXTurn ? "X" : "O");
    setIsXTurn(!isXTurn);
  }

  function resetGame() {
    setOne(""); setTwo(""); setThree("");
    setFour(""); setFive(""); setSix("");
    setSeven(""); setEight(""); setNine("");
    setWinner(null);
    setIsXTurn(true);
  }

  useEffect(() => {
    const boxes = [one, two, three, four, five, six, seven, eight, nine];
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]           
    ];

    for (const [a, b, c] of winningCombinations) {
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        setWinner(boxes[a]);
        return;
      }
    }

    if (boxes.every(box => box)) {
      setWinner("Draw");
    }
  }, [one, two, three, four, five, six, seven, eight, nine]);

  const bgColor = winner === "X" ? "bg-red-400" : winner === "O" ? "bg-blue-400" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500";

  const boxStyle = (value) => `
    w-24 h-24 flex items-center justify-center 
    text-4xl font-bold cursor-pointer rounded-xl 
    hover:bg-gray-200 transition-all duration-300 
    ${value ? "border-4 border-black" : ""}
    ${value === "X" ? "text-red-600" : value === "O" ? "text-blue-600" : ""}
  `;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-700 ${bgColor}`}>
      <h1 className="text-4xl font-extrabold mb-6 text-white">Tic Tac Toe</h1>

      <div className="bg-white p-4 rounded-2xl shadow-2xl grid grid-cols-3 gap-3">
        <div className={`${boxStyle(one)} border-4 border-black`} onClick={() => toggleBox(one, setOne)}>{one}</div>

        <div className={`${boxStyle(two)} border-4 border-black`} onClick={() => toggleBox(two, setTwo)}>{two}</div>
        <div className={`${boxStyle(three)} border-4 border-black`} onClick={() => toggleBox(three, setThree)}>{three}</div>

        <div className={`${boxStyle(four)} border-4 border-black`} onClick={() => toggleBox(four, setFour)}>{four}</div>
        <div className={`${boxStyle(five)} border-4 border-black`} onClick={() => toggleBox(five, setFive)}>{five}</div>
        <div className={`${boxStyle(six)} border-4 border-black`} onClick={() => toggleBox(six, setSix)}>{six}</div>

        <div className={`${boxStyle(seven)} border-4 border-black`} onClick={() => toggleBox(seven, setSeven)}>{seven}</div>
        <div className={`${boxStyle(eight)} border-4 border-black`} onClick={() => toggleBox(eight, setEight)}>{eight}</div>
        <div className={`${boxStyle(nine)} border-4 border-black`} onClick={() => toggleBox(nine, setNine)}>{nine}</div>
      </div>

      {winner ? (
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`}
          </h2>
          <button 
            onClick={resetGame} 
            className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            Play Again
          </button>
        </div>
      ) : (
        <h2 className="text-2xl font-bold text-white mt-6">{isXTurn ? "X's Turn" : "O's Turn"}</h2>
      )}
    </div>
  );
}

export default App;
