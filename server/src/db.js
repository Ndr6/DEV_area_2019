//Epitech project
//Sébastien Bernard
import mongodb from "mongodb";

const DB_HOST = (process.env.DB_HOST == undefined ? "127.0.0.1" : process.env.DB_HOST);
const DB_PORT = (process.env.DB_PORT == undefined ? "27017" : process.env.DB_PORT);
const DB_NAME = (process.env.DB_NAME == undefined ? "area" : process.env.DB_NAME);
let url = 'mongodb://' + DB_HOST + ':' + DB_PORT;
if (process.env.MONGODB_URI != undefined)
    url = process.env.MONGODB_URI;

class db {
    client = undefined;
    #database = undefined;
    constructor() {
        this.client = new mongodb.MongoClient(url);
        console.log("[DB  ] Init > DB url: " + url);
        this.client.connect(function (err, client) {
            if (err != null) {
                console.error("[DB  ] Init > Failed to connect, error below");
                console.error("[DB  ] Init > DB url: " + url);
                console.error(err);
                process.exit();
            }
        });
    }

    regen() {
        this.#database = this.client.db(DB_NAME);
    }

    get() {
        return this.#database;
    }

    test_connection() {
        return this.client.isConnected();
    }

    close_connection(force, callback) {
        if (this.client.isConnected())
            this.client.close(force, callback);
    }
}

export default db;