<?php
$conn = new mysqli('localhost', 'root', '', 'modilo_db');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Database connected successfully!<br>";
echo "MySQL version: " . $conn->server_info;

$conn->close();
?>