import assert from 'assert';
import actionIntraEpitechProjectEndTime from "../src/routes/action/projectEndTime"

describe('ProjectEndTimeEpitechIntra', function () {
    describe('Call API and check condition', function () {
        it('should check from the user auto-login token retrieved if there is a project about to end from fake user', async function () {
            let fakeUserAutoLoginToken = "auth-dac602d44f86d0927b3";

            let returnValueFake = await actionIntraEpitechProjectEndTime(fakeUserAutoLoginToken);
            assert.equal(returnValueFake, "KO: Wrong user auto-login");
        });
        it('should check from the user auto-login token retrieved if there is a project about to end from valid user', async function () {
            let validUserAutoLoginToken = process.env.AUTO_LOGIN_TOKEN_INTRA;
            if (validUserAutoLoginToken === undefined)
                assert.fail("Autologin token not found in env, add it in variable AUTO_LOGIN_TOKEN_INTRA");
            let returnValue = await actionIntraEpitechProjectEndTime(validUserAutoLoginToken);
            assert.equal(returnValue, "OK: Condition not passed");
        });
    });
});