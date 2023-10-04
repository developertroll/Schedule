//로그인 체크

const jwt = require('jsonwebtoken');
const {jwtsecret} = require('./secretkey.js');

exports.jwtMiddleware = async function (req, res, next) {
    const token = req.headers['x-access-token'] || req.query.token || req.body.token;

    if(!token){
        return res.status(401).send("Unauthorized");
    }
    try{
        const verifiedToken = jwt.verify(token, jwtsecret);
        req.verifiedToken = verifiedToken;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).send("Unauthorized");
    }
}