# Legal Defense — Site institucional

Landing page do **Legal Defense** (gestão para escritórios de defesa criminal),
servida em `https://legaldefense.com.br`. As CTAs apontam para o app em
`https://app.legaldefense.com.br`.

## Stack

- **Next.js 15** (App Router) com **static export** (`output: "export"` → `out/`).
- **Tailwind CSS v4** (tokens da marca em `src/app/globals.css`).
- **Geist** (mesma fonte do app).
- Sem backend/SSR — site 100% estático, hospedado no **GitHub Pages**.
- **Lista de espera** (captação de leads): formulário → Google Apps Script →
  Google Sheets. Setup em `waitlist/SETUP.md`.

## Desenvolvimento

```bash
npm ci
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # gera ./out (estático)
```

## Estrutura

- `src/app/page.tsx` — composição da landing (hero, recursos, diferenciais, etc.).
- `src/components/` — `logo`, `dashboard-mock`, `icons`.
- `src/lib/site.ts` — textos, features e URLs do app (fonte única de conteúdo).
- `public/logo.svg`, `public/favicon.svg` — marca (escudo + lupa).

## Deploy

CI/CD por **GitHub Actions → GitHub Pages** (`.github/workflows/deploy.yml`):
todo push em `main` roda `npm run build` (export para `out/`) e publica. Domínio
apex via `public/CNAME` + DNS na Route53. HTTPS provisionado pelo GitHub.
Identidade visual: navy `#000080` + verde `#008000` + Geist.
