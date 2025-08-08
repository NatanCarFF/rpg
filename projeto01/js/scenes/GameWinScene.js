// GameWinScene.js

// A variável global 'score' será declarada em main.js
// As variáveis de cena são agora propriedades da classe, usando `this.`

class GameWinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameWinScene' });
    }

    init(data) {
        this.finalScore = data.score;
    }

    create() {
        // Fundo com uma cor suave para a tela de vitória
        this.add.rectangle(400, 300, 800, 600, 0x00cc00, 0.7);

        // Mensagem de vitória
        this.add.text(400, 200, 'Parabéns!', {
            fontSize: '64px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Texto de "Você Venceu!"
        this.add.text(400, 280, 'Você salvou a princesa e venceu o jogo!', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Exibe a pontuação final
        this.add.text(400, 350, 'Pontuação Final: ' + this.finalScore, {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Botão para voltar ao início
        const restartButton = this.add.text(400, 450, 'Voltar ao Início', {
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