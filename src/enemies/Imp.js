import Unit from "../Unit";

class Imp extends Unit {
  constructor(x, y) {
    super();
    this.name = 'Imp';
    this.description = " His attacks knocks back.";
    this.x = x;
    this.y = y;
    this.lastY = this.y;
    this.lastX = this.x;
    this.health = 9;
    this.attack = 1;
    this.range = 1;
  }
  performAttack(player){
    player.takeDamage(this.attack);
    this.avaiableAttacks -= 1;
    if(player.x === this.x){
      if(player.y > this.y){
        player.moveDown();
        player.avaiableMoves++;
        this.moveDown();
        this.frame = -3;
      }
      else {
        player.moveUp();
        player.avaiableMoves++;
        this.moveUp();
        this.frame = 3;
      }
    }
    else if (player.y === this.y){
      if(player.x > this.x){
        player.moveRight();
        player.avaiableMoves++;
        this.moveRight();
        this.frame = 4;
      }
      else {
        player.moveLeft();
        player.avaiableMoves++;
        this.moveLeft();
        this.frame = -4;
      }
    }

    setTimeout(()=> this.frame = -1, 500);
    return player;
  }
}

export default Imp;