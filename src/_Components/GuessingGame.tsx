// GuessingGame.tsx
import React, { useEffect, useState } from 'react';

const GuessingGame: React.FC = () => {
  const [guess, setGuess] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [guessNumber, setGuessNumber] = useState<Number>(0);
  const [message, setMessage] = useState('');
  const [emoji, setEmoji] = useState('');
  const [chances, setChances] = useState(5);
  const [hasWon, setHasWon] = useState(false);
  const[hasLost, setHasLost] = useState(false);

  const generateRandomNumber = (): Number  => {
    const number =  Math.floor(Math.random() * 10) + 1;
    setGuessNumber(number);
    return number;
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const handleGuessChange = (event:any) => {
    const inputGuess = parseInt(event.target.value);
    if (inputGuess >= 1 && inputGuess <= 10) {
        setGuess(event.target.value);
    } else {
       // handle invalid input as needed
    }
  };

  const handleRetry = () => {
    setGuess('');
    setGameStarted(false);
    setGuessNumber(generateRandomNumber());
    setMessage('');
    setChances(5);
    setHasWon(false);
    setHasLost(false);
  };

  const handleGuessSubmit = () => {
    setGameStarted(true);
  };

  const handleGuessEnter = () => {
    const guessedNumber = parseInt(guess, 10);
    console.log("Guessed Number: ", guessNumber, guess);
    if (guessedNumber === guessNumber) {
      setMessage('You Won !!');
      setHasWon(true);
    } else {
        if (chances > 1) {
        setChances(chances - 1);
        }
        else{
            setChances(0);
            setHasLost(true);
            setMessage('You Lost !!');
        }
    }
    setGuess('');
  }

  return (
    <div className="guessing-game">
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-2/3 bg-yellow-300 text-black h-dvh flex">
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            🪃
          </div>
        <div className="p-4 flex flex-1 flex-col justify-between">
        <div className="w-40 text-3xl md:text-4xl font-bold text-left">Guess the Number</div>
        <div className="mt-auto text-left px-4 pb-4">
        <b>Rules </b><br />
        1. Start the game <br />
        2. Guess the number between 1-10 <br />
        3. You would get 5 changes to guess it right. <br />
        4. Lost? Replay <br />
        5. Won? Congrats 🎉!!
        </div>
       
        </div>
        </div>
            <div className="w-1/3 bg-white text-black h-dvh flex justify-center items-center">
                <div className={`p-24 bg-yellow-300 rounded-lg border ${!gameStarted ? 'border border-black' : ''}`}>
                {gameStarted ? (
                    <>  {!hasWon && !hasLost && <div>{chances} chances left</div>}
                      {hasWon && <div className="font-bold text-2xl"> 🎉</div>}
                      {hasLost && <div className="font-bold text-2xl"> 🤕</div>}
                      {hasWon && <div className="font-bold text-2xl"> {emoji}</div>}
                        <div className="font-bold text-2xl">
                            {message}
                        </div>
                        {chances > 0 && !hasWon && (
                  <>
                    <input
                      type="text"
                      className="border px-2 py-1 mt-2"
                      placeholder="Please enter your guess"
                      onChange={handleGuessChange}
                      value={guess}
                      disabled={hasWon}
                    />
                    <div className="mt-2">
                      <button
                        onClick={handleGuessEnter}
                        className="mt-2 px-4 py-2 bg-white text-black rounded-md shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        disabled={hasWon}
                      >
                        Guess
                      </button>
                    </div>
                  </>
                )}
                {chances === 0 && !hasWon && (
                  <button
                    onClick={handleRetry}
                    className="mt-4 px-4 py-2 bg-white text-black rounded-md shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Re-try
                  </button>
                )}
                {hasWon && (
                  <button
                    onClick={handleRetry}
                    className="mt-4 px-4 py-2 bg-white text-black rounded-md shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Play Again
                  </button>
                )}
              </>
                ) : (
                    <div>
                        <div className="font-bold text-2xl">
                            Guess a number <br /> between 1-10
                        </div>
                        <button
                            onClick={handleGuessSubmit}
                            className="mt-4 px-4 py-2 bg-white text-black rounded-md shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Start the Game
                        </button>
                    </div>
                )}
        </div>
        </div>
    </div>
    </div>
  );
};

export default GuessingGame;
