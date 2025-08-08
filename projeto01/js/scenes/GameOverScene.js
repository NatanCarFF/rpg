// GameOverScene.js

// As variáveis globais 'score' e 'gameOver' serão declaradas em main.js
// As variáveis de cena são agora propriedades da classe, usando `this.`

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score;
    }

    create() {
        // Fundo com uma cor escura para a tela de Game Over
        this.add.rectangle(400, 300, 800, 600, 0x660000, 0.7);

        // Texto de "Game Over"
        this.add.text(400, 200, 'Game Over', {
            fontSize: '64px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Exibe a pontuação final
        this.add.text(400, 300, 'Pontuação Final: ' + this.finalScore, {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Botão para tentar novamente
        const restartButton = this.add.text(400, 450, 'Tentar Novamente', {
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            // Reinicia o jogo a partir da primeira fase
            this.scene.start('GameScene');
        });
    }
}