## Project Description
AuthenticationAPI is a Node.js-based API for handling user authentication. It provides endpoints for user registration, login, and token-based authentication. This project is designed to be a starting point for building secure authentication systems in web applications.

## Features
- User registration with email and password
- User login with email and password
- Token-based authentication using JWT
- Password hashing and validation

## Installation

### Prerequisites
- Node.js (version at least 16.20) [Download](https://nodejs.org/en) (Linux/Windows)
- Git [Download](https://git-scm.com/downloads/win) (Windows)

## Install on Linux
### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/GobyNathan/AuthenticationAPI.git
    cd AuthenticationAPI
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Generate the `.env` file:
    ```sh
    ./generateENV.sh
    ```
    Note: Insert your MongoDB URL while is prompted on your terminal.

4. Start the server:
    ```sh
    npm start
    ```

5. Navigate to [http://localhost:5000/](http://localhost:5000/)

## Install on Windows
### Steps
1. Download Windows installation on [releases](https://github.com/GobyNathan/AuthenticationAPI/releases/tag/Release) and open it.

2. Insert your MongoDB URL while is prompted on your terminal

3. Open the folder created and open "start in windows"

4. Navigate to [http://localhost:5000/](http://localhost:5000/)

## Usage

### API Endpoints

1. Register a new user
    - URL: `/register`
    - Method: `POST`
    - Body:
        ```json
        {
            "email": "user@example.com",
            "password": "yourpassword"
        }
        ```

2. Login as a user
    - URL: `/login`
    - Method: `POST`
    - Body:
        ```json
        {
            "email": "user@example.com",
            "password": "yourpassword"
        }
        ```

3. List of users
    - URL: `/users`
    - Method: `GET`
    - Body:
        ```json
        {
            "email": "user@example.com"
        }
        ```
## Conclusion
In the implementation of this project. I learned the importance of implementing secure mechanisms for user management, such as password hashing with bcrypt and using JWT tokens for session authentication.
However, I faced several challenges along the way. Initially, I struggled with configuring Express and managing middleware, particularly in ensuring that protected routes were only accessible to authenticated users.
Additionally, understanding and correctly implementing error handling, such as validating credentials and handling unauthorized requests, proved to be complex.
I also encountered difficulties related to data persistence with MongoDB, such as managing connections. This will enhance my understanding of best practices for web security.