import assert from "assert";
import db from "../src/db";

describe('DB', function () {
    describe('Connection', function () {
        let storage = new db;
        it('should connect to the database', function () {
            assert.equal(storage.test_db(), true);
        });
        it('should close the connection', function () {
            storage.close_db();
            assert.equal(storage.test_db(), false);
        });
    });
});