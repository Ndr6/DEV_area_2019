import assert from 'assert';
import issSightingOverLocation from "../src/routes/action/issSight"

describe('IssSightingOverLocation', function () {
    describe('Call API and check condition', function () {
        it('should return an error from a unvalid city name', async function () {
            let fakeCityName = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            let userApiKey = process.env.GEOCODE_KEY;

            let returnValueFake = await issSightingOverLocation(fakeCityName, userApiKey);
            assert.equal(returnValueFake, "KO: Wrong location, enter a valid city name");
        });

        it('should return an error from a unvalid api key', async function () {
           let cityName = "Lille";
           let fakeUserApiKey = "b75f63e4d9ef4b";

           let returnValue = await issSightingOverLocation(cityName, fakeUserApiKey);
           assert.equal(returnValue, "KO");
        });

        it('should return a timestamp corresponding to the time when the iss pass over the given location from a valid city name', async function () {
            let validCityName = "Lille";
            let userApiKey = process.env.GEOCODE_KEY;

            let returnValue =  await issSightingOverLocation(validCityName, userApiKey);
            if (returnValue === "OK: Condition not passed")
                assert.equal(returnValue, "OK: Condition not passed");
            else
                assert.equal(returnValue, "OK: Conditions Passed");
        });
    });
});