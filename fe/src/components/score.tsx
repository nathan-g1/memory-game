import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { getHighScores, HighScore } from '../network';

const ScoreCard = () => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHighScores();
      setHighScores(result);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col self-center justify-center px-3">
      {highScores.map((score, i) => (
        <div className="flex justify-space-between mb-1 pb-1 pt-1 bg-secondary rounded-md pl-4 pr-4" key={i}>
          <div className="flex items-center">
            <div className="flex justify-center items-center text-center w-[35px] h-[35px] rounded-full bg-[purple] text-white">
              {score.name[0].toUpperCase()}
            </div>
            <div className="px-1 text-sm">
              <p className="text-gray-900 leading-none">{score.name}</p>
              <p className="text-gray-600">Score: {score.score}</p>
              <p className="text-gray-600 text-xs italic">{moment(score.date).format('M/D/YYYY HH:MM')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreCard;
