const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const fs = require('fs')

const app = express();
const scoreboard = require('./scoreboard');

app.use(cors());
app.use(express.json());

app.use(logger);

const sortData = (data, property) => {
    let copy = [...data]
    return copy.sort(function(a,b){
        return b[property] - a[property]
    })
}

app.get('/scoreboard', (req,res) => {
    const sortedScoreboard = sortData(scoreboard, "score")
    res.send(sortedScoreboard);  

})

// gets the score and username of the last player
app.get('/scoreboard/current-player', (req,res) => {
    const id = scoreboard.length - 1
    res.send(scoreboard[id])
})

// updates the username of the last player
app.patch('/scoreboard/current-player', (req,res) => {
    const idx = scoreboard.length - 1;
    const updateUsername = scoreboard[idx]

    Object.assign(updateUsername, req.body)
    fs.writeFileSync("scoreboard.json", JSON.stringify(scoreboard));

    res.status(201).json(updateUsername)
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

app.patch('/scoreboard/:id', (req,res) => {
    const idx = req.params.id;
    const score = idx - 1
    const updateScore = scoreboard[score]

    Object.assign(updateScore, req.body)
    fs.writeFileSync("scoreboard.json", JSON.stringify(scoreboard));

    res.json(updateScore)
})




module.exports = app;