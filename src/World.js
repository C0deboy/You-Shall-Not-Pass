import RNG from "./RNG";

class World {
  constructor() {
    this.mapData = [
      'rock',
      'rock2',
      'forest',
      'forest2'
    ];
  }

  setLevel(n) {
    this.currentLevel = n;
    this.map = [20];
    for (let i = 0; i < 20; i++) {
      this.map[i] = new Array(30).fill(0);
    }

    this.map[19][0] = 99;

    const top = RNG.bool();

    this.endTileCords = {
      y: top ? 0 : RNG.range(0,19),
      x: top ? RNG.range(0,29) : 29
    };

    this.terrainCords = [];
    for (let j = 0; j < 5; j++) {
      let cords = this.getUniqueMapCords();
      this.map[cords.y][cords.x] = RNG.range(1, this.mapData.length);
      this.terrainCords.push(cords);
      let x = cords.x;
      let y = cords.y;
      for (let k = 0; k < 10; k++) {
        try {
          x -= RNG.pick([-1, 0, 0, 1]);
          y -= RNG.pick([-1, 0, 0, 1]);
          if (this.map[y][x] === 0) {
            this.map[y][x] = RNG.range(1, this.mapData.length);
            const newCords = [];
            newCords.x = x;
            newCords.y = y;
            this.terrainCords.push(newCords);
          }
        }
        catch (err) {
        }
      }
    }
  }

  getLevelInfo() {
    return this.currentLevel;
  }

  getMap() {
    return this.map;
  }

  getUniqueMapCords() {
    let x = RNG.int(this.map[0].length);
    let y = RNG.int(this.map.length);

    while (this.map[y][x] !== 0) {
      x = RNG.int(this.map[0].length);
      y = RNG.int(this.map.length);
    }
    let cords = [];
    cords.x = x;
    cords.y = y;
    return cords;
  }

  updateUnit(unit) {
    if(unit.lastY % 32 === 0 && unit.lastX % 32 === 0){
      this.map[unit.lastY / 32][unit.lastX / 32] = 0;
      this.map[unit.y / 32][unit.x / 32] = unit;
    }
  }

  isCollidingUp(object) {
    return this.isColliding(object, 0, -32);
  }

  isCollidingDown(object) {
    return this.isColliding(object, 0, 32);
  }

  isCollidingRight(object) {
    return this.isColliding(object, 32, 0);
  }

  isCollidingLeft(object) {
    return this.isColliding(object, -32, 0);
  }

  isColliding(object, dX, dY) {
    try {
      const tileData = parseInt(this.map[(object.y + dY) / 32][(object.x + dX) / 32]);
      if (tileData !== 0) {
        return true;
      }
    }
    catch (err) {
      return true;
    }
  }

  removeFromWorld(x, y) {
    this.map[y / 32][x / 32] = 0;
  }
}

export default World;