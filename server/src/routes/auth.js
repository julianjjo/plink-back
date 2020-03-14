import express from 'express';
import Auth from '../utils/auth';
import UserService from '../services/userService';
import db from '../models/index';
import Response from '../utils/response';

let router = express.Router();
let auth = new Auth();
let userService = new UserService(db);

/* POST login validate. */
router.post('/login', function (req, res, next) {
    let response = new Response(res);
    let {user} = req.body;
    userService.getByUsername(user).then(function (result) {
        if (result !== false) {
            let token = auth.sign(result);
            response.responseToken(token);
            return next();
        } else {
            response.responseNotFound("Not Found User");
            return next();
        }
    });
});

export default router;
