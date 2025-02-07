<h1 style="text-align:center">ParaPo</h1>

A web-based navigation application designed for Filipino commuters. A transit routing map software made using:

<table>
    <tr>
        <th>
            Frontend
        </th>
        <th>
            Backend
        </th>
    </tr>
    <tr>
        <td colspan="2" align="center">
            <a href="https://nextjs.org/">Next.js</a>
        </td>
    </tr>
    <tr>
        <td align="center">
            <a href="https://react.dev/">React</a>
        </td>
        <td align="center">
            <a href="https://next-auth.js.org/">NextAuth.js</a>
        </th>
    </tr>
    <tr>
        <td align="center">
            <a href="https://tailwindcss.com/">TailwindCSS</a>
        </th>
        <td align="center">
            <a href="https://www.prisma.io/">Prisma</a>
        </th>
    </tr>
    <tr>
        <td align="center">
        </td>
        <td align="center">
            <a href="https://tanstack.com/query/latest">TanStack Query</a>
        </td>
    </tr>
</table>

_Note: This is a TypeScript application_

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

5. Seed the Database with pre-defined data _(optional)_

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

8. If you need to reset the database
```bash
npx prisma migrate reset
```

## Routes

- `/` - is the Home Page
- `/catalog` - is the Catalog Page
- `/catalog/route/[id]` - is the Catalog Route Map Page
- `/map` - is the Route Map Page
- `/admin` - is the Admin Dashboard Page
- `/admin/page/add/route` - is the Creation of Route Page
- `/admin/page/edit/route/[route_id]` - is the Editing of Route Page
- `/**` - is the 404 Error Page

## API Routes

### Get

- __User__
    - `/api/get/user`
    - `/api/get/user/[user_id]`
    - `/api/get/user/search/[keyword]`
- __Route__
    - `/api/get/route`
    - `/api/get/route/[route_id]`
    - `/api/get/route/search/[keyword]`
- __Location__
    - `/api/get/location`
    - `/api/get/location/[route_id]`
    - `/api/get/location/search/[keyword]`

### Put

- __User__
    - `/api/update/user/[user_id]`
- __Route__
    - `/api/update/route/[route_id]`
- __Location__
    - `/api/update/location/[location_id]`

### Post
- __User__
    - `/api/post/user`
- __Route__
    - `/api/post/route`

### Delete
- __User__
    - `/api/delete/user/[user_id]`
- __Route__
    - `/api/delete/route/[route_id]`

## Admin Dashboard
- Default username and password:
    - Username: `admin`
    - Password: `password`

## Collaborators

- Cerna, Raymond Miguel
- Enrico, Carl Andrei E.
- Mabaet, Dave
- Mesina, Venice Fae R.
- Pabroquez, Jethro S.
- Victuelles, Fabian Railey A.

## Licenses

MIT License

Copyright (c) 2025 Cerna, Enrico, Mabaet, Mesina, Pabroquez, Victuelles

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
