import Renderer from "./Renderer";
import {world} from './game';
import RAF from "./RAF";

let id = 0;

class Unit {
  constructor() {
    this.id = id++;
    this.avaiableMoves = 1;
    this.avaiableAttacks = 1;
    this.frame = 1;
    this.isMoving = false;
    this.tick = 10;
  }

  moveUp() {
    if (!world.isCollidingUp(this)) {
      this.updateLastPosition();
      this.y -= 32;
      this.afterMove();
    }
  }

  moveDown() {
    if (!world.isCollidingDown(this)) {
      this.updateLastPosition();
      this.y += 32;
      this.afterMove();
    }
  }

  moveLeft() {
    if (!world.isCollidingLeft(this)) {
      this.updateLastPosition();
      this.x -= 32;
      this.frame = -1;
      this.afterMove();
    }
  }

  moveRight() {
    if (!world.isCollidingRight(this)) {
      this.updateLastPosition();
      this.x += 32;
      this.frame = 1;
      this.afterMove();
    }
  }

  afterMove() {
    this.isMoving = true;
    world.updateUnit(this);
    Renderer.drawUnit(this);
    setTimeout(() => this.isMoving = false, 400);
    this.avaiableMoves--;
  }

  updateLastPosition() {
    this.lastY = this.y;
    this.lastX = this.x;
  }

  revertMove() {
    this.x = this.lastX;
    this.y = this.lastY;
  }

  takeDamage(n) {
    this.health -= n;
    RAF.addAnimation(() => Renderer.drawBlood(this.lastX + 16, this.lastY + 16), 300);
    setTimeout(Renderer.clearBloodParticles, 300);
  }
}

export default Unit;