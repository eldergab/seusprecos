<?php
require 'config.php';

// Validar e sanitizar inputs
$estado = filter_input(INPUT_GET, 'estado', FILTER_SANITIZE_STRING) ?? '';
$cidade = filter_input(INPUT_GET, 'cidade', FILTER_SANITIZE_STRING) ?? '';

function buscarPromocoes($cidade, $estado, $conn) {
    try {
        // Buscar promoções na cidade
        $query = "SELECT * FROM promocoes WHERE cidade = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute([$cidade]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($result) && !empty($estado)) {
            // Buscar no estado
            $query = "SELECT * FROM promocoes WHERE estado = ?";
            $stmt = $conn->prepare($query);
            $stmt->execute([$estado]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        if (empty($result)) {
            // Buscar cidades disponíveis
            $query = "SELECT DISTINCT cidade, estado FROM promocoes LIMIT 50";
            $stmt = $conn->query($query);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return $result;
    } catch (PDOException $e) {
        error_log('Erro na busca: ' . $e->getMessage());
        return [];
    }
}

$promocoes = buscarPromocoes($cidade, $estado, $conn);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promoções em <?= htmlspecialchars($cidade ?: 'Brasil') ?></title>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .promo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8">Promoções em <?= htmlspecialchars($cidade ?: 'todas as cidades') ?></h1>
        
        <div id="map" class="h-96 mb-8 rounded-lg shadow-lg"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($promocoes as $promo): ?>
                <div class="promo-card bg-white rounded-lg shadow-md p-6 transition-all duration-300">
                    <h3 class="text-xl font-semibold mb-2"><?= htmlspecialchars($promo['produto'] ?? 'Produto') ?></h3>
                    <p class="text-2xl font-bold text-green-600 mb-2">R$ <?= isset($promo['preco']) ? number_format($promo['preco'], 2, ',', '.') : '0,00' ?></p>
                    <p class="text-gray-600 mb-1"><?= htmlspecialchars($promo['loja'] ?? 'Loja') ?></p>
                    <p class="text-gray-500"><?= htmlspecialchars($promo['cidade'] ?? 'Cidade') ?>, <?= htmlspecialchars($promo['estado'] ?? 'Estado') ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <script>
        var map = L.map('map').setView([-14.235, -51.9253], 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        
        <?php if (!empty($promocoes) && isset($promocoes[0]['lat']) && isset($promocoes[0]['lng'])): ?>
            map.setView([<?= $promocoes[0]['lat'] ?>, <?= $promocoes[0]['lng'] ?>], 12);
        <?php endif; ?>

        <?php foreach ($promocoes as $promo): ?>
            <?php if (isset($promo['lat']) && isset($promo['lng'])): ?>
                L.marker([<?= $promo['lat'] ?>, <?= $promo['lng'] ?>])
                    .addTo(map)
                    .bindPopup(`<b><?= addslashes($promo['produto'] ?? '') ?></b><br>R$ <?= isset($promo['preco']) ? number_format($promo['preco'], 2, ',', '.') : '' ?>`);
            <?php endif; ?>
        <?php endforeach; ?>
    </script>
</body>
</html>
