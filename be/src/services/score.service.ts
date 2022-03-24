import ScoreDao from "../dao/score.dao";
import Score from "../models/score.model";

export default class ScoreService {

    private scoreDao: ScoreDao;

    constructor() {
        this.scoreDao = new ScoreDao();
    }

    /**
     * Calls Add score
     * @param {Score}                      score    Score object
     * @returns {Promise<Score>}                    returns Distance created
     */
    public addScore = async (score: Score): Promise<Score> => {
        const newScore = await this.scoreDao.addScore(score);
        return newScore;
    }

    /**
     * Get all scores of a user
     * @returns {Promise<Score[]>}                  returns list of user's Score
     */
    public getScores = async (): Promise<Score[]> => {
        const scores = await this.scoreDao.getScores();
        return scores;
    }
}
