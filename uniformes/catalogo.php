<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Catálogo de Produtos</title>
    <style>
        /* Reset and base styles */
        * {
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #f9f9f9;
            color: #333;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        header, footer {
            background-color: #222;
            color: white;
            padding: 10px 20px;
            text-align: center;
            flex-shrink: 0;
        }
        header img.logo {
            max-height: 60px;
            width: auto;
        }
        main {
            flex-grow: 1;
            max-width: 900px;
            margin: 20px auto;
            padding: 0 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        h1 {
            text-align: center;
            margin-bottom: 10px;
        }
        .printing-types {
            background: #fff;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            box-shadow: 0 0 8px rgba(0,0,0,0.1);
            font-weight: bold;
            text-align: center;
            width: 100%;
        }
        .catalog-container {
            position: relative;
            width: 100%;
            max-width: 900px;
            height: 80vh;
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 8px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px;
        }
        .product-image {
            max-width: 100%;
            max-height: 70vh;
            border-radius: 8px;
            object-fit: contain;
            user-select: none;
        }
        .product-name {
            font-weight: bold;
            margin: 15px 0 10px 0;
            font-size: 1.2em;
            text-align: center;
            word-wrap: break-word;
        }
        .whatsapp-link {
            background-color: #25D366;
            color: white;
            padding: 10px 16px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
            transition: background-color 0.3s ease;
            text-align: center;
            user-select: none;
        }
        .whatsapp-link:hover {
            background-color: #1ebe57;
        }
        .nav-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 3em;
            color: #333;
            background: rgba(255,255,255,0.7);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
            user-select: none;
            transition: background-color 0.3s ease;
            z-index: 10;
        }
        .nav-arrow:hover {
            background-color: rgba(255,255,255,0.9);
        }
        .nav-arrow.left {
            left: 10px;
        }
        .nav-arrow.right {
            right: 10px;
        }
        footer a {
            color: #25D366;
            font-weight: bold;
            font-size: 1.1em;
        }
        /* Responsive adjustments */
        @media (max-width: 600px) {
            header img.logo {
                max-height: 50px;
            }
            .nav-arrow {
                font-size: 2em;
                width: 40px;
                height: 40px;
                line-height: 40px;
            }
            .whatsapp-link {
                padding: 8px 12px;
                font-size: 0.9em;
            }
        }
    </style>
</head>
<body>
    <header>
        <a href="index.php" style="display: inline-block;">
            <img src="logo/Sem título-1.png" alt="Logo" class="logo" />
        </a>
        <nav style="display: inline-block; margin-left: 20px; vertical-align: middle;">
            <a href="index.php" style="color: white; font-weight: bold; font-size: 1.1em; text-decoration: none;">Início</a>
        </nav>
    </header>
    <main>
        <h1>Catálogo de Produtos</h1>
        <div class="printing-types">
            Tipos de impressão disponíveis: DTF, Silk, Sublimação, Bordado e filme de impressão.
        </div>
        <div class="catalog-container">
            <div class="nav-arrow left" id="prevArrow">&#8592;</div>
            <img src="" alt="" class="product-image" id="productImage" />
            <div class="product-name" id="productName"></div>
            <a href="#" class="whatsapp-link" id="whatsappLink" target="_blank" rel="noopener noreferrer">Tenho interesse</a>
            <div class="nav-arrow right" id="nextArrow">&#8594;</div>
        </div>
    </main>
    <footer>
        <a href="https://wa.me/5562920026981" target="_blank" rel="noopener noreferrer">Fale Conosco</a>
    </footer>
    <script>
        const products = [
            <?php
            $dir = 'produtos';
            $files = array_diff(scandir($dir), array('.', '..'));
            $jsArray = [];
            foreach ($files as $file) {
                $filePath = $dir . '/' . $file;
                $fileInfo = pathinfo($file);
                $name = $fileInfo['filename'];
                $name = str_replace('_', ' ', $name);
                $name = ucwords(strtolower($name));
                $jsArray[] = json_encode(['src' => $filePath, 'name' => $name]);
            }
            echo implode(',', $jsArray);
            ?>
        ];

        let currentIndex = 0;

        const productImage = document.getElementById('productImage');
        const productName = document.getElementById('productName');
        const whatsappLink = document.getElementById('whatsappLink');
        const prevArrow = document.getElementById('prevArrow');
        const nextArrow = document.getElementById('nextArrow');

        function updateProduct(index) {
            const product = products[index];
            productImage.src = product.src;
            productImage.alt = product.name;
            productName.textContent = product.name;
            const encodedName = encodeURIComponent(product.name);
            whatsappLink.href = `https://wa.me/5562920026981?text=Olá,%20tenho%20interesse%20no%20produto%20${encodedName}`;
        }

        prevArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + products.length) % products.length;
            updateProduct(currentIndex);
        });

        nextArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % products.length;
            updateProduct(currentIndex);
        });

        // Initialize first product
        updateProduct(currentIndex);
    </script>
</body>
</html>
