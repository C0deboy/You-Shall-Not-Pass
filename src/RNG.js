class RNG {

  static random() {
    const x = Math.sin(.8765111159592828 + Math.random() + 1) * 1e4;
    return x - Math.floor(x)
  }

  static int(max) {
    return this.random() * (max || 0xfffffff) | 0;
  }

  static bool() {
    return this.random() > 0.5;
  }

  static range(min, max) {
    return this.int(max - min + 1) + min;
  }

  static pick(source) {
    return source[this.range(0, source.length-1)];
  }
}

export default RNG;