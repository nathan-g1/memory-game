import express, { Request, Response } from 'express';
import { ErrorType, message } from '../../constants/index.constants';
import { Validator } from './validator';
import ScoreService from '../../services/score.service';

export default class ScoreController {

    public path = '/api/scores';
    public router = express.Router();
    public scoreService: ScoreService;

    constructor() {
        this.scoreService = new ScoreService();
        this.initRoutes();
    }

    // Register middleware and controller methods to router
    private initRoutes = () => {
        this.router.get('/', this.getAllScores);
        this.router.post('/add', this.addScore);
    }

    // Adds new score to the database
    private addScore = async (req: Request, res: Response) => {
        const body = req.body;

        const { error } = Validator.addScore.validate(body);

        if (error) return res.status(400).json({
            error: message.INVALID_BODY,
            message: error.details.map(er => er.message)
        });

        try {
            const score = await this.scoreService.addScore(body);
            return res.status(200).json({ score });
        } catch (error) {
            switch (error.message) {
                case ErrorType.DATABASE_ERROR:
                    return res.status(409).json({ error: [ErrorType.DATABASE_ERROR] });
                default:
                    return res.status(500).json({ error: [ErrorType.SERVER_ERROR] });
            }
        }
    }

    // Gets all hiigh scores
    private getAllScores = async (req: Request, res: Response) => {
        try {
            const scores = await this.scoreService.getScores();
            return res.status(200).json({ scores });
        } catch (error) {
            switch (error.message) {
                default:
                    return res.status(500).json({ error: [ErrorType.SERVER_ERROR] });
            }
        }
    }

}
