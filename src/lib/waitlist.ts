/**
 * Lista de espera (captação de leads de advogados) — configuração e conteúdo.
 *
 * Fluxo: o formulário (client component em `components/waitlist.tsx`) posta os
 * dados para um **Google Apps Script Web App** que checa o honeypot, grava uma
 * linha numa **Google Sheet** e notifica a equipe por e-mail (via `MailApp`).
 * Ver `landing/waitlist/SETUP.md`.
 *
 * `WAITLIST_ENDPOINT` NÃO é segredo — é a URL pública do Web App (o navegador
 * precisa chamá-la). Preencha o fallback abaixo após rodar o SETUP, ou injete
 * via variável de build `NEXT_PUBLIC_WAITLIST_ENDPOINT` no CI.
 * Vazio = "ainda não configurado" (o formulário degrada de forma segura).
 */

// ↓ cole aqui depois do SETUP (ou deixe vazio e use a env de build no CI)
const ENDPOINT_FALLBACK =
  "https://script.google.com/macros/s/AKfycby_ORQpsWdX1rcov8m2F6QOQ9B4HjsOzyuIUf7EZH_O6gfcVy0-Dzu04dhlnhlUYHceag/exec";

export const WAITLIST_ENDPOINT =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || ENDPOINT_FALLBACK;

/** Etiqueta de origem gravada junto do lead — permite segmentar depois. */
export const WAITLIST_SOURCE = "landing:oab-sc";

export const waitlist = {
  eyebrow: "Lista de espera",
  title: "Garanta seu acesso antecipado",
  subtitle:
    "Estamos liberando o Legal Defense por lotes. Deixe seus dados e seja um dos primeiros escritórios a conduzir a investigação defensiva com método — avisamos assim que sua vaga abrir.",
  bullets: [
    "Prioridade no acesso quando seu lote abrir",
    "Onboarding acompanhado para o seu escritório",
    "Sem custo e sem compromisso para entrar na lista",
  ],
  // Aviso de privacidade (LGPD) exibido junto ao formulário.
  privacy: {
    consentLabel:
      "Autorizo o Legal Defense a usar meus dados de contato para falar comigo sobre a lista de espera e o lançamento.",
    note:
      "Controlador: Legal Defense (CNPJ 60.646.864/0001-07). Usamos seus dados apenas para contato sobre a lista de espera — não compartilhamos com terceiros. Você pode revogar o consentimento, acessar ou excluir seus dados a qualquer momento em contato@legaldefense.com.br.",
  },
  success: {
    title: "Você está na lista!",
    body: "Recebemos seus dados. Entraremos em contato assim que o acesso do seu escritório for liberado.",
  },
} as const;
