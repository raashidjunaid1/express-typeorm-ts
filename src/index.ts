
require('dotenv').config();
import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { Request, Response } from "express";
import express from 'express';
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import path from 'path';
import { Category } from "./entity/Category";
import { Post } from "./entity/Post";

const createDBConnections = async () => {
    let connectionOptions = await getConnectionOptions("production");
    const migrationsDir = (extention: string) => path.join(__dirname, "./src/migration/*" + extention)
    const connection = await createConnection({
        ...connectionOptions,
        name: "default",
        entities: [
            Category,
            Post
        ],
        logging: false,
        migrations: [migrationsDir(".js"), migrationsDir(".ts")],
    });

    await connection.runMigrations({ transaction: 'all' })
    return connection;
};


// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createDBConnections().then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(3000);

    console.log("Express application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));
