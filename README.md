# The Foundry Library — MVP (Full JS)

Monorepo JavaScript (sans TypeScript) aligné avec l’architecture et la roadmap.
- **Frontend**: Next.js (app router) + Tailwind + Zustand
- **Backend**: Express + AJV + Supabase + Tesseract.js
- **IA**: appels HTTP (Cloudflare Workers AI / HF) via le backend
- **DB/Storage**: PostgreSQL + Supabase Storage
- **CI**: GitHub Actions

## Démarrage rapide

```bash
# 1) Cloner et installer
git clone <YOUR_REPO_URL> the-foundry-library
cd the-foundry-library
npm install

# 2) Env locaux
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env

# 3) Lancer en dev (2 terminaux)
npm run dev:backend
npm run dev:frontend
```

## Déploiement (MVP)
- Frontend: Vercel (connecter le repo)
- Backend: Render (Node)
- DB/Storage/Auth: Supabase
- CI: GitHub Actions (build + lint + tests)

## Workspaces
Ce repo utilise les workspaces npm.
