# SpendSmart

SpendSmart is a personal finance app built with React, Vite, Express, MongoDB Community Server and Mongoose. Users can record income and expenses, set budgets, review charts, and track savings goals.

## Features
- JWT authentication with bcrypt password hashing.
- User-scoped transaction, budget and savings goal APIs.
- Dashboard summaries, monthly/category analytics and Recharts.
- Transaction search, type/category/date filtering and CSV export.
- Responsive screens and light/dark appearance.
- Vercel deployment as two projects from this repository: a static client and an Express API.

## Local development
1. Install Node.js 20+ and MongoDB Community Server 9.0.
2. From the repository root, run `npm run db:start`. This starts MongoDB and stores database files under `server/data/db`.
3. Copy `server/.env.example` to `server/.env` if needed, then set a long random `JWT_SECRET`.
4. Run `npm run dev` and open http://localhost:5173. The API health check at http://localhost:5001/api/health should return `database: connected`.

Local development uses `mongodb://127.0.0.1:27017/spendsmart`.

Root, client and server dependencies are listed in their respective package.json files. If installing from scratch, run npm install at the root, client, and server directories.

## Database
Mongoose models: User (name, email, password hash), Transaction (owner, title, amount, type, category, date, description), Budget (owner, category, limit, month/year), and SavingsGoal (owner, title, target/current amount, deadline). Financial reads and writes are scoped to the authenticated user. The database name comes from the database path in MONGODB_URI (use /spendsmart). Collections are created when the first record of each type is saved.

Dashboard balance = lifetime income minus lifetime expenses. Savings = the total current amount across the user's savings goals.

## API
Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me.
Transactions: GET/POST /api/transactions; PUT/DELETE /api/transactions/:id.
Budgets: GET/POST /api/budgets; PUT/DELETE /api/budgets/:id.
Goals: GET/POST /api/goals; PUT/DELETE /api/goals/:id.
Analytics: GET /api/analytics/summary, /api/analytics/monthly, /api/analytics/categories.
Protected endpoints require Authorization: Bearer <token>. Transaction listing accepts search, type, category, start and end query parameters.

## Vercel deployment
Deploy the client and API as two Vercel projects from the same Git repository. This keeps Vite's static output and Express's Node runtime in their supported project roots. The current production domains are `https://client-gold-three-27.vercel.app` and `https://server-xi-ashy-46.vercel.app`.

### API project
1. Import the repository into Vercel. Set Root Directory to server.
2. Vercel detects the Express app exported by server.js; leave the framework/build settings at their detected defaults.
3. Add a hosted MongoDB connection. The easiest route is to install MongoDB Atlas from the Vercel Marketplace and attach it to this API project; it provisions Atlas and supplies `MONGODB_URI` as an environment variable. If entering the URI manually, create an Atlas database user with read/write access, then use the cluster's **Connect > Drivers > Node.js** URI and set its database path to `/spendsmart`.
4. Set these API environment variables for Production: `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL`. For this client, set `CLIENT_URL=https://client-gold-three-27.vercel.app`. Never commit the URI or JWT secret.
5. Deploy and verify `https://server-xi-ashy-46.vercel.app/api/health` returns `database: connected`.

### Client project
1. Import the same repository as another Vercel project. Set Root Directory to client.
2. Use the Vite preset with Build Command npm run build and Output Directory dist.
3. Set `VITE_API_URL=https://server-xi-ashy-46.vercel.app/api` for Production before building.
4. Deploy and verify registration/login, dashboard data, and a direct refresh on `/transactions`.

The deployed API cannot connect to your computer's local MongoDB address. Its `MONGODB_URI` must point to a hosted MongoDB server. The frontend has a production fallback to the current API domain, but `VITE_API_URL` should still be set in Vercel so the URL is explicit. Never place database credentials in `VITE_API_URL` or any `VITE_` variable: those values are public in the browser bundle.

## Environment variables
- MONGODB_URI: local URI `mongodb://127.0.0.1:27017/spendsmart` for local development; use a MongoDB URI reachable from the host in deployment.
- JWT_SECRET: long random signing secret, kept only on the API.
- CLIENT_URL: allowed client origin, kept only on the API.
- PORT: local API port.
- VITE_API_URL: API base URL compiled into the client.

## GitHub and screenshots
The source is on the main branch. Add your own GitHub repository as origin before pushing. Screenshots can be added here after the app is running.

## Future enhancements
Recurring transaction scheduling, pagination, automated insights, account integrations, and notifications.

