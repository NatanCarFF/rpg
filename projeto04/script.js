document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('jogo-form');
    const resultadoDiv = document.getElementById('resultado');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário e o recarregamento da página

        const formData = new FormData(form);
        
        try {
            const response = await fetch('processar_jogo.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            resultadoDiv.textContent = data.mensagem;
            
            // Se o usuário acertou, limpa o campo de entrada para o próximo jogo
            if (data.mensagem.includes('Parabéns')) {
                form.reset();
            }

        } catch (error) {
            console.error('Erro:', error);
            resultadoDiv.textContent = 'Ocorreu um erro ao processar sua tentativa.';
        }
    });
});