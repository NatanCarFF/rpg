// GameOverScene.js

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score;
    }

    create() {
        // Fundo escuro para a tela de game over
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);

        // Título de Game Over
        this.add.text(400, 200, 'Game Over', {
            fontSize: '64px',
            fill: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Exibe a pontuação final
        this.add.text(400, 300, 'Sua pontuação: ' + this.finalScore, {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Botão para tentar novamente
        const restartButton = this.add.text(400, 400, 'Tentar Novamente', {
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}