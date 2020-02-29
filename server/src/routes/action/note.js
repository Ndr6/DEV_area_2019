import axios from 'axios';

async function actionIntraEpitechNote(userAutoLogin) {
    if (userAutoLogin.length !== 45)
        return ("KO: Wrong user auto-login");
    let getUserInfos = "https://intra.epitech.eu/" + userAutoLogin + "/user/notification/message?format=json";
    let conditionsStatus = false;

    return (axios.get(getUserInfos).then(response => {
        response.data.forEach(message => {
            let d = new Date(message.date);
            let timestamp = d.getTime();
            let currentTimestamp = Date.now();
            if (message.class === "note" && timestamp >= (currentTimestamp - 10 * 60 * 1000)) {
                console.log(message.user.title);
                conditionsStatus = true;
                return ("OK: Condition passed");
            }
        });
        if (conditionsStatus === false)
            return ("OK: Condition not passed");
    }).catch(error => {
        console.log("Service: INTRA EPITECH\nStatus code: " + error);
        console.log(error.response.data);
        return ("KO");
    }));
}

export default actionIntraEpitechNote;