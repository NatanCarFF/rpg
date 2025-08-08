// main.js

// Importa as novas classes de cena
// Importante: No HTML, você deve incluir os scripts de cena ANTES do main.js
// Ex: <script src="js/scenes/GameScene.js"></script>
//     <script src="js/scenes/GameOverScene.js"></script>
//     <script src="js/main.js"></script>

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
    // Adiciona todas as cenas ao jogo
    scene: [GameScene, Fase2Scene, Fase3Scene, Fase4Scene, GameWinScene, GameOverScene]
};

const game = new Phaser.Game(config);