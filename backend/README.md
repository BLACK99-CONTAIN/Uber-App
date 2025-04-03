# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It validates the input data, hashes the password, stores the user in the database, and returns a JWT token along with the user details.

### Method
`POST`

### Request Body
The following fields are required in the request body:

```json
{
  "username": {
    "firstname": "string (min length: 5, required)",
    "lastname": "string (min length: 2, required)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min length: 4, required)"
}
```

### Response

#### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "token": "string (JWT token)",
    "user": {
      "_id": "string (user ID)",
      "username": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "password": "string (hashed password)"
    }
  }
  ```

#### Error Responses
1. **Validation Errors**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "errors": [
         {
           "msg": "string (error message)",
           "param": "string (field name)",
           "location": "string (location of the field, e.g., 'body')"
         }
       ]
     }
     ```

2. **Missing Fields**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "error": "All fields are required"
     }
     ```

3. **Server Error**
   - **Status Code:** `500 Internal Server Error`
   - **Response Body:**
     ```json
     {
       "error": "string (error message)"
     }
     ```

### Example Request
```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "username": {
    "firstname": "John",
    "lastname": "Doe"    # API Documentation
    
    ## Endpoint: `/users/register`
    
    ### Description
    This endpoint is used to register a new user. It validates the input data, hashes the password, stores the user in the database, and returns a JWT token along with the user details.
    
    ### Method
    `POST`
    
    ### Request Body
    The following fields are required in the request body:
    
    ```json
    {
      "username": {
        "firstname": "string (min length: 5, required)",
        "lastname": "string (min length: 2, required)"
      },
      "email": "string (valid email format, required)",
      "password": "string (min length: 4, required)"
    }
    ```
    
    ### Response
    
    #### Success Response
    - **Status Code:** `200 OK`
    - **Response Body:**
      ```json
      {
        "token": "string (JWT token)",
        "user": {
          "_id": "string (user ID)",
          "username": {
            "firstname": "string",
            "lastname": "string"
          },
          "email": "string",
          "password": "string (hashed password)"
        }
      }
      ```
    
    #### Error Responses
    1. **Validation Errors**
       - **Status Code:** `400 Bad Request`
       - **Response Body:**
         ```json
         {
           "errors": [
             {
               "msg": "string (error message)",
               "param": "string (field name)",
               "location": "string (location of the field, e.g., 'body')"
             }
           ]
         }
         ```
    
    2. **Missing Fields**
       - **Status Code:** `400 Bad Request`
       - **Response Body:**
         ```json
         {
           "error": "All fields are required"
         }
         ```
    
    3. **Server Error**
       - **Status Code:** `500 Internal Server Error`
       - **Response Body:**
         ```json
         {
           "error": "string (error message)"
         }
         ```
    
    ---
    
    ## Endpoint: `/users/login`
    
    ### Description
    This endpoint is used to authenticate a user. It validates the input data, checks the user's credentials, and returns a JWT token if the login is successful.
    
    ### Method
    `POST`
    
    ### Request Body
    The following fields are required in the request body:
    
    ```json
    {
      "email": "string (valid email format, required)",
      "password": "string (min length: 4, required)"
    }
    ```
    
    ### Response
    
    #### Success Response
    - **Status Code:** `200 OK`
    - **Response Body:**
      ```json
      {
        "token": "string (JWT token)",
        "user": {
          "_id": "string (user ID)",
          "username": {
            "firstname": "string",
            "lastname": "string"
          },
          "email": "string"
        }
      }
      ```
    
    #### Error Responses
    1. **Validation Errors**
       - **Status Code:** `400 Bad Request`
       - **Response Body:**
         ```json
         {
           "errors": [
             {
               "msg": "string (error message)",
               "param": "string (field name)",
               "location": "string (location of the field, e.g., 'body')"
             }
           ]
         }
         ```
    
    2. **Invalid Credentials**
       - **Status Code:** `401 Unauthorized`
       - **Response Body:**
         ```json
         {
           "message": "Invalid email or password"
         }
         ```
    
    3. **Missing Fields**
       - **Status Code:** `400 Bad Request`
       - **Response Body:**
         ```json
         {
           "error": "All fields are required"
         }
         ```
    
    4. **Server Error**
       - **Status Code:** `500 Internal Server Error`
       - **Response Body:**
         ```json
         {
           "error": "string (error message)"
         }
         ```
    
    ### Example Request
    ```bash
    curl -X POST http://localhost:3000/users/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "john.doe@example.com",
      "password": "password123"
    }'
    ```
    
    ### Example Success Response
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "64f1c2e5b5d6c2a1e4f3b2d1",
        "username": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1c2e5b5d6c2a1e4f3b2d1",
    "username": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$..."
  }
}
```
## Endpoint: `/users/profile`

### Description
This endpoint is used to retrieve the profile of the currently logged-in user. It requires a valid JWT token to access the user's profile.

### Method
`GET`

### Headers
- **Authorization**: `Bearer <JWT token>` (required)

### Response

#### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "user": {
      "_id": "string (user ID)",
      "username": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string"
    }
  }
  ```

#### Error Responses
1. **Unauthorized**
   - **Status Code:** `401 Unauthorized`
   - **Response Body:**
     ```json
     {
       "error": "Token not found"
     }
     ```

2. **User Not Found**
   - **Status Code:** `402 Payment Required`
   - **Response Body:**
     ```json
     {
       "error": "User not found"
     }
     ```

3. **Server Error**
   - **Status Code:** `500 Internal Server Error`
   - **Response Body:**
     ```json
     {
       "error": "string (error message)"
     }
     ```

---

## Endpoint: `/users/logout`

### Description
This endpoint is used to log out a user by invalidating their JWT token. The token is added to the `blacklisteduser` collection to prevent further use.

### Method
`GET`

### Headers
- **Authorization**: `Bearer <JWT token>` (required)

### Response

#### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

#### Error Responses
1. **Token Not Found**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "error": "Token not found"
     }
     ```

2. **Server Error**
   - **Status Code:** `500 Internal Server Error`
   - **Response Body:**
     ```json
     {
       "error": "string (error message)"
     }
     ```

---

## Blacklisted Tokens

### Description
The `blacklisteduser` collection is used to store JWT tokens that have been invalidated during the logout process. Tokens in this collection are checked by the `jwtMiddleware` to ensure they cannot be used to access protected routes.

### Schema
```json
{
  "token": "string (JWT token, required, unique)",
  "timeout": "Date (default: current date, expires after 24 hours)"
}
```

### Behavior
1. When a user logs out, their JWT token is added to the `blacklisteduser` collection.
2. The `timeout` field ensures that the token is automatically removed from the database after 24 hours.
3. The `jwtMiddleware` checks if a token is in the `blacklisteduser` collection before verifying it. If the token is blacklisted, the request is denied with a `401 Unauthorized` response.

---

### Example Request for `/users/logout`
```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer <your-jwt-token>"
```

### Example Success Response
```json
{
  "message": "Logout successful"
}