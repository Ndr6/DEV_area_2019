import assert from 'assert';
import issSightingOverLocation from "../src/routes/action/issSight"

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('IssSightingOverLocation', function () {
    describe('Call API and check condition', function () {
        it('should return an error from a unvalid city name', async function () {
            await wait(1250);

            let fakeCityName = "Oui";

            let returnValueFake = await issSightingOverLocation(fakeCityName);
            assert.equal(returnValueFake, "KO: Wrong location, enter a city name");
        });
        it('should return a timestamp corresponding to the time when the iss pass over the given location from a valid city name', async function () {
            await wait(1250);

            let validCityName = "Houston";

            let returnValue =  await issSightingOverLocation(validCityName);
            if (returnValue === "OK: Condition not passed")
                assert.equal(returnValue, "OK: Condition not passed");
            else
                assert.equal(returnValue, "OK: Conditions Passed");
        });
    });
});