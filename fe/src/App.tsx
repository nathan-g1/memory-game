import { useEffect, useState } from 'react';
import { CardComponent, ScoreCard, Mode } from './components';
import { shuffler } from './utils';
import { images } from './images/index';
import moment from 'moment';
import { HighScore, setHighScore } from './network';

export interface Card {
  src: string;
  id: number;
  matched: boolean;
}

enum GameType {
  solo = 'solo',
  multiplayer = 'multiplayer',
}

enum PlayerTurn {
  player1 = 'player1',
  player2 = 'player2',
}

const App = () => {
  // Win Counter
  const [winCount, setWincount] = useState(0);
  // Game type
  const [gameType, setGameType] = useState<GameType>(GameType.solo);
  // Player type
  const [playerTurn, setPlayerTurn] = useState<PlayerTurn>(PlayerTurn.player1);
  // Cards state
  const [cards, setCards] = useState<Card[]>([]);
  // Single player state turn counter
  const [turnsSolo, setTurnsSolo] = useState<number>(0);
  // Multi player state turn counter
  const [turnsMultiplayer, setTurnsMultiplayer] = useState<number[]>([0, 0]);
  // Player name
  const [playerName, setPlayerName] = useState<string[]>([]);
  // Flip state
  const [flipOne, setFlipOne] = useState<Card | null>(null);
  const [flipTwo, setFlipTwo] = useState<Card | null>(null);
  // Disable state
  const [disabled, setDisabled] = useState<boolean>(false);
  // Date state
  const [date, setDate] = useState(moment(new Date()));
  const [startDate, setStartDate] = useState(moment(new Date()));

  // shuffle the images
  const shuffleImages = () => {
    const shuffleImages = shuffler(images);
    setCards(shuffleImages);
    setTurnsSolo(0);
    setTurnsMultiplayer([0, 0]);
    setStartDate(moment(new Date()));
    setWincount(0);
  };

  // flip the card
  const flipCard = (card: Card) => {
    flipOne ? setFlipTwo(card) : setFlipOne(card);
  };

  // Compare flipped cards
  useEffect(() => {
    if (flipOne && flipTwo) {
      setDisabled(true);
      if (flipOne.src === flipTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === flipOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleFlipReset(true);
      } else {
        setTimeout(() => {
          handleFlipReset(false);
        }, 1000);
      }
    }
  }, [flipOne, flipTwo]);

  // check if the cards match
  const handleFlipReset = (match: boolean) => {
    setFlipOne(null);
    setFlipTwo(null);
    setDisabled(false);
    if (gameType === GameType.multiplayer) {
      scorCounterMultiplayer(match);
    } else {
      scorCounterSolo(match);
    }
  };

  // Count the score for solo mode
  const scorCounterSolo = (match: boolean) => {
    setTurnsSolo((prevTurns) => prevTurns + 1);
    if (match) {
      setWincount((prevCount) => prevCount + 1);
    }
  };

  // Count the score for multiplayer mode
  const scorCounterMultiplayer = (match: boolean) => {
    if (match && playerTurn === PlayerTurn.player1) {
      setTurnsMultiplayer((prevTurns) => [prevTurns[0] + 1, prevTurns[1]]);
      setWincount((prevCount) => prevCount + 1);
    } else if (match && playerTurn === PlayerTurn.player2) {
      setTurnsMultiplayer((prevTurns) => [prevTurns[0], prevTurns[1] + 1]);
      setWincount((prevCount) => prevCount + 1);
      setPlayerName((prevName) => [prevName[0], prevName[1]]);
    } else {
      setPlayerTurn(playerTurn === PlayerTurn.player1 ? PlayerTurn.player2 : PlayerTurn.player1);
    }
  };

  // Get time for solo game
  useEffect(() => {
    if (cards.length === 0) return;
    let secTimer = setInterval(() => {
      setDate(moment(new Date()));
    }, 1000);

    return () => clearInterval(secTimer);
  }, [cards.length]);

  // Check if the game is over
  useEffect(() => {
    const checkGameOver = async () => {
      if (winCount > 0 && winCount === cards.length / 2) {
        if (gameType === GameType.multiplayer) {
          const winnerName = playerTurn === PlayerTurn.player1 ? playerName[0] : playerName[1];
          const score = {
            name: winnerName,
            score: date.diff(startDate, 'seconds'),
          };

          // Save the score
          await setHighScore(score);
          // Show the winner and reset the game
          setTimeout(() => {
            alert(`${winnerName} won ${date.diff(startDate, 'seconds')} seconds`);
            window.location.reload();
          }, 2000);
        } else {
          const score = {
            name: playerName[0],
            score: date.diff(startDate, 'seconds'),
          };
          await setHighScore(score);
          alert(`You won in ${date.diff(startDate, 'seconds')} seconds`);
          window.location.reload();
        }
      }
    };

    checkGameOver();
  }, [winCount]);

  const handleGameTypeChange = () => {
    setGameType(gameType === GameType.solo ? GameType.multiplayer : GameType.solo);
  };

  return (
    <div>
      <div className="flex flex-col justify-center pt-2">
        <div className="w-full flex justify-center pt-[2px] pb-[2px]">
          {gameType === GameType.multiplayer ? (
            <p className="text-[yellow]">
              {playerName[0]}: {turnsMultiplayer[0]} {playerName[1]}: {turnsMultiplayer[1]}
            </p>
          ) : (
            <h2 className="text-[yellow]">
              {playerName[0]}'s Score: {turnsSolo} Time: {date.diff(startDate, 'minutes')} minutes
            </h2>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex md:flex-row justify-center pt-3">
        <div className="flex flex-col w-full md:w-[200px] md:justify-items-start pt-3 ml-3">
          <p className="self-center text-white">Mode</p>
          <Mode playerName={playerName} setPlayerName={setPlayerName} text="New Game" mode={gameType} onModechange={handleGameTypeChange} onClick={shuffleImages} />
        </div>
        <div className={`grid grid-cols-6 gap-1 md:grid-cols-6 rounded-lg border-2 border-[yellow] ${cards.length !== 0 ? '' : 'hidden'}`}>
          {cards.map((card, i) => (
            <CardComponent
              key={i}
              card={card}
              flip={flipCard}
              flipped={card === flipOne || card === flipTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <div className="flex flex-col w-full md:w-[200px] md:justify-items-center pt-3">
          <p className="self-center text-white">High Scores</p>
          <div className="flex flex-col w-full md:w-[200px] md:justify-items-start pt-3 ml-3">
            <ScoreCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
