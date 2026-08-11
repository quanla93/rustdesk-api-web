# RustDesk API Web

Vue 3 + Element Plus admin frontend for [`quanla93/rustdesk-api`](https://github.com/quanla93/rustdesk-api).

This repository is kept separate from the backend repository on purpose:

- `rustdesk-api` owns backend routes, API contracts, Docker/release packaging, bundled RustDesk web client assets, and server-rendered templates.
- `rustdesk-api-web` owns the source code for the admin SPA served at `/_admin/`.

Keeping the admin SPA in its own fork makes UI changes durable: Docker and GitHub Actions can build the admin frontend from this repo instead of pulling the upstream `lejianwen/rustdesk-api-web` directly.

## Requirements

- Node.js 20 is used by the backend CI workflow.
- npm

## Install

```sh
git clone https://github.com/quanla93/rustdesk-api-web.git
cd rustdesk-api-web
npm install
```

## Local development

```sh
npm run dev
```

By default the Vite dev server proxies admin API calls from `/api/admin` to `http://127.0.0.1:5000`; see `.env.development` and `.env.production`.

## Build

```sh
npm run build
```

The build output is written to `dist/`. The backend repo copies this output into `resources/admin/` during CI/Docker builds.

## Backend integration

The companion backend repo should point to this fork:

- `Dockerfile.dev`: `FRONTEND_GIT_REPO=https://github.com/quanla93/rustdesk-api-web.git`
- GitHub Actions: checkout `quanla93/rustdesk-api-web`

The runtime admin URL remains:

```text
http://<your server[:port]>/_admin/
```
