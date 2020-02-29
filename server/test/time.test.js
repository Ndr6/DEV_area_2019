import assert from 'assert';
import { checkTimer } from "../src/routes/action/timer"

describe('Timer', function () {
    describe('Check actual time with time given by user', function () {
        it('should return an error from a unvalid hour', async function () {
            let action = {
                params : {
                    hour: NaN,
                    minutes: 13,
                    message: "killing some turtle"
                }
            };
            let user = {};

            let returnValueFake = await checkTimer(action, user);
            assert.equal(returnValueFake, undefined);
        });

        it('should return an error from a unvalid minute', async function () {
            let action = {
                params : {
                    hour: 13,
                    minutes: NaN,
                    message: "killing some turtle"
                }
            };
            let user = {};

            let returnValueFake = await checkTimer(action, user);
            assert.equal(returnValueFake, undefined);
        });

        it('should return an error from unvalid message', async function () {
            let action = {
                params : {
                    hour: NaN,
                    minutes: NaN,
                    message: ""
                }
            };
            let user = {};

            let returnValueFake = await checkTimer(action, user);
            assert.equal(returnValueFake, undefined);
        });

        it('should return a correct answer from a valid time', async function () {
            let action = {
                params : {
                    hour: 13,
                    minutes: 27,
                    message: "killing some turtle"
                }
            };
            let user = {};

            let returnValue = await checkTimer(action, user);
            if (returnValue.success === true)
                assert.equal(returnValue, true);
            else
                assert.equal(returnValue.success, false);
        });
    });
});