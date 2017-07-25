var Wipeout = Wipeout || {};

//initiate the Phaser framework
// Wipeout.game = new Phaser.Game('100%', '100%', Phaser.AUTO);
// Wipeout.game = new Phaser.Game(667, 375, Phaser.AUTO);
// Wipeout.game = new Phaser.Game(640, 480, Phaser.AUTO);
Wipeout.game = new Phaser.Game(640, 360, Phaser.AUTO);
// Wipeout.game = new Phaser.Game(480, 320, Phaser.AUTO);

Wipeout.game.state.add('Boot', Wipeout.BootState);
Wipeout.game.state.add('Preload', Wipeout.PreloadState);
Wipeout.game.state.add('Title', Wipeout.TitleState);
Wipeout.game.state.add('Game', Wipeout.GameState);
Wipeout.game.state.add('Congratulations', Wipeout.CongratulationsState);
Wipeout.game.state.add('GameOver', Wipeout.GameOverState);

Wipeout.game.state.start('Boot');
