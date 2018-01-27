import World from './World';
import Player from './Player';
import Goblin from './enemies/Goblin';
import Imp from './enemies/Imp';
import AI from './AI';
import Renderer from './Renderer';
import TurnSystem from './TurnSystem';
import MouseEvents from "./MouseEvents";
import UI from "./UI";
import RAF from "./RAF";
import OrcArcher from "./enemies/OrcArcher";

let nextLevelDifficulty = 1.2;
let visibleEndTile = true;

let world;
let map;
let turnSystem;
let player;
let enemies;
let lvl;

const ai = new AI();
const mouseEvents = new MouseEvents();

const enemiesCount = {
  "Goblins": 3,
  "Imps": 3,
  "Orc Archers": 3,
};

function newWorldLevel(n) {
  lvl = n;
  world = new World();
  world.setLevel(n);
  Renderer.drawTextCenter('Level ' + n);
  map = world.getMap();
  turnSystem = new TurnSystem();
  player = new Player();
  player.health = Math.round(50 - nextLevelDifficulty * 2 / 1.2 * 10);
  UI.updateUI(player, turnSystem);
  enemies = [];
  if (visibleEndTile) {
    Renderer.drawEndTile(world.endTileCords.x * 32 + 16, world.endTileCords.y * 32 + 16);
  }
  setTimeout(init, 700);
}

window.setDifficulty = (n) => {
  nextLevelDifficulty = n * 1.2 / 2;
  document.querySelector('.difficulty').style.display = 'none';
  newWorldLevel(1);
  RAF.start(refreshFrame);
};

window.setSpell = (n, spell) => {
  player.spell = n;
  document.querySelectorAll('.spell').forEach(s => {
    s.style.border = '2px solid #562403'
  });
  spell.style.border = '2px solid #5b86e5';
};


function destroyEnemy(enemy) {
  world.removeFromWorld(enemy.x, enemy.y);
  setTimeout(() => {
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].id === enemy.id) {
        enemies.splice(i, 1);
      }
    }
  }, 300);
}

function spawnRandomEnemies() {
  spawnEnemy(Goblin);
  spawnEnemy(Imp);
  spawnEnemy(OrcArcher);

  function spawnEnemy(enemy) {

    let ec = enemiesCount[new enemy().name + 's'];
    const count = ec *= Math.round((Math.pow(nextLevelDifficulty, world.currentLevel)));
    for (let n = 0; n < count; n++) {
      let cords = world.getUniqueMapCords();

      const newEnemy = new enemy(cords.x * 32, cords.y * 32);
      enemies.push(newEnemy);
      world.updateUnit(newEnemy);
    }
  }
}

function init() {
  UI.updateUI(player, turnSystem);
  world.updateUnit(player);
  spawnRandomEnemies();
  ai.updateEnemies(enemies);
  mouseEvents.addListeners();
  turnSystem.addNextTurnAction(nextTurnActions);
  Renderer.drawUnit(player);
}

function refreshFrame() {
  Renderer.clear();
  Renderer.drawTerrain(world, map);
  Renderer.drawCircle(world.endTileCords.x * 32 + 16, world.endTileCords.y * 32 + 16, 16, 'blue');
  Renderer.drawEnemies(enemies);
  Renderer.drawUnit(player);
  mouseEvents.updateContext(map, player);
  Renderer.drawLightAroundPlayer(player);
  UI.updateUI(player, turnSystem);
}

function nextTurnActions() {
  checkIfPlayerWon();
  player.avaiableMoves = 3;
  player.avaiableAttacks = 3;
  if (player.mana < 10) {
    player.mana++;
  }
  ai.updateEnemies(enemies);
  ai.moveEnemiesToPlayer(player);
  setTimeout(() => ai.moveEnemiesToPlayer(player), 600);
  setTimeout(() => {
    ai.moveEnemiesToPlayer(player);
    enemies.forEach(enemy => {
      enemy.avaiableAttacks = 1;
      enemy.freezed = false;
    });
  }, 1200);


  checkIfPlayerHasDied();
}

window.restartLevel = function () {
  newWorldLevel(lvl);
};

function checkIfPlayerHasDied() {
  if (player.health <= 0) {
    setTimeout(() => player.frame = 3, 300);
    setTimeout(() => player.frame = 4, 600);

    setTimeout(() => {
      confirm("You have died. Try again.");
      window.location.reload();
    }, 1000)
  }
}

function checkIfPlayerWon() {
  if (player.x === world.endTileCords.x * 32 && player.y === world.endTileCords.y * 32) {
    newWorldLevel(world.currentLevel + 1);
  }
}

function movePlayer(keycode) {
  if (keycode === 37 || keycode === 65) {
    player.moveLeft();
  }
  else if (keycode === 39 || keycode === 68) {
    player.moveRight();
  }
  else if (keycode === 38 || keycode === 87) {
    player.moveUp();
  }
  else if (keycode === 40 || keycode === 83) {
    player.moveDown();
  }
}

document.addEventListener("keydown", (e) => {
  const keycode = e.keyCode;

  if (player.avaiableMoves > 0) {
    movePlayer(keycode);
  }
});

document.addEventListener("keydown", (e) => {
  const keycode = e.keyCode;
  if (keycode === 13 || keycode === 70) {
    turnSystem.nextTurn();
  }
});

// if(window.matchMedia("only screen and width(768px)")){
//   document.addEventListener("dblclick", (e) => {
//     turnSystem.nextTurn();
//   });
// }
//
// document.addEventListener('touchstart', handleTouchStart, false);
// document.addEventListener('touchmove', handleTouchMove, false);
//
// let xDown = null;
// let yDown = null;
//
// function handleTouchStart(evt) {
//   xDown = evt.touches[0].clientX;
//   yDown = evt.touches[0].clientY;
// }
//
// function handleTouchMove(evt) {
//   evt.preventDefault();
//   if (!xDown || !yDown || player.avaiableMoves < 1) {
//     return;
//   }
//
//   let xUp = evt.touches[0].clientX;
//   let yUp = evt.touches[0].clientY;
//
//   let xDiff = xDown - xUp;
//   let yDiff = yDown - yUp;
//
//   if (Math.abs(xDiff) > Math.abs(yDiff)) {
//     if (xDiff > 0) {
//       player.moveLeft();
//     } else {
//       player.moveRight();
//     }
//   } else {
//     if (yDiff > 0) {
//       player.moveUp();
//     } else {
//       player.moveDown();
//     }
//   }
//
//   xDown = null;
//   yDown = null;
// }

export {destroyEnemy, world, player};