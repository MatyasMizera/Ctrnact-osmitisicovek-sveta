<?php
// Nastavíme hlavičku, aby prohlížeč věděl, že dostává JSON data
header('Content-Type: application/json; charset=utf-8');

$file = 'data.json';

if (file_exists($file)) {
    // Přečte obsah souboru a rovnou ho vypíše
    echo file_get_contents($file);
} else {
    // Pokud by soubor chyběl, pošleme chybu 404 a JSON s hláškou
    http_response_code(404);
    echo json_encode(["error" => "Soubor data.json nebyl nalezen."]);
}
?>