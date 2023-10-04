const {pool} = require('./database.js');

exports.insertUsers = async function(email, password, nickname){
    try{
        const connection = await pool.getConnection(async conn => conn);
        try{
            const insertUserQuery = 
            "insert into users (email, password, nickname) values (?, ?, ?)";
            const insertUserParam = [email, password, nickname];
            const [row] = await connection.query(insertUserQuery, insertUserParam);
            connection.release();
            return row;
        }catch(err){
            console.log("Query Error");
            connection.release();
            return false;
        }
    }catch{
        console.log("insertUsers Error");
        return false;
    }
}

exports.selectUserEmail = async function(email){
    try{
        const connection = await pool.getConnection(async conn => conn);
        try{
            const selectUserEmailQuery = 
            "select * from users where email = ?";
            const selectUserEmailParam = [email];
            const [rows] = await connection.query(selectUserEmailQuery, selectUserEmailParam);
            connection.release();
            return rows;
        }catch(err){
            console.log("Query Error");
            connection.release();
            return false;
        }
    }catch{
        console.log("selectUserEmail Error");
        return false;
    }
}

exports.selectUserNickname = async function(nickname){
    try{
        const connection = await pool.getConnection(async conn => conn);
        try{
            const selectUserNicknameQuery = 
            "select * from users where nickname = ?";
            const selectUserNicknameParam = [nickname];
            const [rows] = await connection.query(selectUserNicknameQuery, selectUserNicknameParam);
            connection.release();
            return rows;
        }catch(err){
            console.log("Query Error");
            connection.release();
            return false;
        }
    }catch{
        console.log("selectUserNickname Error");
        return false;
    }
}

exports.selectUserNicknameByUserIdx = async function(userIdx){
    try{
        const connection = await pool.getConnection(async conn => conn);
        try{
            const selectUserNicknameByUserIdxQuery = 
            "select nickname from users where userIdx = ?";
            const selectUserNicknameByUserIdxParam = [userIdx];
            const [rows] = await connection.query(selectUserNicknameByUserIdxQuery, selectUserNicknameByUserIdxParam);
            connection.release();
            return rows[0].nickname;
        }catch(err){
            console.log("Query Error");
            connection.release();
            return false;
        }
    }catch{
        console.log("selectUserNicknameByUserIdx Error");
        return false;
    }
}