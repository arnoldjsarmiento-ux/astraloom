# VynixSpark Frontend

React clone of [vynixspark.pro](https://vynixspark.pro/) — premier IT development agency site.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React
- React Router

## Setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Notes

- Content loads from the live `/api` endpoints via Vite proxy, with bundled JSON fallbacks if the API is unavailable.
- Routes: `/` (home), `/register` (Join Team), `/admin` (Admin login placeholder).
