
# Wigilabs Prueba Tecnica

This technical test is an API that basically consists of two endpoints: one to create users and another to log in those users.

## Setup

### Clone project:

```
git clone https://github.com/castellarmartinez/prueba-tecnica-wigilabs
```

### Add env variables:

See the .env.example file to add the required variables

### Install dependencies:

```
npm install
```

### Build the project:

```
npm run build
```

### Start the project on your local:
```
npm start
```

## Usage

### 1. Registering users (/users/register):

Add a new user by providing the name, username, email, password and phone.


### 2. Login users (/users/login):

Allow users to login by providing the email and password.


## Databsae:

The database only contains one collection called users. The reason for choicing mongodb over other databases is due to its syntax, which is very similar to JavaScript. Since there are no relations between tables or primary keys, it was not selected an relational database.

## Build with

- [Node.js](https://nodejs.org/es/docs/) - Programming Enviroment for JavaScript
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Express](https://expressjs.com/) - JavaScript Framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database


## Authors ✒️

**David Castellar Martínez** [[GitHub](https://github.com/castellarmartinez/)]
[[LinkedIn](https://www.linkedin.com/in/castellarmartinez/)]
