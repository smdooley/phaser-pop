var PhaserPop = PhaserPop || {};

PhaserPop.Germ = function(state, x, y, data){
  Phaser.Sprite.call(this, state.game, x, y, data.asset);

  // store variables for reference
  this.state = state;
  this.game = state.game;

  this.health = data.health;

  // set anchor
  this.anchor.setTo(0.5);

  // enable input
  this.inputEnabled = true;

  // set input callback event
  this.events.onInputDown.add(this.state.hitGerm, this.state);

  // enable physics
  this.game.physics.arcade.enable(this);

  this.reset(x, y, data);
};

PhaserPop.Germ.prototype = Object.create(Phaser.Sprite.prototype);
PhaserPop.Germ.prototype.constructor = PhaserPop.Germ;

PhaserPop.Germ.prototype.reset = function(x, y, data) {
  Phaser.Sprite.prototype.reset.call(this, x, y, data.health);

  // load texture
  this.loadTexture(data.asset);

  // set animation frames
  // this.animation = null;
  // if(data.animation){
  //   this.animation = data.asset + "Anim";
  //   this.animations.add(this.animation, data.animation, 1, true);
  //   this.play(this.animation);
  // }

  // set start frame
  this.frame = data.frame;
}

PhaserPop.Germ.prototype.damage = function(amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);

  // // initialize emitter
  // var emitter = this.game.add.emitter(this.x, this.y, 100);
  // emitter.makeParticles('blood');
  // emitter.minParticleSpeed.setTo(-100, -100);
  // emitter.maxParticleSpeed.setTo(100, 100);
  // emitter.gravity = 300;
  // // burst/explode, lifespan, ignored if burst/explode, number of particles in burst
  // emitter.start(true, 2000, null, 500);

  var attackedTween = this.game.add.tween(this);
  attackedTween.to({tint: 0xFF0000}, 200);
  attackedTween.onComplete.add(function(){
    this.tint = 0xFFFFFF;
  }, this);
  attackedTween.start();

  // IF dead THEN kill
  if(this.health <= 0) {
    this.kill();
  }
}
