# Porjects SetUp

<details>
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

</details>

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

## NextAuth Email

<details>
First of all we need to change directory to the root of the project, after that run this in the terminal.

```
npm install next-auth @next-auth/prisma-adapter nodemailer
```

open .env and add this:

```js
EMAIL_SERVER=smtp://user:pass@smtp.mailtrap.io:465
EMAIL_FROM=Your name <you@email.com>
NEXTAUTH_URL=http://localhost:3000
SECRET=<ENTER A UNIQUE STRING HERE>
```

in secrete add a secrete code, whatever is fine, but normally use a random [generator](https://generate-secret.vercel.app/32) bc is so important. For test pruposse we will use [mailtrap](https://mailtrap.io/) for email authorization this simulate a email sending.
Go to your virtual inbox and go to SMTP settings and click on show credential, there will be the information we'll need. Look for the information needed to create a email like this:

```js
smtp://USERNAME:PASSWORD@HOST:PORT
```

and put tha in the .env file in EMAIL_SERVER.

Creeate a file in pages/api/auth/[...nextauth].js we this content:

```js
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "lib/prisma";

export const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],

  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  adapter: PrismaAdapter(prisma),

  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      session.user.username = user.username;
      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);
```

now in schema.prisma put the nex models:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  username      String?   @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?
  oauth_token_secret String?
  oauth_token        String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

Run a migration

```
npx prisma migrate dev
```

Open pages/\_app.js and in the top add

```js
import { SessionProvider } from "next-auth/react";
```

In the same file inside of the funtion change te content to this:

```js
return (
  <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>
);
```

Now, on pages/index.js add a link that points to /api/auth/signin.

```js
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <Link to="/api/auth/signin">Login</Link>
    </div>
  );
}
```

After that all is set, you can press the button in main page and will redirect to a form to login, after put a email adress it will send a email to mailtrap and there you will click in the link and you are login

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
