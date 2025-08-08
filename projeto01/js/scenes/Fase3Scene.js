// Fase3Scene.js

let player;
let platforms;
let cursors;
let stars;
let bombs;
let score = 0;
let scoreText;
let gameOver = false;

class Fase3Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase3Scene' });
    }

    init(data) {
        // Recebe a pontuação da fase anterior e a mantém
        score = data.score;
    }

    preload() {
        // Carregamento de assets
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('ground', 'assets/images/platform.png');
        this.load.image('star', 'assets/images/star.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.spritesheet('dude', 'assets/images/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    create() {
        gameOver = false;
        
        // Fundo com uma tonalidade escura para simular um desafio final
        this.add.image(400, 300, 'sky').setTint(0x333333);
        
        // Layout de plataformas mais complexo
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(100, 450, 'ground');
        platforms.create(500, 250, 'ground');
        platforms.create(750, 150, 'ground');
        platforms.create(250, 200, 'ground');

        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'turn', frames: [{ key: 'dude', frame: 4 }], frameRate: 20 });
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }), frameRate: 10, repeat: -1 });

        cursors = this.input.keyboard.createCursorKeys();

        // Mais moedas para coletar
        stars = this.physics.add.group({
            key: 'star',
            repeat: 20,
            setXY: { x: 12, y: 0, stepX: 38 }
        });

        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Adiciona mais inimigos
        bombs = this.physics.add.group();
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        let bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    }

    update() {
        if (gameOver) {
            return;
        }
        
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0) {
            // Quando todas as moedas são coletadas na última fase, o jogo termina
            this.scene.start('GameWinScene', { score: score });
        }
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
        this.scene.start('GameOverScene', { score: score });
    }
}