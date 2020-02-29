import { Router } from "express";
import storage from "../../db";
import axios from 'axios';

const routes = Router();

export async function checkIss(action, user) {
    let cityInLatLonRequest = "https://api.opencagedata.com/geocode/v1/json?q=" + action.params.location + "&key=" + process.env.GEOCODE_KEY;
    let foreachIdx = 0;
    let conditionsStatus = false;

    return (axios.get(cityInLatLonRequest).then(response => {
        if (response.data.status.message === "invalid API key" || response.data.status.code === "401")
            return undefined;
        if (response.data.total_results === 0)
            return undefined;
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
                    return { success: false, params: action.params};
                issResponse.data.response.forEach(riseTime => {
                    let timeNow = Date.now();
                    if (riseTime.risetime >= timeNow && riseTime.risetime + (80 * 60 * 1000) < timeNow) {
                        console.log(riseTime.risetime);
                        conditionsStatus = true;
                        return { success: true, params: action.params, message: "The International Space Station is just above " + action.params.location };
                    }
                })
            }).catch(error => {
                console.log("Service: ISS LOCATION\nStatus code:" + error.response.data.status.code);
                console.log(error.response.data.status.message);
                return undefined;
            });
        }
        if (conditionsStatus === false)
            return { success: false, params: action.params};
    }).catch(error => {
        console.log("Service: ISS LOCATION\nStatus code:" + error.response.data.status.code);
        console.log(error.response.data.status.message);
        return undefined;
    }));
};

//TODO SUB
routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.url == undefined) {
        res.status(400).json({ success: false, error: "Missing URL parameter" });
        return;
    }
    if (req.body.checkInterval == undefined || req.body.checkInterval < 60)
        req.body.checkInterval = 600;

    let action = {
        actionType: "issSight",
        ownerId: req.token.id,
        checkInterval: req.body.checkInterval,
        lastChecked: 0,
        linkedRea: [],
        params: {
            location: req.body.location
        }
    };

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] RSS > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log(result);
        console.log("[Acti] RSS > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;