<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

// QR Code for pickup/delivery
$qr_data = "Order: {$input['order_id']}\nPhone: {$input['phone']}\nAmount: ₹{$input['amount']}";
$qr_url = "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=" . urlencode($qr_data);

// SMSIndiaHub FREE API - Get key: smsindiahub.in
$sms_api_key = 'YOUR_SMSINDIAHUB_API_KEY'; // Free signup
$message = "🍔 FastFood Delhi NCR\nOrder: {$input['order_id']}\nAmount: ₹{$input['amount']}\nStatus: COD Confirmed!\nDriver arriving 25 mins\nQR: {$qr_url}";
$sms_url = "https://smsindiahub.in/api/mt/SendSMS?api_key={$sms_api_key}&sender_id=FFDELHI&route=QR&mobiles={$input['phone']}&message=" . urlencode($message);

$response = @file_get_contents($sms_url);

// Save order
$order_data = [
    'order_id' => $input['order_id'],
    'phone' => $input['phone'],
    'amount' => $input['amount'],
    'payment_method' => 'COD',
    'qr_url' => $qr_url,
    'sms_sent' => $response ? 'yes' : 'failed',
    'timestamp' => date('Y-m-d H:i:s'),
    'status' => 'confirmed'
];

file_put_contents('../orders.json', json_encode($order_data) . "\n", FILE_APPEND | LOCK_EX);

echo json_encode(['success' => true, 'qr_url' => $qr_url, 'sms_status' => $response ? 'sent' : 'failed']);
?>
