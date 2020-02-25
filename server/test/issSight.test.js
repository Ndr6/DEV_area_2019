import assert from 'assert';
import issSightingOverLocation from "../src/routes/services/action/issSight"

describe('IssSightingOverLocation', function () {
    describe('Call API and check condition', function () {
        it('should return an error from a unvalid city name', async function () {
            let fakeCityName = "Oui";

            let returnValueFake = await issSightingOverLocation(fakeCityName);
            assert.equal(returnValueFake, "KO: Wrong location, enter a city name");
        });
        it('should return a timestamp corresponding to the time when the iss pass over the given location from a valid city name', async function () {
            let validCityName = "Houston";

            let returnValue =  await issSightingOverLocation(validCityName);
            assert.equal(returnValue, "OK: Condition not passed");
        });
    });
});