<?php
session_start();

header('Content-Type: application/json');

// Se a sessão não tiver um número secreto, geramos um novo
if (!isset($_SESSION['numero_secreto'])) {
    $_SESSION['numero_secreto'] = rand(1, 100);
}

// Verifica se o formulário foi submetido
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['tentativa'])) {
    $tentativa = (int)$_POST['tentativa'];
    $numero_secreto = $_SESSION['numero_secreto'];
    
    $resposta = '';
    
    if ($tentativa < $numero_secreto) {
        $resposta = 'É mais alto!';
    } else if ($tentativa > $numero_secreto) {
        $resposta = 'É mais baixo!';
    } else {
        $resposta = 'Parabéns! Você acertou o número ' . $numero_secreto . '!';
        // Reseta o jogo
        unset($_SESSION['numero_secreto']);
    }
    
    echo json_encode(['mensagem' => $resposta]);
}
?>