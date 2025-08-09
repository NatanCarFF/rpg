// =======================================================
// CLASSE PLAYER E SUAS FUNÇÕES
// Este arquivo depende do game.js, onde a classe Character é definida.
// =======================================================

class Player extends Character {
    constructor(name, maxHp, maxMp, str, sprite, charClass) {
        super(name, maxHp, maxMp, str, sprite);
        this.class = charClass;
        this.level = 1;
        this.xp = 0;
        this.xpToNextLevel = 100;
        this.inventory = [];
        this.position = { x: 0, y: 0 };
    }

    gainXp(amount) {
        this.xp += amount;
        this.logMessage(`Você ganhou ${amount} de experiência.`);
        if (this.xp >= this.xpToNextLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.xp = this.xp - this.xpToNextLevel;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
        this.maxHp += 15;
        this.hp = this.maxHp;
        this.maxMp += 10;
        this.mp = this.maxMp;
        this.str += 5;
        this.logMessage(`Parabéns! Você alcançou o nível ${this.level}!`);
        this.updateStatusUI();
    }

    updateStatusUI() {
        document.getElementById('status-name').textContent = this.name;
        document.getElementById('status-level').textContent = this.level;
        document.getElementById('status-hp').textContent = this.hp;
        document.getElementById('status-max-hp').textContent = this.maxHp;
        document.getElementById('status-mp').textContent = this.mp;
        document.getElementById('status-max-mp').textContent = this.maxMp;
    }

    addItem(item) {
        this.inventory.push(item);
        this.logMessage(`Você encontrou um(a) ${item.name}!`);
        // Aqui, seria ideal atualizar a UI do inventário também.
    }

    useItem(item) {
        // Exemplo simples de uso de poção de vida
        if (item.type === 'potion') {
            this.hp = Math.min(this.maxHp, this.hp + item.value);
            this.logMessage(`Você usou ${item.name} e recuperou ${item.value} de vida.`);
            this.inventory = this.inventory.filter(i => i !== item); // Remove o item do inventário
            this.updateStatusUI();
        }
    }
}