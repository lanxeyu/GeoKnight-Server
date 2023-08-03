const express = require('express');
const cors = require('cors')
const fs = require('fs')

const scoreboard = require('./scoreboard');
const questions = require('./questions.json')
const logger = require('./logger')

const app = express();

app.use(cors())
app.use(express.json())
app.use(logger) 



app.get('/', (req, res) => {
    res.send(questions)
})


app.get('/levels', (req, res) => {
    const categories = questions.map((levelData) => Object.keys(levelData)[0]);

    res.send(categories);
  });

app.get('/levels/easy', (req, res) => {
    const easyQuestions = questions.find(levelData => levelData.hasOwnProperty('easy'));
    if (easyQuestions) {
        res.send(easyQuestions.easy);
    } else {
        res.status(404).send("No questions found for the 'easy' level.");
    }
});

app.get('/levels/easy/random', (req, res) => {
    const easyLevel = questions.find(levelData => levelData.hasOwnProperty('easy'))
    if (easyLevel) {
        const easyQuestions = easyLevel.easy;
        const randIdx = Math.floor(Math.random() * easyQuestions.length);
        let randomQuestion = {... easyQuestions[randIdx]}
        res.send(randomQuestion);
    } else {
        res.status(404).send("No questions found for the 'easy' level.");
    }
})

app.get('/levels/medium', (req, res) => {
    const medQuestions = questions.find(levelData => levelData.hasOwnProperty('medium'));
    if (medQuestions) {
        res.send(medQuestions.medium);
    } else {
        res.status(404).send("No questions found for the 'medium' level.");
    }
});

app.get('/levels/medium/random', (req, res) => {
    const medLevel = questions.find(levelData => levelData.hasOwnProperty('medium'))
    if (medLevel) {
        const medQuestion = medLevel.medium;
        const randIdx = Math.floor(Math.random()*medQuestion.length);
        let randomQuestion = {... medQuestion[randIdx]}
        res.send(randomQuestion);
    } else {
        res.status(404).send("No questions found for the 'medium' level.");
    }
})

app.get('/levels/hard', (req, res) => {
    const hardQuestions = questions.find(levelData => levelData.hasOwnProperty('hard'));
    if (hardQuestions) {
        res.send(hardQuestions.hard);
    } else {
        res.status(404).send("No questions found for the 'hard' level.");
    }
});

app.get('/levels/hard/random', (req, res) => {
    const hardLevel = questions.find(levelData => levelData.hasOwnProperty('hard'))
    if (hardLevel) {
        const hardQuestion = hardLevel.hard;
        const randIdx = Math.floor(Math.random()*hardQuestion.length);
        let randomQuestion = {... hardQuestion[randIdx]}
        res.send(randomQuestion);
    } else {
        res.status(404).send("No questions found for the 'hard' level.");
    }
})

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