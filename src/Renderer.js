const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

import RNG from "./RNG";
import RAF from "./RAF";
import sprites from '../assets/sprites/sprites.png';

// function toggleFullScreen() {
//   const doc = window.document;
//   const docEl = doc.getElementById('gameBox');
//
//   const requestFullScreen = docEl.webkitRequestFullScreen;
//   const cancelFullScreen = doc.webkitExitFullscreen;
//
//   if (!doc.webkitFullscreenElement) {
//     requestFullScreen.call(docEl);
//     document.removeEventListener('dblclick', toggleFullScreen);
//   }
//   else {
//     cancelFullScreen.call(doc);
//
//   }
// }
//
// document.addEventListener('dblclick', toggleFullScreen);
const tileSize = 32;

const images = {
  "wizard": 11,
  "goblin": 5,
  "imp": 7,
  "orc archer": 15,
  "rock": 3,
  "rock2": 4,
  "forest": 1,
  "forest2": 2,
};

let particles = [];

function imgFromBase64(base64) {
  const img = new Image();
  img.src = base64;
  return img;
}

class Renderer {
  static clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  static drawImage(image, x, y) {
    ctx.drawImage(imgFromBase64(sprites), (images[image]*tileSize -tileSize), 0, tileSize, tileSize, x, y, tileSize, tileSize);
  }

  static drawUnit(unit) {
    if (unit.lastX !== unit.x) {
      unit.lastX > unit.x ? unit.lastX -= 1 : unit.lastX += 1;
    }
    else if (unit.lastY !== unit.y) {
      unit.lastY > unit.y ? unit.lastY -= 1 : unit.lastY += 1;
    }

    if (unit.tick > 10 && unit.isMoving === true) {
      if (unit.frame === -1 || unit.frame === -2) {
        unit.frame === -1 ? unit.frame = -2 : unit.frame = -1;
      }
      else if (unit.frame === 1 || unit.frame === 2) {
        unit.frame === 1 ? unit.frame = 2 : unit.frame = 1;
      }
      unit.tick = 0;
    } else {
      unit.tick++;
    }

    ctx.save();
    let x = unit.lastX;
    let y = unit.lastY;
    if (unit.frame === -3) {
      ctx.scale(1, -1);
      y = -y - tileSize;
    }
    else if (unit.frame < 0) {
      ctx.scale(-1, 1);
      x = -x - tileSize;
    }
    else {
      ctx.scale(1, 1);
    }

    ctx.drawImage(imgFromBase64(sprites), (images[unit.name.toLowerCase()]*tileSize -tileSize) +Math.abs(unit.frame) * tileSize - tileSize, 0, tileSize, tileSize, x, y, tileSize, tileSize);
    ctx.restore();
  }

  static drawEnemies(enemies) {
    enemies.forEach((enemy) => {
      Renderer.drawUnit(enemy);
      if(enemy.freezed){
        Renderer.drawLine(enemy.x, enemy.y+tileSize, enemy.x+tileSize, enemy.y+tileSize, '#5b86e5', 5);
      }
    });
  }

  static drawTerrain(world, map) {
    world.terrainCords.forEach(cords => {
      Renderer.drawImage(world.mapData[map[cords.y][cords.x] - 1], cords.x * tileSize, cords.y * tileSize)
    });
  }

  static drawLightAroundPlayer(player) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1000;
    ctx.strokeStyle = "rgba(0,0,0,.96)";
    ctx.filter = 'blur(50px)';
    ctx.arc(player.lastX + 16, player.lastY + 16, 700, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  static drawLine(x1, y1, x2, y2, color, width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  static drawCircle(x1, y1, radius, color, width = 2) {
    ctx.beginPath();
    ctx.arc(x1, y1, radius, 0, Math.PI * 2);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  static drawHit(x, y) {
    let i = 0;
    RAF.addAnimation(() => {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(116, 193, 246, 0.86)';
      ctx.moveTo(26 + x, 11 + y);
      ctx.bezierCurveTo(6 + x, 12 + y, 28 + x, 37 + y, 21 + x, 29 + y);
      ctx.bezierCurveTo(20 + x, 28 + y, -7 + x, 8 + y, 25 + x - i++, 9 + y);
      ctx.fill();
      ctx.closePath();
    }, 50);
  }

  static drawStickAttack(player, x2, y2, color) {
    let n = 0;

    RAF.addAnimation(() => {
      ctx.lineWidth = 2;
      let stickOffset = player.frame < 0 ? 6 : 24;
      Renderer.drawLine(player.x + stickOffset, player.y + 3, x2 + 16, y2 + 16, color);
      ctx.strokeStyle = color;
      Renderer.drawCircle(x2 + 16, y2 + 16, 6 + n, color);
      Renderer.drawCircle(x2 + 16, y2 + 16, 4 + n / 2, color);
      Renderer.drawBlood(x2 + 16, y2 + 16);
      n += 0.5;
    }, 200)
  }

  static clearBloodParticles() {
    particles = [];
  }

  static drawBlood(x, y) {

    const gravity = 0.25;
    particles.push(new Particle(x, y, Math.random() * 5, RNG.range(-10, 10), RNG.range(-5, 5), Math.random()));

    for (let i = 0; i < particles.length; i++) {
      ctx.fillStyle = "rgba(255,0,0," + particles[i].decayRate + ")";
      ctx.fillRect(particles[i].position.x, particles[i].position.y, particles[i].size, particles[i].size);
      particles[i].position.x += particles[i].velocity.x;
      particles[i].position.y += particles[i].velocity.y;
      particles[i].velocity.x *= .18;
      particles[i].velocity.y *= .38;
      particles[i].velocity.y += gravity;
      particles[i].decayRate -= Math.random() * .01;


      if (particles[i].position.x > canvas.width || particles[i].position.x < 0) {
        particles[i].velocity.x *= -1;
      }


      if (particles[i].position.y > y + 16 || particles[i].position.y + particles[i].size < 0) {
        particles[i].velocity.y *= -.75;
      }

      if (particles[i].decayRate <= 0) {
        particles.splice(i, 1);
      }
    }

    function Particle(x, y, size, vx, vy, decayRate) {
      this.position = {x: x, y: y};
      this.size = size;
      this.velocity = {x: vx, y: vy};
      this.decayRate = decayRate;
    }
  }

  static drawText(x, y, fontSize, string, color) {
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.font = fontSize + ' sans-serif';
    ctx.fillText(string, x, y);
  }

  static drawEndTile(x, y) {
    Renderer.drawCircle(x, y, 16, 'darkblue');
    ctx.fillStyle = 'rgba(96, 104, 244,1)';
    ctx.fill();
    Renderer.drawText(x, y + 5, '15px', 'End', 'black');
  }

  static drawTextCenter(s) {
    RAF.addAnimation(() => {
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      Renderer.drawText(canvas.width / 2, canvas.height / 2, '50px', s, 'white');
      ctx.closePath();
    }, 1000);
  }

  static drawArrow(x, y, x2, y2, color, func = undefined) {

    let dX = (x - x2);
    let dY = (y - y2);
    while (Math.sqrt(dX * dX + dY * dY) > 25) {
      dX /= 2;
      dY /= 2;
    }
    ctx.lineWidth = 1;
    let n = 0;
    RAF.addAnimation(function arrowHit() {
      if (Math.sqrt(((x - x2) * (x - x2) + (y - y2) * (y - y2))) > 10) {
        Renderer.drawLine(x + 16, y + 16, x + 16 - dX, y + 16 - dY, color);
        x -= dX / 3;
        y -= dY / 3;
      }
      if(func !== undefined){
        Renderer.drawCircle(x + 16, y + 16, 4 + n, 'orange');
        Renderer.drawCircle(x + 16, y + 16, 3 + n / 2, 'orange', 1);
        n += 0.2;
      }
    }, 1000);
  }

  static boom(x, y, n){
    Renderer.drawCircle(x + 16, y + 16, 6 + n, 'orange', 2);
    Renderer.drawCircle(x + 16, y + 16, 2 + n / 2, 'red', 1);
  }
}

export default Renderer;