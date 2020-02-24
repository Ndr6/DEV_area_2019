import axios from 'axios';

export default async function issSightingOverLocation(location) {
    let cityInLatLonRequest = "https://geocode.xyz/" + location + "?geoit=json";
    let conditionsStatus = false;

    return (axios.get(cityInLatLonRequest).then(response => {
        if (response.data.longt === "0.00000" && response.data.latt === "0.00000")
            return ("KO: Wrong location, enter a city name");
        let issPassingTimeRequest = "http://api.open-notify.org/iss-pass.json?lat=" + response.data.latt + "&lon=" + response.data.longt;

        axios.get(issPassingTimeRequest).then(issResponse => {
            if (issResponse.data.message === "failure")
                return ("KO: ISS location api failed");
            issResponse.data.response.forEach(riseTime => {
                let timeNow = Date.now();
                if (riseTime.risetime >= timeNow && riseTime.risetime + (80 * 60 * 1000) < timeNow) {
                    console.log(riseTime.risetime);
                    conditionsStatus = true;
                    return ("OK: Conditions Passed");
                }
            })
        }).catch(error => {
            console.log("Service: ISS LOCATION\nStatus code:" + error.response.status);
            console.log(error.response.data);
            return ("KO");
        });
        if (conditionsStatus === false)
            return ("OK: Condition not passed");
    }).catch(error => {
        console.log("Service: ISS LOCATION\nStatus code:" + error.response.status);
        console.log(error.response.data);
        return ("KO");
    }));
}