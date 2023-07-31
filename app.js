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

app.get('/scoreboard/:id', (req,res) => {
    const idx = req.params.id;
    const score = idx - 1
    res.send(scoreboard[score])
})

app.post('/scoreboard', (req,res) => {
    const newScore = req.body;
    newScore["id"] = scoreboard.length + 1;
    scoreboard.push(newScore);
    res.send(newScore);
})

module.exports = app;