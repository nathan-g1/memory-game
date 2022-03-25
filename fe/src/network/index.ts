const apiUrl = 'http://localhost:5000/api'

export interface HighScore {
  name: string;
  score: number;
  date: Date;
}

export const getHighScores = async (): Promise<HighScore[]> => {
  const highScore = await fetch(`${apiUrl}/scores`, {
    method: 'GET',
  });

  const data = await highScore.json();

  return data.scores.map((item: HighScore) => ({
    name: item.name,
    score: item.score,
    date: new Date(item.date),
  }));
}

export const setHighScore = async (score: { score: number, name: string }) => {
  const highScore = await fetch(`${apiUrl}/scores/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(score),
  });

  const data = await highScore.json();

  return data;
}