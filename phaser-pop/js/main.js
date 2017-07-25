var PhaserPop = PhaserPop || {};

//initiate the Phaser framework
PhaserPop.game = new Phaser.Game(640, 360, Phaser.AUTO);

PhaserPop.game.state.add('Boot', PhaserPop.BootState);
PhaserPop.game.state.add('Preload', PhaserPop.PreloadState);
PhaserPop.game.state.add('Title', PhaserPop.TitleState);
PhaserPop.game.state.add('Game', PhaserPop.GameState);
//App.game.state.add('Congratulations', App.CongratulationsState);
//App.game.state.add('GameOver', App.GameOverState);

PhaserPop.game.state.start('Boot');
