const indexController = require("../controller/indexController");
const {jwtMiddleware} = require("../jwtMiddleWare.js");

exports.indexRouter = function(app){
    app.post("/todo",jwtMiddleware, indexController.createTodo);
    app.get("/todos",jwtMiddleware, indexController.readTodo);
    app.patch("/todo",jwtMiddleware, indexController.updateTodo);
    app.delete("/todo/:todoIdx",jwtMiddleware, indexController.deleteTodo);
}