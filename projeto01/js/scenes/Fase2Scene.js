// Fase2Scene.js

// As variáveis globais 'score' e 'gameOver' serão declaradas em main.js
// As variáveis de cena são agora propriedades da classe, usando `this.`

class Fase2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase2Scene' });
    }

    init(data) {
        // Recebe a pontuação da fase anterior e a mantém
        score = data.score;
    }

    preload() {
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
        
        // --- CÓDIGO ATUALIZADO: Imagem de fundo em tela cheia ---
        this.add.image(0, 0, 'sky').setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height).setTint(0x78a0c2);
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(800, 400, 'ground');
        this.platforms.create(200, 300, 'ground');
        this.platforms.create(50, 450, 'ground');
        this.platforms.create(700, 200, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'turn', frames: [{ key: 'dude', frame: 4 }], frameRate: 20 });
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }), frameRate: 10, repeat: -1 });

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 15,
            setXY: { x: 12, y: 0, stepX: 50 }
        });

        this.stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.bombs = this.physics.add.group();

        this.scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        
        // --- Adição dos Controles na Tela ---
        const joystickBg = this.add.circle(120, 500, 50, 0x000000).setAlpha(0.5);
        this.joystickThumb = this.add.circle(120, 500, 25, 0xffffff).setAlpha(0.7).setInteractive();

        joystickBg.setScrollFactor(0);
        this.joystickThumb.setScrollFactor(0);

        this.input.setDraggable(this.joystickThumb);

        this.joystickThumb.on('drag', (pointer, dragX, dragY) => {
            const distance = Phaser.Math.Distance.Between(joystickBg.x, joystickBg.y, dragX, dragY);
            if (distance < 50) {
                this.joystickThumb.x = dragX;
                this.joystickThumb.y = dragY;
            } else {
                const angle = Phaser.Math.Angle.Between(joystickBg.x, joystickBg.y, dragX, dragY);
                this.joystickThumb.x = joystickBg.x + Math.cos(angle) * 50;
                this.joystickThumb.y = joystickBg.y + Math.sin(angle) * 50;
            }
            this.joystickDirection = Phaser.Math.Angle.Between(joystickBg.x, joystickBg.y, this.joystickThumb.x, this.joystickThumb.y);
        });

        this.joystickThumb.on('dragend', () => {
            this.joystickThumb.x = joystickBg.x;
            this.joystickThumb.y = joystickBg.y;
            this.joystickDirection = null;
        });

        this.jumpButton = this.add.circle(700, 500, 40, 0xff0000).setAlpha(0.6).setInteractive();
        this.jumpButton.setScrollFactor(0);
        
        this.add.text(700, 500, 'Pular', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setScrollFactor(0);

        this.jumpButton.on('pointerdown', () => {
            if (this.player.body.touching.down) {
                this.player.setVelocityY(-330);
            }
        });
    }

    update() {
        if (gameOver) {
            return;
        }

        if (this.joystickDirection !== null) {
            if (this.joystickDirection < -2.5 || this.joystickDirection > 2.5) {
                this.player.setVelocityX(-160);
                this.player.anims.play('left', true);
            } else if (this.joystickDirection > -0.5 && this.joystickDirection < 0.5) {
                this.player.setVelocityX(160);
                this.player.anims.play('right', true);
            }
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        this.scoreText.setText('Score: ' + score);

        if (this.stars.countActive(true) === 0) {
            this.scene.start('Fase3Scene', { score: score });
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