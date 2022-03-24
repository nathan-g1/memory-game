import { ErrorType } from "../constants/index.constants";
import { values } from "../constants/index.constants";
import Score from '../models/score.model';
import DatabaseDao from "./database.dao";

export default class ScoreDao {

    private scoresCollection = values.SCORE_COLLECTION;

    /**
     * Adds new score to a specific day
     * @param   {Score}            score      Score object
     * @return  {Promise<Score>}        Promise of score
     */
    public addScore = async (score: Score): Promise<Score> => {
        const db = await DatabaseDao.connectToDatabase();
        const collection = db.collection(this.scoresCollection);

        const doc = Score.new(score).createDocument();
        let result: any;

        try {
            result = await collection.insertOne(doc);
        } catch (error) {
            throw new Error(ErrorType.DATABASE_ERROR);
        }

        return Score.display(result.ops[0]);
    }

    /**
     * Get five max scores
     * @return  {Promise<Score[]>}                  Promise of scores
     */
    public getScores = async (): Promise<Score[]> => {
        const db = await DatabaseDao.connectToDatabase();
        const collection = db.collection(this.scoresCollection);

        // Get 5 max scores
        const result = await collection
            .find()
            .sort({
                score: -1
            })
            .limit(5)
            .toArray();

        return result.map(score => Score.display(score));
    }

}
