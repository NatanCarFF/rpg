document.addEventListener('DOMContentLoaded', () => {
    let numeroSecreto;
    let tentativas = 0;

    const googleAppsScriptUrl = "https://script.google.com/macros/s/AKfycbw7btiaPNPJ43Pc2-GqGYu-6rmr4wvwWW7JNLCcdoHLbWF3ZdAOvvzREXSf5M_FckRy/exec";

    const form = document.getElementById('jogo-form');
    const resultadoDiv = document.getElementById('resultado');
    const resetButton = document.getElementById('reset-button');
    const tentativaInput = document.getElementById('tentativa');

    function iniciarNovoJogo() {
        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        tentativas = 0;
        resultadoDiv.textContent = '';
        form.style.display = 'block';
        resetButton.style.display = 'none';
        tentativaInput.value = '';
        tentativaInput.focus();
        console.log("Novo número secreto gerado: " + numeroSecreto);
    }
    
    async function salvarPontuacao(nome, pontuacao) {
        const dados = {
            nome: nome,
            pontuacao: pontuacao
        };
    
        try {
            const response = await fetch(googleAppsScriptUrl, {
                method: 'POST',
                body: JSON.stringify(dados)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            console.log('Pontuação salva com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar a pontuação:', error);
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const tentativa = parseInt(tentativaInput.value);
        tentativas++;

        if (isNaN(tentativa) || tentativa < 1 || tentativa > 100) {
            resultadoDiv.textContent = 'Por favor, insira um número válido entre 1 e 100.';
            return;
        }
        
        let mensagem = '';
        if (tentativa < numeroSecreto) {
            mensagem = 'É mais alto!';
        } else if (tentativa > numeroSecreto) {
            mensagem = 'É mais baixo!';
        } else {
            mensagem = `Parabéns! Você acertou o número ${numeroSecreto} em ${tentativas} tentativas!`;
            form.style.display = 'none';
            resetButton.style.display = 'block';

            const nomeJogador = prompt("Parabéns! Qual é o seu nome para o ranking?", "Anônimo");
            if (nomeJogador) {
                await salvarPontuacao(nomeJogador, tentativas);
            }
        }
        resultadoDiv.textContent = mensagem;
    });

    resetButton.addEventListener('click', () => {
        iniciarNovoJogo();
    });

    iniciarNovoJogo();
});