import Unit from '../Unit';
import Renderer from "../Renderer";

class OrcArcher extends Unit {
  constructor(x, y) {
    super();
    this.name = 'Orc Archer';
    this.description = " Can attack from distance.";
    this.x = x;
    this.y = y;
    this.lastY = this.y;
    this.lastX = this.x;
    this.health = 3;
    this.attack = 3;
    this.range = 4;
  }
  performAttack(player){
    player.takeDamage(this.attack);
    this.avaiableAttacks -= 1;
    Renderer.drawArrow(this.x, this.y, player.x, player.y, 'black');
    return player;
  }
}

export default OrcArcher;