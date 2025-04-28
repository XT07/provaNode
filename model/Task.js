const express = require("express");
const sequelize = require("sequelize");

const Task = sequelize.define("Task", {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    
    descricao: {
        type: sequelize.STRING,
        allowNull: false
    },

    responsavel: {
        type: sequelize.INTEGER,
        allowNull: false
    },

    projetoVinc: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Task.sync({ force: false }).then(() => {
    console.log("Tabela das tarefas sincronizada");
}).catch(err => {
    console.log(`Erro ao tentar sincronizar a tabela das tarefas | ${err}`);
});

module.exports = Task;