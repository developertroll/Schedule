const databaseDao = require('../database/databaseDAO.js');

exports.createTodo = async function(req, res){
    const { userIdx } = req.verifiedToken;
    const { contents, type } = req.body;
    console.log(userIdx, contents, type);

    if(!userIdx || !contents || !type){
        return res.status(400).send("Bad Request");
    }

    //contents 20글자 제한
    if(contents.length > 20){
        return res.status(400).send("Bad Request");
    }
    // type: do, decide, delete, delegate
    const validtype= ["do", "decide", "delete", "delegate"];
    if(!validtype.includes(type)){
        return res.status(400).send("Bad Request");
    }

    const insertTodoRow = await databaseDao.insertTodo(userIdx, contents, type);
    if(!insertTodoRow){
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send("Success");

};

exports.readTodo = async function(req, res){
    const {userIdx} = req.verifiedToken;
    const todos = {};
    const types = ["do", "decide", "delete", "delegate"];

    for(let type of types){
        let selectTodoByTypeRows = await databaseDao.selectTodoByType(userIdx, type);
        if(!selectTodoByTypeRows){
            return res.status(500).send("Internal Server Error");
        }
        todos[type]=selectTodoByTypeRows;
    }

    
    return res.status(200).send(todos);

}

exports.updateTodo = async function(req, res){
    const {userIdx} = req.verifiedToken;
    let { todoIdx, contents, status} = req.body;
    if(!userIdx || !todoIdx){
        return res.status(400).send("Bad Request");
    }

    if(!contents){
        contents = null;
    }
    if(!status){
        status = null;
    }

    const isVaildTodoRow = await databaseDao.selectVaildTodo(userIdx, todoIdx);
    if(!isVaildTodoRow){
        return res.status(400).send("Bad Request");
    }

    const updateTodoRow = await databaseDao.updateTodo(userIdx, todoIdx, contents, status);
    if(!updateTodoRow){
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send("Success");
}

exports.deleteTodo = async function(req, res){
    const {userIdx} = req.verifiedToken;
    const {todoIdx} = req.params;
    if(!userIdx || !todoIdx){
        return res.status(400).send("Bad Request");
    }
    const isVaildTodoRow = await databaseDao.selectVaildTodo(userIdx, todoIdx);
    if(!isVaildTodoRow){
        return res.status(400).send("Bad Request");
    }
    const deleteTodo = await databaseDao.deleteTodo(userIdx, todoIdx);
    if(!deleteTodo){
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send("Success");
};