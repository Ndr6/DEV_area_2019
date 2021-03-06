import storage from "../../db";
import { Router } from "express";
import findService from "../../utils/findService";
import verifyParams from "../../utils/verifyParams";

const routes = Router();

routes.post('/', (req, res) => {
    let serviceName = req.body.name;
    let params = req.body.params;
    if (!params || !serviceName) {
        res.status(400).json({ success: false, error: "Error" });
        return;
    }
    let service = findService(serviceName);
    if (!service) {
        res.status(400).json({ success: false, error: "Error cannot find service" });
        return;
    }
    if (!verifyParams(service.parameters, params)) {
        res.status(400).json({ success: false, error: "Error verify params" });
        return;
    }
    const database = storage.get();
    const users = database.collection("users");
    let cursor = users.find({ _id: storage.convert_mongo_id(req.token.id) });
    users.updateOne({ _id: storage.convert_mongo_id(req.token.id) },
            { $set: { [`service.${serviceName}`]: {
                isSub: true,
                params: params,
            } } },
            {}, function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ success: false, error: "Failure in database service (" + error + "). Please email the technical team" });
                    return;
                }
            res.status(200).json({ success: true });
    });
});

export default routes;