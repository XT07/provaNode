const express = require("express");
const rout = express.Router();
const Project = require("../model/Project");

rout.post("/project", (req, res) => {
    let { titulo, descricao, tarefas } = req.body;

    Project.create({
        titulo: titulo,
        descricao: descricao,
        tarefas: tarefas || []
    }).then(() => {
        res.status(200).send("Projeto criado com sucesso");
    }).catch(err => {
        res.status(400).send(`Erro ao criar projeto | ${err}`);
    });
});

rout.get("/projects", (req, res) => {
    Project.findAll().then(projects => {
        res.status(200).json(projects);
    }).catch(err => {
        res.status(500).send(`Erro ao listar projetos | ${err}`);
    });
});

rout.get("/project/:id", (req, res) => {
    let { id } = req.params;

    Project.findByPk(id).then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).send("Projeto não encontrado");
        }
    }).catch(err => {
        res.status(500).send(`Erro ao buscar projeto | ${err}`);
    });
});

rout.put("/project/:id", (req, res) => {
    let { id } = req.params;
    let { titulo, descricao, tarefas } = req.body;

    Project.findByPk(id).then(project => {
        if (project) {
            project.update({
                titulo: titulo,
                descricao: descricao,
                tarefas: tarefas || []
            }).then(() => {
                res.status(200).send("Projeto atualizado com sucesso");
            }).catch(err => {
                res.status(400).send(`Erro ao atualizar projeto | ${err}`);
            });
        } else {
            res.status(404).send("Projeto não encontrado");
        }
    }).catch(err => {
        res.status(500).send(`Erro ao tentar atualizar projeto | ${err}`);
    });
});

rout.delete("/project/:id", (req, res) => {
    let { id } = req.params;

    Project.destroy({ where: { id: id } }).then(deleted => {
        if (deleted) {
            res.status(200).send("Projeto deletado com sucesso");
        } else {
            res.status(404).send("Projeto não encontrado");
        }
    }).catch(err => {
        res.status(500).send(`Erro ao tentar deletar projeto | ${err}`);
    });
});

module.exports = rout;