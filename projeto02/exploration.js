// =======================================================
// LÓGICA DE EXPLORAÇÃO E MAPAS
// Este arquivo depende de game.js, player.js e combat.js.
// =======================================================

// Definição dos mapas e seus eventos
const maps = {
    'floresta-inicial': {
        backgroundUrl: 'https://i.imgur.com/gK6w7iU.png', // URL de uma imagem de floresta
        events: [
            { type: 'combat', enemy: 'goblin', chance: 0.5 },
            { type: 'item', item: 'pocao_pequena', chance: 0.3 },
            { type: 'none', chance: 0.2 }
        ],
        adjacentMaps: ['floresta-sombria']
    },
    'floresta-sombria': {
        backgroundUrl: 'https://i.imgur.com/mRzVzLz.png', // URL de uma imagem de floresta mais escura
        events: [
            { type: 'combat', enemy: 'orc', chance: 0.6 },
            { type: 'combat', enemy: 'espectro', chance: 0.2 },
            { type: 'item', item: 'pocao_grande', chance: 0.2 }
        ],
        adjacentMaps: ['floresta-inicial']
    }
};

// Itens disponíveis no jogo
const items = {
    'pocao_pequena': { name: 'Poção de Cura Pequena', type: 'potion', value: 30 },
    'pocao_grande': { name: 'Poção de Cura Grande', type: 'potion', value: 60 }
};

let currentMapId = 'floresta-inicial';

// =======================================================
// FUNÇÕES DE EXPLORAÇÃO
// =======================================================

function drawMap() {
    const background = new Image();
    background.src = maps[currentMapId].backgroundUrl;
    background.onload = () => {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    };
}

function checkRandomEvent() {
    const rand = Math.random();
    let cumulativeChance = 0;
    const currentEvents = maps[currentMapId].events;

    for (const event of currentEvents) {
        cumulativeChance += event.chance;
        if (rand < cumulativeChance) {
            if (event.type === 'combat') {
                startCombat(event.enemy);
            } else if (event.type === 'item') {
                player.addItem(items[event.item]);
            } else {
                player.logMessage('Você explora a área, mas não encontra nada.');
            }
            return;
        }
    }
}

function movePlayer(direction) {
    player.logMessage(`Você se move para o(a) ${direction}.`);
    // Lógica para mudar de mapa ou posição.
    // Por enquanto, vamos simular a exploração com um evento aleatório.
    checkRandomEvent();
    drawMap();
}

// =======================================================
// EVENTOS DA UI DE EXPLORAÇÃO
// =======================================================

document.getElementById('move-up-btn').addEventListener('click', () => movePlayer('frente'));
document.getElementById('move-down-btn').addEventListener('click', () => movePlayer('trás'));
document.getElementById('move-left-btn').addEventListener('click', () => movePlayer('esquerda'));
document.getElementById('move-right-btn').addEventListener('click', () => movePlayer('direita'));

// Atualiza o canvas inicial e os controles de navegação
document.addEventListener('DOMContentLoaded', () => {
    drawMap();
});