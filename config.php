<?php
// Configurações do banco de dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'promocoes_db');
define('DB_USER', 'usuario');
define('DB_PASS', 'senha_segura');
define('DB_CHARSET', 'utf8mb4');

// Configuração de erros
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

try {
    $conn = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=".DB_CHARSET,
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    error_log('Erro de conexão: ' . $e->getMessage());
    die('Erro ao conectar ao banco de dados');
}
