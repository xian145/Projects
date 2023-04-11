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

If using eslint go to the file ".eslintrc.json" and change the content with

```json
  "extends": ["next/babel","next/caore-web-vitals"]
```

And lastly but not least to install [Tailwindcss](https://tailwindcss.com/)

# Projects

In this repo you can look up to my projects, some of the will be in the same repo and others will have their unqiue repo to hots te app in vercel.

Each one of them will have their owne README.md so check itr out!!

Links to each projects:

- One
- Two
- Three
