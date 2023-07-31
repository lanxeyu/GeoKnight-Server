
// Initialize difficulty scalers
var battleCounter = 0;
var enemyCount = 1;
var enemyMaxHPMidpoint = 8;
var enemyAttackMidpoint = 3;

// Initialize score
var score = 0;

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
var enemyArray = [];


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
    enemyAttackMidpoint = 2 + Math.floor(battleCounter * 1.4);
}


// For generating random enemy stats based on a range from the midpoint
function getRandomInt(midpoint) {
    const min = midpoint - 2;
    const max = midpoint + 2;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Initialize battle phase
function initBattlePhase() {
    adjustDifficulty();
    battleCounter += 1;
   
    // Create enemies dynamically based on difficulty
    for (let i = 0; i < enemyCount; i++) {
        createEnemy(getRandomInt(enemyMaxHPMidpoint), getRandomInt(enemyAttackMidpoint))
    }
}


// Damage calculations for attack action
function resolveAttack(player, enemy) {
    player.currHP -= enemy.attack
    enemy.currHP -= player.attack

    console.log(`GeoKnight dealt ${player.attack} damage to the enemy.`)
    console.log(`Enemy dealt ${enemy.attack} damage to the GeoKnight.`)
}


function checkZeroHP(object) {
    return object.currHP <= 0;
}


function runBattlePhase() {
    // Event listener for the attack button
    document.getElementById("attack-btn").addEventListener("click", () => {
        // If attack button is pressed, do the following
        resolveAttack(player, enemyArray[0]);

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


initBattlePhase();
runBattlePhase();