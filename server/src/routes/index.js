import { Router } from "express";
import auth from './auth';
import verifyToken from "../jwt";
import services from "./services"

const routes = Router();

// Unauthenticated services
routes.use('/auth', auth);

// Authentication middleware
routes.use('/services', (req, res, next) => {
    //TODO: Restrict the CORS header
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (!req.headers.authorization)
        return res.status(403).json({ success: false, error: 'API - Missing token' });
    if (!req.headers.authorization.startsWith("Bearer "))
        return res.status(403).json({ success: false, error: 'API - Invalid token' });
    var token = req.headers.authorization.slice(7);
    var decoded = verifyToken(token);
    if (decoded == false)
        return res.status(403).json({ success: false, error: 'API - Invalid token' });
    req.token = decoded;
    next();
});

// Authenticated services
routes.use('/services/', services);

export default routes;