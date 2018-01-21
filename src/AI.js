import {world} from "./game";

class AI {

  updateEnemies(enemies) {
    this.enemies = enemies;
  }

  moveEnemiesToPlayer(player) {
    this.player = player;

    this.enemies.forEach((enemy) => {
      let dX = enemy.x - player.x;
      let dY = enemy.y - player.y;

      let left = dX >= 0;
      let down = dY <= 0;

      dX = Math.abs(dX);
      dY = Math.abs(dY);

      const distanceFromPlayer = this.getDistanceFromPlayer(enemy);

      if (distanceFromPlayer <= enemy.range) {
        if(enemy.range > 1){
          this.tryToAttack(enemy);
          return 0;
        }
        else {
          if(dX === 0 || dY === 0){
            this.tryToAttack(enemy);
            return 0;
          }
        }
      }
      if (this.getDistanceFromPlayer(enemy) < 9 && !enemy.freezed) {

        if (left && down) {
          if (dX >= dY && !world.isCollidingLeft(enemy)) {
            enemy.moveLeft();
          }
          else {
            if (!world.isCollidingDown(enemy))
              enemy.moveDown();
            else if (!world.isCollidingLeft(enemy))
              enemy.moveLeft();
          }
        }

        else if (left && !down) {
          if (dX >= dY && !world.isCollidingLeft(enemy)) {
            enemy.moveLeft();
          }
          else {
            if (!world.isCollidingUp(enemy))
              enemy.moveUp();
            else if (!world.isCollidingLeft(enemy))
              enemy.moveLeft();
          }
        }

        else if (!left && !down) {
          if (dX >= dY && !world.isCollidingRight(enemy)) {
            enemy.moveRight();
          }
          else {
            if (!world.isCollidingUp(enemy))
              enemy.moveUp();
            else if (!world.isCollidingRight(enemy))
              enemy.moveRight();
          }
        }

        else if (!left && down) {
          if (dX >= dY && !world.isCollidingRight(enemy)) {
            enemy.moveRight();
          }
          else {
            if (!world.isCollidingDown(enemy))
              enemy.moveDown();
            else if (!world.isCollidingRight(enemy))
              enemy.moveRight();
          }
        }
        setTimeout(() => this.tryToAttack(enemy), 300);
      }
    });
  }

  getDistanceFromPlayer(enemy) {
    return Math.floor(Math.sqrt(Math.pow(this.player.x / 32 - enemy.x / 32, 2) + Math.pow(this.player.y / 32 - enemy.y / 32, 2)));
  }

  tryToAttack(enemy) {
    if (this.getDistanceFromPlayer(enemy) <= enemy.range && enemy.avaiableAttacks > 0) {
      this.player = enemy.performAttack(this.player);
      world.updateUnit(this.player);
      world.updateUnit(enemy);
    }
  }
}

export default AI;
