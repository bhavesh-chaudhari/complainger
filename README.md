<h1>Complainger</h1>

A complaint manager for universities.

<h2>Table of contents</h2>

- [About](#about)
- [Instructions to run locally](#instructions-to-run-locally)
  - [Clone the repository](#clone-the-repository)
  - [Setup:](#setup)
- [Preview](#preview)
- [Built with](#built-with)
- [Roadmap](#roadmap)
- [License](#license)

## About

This project focuses on building a portal for managing complaints in university-like places. The goal is to develop a portal where students and faculties in a university can securely report their complaints which can be accessed by an admin so that appropriate action can be taken.

![image](https://user-images.githubusercontent.com/74975876/203619614-bd33b0e1-eeb3-4af4-a5b8-617095a344c6.png)
|---|

## Instructions to run locally

### Clone the repository

```sh
git clone git@github.com:bhavesh-chaudhari/complaint-manager.git
```

### Setup:

Open the project in a code editor and run the below commands from root directory.

- Starting Client:

```sh
cd client #change dir to client
```

```sh
npm i #install npm packages
```

```sh
npm run dev #start next.js server in development mode
```

- Starting Server

```sh
cd server #change dir to server
```

```sh
npm i #install npm packages
```

```sh
npm run dev #start express.js server in development mode
```

## Preview

![image](https://user-images.githubusercontent.com/74975876/203622383-1b2e113b-f9ca-4808-b3d9-b7574e736e63.png)
|---|

![image](https://user-images.githubusercontent.com/74975876/203622450-3018000e-1ad0-49b5-9dde-95a2f09dbeab.png)
|---|

![image](https://user-images.githubusercontent.com/74975876/203622526-52660530-dde2-4307-ab82-68742d89717b.png)
|---|

![image](https://user-images.githubusercontent.com/74975876/203622689-68918367-84eb-489f-9a94-dbfbee28d56b.png)
|---|

![image](https://user-images.githubusercontent.com/74975876/203625359-1c993579-285d-495e-b1d5-6b8b0f2174f8.png)
|---|

## Built with

- Language - [Typescript](https://www.typescriptlang.org/)
- Frontend - [Next.js](https://nextjs.org/)
- API - [Express.js](https://expressjs.com/) + [Next.js API routes](https://nextjs.org/docs/api-routes/introduction)
- Data Synchronization - [React Query](https://tanstack.com/query/v4)
- Styling - [TailwindCSS](https://tailwindcss.com/)
- ORM - [Prisma](https://www.prisma.io/)
- Database - [PostgreSQL](https://www.postgresql.org/)

## Roadmap

Since this is a hobby project, I have limited time to work on it. So I am trying to build this project incrementally. Given below is a rough roadmap I intend to follow.

- ~~Building Core Logic~~
- ~~Add Charts~~
- ~~Adding Download as PDF option for reports~~
- Use the app directory in Next.js
- Progressive Web App Setup
- Add Messaging Feature
- Add Notification system
- Add Google Oauth
- Dark Mode
- Setup Refresh Tokens
- Making api end-to-end type safe

## License

Licensed under the [MIT LICENSE](./LICENSE)
