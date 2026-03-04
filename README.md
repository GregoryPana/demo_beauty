# Glow Beauty Supplies Demo

Foundation package demo website for Glow Beauty Supplies (Home, Product Categories, Contact).

## Run locally

```bash
npm install
npm run dev
```

## Cloudflare Workers Deploy

Build and deploy this Vite app as a Workers static-assets project:

```bash
npm run cf:deploy
```

Configured custom domain route:

- `https://demo-beauty.horizondigitalsey.com/`

Files used for Workers deployment:

- `wrangler.toml`
- `worker.js`
