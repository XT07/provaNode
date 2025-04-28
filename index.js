const express = require("express");
const app = express();
const session = require("express-session");
const connection = require("./connection/connection");
const userController = require("./controller/userController");
const projectController = require("./controller/projectController");
const taskController = require("./controller/taskController");
const auth = require("./midleware/midleware");

connection
    .authenticate()
    .then(() => {
        console.log("Conectado ao db");
    })
    .catch(err => {
        console.log(`Erro ao tentar se conectar com o db | ${err}`);
    })

app.use(session({
    secret: "bem_secreto",
    cookie: {
        maxAge: 2592000000
    }
}))

app.use(express.json());

app.use("/", userController);
app.use("/", auth, projectController);
app.use("/", auth, taskController);

app.listen(8080, () => {
    console.log("server on");
})