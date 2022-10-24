# ts-nextjs-express-starter 

:rocket: Quickly get started with a Typescript, Next.js(Frontend), Express(Backend) project without wasting time to setup.

<p align="center" >
 <img align="" width="360" height="240" src="https://user-images.githubusercontent.com/74975876/176926220-0a056211-5a44-4f10-adc1-34613001806d.png">
</p>

## Why ?
Going through all the setup everytime this stack is used is kinda time consuming.
So here is a:battery:battery packed starter to save some time.

## Getting Started

This is a monorepo containing Next.js frontend and Express for backend. Frontend lies inside `client` directory and Backend is inside `server` directory.

### 1. Clone the repo

```sh
git clone git@github.com:bhavesh-chaudhari/ts-nextjs-express-starter.git
```

### 2. Install frontend and backend dependencies

```sh
npm install # for frontend cd to client for backend cd to server
```
### 3. Run the development server

```sh
npm run dev # in both client and server directory
```

### 4. Environment Variables
- Put .env file inside `server/src/config` for backend env variables or simply rename the existing `.env.example` to `.env`. 
- Use .env.local for env variables in nextjs.[`Further reading`](https://nextjs.org/docs/basic-features/environment-variables).

### 5. More to come...

## To do 
- Add Husky, Prettier, Eslint setup
- more...