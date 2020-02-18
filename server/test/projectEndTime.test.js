import assert from 'assert';
import actionIntraEpitechProjectEndTime from "../src/projectEndTime"

describe('ProjectEndTimeEpitechIntra', function () {
    describe('Call API and check condition', function () {
        it('should check from the user auto-login token retrieved if there is a project about to end from fake user', async function () {
            let fakeUserAutoLoginToken = "auth-dac602d44f86d0927b3f462";

            let returnValueFake = await actionIntraEpitechProjectEndTime(fakeUserAutoLoginToken);
            assert.equal(returnValueFake, "KO");
        });
        it('should check from the user auto-login token retrieved if there is a project about to end from valid user', async function () {
            let validUserAutoLoginToken = process.env.AUTO_LOGIN_TOKEN_INTRA;

            let returnValue = await actionIntraEpitechProjectEndTime(validUserAutoLoginToken);
            assert.equal(returnValue, "OK: Condition not passed");
        });
    });
});