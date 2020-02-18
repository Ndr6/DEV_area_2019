import assert from 'asert';
import actionIntraEpitechNote from "../src/note"

describe('NoteEpitechIntra', function () {
    describe('Call API and check condition', function () {
        it('should check from the user auto-login token retrieved if there is a new note from fake user', function () {
            let fakeUserAutoLoginToken = "https://intra.epitech.eu/auth-dac602d44f86d0927b3f462";

            let returnValueFake = actionIntraEpitechNote(fakeUserAutoLoginToken);
            assert.equal(returnValueFake, "KO");
        });
        it('should check from the user auto-login retrieved if there is a new note from valid user', function () {
            let validUserAutoLoginToken = "https://intra.epitech.eu/" + process.env.AUTO_LOGIN_TOKEN_INTRA;

            let returnValue = actionIntraEpitechNote(validUserAutoLoginToken);
            assert.equal(returnValue, "OK: Passed");
        });
    });
});