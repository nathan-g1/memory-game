import React, { Dispatch, SetStateAction } from 'react';
import Button from './button';

interface Props {
  text: string;
  onClick: () => void;
  onModechange: () => void;
  mode: string;
  setPlayerName: Dispatch<SetStateAction<string[]>>;
  playerName: string[];
}

const Mode: React.FC<Props> = ({ onClick, text, onModechange, mode, setPlayerName, playerName }) => {
  const handleClick = () => {
    onClick();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const type = e.target.id;
    if (type === 'player1') {
      setPlayerName((prevState) => [name, prevState[1]]);
    } else {
      setPlayerName((prevState) => [prevState[0], name]);
    }
  };

  const handleGameTypeChange = () => {
    onModechange();
  };

  return (
    <div className="flex flex-col self-center justify-center px-3">
      <div className="flex justify-space-between mb-1 pb-1 pt-1 rounded-md pl-4 pr-4">
        <div className="flex flex-col items-center">
          <div className="flex">
            <select
              onChange={handleGameTypeChange}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="mode"
            >
              <option value="solo">Single Player</option>
              <option value="multiplayer">Multiplayer</option>
            </select>
          </div>
          <div className="flex">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="player1"
              type="text"
              onChange={(e) => handleNameChange(e)}
              placeholder="Player One Name"
            />
          </div>
          <div className={`flex ${mode !== 'multiplayer' ? 'hidden' : ''}`}>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="player2"
              type="text"
              onChange={(e) => handleNameChange(e)}
              placeholder="Player Two Name"
            />
          </div>
          <div className="flex items-center">
            <Button
              disabled={playerName.length === 0 || playerName[0] === ('') || (mode === 'multiplayer' && playerName[1] === ('') ? true : false)}
              text={text}
              onClick={handleClick}
              className="text-white self-center block text-center bg-[indigo] border-white w-40 py-2 rounded-[6px] text-base font-bold font-sans hover:bg-[yellow] hover:text-[purple]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mode;
