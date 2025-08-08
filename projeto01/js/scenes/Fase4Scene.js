// Fase4Scene.js

// Remova as declarações globais de player, platforms, etc.
// let player;
// let platforms;
// let cursors;
// let stars;
// let bombs;
// let scoreText;

// Mantenha apenas as variáveis que precisam ser compartilhadas entre cenas.
let score = 0;
let gameOver = false;

class Fase4Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase4Scene' });
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
        
        // Fundo com uma tonalidade avermelhada para a fase final
        this.add.image(400, 300, 'sky').setTint(0xff9999);
        
        // Layout de plataformas mais complexo
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(150, 400, 'ground');
        this.platforms.create(650, 300, 'ground');
        this.platforms.create(50, 200, 'ground');
        this.platforms.create(750, 150, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'turn', frames: [{ key: 'dude', frame: 4 }], frameRate: 20 });
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }), frameRate: 10, repeat: -1 });

        this.cursors = this.input.keyboard.createCursorKeys();

        // Mais moedas para coletar
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 25,
            setXY: { x: 12, y: 0, stepX: 30 }
        });

        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Adiciona mais inimigos
        this.bombs = this.physics.add.group();
        let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        let bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        this.scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    update() {
        if (gameOver) {
            return;
        }
        
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        this.scoreText.setText('Score: ' + score);

        if (this.stars.countActive(true) === 0) {
            this.scene.start('GameWinScene', { score: score });
        }
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        gameOver = true;
        this.scene.start('GameOverScene', { score: score });
    }
}