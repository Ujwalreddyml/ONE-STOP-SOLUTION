<?php
session_start();

// Database configuration (replace with your actual database credentials)
$dbHost = 'localhost';
$dbUsername = 'root';
$dbPassword = 'ujwal';
$dbName = 'one_stop_solution';

// Establish database connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to find a user by email
function findUserByEmail($email, $conn) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    return $user;
}

// Function to hash passwords (for demonstration only, use password_hash() in production)
function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

// Function to validate password
function validatePassword($password) {
    $uppercase = preg_match('@[A-Z]@', $password);
    $lowercase = preg_match('@[a-z]@', $password);
    $number    = preg_match('@[0-9]@', $password);
    $specialChars = preg_match('@[^\w]@', $password);
    
    if (!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 8) {
        return false;
    }
    return true;
}

// Handle actions based on $_GET['action']
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'login':
        // Validate and process login
        $username = $_POST['username'];
        $password = $_POST['password'];

        $user = findUserByEmail($username, $conn);

        if ($user && password_verify($password, $user['password'])) {
            // Successful login
            $response = [
                'status' => true,
                'message' => 'Login successful',
                'redirectUrl' => 'index.html'  // Redirect to index.html after login
            ];
        } else {
            // Invalid credentials
            $response = [
                'status' => false,
                'message' => 'Invalid email or password'
            ];
        }

        echo json_encode($response);
        break;

    case 'signup':
        // Validate and process signup
        $email = $_POST['email'];
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $dob = $_POST['dob'];
        $phoneNumber = $_POST['phoneNumber'];
        $password = $_POST['signup-password'];
        $confirmPassword = $_POST['confirm-password'];

        // Check if email already exists
        $existingUser = findUserByEmail($email, $conn);

        if ($existingUser) {
            $response = [
                'status' => false,
                'message' => 'Email already exists'
            ];
        } elseif ($password !== $confirmPassword) {
            // Check if passwords match
            $response = [
                'status' => false,
                'message' => 'Passwords do not match'
            ];
        } elseif (!validatePassword($password)) {
            // Check if password meets requirements
            $response = [
                'status' => false,
                'message' => 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character'
            ];
        } else {
            // Hash password (for demonstration only, use password_hash() in production)
            $hashedPassword = hashPassword($password);

            // Insert new user into database
            $stmt = $conn->prepare("INSERT INTO users (email, password, first_name, last_name, dob, phone_number) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssss", $email, $hashedPassword, $firstName, $lastName, $dob, $phoneNumber);

            if ($stmt->execute()) {
                $response = [
                    'status' => true,
                    'message' => 'Signup successful'
                ];
            } else {
                $response = [
                    'status' => false,
                    'message' => 'Signup failed. ' . $stmt->error  // Provide detailed error message
                ];
            }

            $stmt->close();
        }

        echo json_encode($response);
        break;

    case 'verifyOTP':
        // Simulated OTP verification (replace with actual OTP logic)
        $otp = $_POST['otp'];

        if ($otp === $_SESSION['otp']) {
            $response = [
                'status' => true,
                'message' => 'OTP verification successful'
            ];
            unset($_SESSION['otp']); // Clear OTP after verification
        } else {
            $response = [
                'status' => false,
                'message' => 'Invalid OTP'
            ];
        }

        echo json_encode($response);
        break;

    default:
        // Invalid action
        echo json_encode(['error' => 'Invalid action']);
        break;
}

// Close database connection
$conn->close();
?>
