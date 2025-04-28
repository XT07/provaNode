const express = require("express");
const rout = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const auth = require("../midleware/midleware");

let salt = bcrypt.genSaltSync(10);
let secret_key = "bem_secreto_mesmo";

rout.post("/login", (req, res) => {
    let { nome, senha } = req.body;

    User.findOne({ where: { nome: nome } }).then(user => {
        if (!user) {
            return res.status(404).send("Usuário não encontrado");
        }

        let verific = bcrypt.compareSync(senha, user.senha);

        if (verific) {
            const token = jwt.sign({ nome }, secret_key, { expiresIn: "1h" });
            req.session.user = {
                id: user.id,
                nome: user.nome,
                projeto: user.projeto,
                tarefa: user.tarefa
            };

            res.status(200).json(req.session.user.id, token);
        } else {
            res.status(401).send("Nome de usuário ou senha incorretos");
        }
    }).catch(err => {
        res.status(500).send(`Erro no login | ${err}`);
    });
});

rout.post("/register", async (req, res) => {
    let { nome, senha } = req.body;

    try {
        let incripSenha = await bcrypt.hashSync(senha, salt);

        User.create({
            nome: nome,
            senha: incripSenha
        }).then(() => {
            res.status(201).send("Usuário criado com sucesso");
        }).catch(err => {
            res.status(400).send(`Erro ao criar o usuário | ${err}`);
        });
    } catch (err) {
        res.status(400).send(`Erro ao tentar criar o usuário | ${err}`);
    }
});

rout.get("/users", auth, (req, res) => {
    User.findAll().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).send(`Erro ao listar usuários | ${err}`);
    });
});

rout.get("/user/:id", auth, (req, res) => {
    let { id } = req.params;

    User.findByPk(id).then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("Usuário não encontrado");
        }
    }).catch(err => {
        res.status(500).send(`Erro ao buscar usuário | ${err}`);
    });
});

rout.put("/user/:id", auth, async (req, res) => {
    let { id } = req.params;
    let { nome, senha } = req.body;

    try {
        let user = await User.findByPk(id);

        if (user) {
            let incripSenha = await bcrypt.hashSync(senha, salt);

            user.update({
                nome: nome,
                senha: incripSenha
            }).then(() => {
                res.status(200).send("Usuário atualizado com sucesso");
            }).catch(err => {
                res.status(400).send(`Erro ao atualizar usuário | ${err}`);
            });
        } else {
            res.status(404).send("Usuário não encontrado");
        }
    } catch (err) {
        res.status(500).send(`Erro ao tentar atualizar usuário | ${err}`);
    }
});

rout.delete("/user/:id", auth, (req, res) => {
    let { id } = req.params;

    User.destroy({ where: { id: id } }).then(deleted => {
        if (deleted) {
            res.status(200).send("Usuário deletado com sucesso");
        } else {
            res.status(404).send("Usuário não encontrado");
        }
    }).catch(err => {
        res.status(500).send(`Erro ao tentar deletar usuário | ${err}`);
    });
});

module.exports = rout;