const express = require("express");
const routers = express.Router();
const controller = require("../controller/user_controller");

routers.post("/user",controller.createUser)
routers.get("/getAll",controller.getAlluser)
routers.get("/:id", controller.getUserById)
routers.put("/:id", controller.userUpdate)
routers.delete("/:id", controller.delete)
routers.delete("/", controller.deleteAll)

module.exports = routers