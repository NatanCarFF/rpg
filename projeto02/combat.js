// =======================================================
// LÓGICA DE COMBATE E DEFINIÇÃO DE INIMIGOS
// Este arquivo depende de game.js e player.js.
// =======================================================

// Definição dos inimigos
const enemies = {
    goblin: new Character('Goblin', 30, 0, 5, 'goblin-sprite.png'),
    orc: new Character('Orc', 50, 0, 8, 'orc-sprite.png'),
    espectro: new Character('Espectro', 40, 20, 7, 'espectro-sprite.png')
};

// =======================================================
// LÓGICA DE COMBATE
// =======================================================

function startCombat(enemyKey) {
    isFighting = true;
    currentEnemy = enemies[enemyKey];
    actionMenu.classList.add('active');

    // Oculta os botões de navegação
    navigationControls.style.display = 'none';

    player.logMessage(`Um(a) ${currentEnemy.name} aparece! Prepare-se para a batalha!`);
    
    // Desenha o inimigo no canvas (a ser implementado no módulo de exploração)
    // drawCombatScene();
}

function endCombat(winner) {
    isFighting = false;
    actionMenu.classList.remove('active');
    navigationControls.style.display = 'grid';

    if (winner === 'player') {
        player.logMessage(`Você derrotou o(a) ${currentEnemy.name}!`);
        player.gainXp(currentEnemy.maxHp * 2); // Exemplo de XP
    } else {
        player.logMessage(`Você foi derrotado por ${currentEnemy.name}.`);
        // Aqui poderia haver lógica de Game Over ou reinício
    }

    currentEnemy = null;
    // Oculta a cena de combate e volta para a exploração
    // drawMap();
}

// =======================================================
// TURNOS E AÇÕES
// =======================================================

function playerTurn(action) {
    if (!isFighting) return;

    switch (action) {
        case 'attack':
            player.attack(currentEnemy);
            break;
        case 'ability':
            // Lógica para habilidades (futuramente)
            player.logMessage('Você usou uma habilidade.');
            break;
        case 'item':
            // Lógica para usar itens (futuramente)
            player.logMessage('Você usou um item.');
            break;
    }

    if (currentEnemy.hp > 0) {
        setTimeout(() => enemyTurn(), 1500); // Dá um tempo para o usuário ler o log
    } else {
        endCombat('player');
    }
}

function enemyTurn() {
    if (!isFighting) return;

    if (currentEnemy.hp <= 0) {
        endCombat('player');
        return;
    }

    currentEnemy.attack(player);
    player.updateStatusUI();

    if (player.hp <= 0) {
        endCombat('enemy');
    }
}

// =======================================================
// EVENTOS DA UI
// =======================================================
document.getElementById('attack-btn').addEventListener('click', () => playerTurn('attack'));
// document.getElementById('ability-btn').addEventListener('click', () => playerTurn('ability'));
// document.getElementById('item-btn').addEventListener('click', () => playerTurn('item'));