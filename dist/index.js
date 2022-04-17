"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const createDBConnections = async () => {
    console.log("starting api : creating connections");
    const connectionNames = [""];
    let connectionOptions;
    connectionOptions = await typeorm_1.getConnectionOptions("production");
    console.log('connectionOptions :: ', connectionOptions);
    // const migrationsDir = "./src/migrations/production/*"
    const migrationsDir = (extention) => path_1.default.join(__dirname, "./src/migration/*" + extention);
    const connection = await typeorm_1.createConnection(Object.assign(Object.assign({}, connectionOptions), { name: "default", entities: [
            Category_1.Category,
            Post_1.Post
        ], logging: false, migrations: [migrationsDir(".js"), migrationsDir(".ts")] }));
    await connection.runMigrations({ transaction: 'all' });
    return connection;
};
// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createDBConnections().then(async (connection) => {
    const x = await connection.getRepository(Post_1.Post).find();
    console.log('x ::: ', x);
    // create express app
    const app = express_1.default();
    app.use(bodyParser.json());
    // register all application routes
    routes_1.AppRoutes.forEach(route => {
        app[route.method](route.path, (request, response, next) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });
    // run app
    app.listen(3000);
    console.log("Express application is up and running on port 3000");
}).catch(error => console.log("TypeORM connection error: ", error));
//# sourceMappingURL=index.js.map