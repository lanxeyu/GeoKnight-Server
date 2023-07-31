const express = require('express');
const cors = require('cors');
const logger = require('./logger');

const app = express();
const scoreboard = require('./scoreboard');

app.use(cors());
app.use(express.json());

app.use(logger);

app.get('/scoreboard', (req,res) => {
    res.send(scoreboard);
})

module.exports = app;