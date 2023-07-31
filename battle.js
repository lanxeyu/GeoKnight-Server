
// Initialize difficulty scalers
let battleCounter = 0;
let enemyStatScaler = battleCounter * 1.1;
let enemyCountScaler = battleCounter * 1.5;

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
    enemyStatScaler = battleCounter * 1.1;
    enemyCountScaler = battleCounter * 1.5;
    enemyMaxHPMidpoint = xxx;
    enemyAtkMidpoint = xxx;
}


function initBattlePhase() {
    adjustDifficulty();
    // Increment battleCounter, used to increase difficulty as more cycles occur
    battleCounter += 1;

    // INSERT HERE: function to draw the battle phase screen
   
    
    // Create enemies dynamically based on difficulty
}


function resolveAttack(player, enemy) {
    player.currHP -= enemyArray[0].atk
    enemyArray[0].currHP -= player.atk
}


function checkIfZeroHP(object) {
    if (object.currHP <= 0) {
      return true;
    } else {
      return false;
    }
}


function runBattlePhase() {
    // Event listener for the attack button
    document.getElementById("attack-btn").addEventListener("click", () => {
        // If attack button is pressed, do the following
        resolveAttack();

        if (checkIfZeroHP(player)) {
            player = null;

            // INSERT HERE: Go to "Losing/Score Display/Enter Your Name" screen
        }

        if (checkIfZeroHP(enemyArray[0])) {
            // Remove enemy object from the enemyArray
            enemyArray.shift();

            // If there are more enemies
            if (enemyArray.length <= 0) {
            
            
            // INSERT HERE: Successful defense message. Then go to Fixing phase.
            }
        }
    });
}


module.exports = {battle}