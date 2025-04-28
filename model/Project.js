const express = require("express");
const sequelize = require("sequelize");

const Project = sequelize.define("Project", {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: sequelize.STRING,
        allowNull: false
    },
    
    tarefas: {
        type: sequelize.JSON,
        allowNull: true
    }
});

Project.sync({ force: false }).then(() => {
    console.log("Tabela de projetos sincronizada");
}).catch(err => {
    console.log(`Não foi possível sincronizar a tabela de projetos | ${err}`);
});

module.exports = Project;
