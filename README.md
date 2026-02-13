# MediStore Frontend

Next.js web application for the MediStore medicine e-commerce platform.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Auth:** Better Auth (client)
- **Forms:** TanStack Form + Zod

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

### 3. Start the dev server

```bash
pnpm dev
```

App runs at `http://localhost:3000`

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build for production |
| `pnpm start` | Run production build |
| `pnpm lint` | Run ESLint |

## Pages

### Public
- `/` — Home (hero, categories, featured medicines)
- `/shop` — Browse medicines with search & filters
- `/shop/:id` — Medicine details & reviews
- `/cart` — Shopping cart
- `/checkout` — Place order
- `/about`, `/contact`, `/faq` — Info pages

### Customer Dashboard
- `/dashboard` — Order stats & spending overview
- `/orders` — Order history & tracking
- `/profile` — Edit profile
- `/reviews` — My reviews

### Seller Dashboard
- `/seller/dashboard` — Sales stats & low-stock alerts
- `/seller/medicines` — Manage inventory (add/edit/delete)
- `/seller/orders` — Fulfill orders & update status
- `/seller/profile` — Edit profile

### Admin Dashboard
- `/admin/dashboard` — Platform statistics
- `/admin/users` — Manage users (ban/unban)
- `/admin/categories` — Manage categories
- `/admin/medicines` — View all medicines
- `/admin/orders` — Manage all orders
- `/admin/contacts` — View contact submissions
- `/admin/profile` — Edit profile
