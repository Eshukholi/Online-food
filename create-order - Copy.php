<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

// Generate unique order ID
$order_id = 'FFDELHI_' . date('YmdHis') . '_' . substr(md5($input['phone'] ?? ''), 0, 6);

$data = [
    'order_id' => $order_id,
    'phone' => $input['phone'],
    'name' => $input['name'] ?? 'Guest',
    'address' => $input['address'] ?? '',
    'cart' => $input['cart'] ?? [],
    'amount' => $input['amount'] ?? 0,
    'stage' => $input['stage'] ?? 'checkout',
    'timestamp' => date('Y-m-d H:i:s'),
    'status' => 'pending'
];

file_put_contents('../orders.json', json_encode($data) . "\n", FILE_APPEND | LOCK_EX);

echo json_encode(['success' => true, 'order_id' => $order_id]);
?>
