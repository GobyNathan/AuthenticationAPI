# AuthenticationAPI

## Project Description
AuthenticationAPI is a Node.js-based API for handling user authentication. It provides endpoints for user registration, login, and token-based authentication. This project is designed to be a starting point for building secure authentication systems in web applications.

## Features
- User registration with email and password
- User login with email and password
- Token-based authentication using JWT
- Password hashing and validation

## Installation

### Prerequisites
- Node.js (version at least 16.20)
- npm (Node Package Manager)

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/GobyNathan/AuthenticationAPI.git
    cd AuthenticationAPI

2. Install dependencies:

    npm install

3. Create a .env file in the root directory and add the environment variables

4. Start the server:

    npm start
    

USAGE

API Endpoints:

1) Register a new user

- URL: /api/register
- Method: POST
- Body:
    {
        "email": "user@example.com",
        "password": "yourpassword"
    }

2) Login as a user

- URL: /api/login
- Method: POST
- Body:
    {
        "email": "user@example.com",
        "password": "yourpassword"
    }

3) List of users

- URL: /api/users
- Method: GET