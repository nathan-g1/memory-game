import MongoClient from "mongodb";
import { message, values } from "../constants/index.constants";
require('dotenv').config();


export default class DatabaseDao {

    private static dbName = process.env.DB_NAME;
    private static databaseURI = process.env.DATABASE_URI;

    private static connectionOptions = {
        useUnifiedTopology: true
    };

    private static cachedClient: MongoClient.MongoClient;

    // Creates a db conncection with mongoDb if one is not cached
    // Returns a mongoclient.collection object pointing to provided collection
    static connectToDatabase = async (): Promise<MongoClient.Db> => {
        if (DatabaseDao.cachedClient) return DatabaseDao.cachedClient.db(DatabaseDao.dbName);

        const client = await MongoClient.connect(DatabaseDao.databaseURI, DatabaseDao.connectionOptions).catch((err: any) => {
            console.log(message.DB_CONNECTION_FAILED + ` ${err}`);
        });

        if (!client) throw new Error(message.DATABASE_ERROR);

        DatabaseDao.cachedClient = client;

        return DatabaseDao.cachedClient.db(DatabaseDao.dbName);
    }

    // Starts a new session within the current db connection
    static startSession = async (): Promise<MongoClient.ClientSession> => {
        if (!DatabaseDao.cachedClient) throw new Error(message.DATABASE_ERROR);

        return DatabaseDao.cachedClient.startSession();
    }
}
