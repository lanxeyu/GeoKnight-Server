
// Initialize difficulty scalers
let battleCounter = 6;
let enemyCount = 1;

// Initialize score
let score = 0;

// Initialize player object
const player = {
    maxHP: 1000,
    currHP: 1000,
    attack: 2,
    name: "player",
    
    displayStats() {
      console.log(`Player - Max HP: ${this.maxHP}, Current HP: ${this.currHP}, Attack: ${this.attack}`);
    }
};


// Create empty array to store enemies
let enemyArray = [];


// Class constructor for enemy objects
class Enemy {
    constructor(maxHP, attack, id) {
      this.maxHP = maxHP;
      this.currHP = maxHP;
      this.attack = attack;
      this.name = "enemy";
      this.id = `en${id}`;
    }

    displayStats() {
        console.log(
          `${this.name} - Health: ${this.health}, Attack: ${this.attack}`
        );
    }
}

// Create enemy elements for front end
function enemyElements(){
    const contDiv = document.createElement("div");
    contDiv.className = "char enemy";

    const enemySpan = document.createElement("span");

    const hp = document.createElement("div");
    hp.className = "healthbar";

    const dmg = document.createElement("div");
    dmg.className = "dmgstat";
    dmg.textContent = "0";

    contDiv.appendChild(enemySpan);
    contDiv.appendChild(hp);
    contDiv.appendChild(dmg);

    return contDiv;
}

// Create and add an enemy to the enemyArray
function createEnemy(maxHP, attack) {
    let len = enemyArray.length;

    const newEnemy = new Enemy(maxHP, attack, len);
    enemyArray.push(newEnemy);
    renderEnemy(len);
    // return newEnemy; // Optional return, might need later
}

// Render enemies on screen
function renderEnemy(len){
    // add id to enemy
    const enEl = enemyElements();
    enEl.id = `en${len}`;
    // render enemy dmg stat
    enEl.querySelector(".dmgstat").textContent = enemyArray[len].attack;
    // add to body
    document.body.appendChild(enEl);

}

// Increase number of enemies and enemy stats based on battleCounter 
function adjustDifficulty() {
    enemyCount = 1 + Math.floor(battleCounter * 0.5);
    enemyMaxHPMidpoint = 4 + Math.floor(battleCounter * 1.7);
    enemyAtkMidpoint = 2 + Math.floor(battleCounter * 1.4);
}


function getRandomInt(midpoint, range) {    // Added range parameter
    const min = midpoint - range;
    const max = midpoint + range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderPlayerAttack(){
    const dmgEl = document.querySelector(".player").querySelector(".dmgstat");
    dmgEl.textContent = player.attack;
}

function initBattlePhase() {
    renderPlayerAttack();
    adjustDifficulty();
    battleCounter += 1;
    // Create enemies dynamically based on difficulty
    for (let i = 0; i < enemyCount; i++) {
        createEnemy(getRandomInt(enemyMaxHPMidpoint, 2), getRandomInt(enemyAttackMidpoint, 2))
    }
}


function resolveAttack(player, enemy) {
    player.currHP -= getRandomInt(enemy.attack, 1)
    enemy.currHP -= getRandomInt(player.attack, 1)

    console.log(`GeoKnight dealt ${player.attack} damage to the enemy.`);
    console.log(`Enemy dealt ${enemyArray[0].attack} damage to the GeoKnight.`);
}


function checkZeroHP(object) {
    return object.currHP <= 0;
}

//sets healthbar width based on current hp values
function renderHP(object){
    let obj = "";

    if(object.id == "en0"){
        obj = object.id;
    }else if(object.name == "player"){
        obj = player.name;
    }

    const healthbar = document.getElementById(`${obj}`).querySelector(".healthbar");
    const hbWidth = Number(window.getComputedStyle(healthbar).width.substring(0,window.getComputedStyle(healthbar).width.length-2));

    // hp lost in relation to healthbar width
    lostHP = ((object.maxHP-object.currHP)/object.maxHP)*hbWidth;
    // styling health lost
    healthbar.style = `box-shadow: inset ${-lostHP}px 0 0 0 black,0px -5px 0 0 rgb(192, 0, 0) inset`;
}

// destroys html elements of enemy after death
function destroyEnemyElement(){
    const frontArray = enemyArray[0].id;
    document.querySelector(`#${frontArray}`).remove();
}

// function runBattlePhase() {
    // Event listener for the attack button
document.getElementById("attack-btn").addEventListener("click", () => {
    // If attack button is pressed, do the following
    resolveAttack(player,enemyArray[0]);

    // Renders change in HP
    renderHP(enemyArray[0]);
    renderHP(player);

    if (checkZeroHP(player)) {
        // player = null;
        console.log("GeoKnight has died!")
        // INSERT HERE: Go to "Lose/Score Display/Enter Your Name" screen


    } else if (checkZeroHP(enemyArray[0])) {
        console.log('Enemy has died!')
        // Remove enemy object from the enemyArray
        destroyEnemyElement();
        enemyArray.shift();

    }
        // If there are no more enemies
    if (enemyArray.length <= 0) {
        // INSERT HERE: Successful defense message. Then go to Fixing phase.
        console.log("GeoKnight has defeated the enemies!")
    }
    
});
// }

var enemyAttackMidpoint = 5;
var enemyMaxHPMidpoint = 10;
initBattlePhase();
// runBattlePhase()
