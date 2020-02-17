import assert from 'asert';
import actionIntraEpitechNote from "../src/action"

describe('Action', function () {
    describe('Call API and check condition', function () {
        it('should check from the user auto-login token retrieved if there is a new note', function () {
            let fakeUserAutoLoginToken = "https://intra.epitech.eu/auth-dac602d44f86d0927b3f462";
            let validUserAutoLoginToken = "https://intra.epitech.eu/auth-dac602d44f86d0927b3f4624020b8cea7df379c0";

            let returnValueFake = actionIntraEpitechNote(fakeUserAutoLoginToken);
            let returnValue = actionIntraEpitechNote(validUserAutoLoginToken);
            assert.equal(returnValueFake, "KO");
            assert.equal(returnValue, "OK: Passed");
        })
    })
});