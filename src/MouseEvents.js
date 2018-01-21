import Player from "./Player";
import Renderer from "./Renderer";
import Unit from "./Unit";
import {destroyEnemy} from "./game";
import {player} from './game';
import {world} from './game';
import RAF from "./RAF";

const game = document.getElementById('game');
const infoHolder = document.getElementById('infoHolder');

class MouseEvents {
  updateContext(map, player) {
    this.map = map;
  }

  addListeners() {
    document.addEventListener("mousemove", (e) => {
      this.getCursorCordsAndDistance(e);
      if(this.distanceFromPlayer !== undefined)
        this.enableActionsBasedOnDistance(e);
    });
    document.addEventListener("click", () => this.attack());
    game.addEventListener('contextmenu', (e) => this.showUnitInfo(e));
    window.addEventListener('click', () => infoHolder.style.display = 'none');
  }

  getCursorCordsAndDistance(e) {
    const rect = game.getBoundingClientRect();

    let ratioX = rect.width / 30;
    let ratioY = rect.height / 20;

    this.x = Math.floor((e.clientX - rect.left) / ratioX);
    this.y = Math.floor((e.clientY - rect.top) / ratioY);

    if (this.x >= 0 && this.y >= 0 && this.x < 30 && this.y < 20) {
      this.distanceFromPlayer = Math.floor(Math.sqrt(Math.pow(player.x / 32 - this.x, 2) + Math.pow(player.y / 32 - this.y, 2)));
    }
    else {
      this.distanceFromPlayer = undefined;
    }
  }

  enableActionsBasedOnDistance(e) {
    const tileData = this.map[this.y][this.x];
    if (tileData instanceof Unit && !(tileData instanceof Player)) {
      player.canCastSpell = this.distanceFromPlayer <= 4 && player.mana >= player.spell;
      player.canAttackWithSword = this.distanceFromPlayer <= player.range && player.avaiableAttacks > 0;
    }
    else {
      player.canAttackWithSword = false;
      player.canCastSpell = false;
    }

    if (player.canAttackWithSword) {
      game.style.cursor = 'url(' + require('../assets/sprites/sword.png') + '), auto';
    }
    else if (player.canCastSpell) {
      game.style.cursor = 'url(' + require('../assets/sprites/stick.png') + '), auto';
    }
    else {
      game.style.cursor = 'default';
    }
  }

  attack() {
    if (player.canAttackWithSword || player.canCastSpell) {

      let unit = this.map[this.y][this.x];
      if (unit instanceof Unit && !(unit instanceof Player)) {
        if (player.canAttackWithSword) {
          Renderer.drawHit(this.x * 32, this.y * 32);
          unit.takeDamage(player.attack);
          player.avaiableAttacks--;
        }
        else {
          switch (player.spell) {
            case 3: {
              Renderer.drawStickAttack(player, unit.x, unit.y, '#5b86e5');
              unit.takeDamage(player.basicStickAttack);
              player.mana -= 3;
              break;
            }
            case 5: {
              Renderer.drawArrow(player.x, player.y, unit.x, unit.y, 'red', true);
              let n = 1;
              setTimeout(() => {
                const cords = [{x: unit.x, y: unit.y},{x: unit.x + 32, y: unit.y}, {x: unit.x, y: unit.y + 32}, {x: unit.x - 32, y: unit.y}, {x: unit.x, y: unit.y - 32}];
                RAF.addAnimation(() => {
                  cords.forEach((cords, i) => {
                    Renderer.boom(cords.x, cords.y, n);
                  });
                  n ++;
                }, 8);
                cords.forEach(cords => {
                  let unit = this.map[cords.y/32][cords.x/32];
                  if(unit instanceof Unit){
                    unit.takeDamage(99);
                    destroyEnemy(unit);
                  }
                  else {
                    world.removeFromWorld(cords.x, cords.y);
                  }
                });
              }, 300);
              player.mana -= 5;
              break;
            }
            case 2: {
              Renderer.drawArrow(player.x, player.y, unit.x, unit.y, '#5b86e5');
              setTimeout(() => {
                let n = 0;
                RAF.addAnimation(() => {
                  if(n<32){
                    unit.freezed = true;
                    Renderer.drawLine(unit.x, unit.y+32, unit.x+n, unit.y+32, '#5b86e5', 5);
                    n++;
                  }
                }, 100);
              }, 300);
              player.mana -= 2;
            }
          }
        }

        world.updateUnit(unit);

        if (unit.health <= 0) {
          destroyEnemy(unit);
        }
      }
    }
  }


  showUnitInfo(e) {
    e.preventDefault();
    const rect = game.getBoundingClientRect();

    let unit = this.map[this.y][this.x];
    if (unit instanceof Unit) {
      RAF.addAnimation(() => Renderer.drawCircle(unit.x+16, unit.y+16, unit.range*32+16, 'rgb(206, 57, 57)'), 1000);
      infoHolder.innerHTML = '';
      infoHolder.style.display = 'block';
      const h3 = document.createElement('h2');
      h3.innerHTML = unit.name;
      infoHolder.appendChild(h3);
      const p = document.createElement('p');
      p.innerText = `${unit.description} \n
                     Health: ${unit.health} \n 
                     Attack: ${unit.attack} \n 
                     Range: ${unit.range} \n`;
      infoHolder.appendChild(p);
      let top = e.clientY - infoHolder.offsetHeight - 10;
      if (top < 0) {
        top += infoHolder.offsetHeight + 10;
      }
      let left = e.clientX + 10;
      if(left - rect.left + infoHolder.offsetWidth > rect.width){
        left -= infoHolder.offsetWidth + 30;
      }
      infoHolder.style.top = top + 'px';
      infoHolder.style.left = left + 'px';
      infoHolder.focus();
    }
  }
}

export default MouseEvents;