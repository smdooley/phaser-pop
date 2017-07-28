var PhaserPop = PhaserPop || {};

PhaserPop.GameState = {
  init: function(){
    "use strict";

    console.log('GameState', 'init');

    // constants
    this.SPAWN_TIME = { min: 1, max: 2 };
    this.TIME_LIMIT = 15;

    // no gravity in a top-down game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;
  },
  create: function(){
    "use strict";

    console.log('GameState', 'create');

    // pool of enemies
    this.enemies = this.add.group();
    this.specials = this.add.group();

    // // initialize timers
    // this.remainingSeconds = 30;
    // this.timer = this.game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
    // this.createTimer();
    //
    // this.enemyGenerationTimer = this.game.time.create(false);
    // this.enemyGenerationTimer.start();
    // this.scheduleEnemyGeneration();

    // load level
    this.loadLevel();
  },
  update: function() {
    "use strict";
  },
  loadLevel: function() {
    "use strict";

    // load data
    this.data = JSON.parse(this.game.cache.getText('data'));

    // initialize variables
    this.killedEnemies = 0;

    // initialize timers
    this.remainingSeconds = this.TIME_LIMIT;
    this.timer = this.game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
    this.createTimer();

    this.enemyGenerationTimer = this.game.time.create(false);
    this.enemyGenerationTimer.start();
    this.scheduleEnemyGeneration();
  },
  createTimer: function(){
    "use strict";

    var time = this.secondsToTime(this.remainingSeconds);

    this.timeLabelBackground = this.game.add.graphics();
    this.timeLabelBackground.beginFill(0x3C8D0D, 1);
    this.timeLabelBackground.drawRect(0, 0, 108, 32);

    this.timeLabel = this.game.add.text(8, 8, "Time: " + time.m + ":" + time.s, {font:"16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"});
    this.timeLabel.anchor.set(0, 0);
  },
  tick: function() {
    "use strict";

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
    "use strict";

    // get remaining time
    var time = this.secondsToTime(this.remainingSeconds);

    // update time display
    this.timeLabel.text = "Time: " + time.m + ":" + time.s;
  },
  secondsToTime: function(seconds) {
    "use strict";

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
    "use strict";

    var time = this.game.rnd.between(this.SPAWN_TIME.min, this.SPAWN_TIME.max);
    var x = this.game.rnd.between(0.2 * this.game.world.width, 0.8 * this.game.world.width);
    var y = this.game.world.height;
    var nextEnemy = this.data.enemies[this.game.rnd.between(0, this.data.enemies.length-1)];

    this.enemyGenerationTimer.add(Phaser.Timer.SECOND * time, function(){
      this.addEnemy(x, y, nextEnemy);
      this.scheduleEnemyGeneration();
    }, this);
  },
  addEnemy: function(x, y, data){
    "use strict";

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
    "use strict";

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
  gameOver: function() {
    "use strict";

    this.state.start('Game');
  }
}
