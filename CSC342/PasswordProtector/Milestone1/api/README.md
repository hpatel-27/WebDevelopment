# API Setup

## Nouns

### Users
- Id
- Password Manager Account information
  - Username
  - Email
  - Password
- Providers

### Providers
- Id
- Name
- Accounts

### Accounts
- Id
- Username
- Password
- Notes

## Endpoints

### Users

```json
{
  "id": 1,
  "username": "student",
  "email": "student@mail.com",
  "password": "password",
  "providers": [
    1,
    2,
    3
  ]
}
```

- **Get the list of users (for display upon login)**
  - **HTTP Method:** GET

- **Get a user by id**
  - *Note: This may be unnecessary depending on the authentication endpoint.*
  - **HTTP Method:** GET

- **Authenticate a user**
  - *Note: More information will be learned about this in class.*
  - **HTTP Method:** (Likely POST)

- **Create a user**
  - *Note: More information will be learned about this in class.*
  - **HTTP Method:** POST
  - *Consideration: Whether this account has previously existed and we are just getting it back and reclaiming its data, or always create a new one from scratch.*

- **Remove a user account from the interface**
  - *Note: Unsure whether to remove from the database in case they want to log back in.*
  - **HTTP Method:** DELETE

- **Update a user account (change the password)**
  - **HTTP Method:** PUT

- **Get a list of the providers**
  - **HTTP Method:** GET

- **Add a provider for the user**
  - **HTTP Method:** POST

- **Delete a provider for the user**
  - **HTTP Method:** DELETE

### Providers

```json
{
  "id": 1,
  "name": "google.com",
  "accounts": [
    1,
    2,
    3
  ]
}
```

- **Get a provider based on its id**
  - **HTTP Method:** GET

- **Update a provider's name**
  - *Note: In case of a typo or other reasons.*
  - **HTTP Method:** PUT

- **Get a list of accounts associated with the provider**
  - **HTTP Method:** GET

- **Add an account for the provider**
  - **HTTP Method:** POST

- **Delete an account for the provider**
  - **HTTP Method:** DELETE

### Accounts

```json
{
  "id": 1,
  "username": "student",
  "password": "password",
  "notes": "message"
}
```

- **Get an account based on its id**
  - **HTTP Method:** GET

- **Update a field for the account**
  - *Note: Just resubmit the whole object.*
  - **HTTP Method:** PUT

## Security and Database

- *Consideration: Think about this on the next milestone.*
