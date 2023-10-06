const userDAO = require('../database/userDAO');
const jwt = require('jsonwebtoken');
const {jwtsecret} = require('../secretkey.js');

exports.signup = async function (req, res) {
    const {email, password, nickname} = req.body;
    if(!email || !password || !nickname){
        return res.status(400).send("Bad Request");
    }

    //이메일 정규표현식으로 체크
    // const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    // if(!emailRegex.test(email)){
    //     return res.status(400).send("Bad Request");
    // }

    // //비밀번호 정규식 8~12자 영문, 숫자 조합
    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,12}$/;
    // if(!passwordRegex.test(password)){
    //     return res.status(400).send("Bad Request");
    // }

    // if(nickname.length > 10 || nickname.length < 2){
    //     return res.status(400).send("Bad Request");
    // }
    // 이메일, 닉네임 중복체크
    const emailRows = await userDAO.selectUserEmail(email);
    if(emailRows.length > 0){
        return res.status(400).send("Bad Request");
    }
    const nicknameRows = await userDAO.selectUserNickname(nickname);
    if(nicknameRows.length > 0){
        return res.status(400).send("Bad Request");
    }


    // DB 입력
    const insertUserRow = await userDAO.insertUsers(email, password, nickname);
    if(!insertUserRow){
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send("Success");
}

exports.signin = async function (req, res) {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).send("Bad Request");
    }

    //회원여부 체크
    const emailRows = await userDAO.selectUserEmail(email);
    if(emailRows.length < 1){
        return res.status(400).send("Bad Request");
    }

    //비밀번호 체크
    if(emailRows[0].password != password){
        return res.status(400).send("Bad Request");
    }

    //jwt 발급
    const token = jwt.sign({
        userIdx: emailRows[0].userIdx
    }, jwtsecret);
    return res.status(200).send({token:token}); 


}

exports.getNicknameByToken = async function(req,res){
    const {userIdx} = req.verifiedToken;
    
    const nickName = await userDAO.selectUserNicknameByUserIdx(userIdx);

    return res.status(200).send({nickName:nickName});
    
}