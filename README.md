# ⭕️tictactoe 2

This monorepo contains the complete source to develop and run tictactoe.
It consists of a react client and a node.js, socket.io backend.

## 💾 Installation

Clone the repository and execute the following commands to install the necessary dependencies:

```shell
git clone git@github.com:Zarone/TicTacToeTwo.git tictactoe
cd tictactoe
yarn install
```

This will install all the required dependencies for both `client` and `server`.

After that you can start the applications using:

```shell
# start the frontend:
cd client/
yarn run start

# start the backend/server
cd server/
yarn run start
```

The client is listening on `:3000`. The server is listening on `:3001`.

## 🔨Development

To start the application in development mode with hot module reloading enabled execute:

```
# in project root:
yarn dev # alternatively: make dev
```

Otherwise you can start the applications independently using:

```
yarn workspace @tictactoe/client dev
yarn workspace @tictactoe/server dev
```

Both applications run with automatic reload on the following ports:

```
react frontend: http://localhost:3000
nodejs backend: http://localhost:3001
```

The application should listen on port `:3000 (frontend)` and `:3001 (backend)` respectively.

## 🐳Docker

To run the application using docker you may execute:

```shell
# in repo root directory
docker compose up
```

This will build and execute both `client` and `server` package respectively.
Once docker-compose boots up you can access the application through:

```shell
http://localhost:3000 # frontend
http://localhost:3001 # backend
```

## 🧪Testing

This project is using `jest` for automated tests. Both client and server are configured using test.

To run the test suite execute:

```shell  
# in project root:
yarn run test
## or individiually:
# in server/
yarn run test
# in client/
yarn run test
```

## 🧹Formatting

This project is using `prettier` to keep the code style consistent.
To format the whole codebase execute:
```shell 
# in project root:
yarn run format # or: make format
```

## 👥 Contributing

tbd.

## ⚖️️ License


```

MIT License

Copyright (c) 2022 Zachary Alfano & friends

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
