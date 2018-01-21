import Unit from './Unit';

class Player extends Unit {

  constructor() {
    super();
    this.y = 19*32;
    this.x = 0;
    this.lastY = this.y;
    this.lastX = this.x;
    this.name = 'Wizard';
    this.description = 'You.';
    this.health = 99;
    this.mana = 10;
    this.attack = 3;
    this.range = 1;
    this.basicStickAttack = 6;
    this.avaiableMoves = 3;
    this.avaiableAttacks = 3;
    this.spell = 3;
  }
}

export default Player;



