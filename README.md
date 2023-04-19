# Porjects SetUp

to create a [next.js](https://nextjs.org/) project with [prisma](https://www.prisma.io/), [react](https://react.dev/) and [tailwind](https://tailwindcss.com/) we run in the terminal

```
npx create-next-app@latest name-of-the-project
```

Change directory in the terminal to the new project folder and run

```
npm install -D prisma
```

and

```
npx prisma init
```

after all look for the file ".env" and change the database url to:

```js
DATABASE_URL = "file:./dev.db";
```

This is just if you are using a local database but if you are using a server you need to add the link to that server

Don't forget to add ".env" file in ".gitignore" file.

After this create a folder in the root of the project named "lib" and inside of it create a file named "pirsma.js" and paste this:

```js
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

to modify tables and aplly that changes run in the terminal:

```
npx prisma migrate dev
```

If using eslint go to the file ".eslintrc.json" and change the content with

```json
  "extends": ["next/babel","next/caore-web-vitals"]
```

If you have the latest version of next.js will install tailwind automatically, but if not do this:

## Tailwind

<details>
And lastly but not least to install [Tailwindcss](https://tailwindcss.com/) we run this in the terminal inside of the project folder.

```
npm install -D tailwindcss postcss autoprefixer
```

and then

```
npx tailwindcss init -p
```

Search the file named "tailwind.config.cjs" and add this in the "content" field

```json
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
```

then we look for the file "index.css" remove everything and add this three lines

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

look for the "app.css" file and delete it.

</details>

## Important

Don't forget to run

```
npm install
```

to install node_modules in case you download from another computer

# Projects

In this repo you can look up to my projects, some of the will be in the same repo and others will have their unqiue repo to hots te app in vercel.

Each one of them will have their owne README.md so check itr out!!

Links to each projects:

- [Expenses-API](https://github.com/xian145/Projects/tree/main/expenses-api)
- Two
- Three
