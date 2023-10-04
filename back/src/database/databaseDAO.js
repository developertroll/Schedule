const {pool} = require('./database.js');

exports.getUserRows = async function(){
    try{
        const connection = await pool.getConnection(async conn => conn);
        try{
            const [rows] = await connection.query("SELECT * FROM user");
            connection.release();
            return rows;
        }catch(err){
            console.log("Query Error");
            connection.release();
            return false;
        }
    }catch{
        console.log("getUserData Error");
        return false;
    }
};


exports.insertTodo = async function(userIdx, contents, type){
try{
const connection = await pool.getConnection(async conn => conn);
try{
    const insertTodoQuery = 
    "insert into Todos (userIdx, contents, type) values (?, ?, ?)";
    const insertTodoParam = [userIdx, contents, type];
    const [row] = await connection.query(insertTodoQuery, insertTodoParam);
    connection.release();
    return row;
}catch(err){
    console.log("Query Error");
    connection.release();
    return false;
}
}catch{
    console.log("insertTodo Error");
    return false;
}
};

exports.selectTodoByType = async function(userIdx, type){
    try{
        const connection = await pool.getConnection(async conn => conn);
        try{
            const selectTodoByTypeQuery = 
            "select todoIdx, contents, status from Todos where userIdx = ? and type = ? and not(status='D');";
            const selectTodoByTypeParam = [userIdx, type];
            const [rows] = await connection.query(selectTodoByTypeQuery, selectTodoByTypeParam);
            connection.release();
            return rows;
        }catch(err){
            console.log("Query Error");
            connection.release();
            return false;
        }

    }catch{
        console.log("selectTodoByType Error");
        return false;
    }
}

exports.selectVaildTodo = async function(userIdx, todoIdx){
    try{
        const connection = await pool.getConnection(async conn => conn);
        try{
            const selectTodoByTypeQuery = 
            "select * from Todos where userIdx = ? and todoIdx = ? and not(status='D');";
            const selectTodoByTypeParam = [userIdx, todoIdx];
            const [rows] = await connection.query(selectTodoByTypeQuery, selectTodoByTypeParam);
            connection.release();
            return rows;
        }catch(err){
            console.log("Query Error");
            connection.release();
            return false;
        }
    }catch(err){
        console.log("isVaildTodo Error");
        return false;
    }
};

exports.updateTodo = async function(userIdx, todoIdx, contents, status){
    try{
        const connection = await pool.getConnection(async conn => conn);
        try{
            const updateTodoQuery = 
            "update Todos set contents = ifnull(?, contents), status = ifnull(?, status) where userIdx = ? and todoIdx = ?;";
            const updateTodoParam = [contents, status, userIdx, todoIdx];
            const [rows] = await connection.query(updateTodoQuery, updateTodoParam);
            connection.release();
            return rows;
        }catch(err){
            console.log("Query Error");
            connection.release();
            return false;
        }
    }catch(err){
        console.log("updateTodo Error");
        return false;
    }

}

exports.deleteTodo = async function(userIdx, todoIdx){
    try{
        const connection = await pool.getConnection(async conn => conn);
        try{
            const deleteTodoQuery = 
            "update Todos set status = 'D' where userIdx = ? and todoIdx = ?;";
            const deleteTodoParam = [userIdx, todoIdx];
            const [rows] = await connection.query(deleteTodoQuery, deleteTodoParam);
            connection.release();
            return rows;
        }catch(err){
            console.log("Query Error");
            connection.release();
            return false;
        }
    }catch(err){
        console.log("deleteTodo Error");
        return false;
    }
}