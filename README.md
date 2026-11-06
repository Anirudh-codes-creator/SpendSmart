# SpendSmart

Personal finance application using React/Vite, Express, MongoDB Atlas and Mongoose.

Features: JWT/bcrypt authentication; user scoped transaction, budget and goal CRUD; finance summaries and Recharts analytics; CSV transaction export; responsive layout.

## Setup
1. Install Node.js 20+ and create a MongoDB Atlas database.
2. Copy .env.example to .env and set MONGODB_URI, JWT_SECRET, CLIENT_URL=http://localhost:5173, VITE_API_URL=http://localhost:5000/api, PORT=5000.
3. Run npm install from root, client and server folders.
4. Run npm run dev in both client and server (or npm run dev from root).

## API
Auth: POST /api/auth/register, /api/auth/login; GET /api/auth/me.
Transactions: GET/POST /api/transactions; PUT/DELETE /api/transactions/:id.
Budgets and goals support GET/POST collection and PUT/DELETE by ID.
Analytics: /api/analytics/summary, /monthly, /categories.
Protected requests use Authorization: Bearer token. Finance queries are scoped to the signed-in user.

## Vercel
Deploy from repository root. Configure MONGODB_URI, JWT_SECRET, CLIENT_URL and VITE_API_URL in Vercel. The serverless entry is api/index.js and vercel.json defines API and SPA routing. Verify health, auth and database CRUD against live URLs before claiming deployment success.

Balance is lifetime income minus expenses. Savings is current amounts across savings goals. No sample financial data is seeded. Never commit .env.

## GitHub
After creating a GitHub repository, add its URL as origin and push main. This project has no remote configured yet.

## Screenshots / future work
Add app screenshots after local run. Future ideas: recurring transactions, date filters, pagination and account integrations.
