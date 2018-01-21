const health = document.getElementById('health');
const mana = document.getElementById('mana');
const turn = document.getElementById('turn');

class UI {
  static updateUI(player, turnSystem){
    health.innerText = player.health;
    mana.innerText = player.mana;
    turn.innerText = `Turn: ${turnSystem.turn} Moves left: ${player.avaiableMoves} Attacks left: ${player.avaiableAttacks}`;
  }
}

export default UI;