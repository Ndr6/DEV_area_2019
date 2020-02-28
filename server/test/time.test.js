import assert from 'assert';
import { timer } from "../src/routes/action/timer"

describe('Timer', function () {
    describe('Check actual time with time given by user', function () {
        it('should return an error from a unvalid hour', async function () {
            let hour = "A&*)";
            let minute = 23;

            let returnValueFake = await timer(hour, minute);
            assert.equal(returnValueFake, "KO: Wrong date and minutes");
        });

        it('should return an error from a unvalid minute', async function () {
            let hour = 13;
            let minute = "BBBBBBBBBBBBBBB";

            let returnValueFake = await timer(hour, minute);
            assert.equal(returnValueFake, "KO: Wrong date and minutes");
        });

        it('should return an error from both unvalid hour and minute', async function () {
            let hour = "AY42µ5";
            let minute = 13457792;

            let returnValueFake = await timer(hour, minute);
            assert.equal(returnValueFake, "KO: Wrong date and minutes");
        });

        it('should return a correct answer from a valid time', async function () {
            let hour = 14;
            let minute = 23;

            let returnValue = await timer(hour, minute);
            if (returnValue === "OK: Condition not passed")
                assert.equal(returnValue, "OK: Condition not passed");
            else
                assert.equal(returnValue, "OK: Conditions Passed");
        });
    });
});