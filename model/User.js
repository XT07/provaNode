const express = require("express");
const sequelize = require("sequelize");
const connection = require("../connection/connection");

const User = connection.define("Users", {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },

    senha: {
        type: sequelize.STRING,
        allowNull: false
    },

    projeto: {
        type: sequelize.STRING,
        allowNull: true
    },

    tarefa: {
        type: sequelize.STRING,
        allowNull: true
    }
})

User.sync({ force: false })
    .then(() => {
        console.log("Tabela usuários sincronizada com sucesso");
    })
    .catch(err => {
        console.log(`Não foi possivvel sincronizar a tabela de usuários`);
    });

module.exports = User;