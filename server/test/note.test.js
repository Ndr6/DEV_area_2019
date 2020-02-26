import assert from 'assert';
import actionIntraEpitechNote from "../src/routes/action/note"

describe('NoteEpitechIntra', function () {
    describe('Call API and check condition', function () {
        it('should check from the user auto-login token retrieved if there is a new note from fake user', async function () {
            let fakeUserAutoLoginToken = "authf462";

            let returnValueFake = await actionIntraEpitechNote(fakeUserAutoLoginToken);
            assert.equal(returnValueFake, "KO: Wrong user auto-login");
        });
        it('should check from the user auto-login token retrieved if there is a new note from valid user', async function () {
            let validUserAutoLoginToken = process.env.AUTO_LOGIN_TOKEN_INTRA;
            if (validUserAutoLoginToken === undefined)
                assert.fail("Autologin token not found in env, add it in variable AUTO_LOGIN_TOKEN_INTRA");
            let returnValue = await actionIntraEpitechNote(validUserAutoLoginToken);
            assert.equal(returnValue, "OK: Condition not passed");
        });
    });
});