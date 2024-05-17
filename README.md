# ParaPo

A web-based navigation application designed for Filipino commuters. A transit routing map software made using C# as the Backend and NextJS as the Frontend.

## How to use

*Note: Make sure you have [Node.js](https://nodejs.org/en/) installed. To check, run `node -v` in your terminal*

*Note: Make sure you have [Visual Studio](https://visualstudio.microsoft.com/) with Microsoft SQL Server installed. To check, run `dotnet -v` in your terminal*

1. First clone this git repository to your local device
```
git clone https://github.com/Pilner/ParaPo
cd ParaPo/frontend
```
2. Download all the dependencies and packages needed in this repository
```
npm install
```
3. Run the Frontend Process
```
npm run dev
```
4. Open a new instance of Visual Studio and open the Solution(.sln) file in `ParaPo/backend`
5. Run the Backend Process using the `https` run button.
6. View the website on browser at
```
localhost:3000
```

## Routes

* `/` is the Home Page
* `/catalog` is the Catalog Page
* `/catalog/route/[id]` is the Catalog Route Map Page

## API Routes

* `/api/routes` gets all routes
* `/api/routes/[id]` gets the route for the route_id specified
* `/api/locations` gets all locations
* `/api/locations[id]` gets the location for the location_id specified

## Collaborators
- Abesamis, Gabriel
- Cerna, Raymond Miguel
- Domingo, Ivan Yhuri G.
- Enrico, Carl Andrei E.
- Mesina, Venice Fae R.
- Pabroquez, Jethro S.
- Victuelles, Fabian Railey A.



## Licenses
MIT License

Copyright (c) 2024 Abesamis, Cerna, Domingo, Enrico, Mesina, Pabroquez, Victuelles

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
