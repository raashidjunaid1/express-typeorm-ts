
// multiple strategies : per database
// default/production db : 1 database
const path = require('path');
const fs = require("fs");


let entitiesDir = "./src/entity/*.ts";
let migrationsDir = "./src/migration/*.ts"
let extension = "ts";

const mode = process.env.NODE_ENV == "production"

if (mode) {
  entitiesDir = "./dist/entity/*.js";
  migrationsDir = path.join(__dirname, "./src/migration")
  extension = "js";
}

module.exports = [
  {
    name: 'production',
    host: 'localhost',
    type: 'postgres',
    port: 5431,
    username: 'root',
    password: 'root',
    database: 'root',
    synchronize: false,
    migrationsRun: false,
    entities: [entitiesDir],
    migrations: [migrationsDir],
    ssl: mode ? {
      ca: fs.readFileSync(__dirname + '/ca-certificate.crt'),
    } : false,
    cli: { entitiesDir: entitiesDir, migrationsDir: migrationsDir },
  },
  {
    name: 'scalp',
    host: 'localhost',
    type: 'postgres',
    port: 5431,
    username: 'root',
    password: 'root',
    database: 'scalp',
    synchronize: false,
    migrationsRun: false,
    logging: false,
    entities: ["src/sharedEntities/*.ts"],
    migrations: [`src/migrations/freqtrade/*.${extension}`],
    cli: { entitiesDir: 'sharedEntities/entities/', migrationsDir: 'src/migrations/freqtrade/' },
  },
  {
    name: 'ultimaeth',
    host: 'localhost',
    type: 'postgres',
    port: 5431,
    username: 'root',
    password: 'root',
    database: 'ultimaeth',
    synchronize: false,
    migrationsRun: false,
    entities: ["src/sharedEntities/*.ts"],
    migrations: [`src/migrations/freqtrade/*.${extension}`],
    cli: { entitiesDir: 'sharedEntities/entities/', migrationsDir: 'src/migrations/freqtrade/' },
  }
];
