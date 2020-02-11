//Epitech project
//Sébastien Bernard
import mongodb from "mongodb";

const DB_HOST = (process.env.DB_HOST == undefined ? "localhost" : process.env.DB_HOST);
const DB_PORT = (process.env.DB_PORT == undefined ? "27017" : process.env.DB_PORT);
const DB_NAME = (process.env.DB_NAME == undefined ? "area" : process.env.DB_NAME);
let url = 'mongodb://' + DB_HOST + ':' + DB_PORT;
if (process.env.MONGODB_URI != undefined)
    url = process.env.MONGODB_URI;

class db {
    #client = undefined;
    constructor() {
        this.#client = new mongodb.MongoClient(url);
        this.#client.connect(function (err) {
            if (err != null) {
                console.error("[DB  ] Init > Failed to connect, error below");
                console.error("[DB  ] Init > DB url: " + url);
                console.error(err);
                process.exit();
            }
            console.log("[DB  ] Init > Connected to DB server");
        });
    }

    test_db() {
        if (this.#client.isConnected() == false)
            return false;
        return true
    }

    close_db() {
        if (this.#client.isConnected())
            this.#client.close();
    }
}

export default db;