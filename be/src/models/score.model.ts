import { nanoid } from "nanoid";

export default class Score {
    public id: string;
    public name: string;
    public date: Date;
    public score: number;

    static new(obj: any): Score {
        let score = new Score();
        score.name = obj.name;
        score.date = obj.ScoreDate;
        score.score = obj.score;

        return score;
    }

    static display(obj: any) {
        let res = new Score();

        res.id = obj._id;
        res.name = obj.name;
        res.score = obj.score;
        res.date = obj.date;

        return res;
    }

    createDocument(): Object {
        let doc = new Object();

        doc['_id'] = nanoid();
        doc['name'] = this.name;
        doc['score'] = this.score;
        doc['date'] = new Date();

        return doc;
    }
}