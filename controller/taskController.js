const express = require("express");
const rout = express.Router();
const Task = require("../model/Task");

rout.post("/task", (req, res) => {
    let { nome, descricao, responsavel, projetoVinc } = req.body;

    Task.create({
        nome: nome,
        descricao: descricao,
        responsavel: responsavel,
        projetoVinc: projetoVinc
    }).then(() => {
        res.status(200).send("Tarefa criada com sucesso");
    }).catch(err => {
        res.status(400).send(`Erro ao criar tarefa | ${err}`);
    });
});

rout.get("/tasks", (req, res) => {
    Task.findAll().then(tasks => {
        res.status(200).json(tasks);
    }).catch(err => {
        res.status(500).send(`Erro ao listar tarefas | ${err}`);
    });
});

rout.get("/task/:id", (req, res) => {
    let { id } = req.params;

    Task.findByPk(id).then(task => {
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).send("Tarefa não encontrada");
        }
    }).catch(err => {
        res.status(500).send(`Erro ao buscar tarefa | ${err}`);
    });
});

rout.put("/task/:id", (req, res) => {
    let { id } = req.params;
    let { nome, descricao, responsavel, projetoVinc } = req.body;

    Task.findByPk(id).then(task => {
        if (task) {
            task.update({
                nome: nome,
                descricao: descricao,
                responsavel: responsavel,
                projetoVinc: projetoVinc
            }).then(() => {
                res.status(200).send("Tarefa atualizada com sucesso");
            }).catch(err => {
                res.status(400).send(`Erro ao atualizar tarefa | ${err}`);
            });
        } else {
            res.status(404).send("Tarefa não encontrada");
        }
    }).catch(err => {
        res.status(500).send(`Erro ao tentar atualizar tarefa | ${err}`);
    });
});

rout.delete("/task/:id", (req, res) => {
    let { id } = req.params;

    Task.destroy({ where: { id: id } }).then(deleted => {
        if (deleted) {
            res.status(200).send("Tarefa deletada com sucesso");
        } else {
            res.status(404).send("Tarefa não encontrada");
        }
    }).catch(err => {
        res.status(500).send(`Erro ao tentar deletar tarefa | ${err}`);
    });
});

module.exports = rout;