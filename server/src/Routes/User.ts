import express from "express";
import {User} from "../Models/User";
import {Connection, getConnection} from "typeorm";

const router = express.Router();

router.post('/', function(req, res) {
    console.log(req.body);
    const username : string = req.body.username;
    const password : string = req.body.password;
    if (username && password) {
        let connection : Connection = getConnection();
        let user: User = new User();
        user.setAndHashPassword(password).then(async _ => {
            user.userName = username;
            connection.manager.save(user).then(async _ => {
                res.status(200).send({success: true, message: 'Success'});
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({success: false, message: err.message});
            });
        });
    } else {
        res.status(400).send({success: false, message: 'Invalid request body'});
    }
});

export default router;