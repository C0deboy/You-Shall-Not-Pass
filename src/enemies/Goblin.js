import Unit from '../Unit';
import Renderer from "../Renderer";

class Goblin extends Unit {
  constructor(x, y) {
    super();
    this.name = 'Goblin';
    this.description = "Basic attacks.";
    this.x = x;
    this.y = y;
    this.lastY = this.y;
    this.lastX = this.x;
    this.health = 6;
    this.attack = 3;
    this.range = 1;
  }
  performAttack(player){
    this.avaiableAttacks -= 1;
    Renderer.drawHit(player.x, player.y);
    player.takeDamage(this.attack);
    return player;
  }
}

export default Goblin;