// main.js

// Declare as variáveis globais APENAS AQUI.
// Elas serão acessíveis em todas as cenas.

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [GameScene, Fase2Scene, Fase3Scene, Fase4Scene, GameWinScene, GameOverScene]
};

const game = new Phaser.Game(config);