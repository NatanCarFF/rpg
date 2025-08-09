// =======================================================
// VARIÁVEIS GLOBAIS E INICIALIZAÇÃO
// =======================================================
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const gameContainer = document.getElementById('game-container');
const charCreationMenu = document.getElementById('character-creation');
const gameUI = document.getElementById('game-ui');
const messageLog = document.getElementById('message-log');
const playerStatus = document.getElementById('player-status');
const actionMenu = document.getElementById('action-menu');
const inventoryMenu = document.getElementById('inventory-menu');
const navigationControls = document.getElementById('navigation-controls');

const createCharBtn = document.getElementById('create-char-btn');
const charNameInput = document.getElementById('char-name');
const charClassSelect = document.getElementById('char-class');

let player = {};
let currentEnemy = null;
let isFighting = false;

// =======================================================
// CLASSE BASE PARA PERSONAGENS
// =======================================================
class Character {
    constructor(name, maxHp, maxMp, str, sprite) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.maxMp = maxMp;
        this.mp = maxMp;
        this.str = str;
        this.sprite = sprite;
    }

    attack(target) {
        const damage = Math.floor(Math.random() * (this.str / 2) + (this.str / 2));
        target.hp -= damage;
        this.logMessage(`${this.name} ataca e causa ${damage} de dano em ${target.name}!`);
        if (target.hp <= 0) {
            target.hp = 0;
        }
    }

    logMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        messageLog.appendChild(p);
        messageLog.scrollTop = messageLog.scrollHeight;
    }
}

// =======================================================
// LÓGICA DO JOGO E EVENTOS DA UI
// =======================================================

// Função para iniciar o jogo
function startGame() {
    charCreationMenu.classList.remove('active');
    gameUI.style.display = 'block';
    navigationControls.style.display = 'grid';
    player.updateStatusUI();
    player.logMessage('Bem-vindo à Floresta Sombria! Cuidado com os perigos...');
    // A lógica de exploração e eventos aleatórios será implementada em outro arquivo.
}

// Criação de Personagem
createCharBtn.addEventListener('click', () => {
    const charName = charNameInput.value.trim();
    const charClass = charClassSelect.value;
    if (charName === '') {
        alert('Por favor, insira um nome para o seu personagem.');
        return;
    }

    // Inicializa o objeto do jogador dependendo da classe escolhida
    if (charClass === 'guerreiro') {
        player = new Player(charName, 120, 30, 15, 'guerreiro-sprite.png', charClass);
    } else if (charClass === 'mago') {
        player = new Player(charName, 80, 80, 8, 'mago-sprite.png', charClass);
    }
    
    startGame();
});