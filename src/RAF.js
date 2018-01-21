const animations = [];

function loop(fn) {
  window.requestAnimationFrame(() => {
    fn();
    animations.forEach(animation => {
      animation();
    });
    loop(fn);
  });
}

class RAF {
  static start(fn) {
    loop(fn);
  }

  static addAnimation(fn, duration) {
   animations.push(fn);
   setTimeout(() => animations.forEach((animation, i) => {
     if(animations[i] === animation){
       animations.splice(i, 1);
     }
   }), duration);
  }
}

export default RAF;