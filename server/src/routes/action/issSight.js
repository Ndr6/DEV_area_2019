import axios from 'axios';

export default async function checkIss(location, userApiKey) {
    let cityInLatLonRequest = "https://api.opencagedata.com/geocode/v1/json?q=" + location + "&key=" + userApiKey;
    let foreachIdx = 0;
    let conditionsStatus = false;

    return (axios.get(cityInLatLonRequest).then(response => {
        if (response.data.status.message === "invalid API key" || response.data.status.code === "401")
            return ("KO: Wrong api key, enter a valid api key");
        if (response.data.total_results === 0)
            return ("KO: Wrong location, enter a valid city name");
        let issPassingTimeRequest = "";
        response.data.results.forEach(cityInformations => {
            if (foreachIdx === 0) {
                issPassingTimeRequest = "http://api.open-notify.org/iss-pass.json?lat=" + cityInformations.geometry.lat + "&lon=" + cityInformations.geometry.lng;
                foreachIdx++;
            }
        });
        if (issPassingTimeRequest !== "") {
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
                console.log("Service: ISS LOCATION\nStatus code:" + error.response.data.status.code);
                console.log(error.response.data.status.message);
                return ("KO");
            });
        }
        if (conditionsStatus === false)
            return ("OK: Condition not passed");
    }).catch(error => {
        console.log("Service: ISS LOCATION\nStatus code:" + error.response.data.status.code);
        console.log(error.response.data.status.message);
        return ("KO");
    }));
}