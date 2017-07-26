var PhaserPop = PhaserPop || {};

PhaserPop.GameState = {
  init: function(){
    console.log('GameState', 'init');

    // constants
    this.SPAWN_TIME = { min: 1, max: 4 };
    // this.ENEMY_FREQUENCY = 2;

    // no gravity in a top-down game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 100;
  },
  create: function(){
    console.log('GameState', 'create');

    // pool of enemies
    this.enemies = this.add.group();

    // initialize timers
    this.remainingSeconds = 30;
    this.timer = this.game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
    this.createTimer();

    this.enemyGenerationTimer = this.game.time.create(false);
    this.enemyGenerationTimer.start();
    this.scheduleEnemyGeneration();

    // load level
    this.loadLevel();
  },
  update: function() {

  },
  loadLevel: function() {

  },
  createTimer: function(){
    var time = this.secondsToTime(this.remainingSeconds);

    this.timeLabelBackground = this.game.add.graphics();
    this.timeLabelBackground.beginFill(0x3C8D0D, 1);
    this.timeLabelBackground.drawRect(0, 0, 108, 32);

    this.timeLabel = this.game.add.text(8, 8, "Time: " + time.m + ":" + time.s, {font:"16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"});
    this.timeLabel.anchor.set(0, 0);
  },
  tick: function() {
    // update remaining time accordingly
    this.remainingSeconds--;

    // check if any time is remaining
    if(this.remainingSeconds < 0) {
      this.gameOver();
    }
    else {
      this.updateClock();
    }
  },
  updateClock: function() {
    // get remaining time
    var time = this.secondsToTime(this.remainingSeconds);

    // update time display
    this.timeLabel.text = "Time: " + time.m + ":" + time.s;
  },
  secondsToTime: function(seconds) {
    // round seconds for the following calculations
    var secs = Math.round(seconds);

    // calculate hour
    var hours = Math.floor(secs / (60 * 60));

    // calculate minutes
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    // calculate seconds
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    // set time object
    var obj = {
        "h": hours,
        "m": (minutes < 10) ? "0" + minutes : minutes,
        "s": (seconds < 10) ? "0" + seconds : seconds
    };

    // return time object
    return obj;
  },
  scheduleEnemyGeneration: function() {
    var time = this.game.rnd.between(this.SPAWN_TIME.min, this.SPAWN_TIME.max);

    //this.enemyGenerationTimer.add(Phaser.Timer.SECOND * this.ENEMY_FREQUENCY, function(){
    this.enemyGenerationTimer.add(Phaser.Timer.SECOND * time, function(){
      var x = 100;
      var y = this.game.world.height;

      this.addEnemy(x, y, { "asset": "elephant", "health": 10, "frame": 0, "x": 150, "y": 150 });
      this.scheduleEnemyGeneration();
    }, this);
  },
  addEnemy: function(x, y, data){
    // get first dead enemy from pool
    var element = this.enemies.getFirstDead();

    // IF no dead enemies, create new enemy ELSE reset dead enemy
    if(!element) {
      element = new PhaserPop.Enemy(this, x, y, data);
      this.enemies.add(element);
    }
    else {
      element.reset(x, y, data);
    }

    return element;
  },
  hitEnemy: function(enemy) {

    // play hit sound
    //this.hitSound.play();

    // increment enemy damage
    enemy.damage(1);

    // if enemy is dead
    if(!enemy.alive) {
      // increment killed enemies
      this.killedEnemies++;

      // if all enemies are dead load next state
      // if(this.killedEnemies == this.numEnemies){
      //   this.congratulations();
      // }
    }
  },
}
