import axios from 'axios';

function actionIntraEpitechNote() {
    console.log("Kono Testo Da !");
    let authAdd = "https://intra.epitech.eu/auth-";
    let getUserInfos = authAdd + "/user/notification/message?format=json";

    axios.get(getUserInfos).then(responce => {
        responce.data.forEach(message => {
            let d = new Date(message.date);
            let timestamp = d.getTime();
            let currentTimestamp = Date.now();
            if (message.class === "note" && timestamp >= (currentTimestamp - 10 * 60 * 1000)) {
                console.log(message.user.title);
                return ("OK: Passed");
            }
        });
        console.log(responce.data);
    }).catch(error => {
        console.log(error);
        return ("KO");
    });
    return ("OK: Conditions not passed");
}

export default actionIntraEpitechNote;

//let ghibliFilm = "https://ghibliapi.herokuapp.com/films";
/*axios.get(ghibliFilm).then(responce => {
        responce.data.forEach(movie => {
            console.log(movie.title);
        })
    }).catch(error => {
        console.log(error);
    });*/