
// Initialize difficulty scalers
let battleCounter = 0;
let enemyCount = 1;

// Initialize score
let score = 0;

// Initialize player object
const player = {
    maxHP: 10,
    currHP: 10,
    attack: 2,
    
    displayStats() {
      console.log(`Player - Max HP: ${this.maxHP}, Current HP: ${this.currHP}, Attack: ${this.attack}`);
    }
};


// Create empty array to store enemies
let enemyArray = [];


// Class constructor for enemy objects
class Enemy {
    constructor(maxHP, attack) {
      this.maxHP = maxHP;
      this.currHP = maxHP;
      this.attack = attack;
    }

    displayStats() {
        console.log(
          `${this.name} - Health: ${this.health}, Attack: ${this.attack}`
        );
    }
}


// Create and add an enemy to the enemyArray
function createEnemy(maxHP, attack) {
    const newEnemy = new Enemy(maxHP, attack);
    enemyArray.push(newEnemy);
    // return newEnemy; // Optional return, might need later
}


// Increase number of enemies and enemy stats based on battleCounter 
function adjustDifficulty() {
    enemyCount = 1 + Math.floor(battleCounter * 0.5);
    enemyMaxHPMidpoint = 4 + Math.floor(battleCounter * 1.7);
    enemyAtkMidpoint = 2 + Math.floor(battleCounter * 1.4);
}


function getRandomInt(midpoint) {
    const min = midpoint - 2;
    const max = midpoint + 2;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function initBattlePhase() {
    adjustDifficulty();
    battleCounter += 1;
   
    // Create enemies dynamically based on difficulty
    for (let i = 0; i < enemyCount; i++) {
        createEnemy(getRandomInt(enemyMaxHPMidpoint), getRandomInt(enemyAttackMidpoint))
    }
}


function resolveAttack(player, enemy) {
    player.currHP -= enemyArray[0].atk
    enemyArray[0].currHP -= player.atk

    console.log(`GeoKnight dealt ${player.atk} damage to the enemy.`)
    console.log(`Enemy dealt ${enemyArray[0].atk} damage to the GeoKnight.`)
}


function checkZeroHP(object) {
    return object.currHP <= 0;
}


function runBattlePhase() {
    // Event listener for the attack button
    document.getElementById("attack-btn").addEventListener("click", () => {
        // If attack button is pressed, do the following
        resolveAttack();

        if (checkZeroHP(player)) {
            player = null;
            // INSERT HERE: Go to "Lose/Score Display/Enter Your Name" screen


        } else if (checkZeroHP(enemyArray[0])) {
            console.log('Enemy has died!')
            // Remove enemy object from the enemyArray
            enemyArray.shift();

            // If there are no more enemies
            if (enemyArray.length <= 0) {
                // INSERT HERE: Successful defense message. Then go to Fixing phase.
            }
        }
    });
}


module.exports = {battle}