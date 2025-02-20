<?php
require 'config.php'; // Arquivo de configuração do banco de dados

$estado = $_GET['estado'] ?? '';
$cidade = $_GET['cidade'] ?? '';

function buscarPromocoes($cidade, $estado, $conn) {
    // Buscar promoções na cidade
    $query = "SELECT * FROM promocoes WHERE cidade = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$cidade]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($result)) {
        // Caso não haja na cidade, buscar no estado
        $query = "SELECT * FROM promocoes WHERE estado = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute([$estado]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    if (empty($result)) {
        // Caso não haja no estado, buscar em todas as cidades disponíveis
        $query = "SELECT DISTINCT cidade FROM promocoes";
        $stmt = $conn->query($query);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    return $result;
}

$promocoes = buscarPromocoes($cidade, $estado, $conn);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Promoções em <?= htmlspecialchars($cidade ?: 'todas as cidades') ?></title>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script>
        function selecionarCidade(cidade, estado) {
            window.location.href = '?cidade=' + cidade + '&estado=' + estado;
        }
    </script>
</head>
<body>
    <h1>Promoções em <?= htmlspecialchars($cidade ?: 'todas as cidades') ?></h1>
    
    <div id="map" style="height: 400px;"></div>
    
    <script>
        var map = L.map('map').setView([-14.235, -51.9253], 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        
        map.on('click', function(e) {
            alert('Clique em uma cidade para ver promoções!');
        });
    </script>

    <ul>
        <?php foreach ($promocoes as $promo): ?>
            <li>
                <strong><?= htmlspecialchars($promo['produto']) ?></strong> - R$<?= number_format($promo['preco'], 2, ',', '.') ?>
                <br>
                Loja: <?= htmlspecialchars($promo['loja']) ?> (<?= htmlspecialchars($promo['cidade']) ?>)
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
