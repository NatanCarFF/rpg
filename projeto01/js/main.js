// main.js

// Declare as variáveis globais APENAS AQUI.
// Elas serão acessíveis em todas as cenas.
let score = 0;
let gameOver = false;

// Configuração do Phaser
const config = {
    // Renderizador: Phaser.AUTO tenta usar WebGL, mas volta para Canvas se necessário.
    type: Phaser.AUTO,
    // Configurações de redimensionamento da tela
    scale: {
        mode: Phaser.Scale.FIT, // O jogo irá se ajustar para caber na tela
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centraliza a tela
        width: 800, // Largura de referência do seu jogo
        height: 600 // Altura de referência do seu jogo
    },
    // Configuração do sistema de física.
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    // Aqui listamos as cenas do nosso jogo.
    scene: [GameScene, Fase2Scene, Fase3Scene, Fase4Scene, GameWinScene, GameOverScene]
};

const game = new Phaser.Game(config);