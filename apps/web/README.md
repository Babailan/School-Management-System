# School Management System

School management System focuces on client side validation but has flaw in terms of server side validation.

## Prerequisites

- MongoDB
- NodeJS
- `.env.local` file

## `.env.local` Configuration Example

An example configuration for `.env.local` can be found in `.env.local.example`. It's advisable to follow this example and provide the necessary values for the configuration keys mentioned above.

### MongoDB URL

- **Key**: `MONGO_URL`
- **Value**: ~~`mongodb://localhost:27017`~~
- **Description**: This key-value pair specifies the URL of the MongoDB database used by the School Management System.

### Iron Key

- **Key**: `iron_key`
- **Value**: ~~`orXE8k68MP4yghjpuNP6rYQJfM1iRwm61920Aq1E8AbbahJ7LgrYVDkoH08790yZNCvJi`~~
- **Description**: The iron key serves as a security measure for encryption purposes. It should be a secret key to ensure data security.

### Bcrypt Salt Round

- **Key**: `bcrypt_saltRound`
- **Value**: ~~`10`~~
- **Description**: Bcrypt is a password hashing function. This key specifies the number of rounds to use for the bcrypt hashing algorithm, which affects the computational cost of hashing passwords.

### Gmail Credentials

- **Email**: `babailanxx@gmail.com`
- **Description**: This specifies the email address used for sending notifications or communications from the School Management System.
- **Password**: ~~`susu xaqg oqnv jjcg`~~
- **Description**: To generate a password for the Gmail account, it's recommended to follow Gmail's security protocols and generate an application-specific password for use with the School Management System.
