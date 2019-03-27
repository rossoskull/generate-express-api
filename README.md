## generate-express-api
[![npm](https://img.shields.io/npm/v/generate-express-api.svg)](https://www.npmjs.com/package/generate-express-api) 
[![npm](https://img.shields.io/npm/dm/generate-express-api.svg)](https://www.npmjs.com/package/generate-express-api)
[![npm](https://img.shields.io/npm/l/generate-express-api.svg)](https://www.npmjs.com/package/generate-express-api)
#### To install
Copy the following command, and execute it in your terminal.
```sh
    $ npm install -g generate-express-api
```

#### To generate an API boilerplate
```sh
    $ generate-api .
```
The above command will generate an Express + Node.js + MongoDB API boilerplate in the current working directory.
```sh
    $ generate-api <dirname>
```
The above command will generate an Express + Node.js + MongoDB API boilerplate in a new directory called <dirname>.

#### Installing
After the boilderplate is generated, cd into the directory, and run `npm install`
```sh
    $ cd <dirname>
    $ npm install
```

#### Running the server
After the installation is complete, you can run the server by using the following command.
```sh
    $ npm start
```
If the environment variables are set, and a port is designated, the server will start at the designated port, else it will start at port 8000.

#### Working with the API
Initially, API for Login and signup functionalities is readily available.
##### /register/
**Description** Registers a user with the given details  
**Request type** POST  
**Header body** { fname, lname, email, username, password }  
**Response** A status code, and a response message.  

##### /register/username/
**Description** Checks if the username is already used.  
**Request type** POST  
**Header body** { username }  
**Response** A status code, and a response message.  

##### /register/email
**Description** Checks if the email is already used.  
**Request type** POST  
**Header body** { email }  
**Response** A status code, and a response message. 

##### /login/
**Description** Logs in a user with the given details.  
**Request type** POST  
**Header body** { username, password }  
**Response** A status code, a response message and a JWT token.

#### Made from scratch by Jay Mistry
