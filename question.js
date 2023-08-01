const questions = require('./questions.json');

var selectedLevel = "";

const levelsWeight = [
    { level: "level1", weight: 0.2 },
    { level: "level2", weight: 0.3 },
    { level: "level3", weight: 0.3 },
    { level: "level4", weight: 0.12 },
    { level: "level5", weight: 0.08 },
];

function getLevel(object) {
    var i;

    var weights = [object[0].weight];

    for (i = 1; i < object.length; i++)
        weights[i] = object[i].weight + weights[i - 1];
    
    var random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    
    return object[i].level;
}


selectedLevel = getLevel(levelsWeight)


const fs = require('fs');

function getQuestion(selectedLevel) {
  const questionsData = fs.readFileSync('questions.json', 'utf8');

  try {

    const questionsObject = JSON.parse(questionsData);

    const selectedArray = questionsObject[selectedLevel];

    
    const randomIndex = Math.floor(Math.random() * selectedArray.length);

    return selectedArray[randomIndex];
  } catch (error) {
    console.error('Error while fetching question:', error);
    return null;
  }
}

const selectedQuestion = getQuestion(selectedLevel);

console.log(selectedLevel);
console.log(selectedQuestion);