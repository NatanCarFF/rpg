// Fase2Scene.js

let player;
let platforms;
let cursors;
let stars;
let bombs;
let score = 0; // A pontuação é zerada ou carregada de um estado
let scoreText;
let gameOver = false;

class Fase2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase2Scene' });
    }

    preload() {
        // A maioria dos assets já foi carregada na primeira cena, mas é uma boa prática
        // deixar o preload aqui também caso queira adicionar assets específicos
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
        // Reseta o estado do jogo para a nova fase
        gameOver = false;
        
        // Fundo da fase (podemos usar uma cor diferente para indicar a mudança)
        this.add.image(400, 300, 'sky').setTint(0x78a0c2); // Tonalidade azul para a segunda fase
        
        // Crie novas posições e layouts para as plataformas
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(800, 400, 'ground');
        platforms.create(200, 300, 'ground');
        platforms.create(50, 450, 'ground');
        platforms.create(700, 200, 'ground');

        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'turn', frames: [{ key: 'dude', frame: 4 }], frameRate: 20 });
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }), frameRate: 10, repeat: -1 });

        cursors = this.input.keyboard.createCursorKeys();

        // Crie um novo conjunto de moedas
        stars = this.physics.add.group({
            key: 'star',
            repeat: 15,
            setXY: { x: 12, y: 0, stepX: 50 }
        });

        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        bombs = this.physics.add.group();

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
        this.sound.play('coinSound'); // Exemplo de som, se tiver

        if (stars.countActive(true) === 0) {
            // Quando todas as moedas são coletadas, avança para a próxima fase
            this.scene.start('GameWinScene', { score: score }); // Ou uma nova fase
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