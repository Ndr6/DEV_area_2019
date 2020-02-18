import assert from 'assert';
import actionIntraEpitechProjectEndTime from "../src/projectEndTime"

describe('ProjectEndTimeEpitechIntra', function () {
    describe('Call API and check condition', function () {
        it('should check from the user auto-login token retrieved if there is a project about to end from fake user', function () {
            let fakeUserAutoLoginToken = "https://intra.epitech.eu/auth-dac602d44f86d0927b3f462";

            let returnValueFake = actionIntraEpitechProjectEndTime(fakeUserAutoLoginToken);
            assert.equal(returnValueFake, "KO");
        });
        it('should check from the user auto-login token retrieved if there is a project about to end from valid user', function () {
            let validUserAutoLoginToken = "https://intra.epitech.eu/" + process.env.AUTO_LOGIN_TOKEN_INTRA;

            let returnValue = actionIntraEpitechProjectEndTime(validUserAutoLoginToken);
            assert.equal(returnValue, "OK: Conditions not passed");
        });
    });
});