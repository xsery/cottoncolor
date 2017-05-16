var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div');
var game_state = {};

game_state.main = function(){ };

game_state.main.prototype = {

	preload: function() {

        this.game.load.image('bg', 'assets/BGcotton.png');
		this.game.load.image('bird', 'assets/Personagem1.png');
//        this.game.load.image('particle', 'assets/Troca.png');
		this.game.load.image('pipe', 'assets/Doce1.png');
        this.game.load.audio('intro', 'assets/Intro.mp3');
        this.game.load.audio('jogo', 'assets/Jogo.mp3');
	},

	create: function() {
       
        this.bg = this.game.add.sprite(0,0, 'bg');
        
        this.jogo = this.game.add.audio('jogo');
        this.jogo.play();
        
		this.bird = this.game.add.sprite(100, 30, 'bird');
        this.bird.anchor.setTo(0.5,0.5);
		this.bird.body.gravity.y = 1000;

		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump, this);

		this.pipes = game.add.group();
		this.pipes.createMultiple(10000, 'pipe');
//        this.pipes.scale.x = 5;
//        this.pipes.scale.y = 10;

		this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);

		this.score = -1
		var style = {font: "60px Curlz MT", fill: "#ffffff"};
		this.label_score = this.game.add.text(20, 20, "0", style);
        
//        this.player.particleEmitter = this.game.add.emitter(0,0,100);
//        this.player.particleEmitter.makeParticles('particle');
        
      
        
	},

	update: function() {
        
		if (this.bird.inWorld == false)
			this.restart_game();

		this.game.physics.overlap(this.bird, this.pipes, this.restart_game, null, this);
	},

	jump: function() {
		this.bird.body.velocity.y = -350;
        this.game.add.tween(this.bird).to({angle: 360}, 750, Phaser.Easing.Linear.Out).start();
//        this.particleEmitter.x = player.x;
//        this.particleEmitter.y = player.y;
//        this.particleEmmiter.start(true, 500, null, 10);
	},

	restart_game: function(x, y) {
        this.jogo.stop();
		this.game.time.events.remove(this.timer);
		this.game.state.start('main');
	},

	add_one_pipe: function(x, y) {
		var pipe = this.pipes.getFirstDead();
		pipe.reset(x, y);
		pipe.body.velocity.x = -200;
		pipe.outOfBoundsKill = true;
	},

	add_row_of_pipes: function() {
		var hole = Math.floor(Math.random()*5) + 1;

		for (var i=0; i<16; i++) {
			if (i != hole && i != hole +1)
				this.add_one_pipe(400, i*60+10);
		}

		this.score += 1;
		this.label_score.content = this.score;

	},
};

game.state.add('main', game_state.main);
game.state.start('main');