import axios from 'axios';

function actionIntraEpitechProjectEndTime(userAutoLogin) {
    if (userAutoLogin.empty)
        return ("KO: Wrong user auto-login");
    let getUserInfos = "https://intra.epitech.eu/" + userAutoLogin + "/?format=json";

    axios.get(getUserInfos).then(responce => {
        responce.data.board.projets.forEach(projets => {
            if (projets.date_inscription !== "false") {
                let d = new Date(projets.date_inscription);
                let timestamp = d.getTime();
                if (timestamp > Date.now() && timestamp <= (Date.now() + 10080 * 60 * 1000)) {
                    console.log(projets.title);
                    return ("OK: Passed");
                }
            }
        });
        //console.log(responce.data);
    }).catch(error => {
        console.log(error);
        return ("KO");
    });
    return ("OK: Conditions not passed");
}

export default actionIntraEpitechProjectEndTime;