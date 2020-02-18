import axios from 'axios';

async function actionIntraEpitechProjectEndTime(userAutoLogin) {
    if (userAutoLogin.empty)
        return ("KO: Wrong user auto-login");
    let getUserInfos = "https://intra.epitech.eu/" + userAutoLogin + "/?format=json";
    let conditionStatus = false;

    return (axios.get(getUserInfos).then(response => {
        response.data.board.projets.forEach(projets => {
            if (projets.date_inscription !== "false") {
                let d = new Date(projets.date_inscription);
                let timestamp = d.getTime();
                if (timestamp > Date.now() && timestamp <= (Date.now() + 10080 * 60 * 1000)) {
                    console.log(projets.title);
                    conditionStatus = true;
                    return ("OK: Condition passed");
                }
            }
        });
        if (conditionStatus === false)
            return ("OK: Condition not passed");
    }).catch(error => {
        console.log("Service: INTRA EPITECH\nStatus code: " + error.response.status);
        console.log(error.response.data);
        return ("KO");
    }));
}

export default actionIntraEpitechProjectEndTime;