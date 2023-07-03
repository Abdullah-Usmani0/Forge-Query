// db.js
import { DataSource } from "typeorm";
import { SqlDatabase } from "langchain/sql_db";

let db: SqlDatabase;

export async function getDb() {
    if (!db) {
        const datasource = new DataSource({
            type: "mysql",
            host: "aws.connect.psdb.cloud",
            username: process.env.PSCALE_USR,
            password: process.env.PSCALE_PWD,
            database: "llm",
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: true
                }
            }
        });

        db = await SqlDatabase.fromDataSourceParams({
            appDataSource: datasource,
        });
    }
    return db;
}
