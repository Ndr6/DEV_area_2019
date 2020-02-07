import assert from "assert";
import client from "../src/db";
import { test_db, close_db } from "../src/db";

describe('DB', function () {
    describe('Connection', function () {
        it('should connect to the database', function () {
            assert.equal(test_db(), true);
            assert.equal(test_db(), client.isConnected());
        });
        it('should close the connection', function () {
            close_db();
            assert.equal(test_db(), false);
        });
    });
});