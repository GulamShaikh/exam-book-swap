# Book Exchange Hub (BookAgain)

A web platform for students to **buy, sell, and exchange exam books**—making textbooks affordable, reusable, and easy to find.

## Table of contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Environment variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## About

BookAgain (Book Exchange Hub) helps students reduce the cost of education by enabling a simple marketplace for second‑hand exam books. Users can list books they want to sell, discover books they need, and connect for exchange.

## Features

- Create and browse book listings
- Buy/sell/exchange focused workflow (student marketplace)
- Fast, modern UI built with reusable components
- Responsive design (mobile → desktop)

> Note: Feature availability depends on what is implemented in the current codebase. Update this section as the product evolves.

## Tech stack

- **Vite** (frontend tooling)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**

## Project structure

A typical Vite + React + TS project layout:

- `src/` — application source code
- `public/` — static assets
- `index.html` — app entry HTML
- `vite.config.*` — Vite configuration

## Getting started

### Prerequisites

- **Node.js** (LTS recommended)
- **npm** (comes with Node)

If you use `nvm`, you can install Node easily: https://github.com/nvm-sh/nvm

### Run locally

```sh
# 1) Clone
git clone https://github.com/GulamShaikh/exam-book-swap.git

# 2) Enter the project
cd exam-book-swap

# 3) Install dependencies
npm install

# 4) Start dev server
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

## Available scripts

```sh
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview the production build locally
```

(If you have lint/typecheck scripts in `package.json`, list them here too.)

## Environment variables

If the project requires environment variables, create a `.env` file in the project root.

Example:

```env
# VITE_API_BASE_URL=https://example.com
```

> Only variables prefixed with `VITE_` are exposed to the client in Vite.

## Deployment

You can deploy the production build to any static hosting that supports single‑page apps:

- Vercel
- Netlify
- GitHub Pages

Build command:

```sh
npm run build
```

Output directory is typically `dist/`.

## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-change`
3. Commit: `git commit -m "Add my change"`
4. Push: `git push origin feature/my-change`
5. Open a Pull Request

## License

Add a license to clarify usage (e.g., MIT). If you haven't chosen one yet, you can remove this section for now.
