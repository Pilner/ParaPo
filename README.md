# ParaPo

A web-based navigation application designed for Filipino commuters. A transit routing map software made using NextJS - Prisma - SQLite3.

## How to use

_Note: Make sure you have [Node.js](https://nodejs.org/en/) installed. To check, run `node -v` in your terminal_

1. First clone this git repository to your local device

```
git clone https://github.com/Pilner/ParaPo
cd ParaPo
```

2. Download all the dependencies and packages needed in this repository

```
npm install
```

3. Create and supply `.env` file with environment variables

```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=<replace_with_mapbox_api_token>
DATABASE_URL=<replace_with_database_url>
NEXTAUTH_SECRET=<replace_with_your_secret>
NEXTAUTH_URL=<replace_with_your_url>
```

4. Migrate the Database using Prisma

```bash
npx prisma migrate dev
```

5. Seed the Database with pre-defined data

```bash
npm run prisma-seed
```

6. Run the process

```bash
npm run dev
```

7. View the website on browser at

```
http://localhost:3000
```

## Routes

- `/` - is the Home Page
- `/catalog` - is the Catalog Page
- `/catalog/route/[id]` - is the Catalog Route Map Page
- `/map` - is the Route Map Page

## API Routes

- `/api/get/route` - gets all routes
- `/api/get/route/[route_id]` - gets the route for the route_id specified
- `/api/get/route/search/[keyword]` - gets all the routes containing the keyword

## Collaborators

- Cerna, Raymond Miguel
- Enrico, Carl Andrei E.
- Mabaet, Dave
- Mesina, Venice Fae R.
- Pabroquez, Jethro S.
- Victuelles, Fabian Railey A.

## Licenses

MIT License

Copyright (c) 2024 Cerna, Enrico, Mabaet, Mesina, Pabroquez, Victuelles

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
