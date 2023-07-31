/* PSEUDOCODE

connect to score API

cycle counter

create player object
    declare its properties / stats
    apply changes to the stats based on Fixing phase
create enemy object/s
    declare its properties / stats
    apply changes to the stats based on how many cycles has happened

create enemyArray containing all enemy objects

Event listener for the attack button
if attack btn is pressed
    hit()
        player.currHP -= enemy.atk
        enemyArray[0].currHP -= player.atk
        
    checkHP()
        if this.currHP == 0
        destroy object

    combatLog()
        create textcontent = You dealt x damage to enemy!
        You took 5 damage...
        Monster died!
        etc...

*/


