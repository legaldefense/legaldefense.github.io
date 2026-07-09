"use client";

import { useEffect, useId, useRef, useState } from "react";

import { ArrowRightIcon, CheckIcon, ShieldIcon } from "./icons";
import { WAITLIST_ENDPOINT, WAITLIST_SOURCE, waitlist } from "@/lib/waitlist";

/* --------------------------------------------------------------- helpers */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Formata como (DD) 9XXXX-XXXX (celular) ou (DD) XXXX-XXXX (fixo). */
function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<
  Record<"nome" | "email" | "whatsapp" | "consent" | "form", string>
>;

/* ============================================================= component */

export function Waitlist() {
  const uid = useId();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [escritorio, setEscritorio] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // isca anti-bot (fica escondido)

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): Errors {
    const e: Errors = {};
    if (nome.trim().length < 2) e.nome = "Informe seu nome completo.";
    if (!EMAIL_RE.test(email.trim())) e.email = "Informe um e-mail válido.";
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11)
      e.whatsapp = "Informe um WhatsApp com DDD.";
    if (!consent)
      e.consent = "É preciso autorizar o contato para entrar na lista.";
    return e;
  }

  /** Move o foco para o primeiro campo com erro (acessibilidade). */
  function focusFirstError(e: Errors) {
    if (typeof document === "undefined") return;
    const orderKeys: Array<"nome" | "email" | "whatsapp" | "consent"> = [
      "nome",
      "email",
      "whatsapp",
      "consent",
    ];
    const first = orderKeys.find((k) => e[k]);
    if (first) document.getElementById(`${uid}-${first}`)?.focus();
  }

  async function onSubmit(ev: React.SyntheticEvent<HTMLFormElement>) {
    ev.preventDefault();

    // honeypot preenchido = bot → simula sucesso e não envia nada.
    if (honeypot) {
      setStatus("success");
      return;
    }

    const e = validate();
    if (!WAITLIST_ENDPOINT)
      e.form = "Formulário ainda não configurado. Tente novamente em breve.";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      focusFirstError(e);
      return;
    }

    setStatus("submitting");
    const body = new URLSearchParams({
      nome: nome.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      escritorio: escritorio.trim(),
      consent: "true",
      origem: WAITLIST_SOURCE,
      pagina: typeof window !== "undefined" ? window.location.href : "",
    });

    try {
      // `no-cors`: o Apps Script não devolve cabeçalhos CORS legíveis, então a
      // resposta é opaca — confirmamos de forma otimista. A validação real
      // (honeypot) acontece no servidor; ver waitlist/SETUP.md.
      await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrors({ form: "Não foi possível enviar agora. Tente novamente." });
    }
  }

  const submitting = status === "submitting";

  return (
    <section
      id="lista-de-espera"
      className="scroll-mt-20 border-y border-line bg-mist/50 dark:border-white/10 dark:bg-white/[0.02]"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* ------------------------------------------------------ pitch */}
          <div className="lg:pt-4">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-green dark:text-green-bright">
              {waitlist.eyebrow}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-white">
              {waitlist.title}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft dark:text-white/65">
              {waitlist.subtitle}
            </p>
            <ul className="mt-8 space-y-3">
              {waitlist.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[15px] text-ink-soft dark:text-white/70"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green dark:bg-green/15 dark:text-green-bright">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------------- card */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8 dark:border-white/10 dark:bg-white/[0.04]">
            {status === "success" ? (
              <SuccessCard />
            ) : (
              <form onSubmit={onSubmit} noValidate>
                {!WAITLIST_ENDPOINT &&
                  process.env.NODE_ENV !== "production" && (
                    <p className="mb-5 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                      ⚙️ Endpoint da lista de espera ainda não configurado — veja{" "}
                      <code>landing/waitlist/SETUP.md</code>.
                    </p>
                  )}

                <Field
                  id={`${uid}-nome`}
                  label="Nome completo"
                  required
                  error={errors.nome}
                >
                  <input
                    id={`${uid}-nome`}
                    name="nome"
                    type="text"
                    autoComplete="name"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    aria-required="true"
                    aria-invalid={Boolean(errors.nome)}
                    aria-describedby={
                      errors.nome ? `${uid}-nome-error` : undefined
                    }
                    className={inputCls(Boolean(errors.nome))}
                  />
                </Field>

                <Field
                  id={`${uid}-email`}
                  label="E-mail"
                  required
                  error={errors.email}
                >
                  <input
                    id={`${uid}-email`}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="voce@escritorio.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? `${uid}-email-error` : undefined
                    }
                    className={inputCls(Boolean(errors.email))}
                  />
                </Field>

                <Field
                  id={`${uid}-whatsapp`}
                  label="WhatsApp"
                  required
                  error={errors.whatsapp}
                >
                  <input
                    id={`${uid}-whatsapp`}
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="(48) 99999-9999"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
                    aria-required="true"
                    aria-invalid={Boolean(errors.whatsapp)}
                    aria-describedby={
                      errors.whatsapp ? `${uid}-whatsapp-error` : undefined
                    }
                    className={inputCls(Boolean(errors.whatsapp))}
                  />
                </Field>

                <Field id={`${uid}-escritorio`} label="Escritório (opcional)">
                  <input
                    id={`${uid}-escritorio`}
                    name="escritorio"
                    type="text"
                    autoComplete="organization"
                    placeholder="Nome do escritório ou banca"
                    value={escritorio}
                    onChange={(e) => setEscritorio(e.target.value)}
                    className={inputCls(false)}
                  />
                </Field>

                {/* honeypot: escondido de humanos, atraente para bots */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor={`${uid}-website`}>Não preencha este campo</label>
                  <input
                    id={`${uid}-website`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* consentimento LGPD */}
                <div className="mt-5">
                  <label
                    htmlFor={`${uid}-consent`}
                    className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-soft dark:text-white/65"
                  >
                    <input
                      id={`${uid}-consent`}
                      type="checkbox"
                      name="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      aria-required="true"
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={
                        errors.consent ? `${uid}-consent-error` : undefined
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-green dark:border-white/25"
                    />
                    <span>{waitlist.privacy.consentLabel}</span>
                  </label>
                  {errors.consent && (
                    <ErrorText id={`${uid}-consent-error`}>
                      {errors.consent}
                    </ErrorText>
                  )}
                </div>

                {errors.form && (
                  <p
                    role="alert"
                    className="mt-5 rounded-lg border border-red-300 bg-red-50 px-3.5 py-2.5 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                  >
                    {errors.form}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green px-6 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:bg-green-bright disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Spinner />
                      Enviando…
                    </>
                  ) : (
                    <>
                      Entrar na lista de espera
                      <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-muted dark:text-white/60">
                  <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-green/70 dark:text-green-bright/70" />
                  <span>{waitlist.privacy.note}</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ subcomponents */

function SuccessCard() {
  const ref = useRef<HTMLDivElement>(null);
  // Anuncia (role=status) e move o foco para o cartão — o form focado saiu do DOM.
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      tabIndex={-1}
      className="flex flex-col items-center py-8 text-center outline-none"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green dark:bg-green/15 dark:text-green-bright">
        <CheckIcon className="h-7 w-7" />
      </span>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink dark:text-white">
        {waitlist.success.title}
      </h3>
      <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink-soft dark:text-white/60">
        {waitlist.success.body}
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-ink dark:text-white/85"
      >
        {label}
        {required && <span className="text-green"> *</span>}
      </label>
      {children}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 text-[13px] text-red-600 dark:text-red-400"
    >
      {children}
    </p>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 motion-safe:animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function inputCls(hasError: boolean): string {
  return [
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors",
    "placeholder:text-muted focus:ring-2 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/30",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/50"
      : "border-line focus:border-navy focus:ring-navy/15 dark:border-white/15 dark:focus:border-green dark:focus:ring-green/20",
  ].join(" ");
}
