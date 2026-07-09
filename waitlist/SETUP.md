# Lista de espera — Setup (Google Sheets + Apps Script)

Captação de leads de advogados na landing (`legaldefense.com.br`). O formulário
posta para um **Google Apps Script Web App** que checa o honeypot, grava na
**planilha** e **notifica a equipe** por e-mail. Nada roda na AWS; o e-mail sai
pelo Google Workspace (contorna o SES em sandbox).

```
Landing (form)  ──POST──▶  Apps Script Web App  ──▶  Google Sheet ("Leads")
   honeypot                 checa honeypot            +  e-mail p/ a equipe
```

Arquivos:

- `Code.gs` — código do Apps Script (colar no editor).
- `appsscript.json` — manifesto (scopes + web app). Opcional, mas recomendado.
- Front: `src/components/waitlist.tsx`, `src/lib/waitlist.ts`.

---

## 1. Planilha + Apps Script

1. Crie uma planilha no Google Drive: **"Legal Defense — Lista de espera"**.
2. Abra o Apps Script — **tanto faz** de dentro da planilha (**Extensões → Apps
   Script**) ou um projeto avulso em `script.google.com`: o `Code.gs` abre a
   planilha **pelo ID** (`SpreadsheetApp.openById`), então funciona dos dois jeitos.
3. Apague o conteúdo de `Código.gs` e cole o conteúdo de **`Code.gs`** deste
   diretório. **Confira a constante `SPREADSHEET_ID`** no topo — deve ser o trecho
   entre `/d/` e `/edit` da URL da sua planilha (já vem preenchida com a sua).
4. (Opcional, recomendado) Ative o manifesto: ⚙️ **Configurações do projeto →
   marque "Mostrar arquivo de manifesto appsscript.json"**; abra `appsscript.json`
   e cole o conteúdo deste diretório.
5. Salve (💾).

A aba **"Leads"** e o cabeçalho são criados automaticamente no primeiro envio.

> ℹ️ O escopo agora é `spreadsheets` (planilha por ID) — ao (re)publicar, o Google
> vai pedir **reautorização**. Aceite normalmente.

## 2. Propriedade do script (para onde vão os avisos)

No editor do Apps Script: ⚙️ **Configurações do projeto → Propriedades do script
→ Adicionar propriedade**:

| Propriedade  | Valor                                                          |
| ------------ | -------------------------------------------------------------- |
| `TEAM_EMAIL` | e-mail que recebe os leads (ex.: `contato@legaldefense.com.br`) |

## 3. Publicar o Web App

1. **Implantar → Nova implantação**.
2. Tipo: **App da Web**.
3. **Executar como:** *Eu* · **Quem tem acesso:** *Qualquer pessoa*.
4. **Implantar** e autorize os escopos (planilha, envio de e-mail). Copie a
   **URL do app da Web** (`.../exec`).
5. Teste o health check: abra a URL `/exec` no navegador → deve responder
   `{"ok":true,"service":"waitlist"}`.

> ⚠️ **Ao editar `Code.gs` depois**, republique: **Gerenciar implantações →
> (lápis) → Versão: Nova versão → Implantar**. Sem isso, a alteração não vale no ar.

## 4. Ligar a landing à URL

Uma variável (não é segredo — a URL do Web App é pública por design):
`NEXT_PUBLIC_WAITLIST_ENDPOINT` = a URL `/exec` do passo 3.

**Opção A — mais simples (hardcode):** edite `src/lib/waitlist.ts` e preencha o
fallback:

```ts
const ENDPOINT_FALLBACK = "https://script.google.com/macros/s/AKfy.../exec";
```

**Opção B — via CI (variável do repositório):** em
`github.com/legaldefense/legaldefense.github.io → Settings → Secrets and
variables → Actions → Variables`, crie `NEXT_PUBLIC_WAITLIST_ENDPOINT`; depois
exponha no build (`.github/workflows/deploy.yml`):

```yaml
      - run: npm run build # next build com output: export -> ./out
        env:
          NEXT_PUBLIC_WAITLIST_ENDPOINT: ${{ vars.NEXT_PUBLIC_WAITLIST_ENDPOINT }}
```

> Se ficar vazia, o formulário ainda **renderiza** e avisa (só em dev) que o
> endpoint não está configurado — degrada de forma segura.

## 5. Publicar

`git push` para `main` no repo `legaldefense.github.io` → o GitHub Actions
reconstrói e publica no GitHub Pages em ~1–2 min.

## 6. Testar de ponta a ponta

1. Abra `legaldefense.com.br` → seção **"Lista de espera"**.
2. Preencha e envie → deve aparecer o cartão "Você está na lista!".
3. Confira: nova linha na aba **"Leads"** (colunas Data/Hora, Nome, E-mail,
   WhatsApp, Escritório, Consentimento, Origem, Página) + e-mail para
   `TEAM_EMAIL`.

---

## Anti-spam

A proteção é um **honeypot** (campo isca escondido; se vier preenchido, o envio é
descartado no servidor). Suficiente para um link divulgado numa apresentação. Se
o formulário passar a receber spam de bots, dá para adicionar um captcha
(ex.: Cloudflare Turnstile) depois — a estrutura já isola o envio.

## Limitações conhecidas (por design)

- **Confirmação otimista:** o Apps Script não devolve cabeçalhos CORS legíveis,
  então o navegador envia em `mode:"no-cors"` e mostra sucesso sem ler a resposta
  do servidor. Por isso **acompanhe a planilha** como fonte da verdade (e o
  e-mail à equipe é um backup — sai mesmo se a gravação na planilha falhar).
- **CSP:** o GitHub Pages não impõe CSP restritiva hoje. Se um dia adicionar,
  libere o domínio do Web App do Google em `connect-src`.
- **Dedupe:** leads repetidos são gravados; de-duplique na planilha se precisar.
