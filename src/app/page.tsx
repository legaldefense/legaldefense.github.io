import Link from "next/link";

import { Logo } from "@/components/logo";
import { DashboardMock } from "@/components/dashboard-mock";
import { ThemeToggle } from "@/components/theme-toggle";
import { Waitlist } from "@/components/waitlist";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  featureIcons,
  LockIcon,
  ScaleIcon,
  ScrollIcon,
  ShieldIcon,
  SparkIcon,
  TargetIcon,
  UsersIcon,
} from "@/components/icons";
import {
  appLogin,
  audience,
  differentiators,
  faq,
  features,
  site,
  steps,
  whatIs,
} from "@/lib/site";

const nav = [
  { href: "#o-que-e", label: "O que é" },
  { href: "#recursos", label: "Recursos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "FAQ" },
  { href: "#lista-de-espera", label: "Lista de espera" },
];

const audienceIcons: Record<string, typeof ScaleIcon> = {
  scale: ScaleIcon,
  users: UsersIcon,
  shield: ShieldIcon,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-ink">
      <Header />
      <main>
        <Hero />
        <Stats />
        <WhatIs />
        <Features />
        <Differentiators />
        <Audience />
        <HowItWorks />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------------- header */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-ink/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="Legal Defense — início">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-navy dark:text-white/70 dark:hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <ThemeToggle />
          <a
            href="#lista-de-espera"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-navy px-3.5 py-2 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:bg-navy-700 dark:bg-green dark:hover:bg-green-bright"
          >
            Entrar na lista de espera
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* aurora de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute -top-40 left-1/4 h-[28rem] w-[28rem] rounded-full bg-navy/15 blur-3xl dark:bg-navy/40" />
        <div className="animate-float absolute -top-24 right-1/4 h-80 w-96 rounded-full bg-green/15 blur-3xl dark:bg-green/25" />
        <div className="absolute inset-0 bg-grid-ink opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rise inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-white">
            <span className="flex h-5 items-center rounded-full bg-green px-1.5 text-[10px] font-bold text-white">
              1º
            </span>
            <span className="text-ink-soft dark:text-white/75">
              sistema de investigação defensiva do Brasil
            </span>
          </span>

          <h1
            className="rise mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl dark:text-white"
            style={{ animationDelay: "60ms" }}
          >
            A investigação defensiva,{" "}
            <span className="text-gradient">no controle</span>.
          </h1>

          <p
            className="rise mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft dark:text-white/65"
            style={{ animationDelay: "120ms" }}
          >
            {site.description}
          </p>

          <div
            className="rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "180ms" }}
          >
            <a
              href="#lista-de-espera"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green px-6 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:bg-green-bright hover:shadow-[var(--shadow-card)] sm:w-auto"
            >
              Entrar na lista de espera
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              href={appLogin}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:border-navy/30 hover:text-navy sm:w-auto dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
            >
              Entrar na plataforma
            </Link>
          </div>

          <p
            className="rise mt-4 text-sm text-muted dark:text-white/45"
            style={{ animationDelay: "240ms" }}
          >
            Vagas iniciais limitadas · Cada investigação isolada e sigilosa
          </p>
        </div>

        {/* produto */}
        <div
          className="rise relative mx-auto mt-14 max-w-5xl"
          style={{ animationDelay: "320ms" }}
        >
          <div className="absolute -inset-x-8 -top-6 bottom-0 -z-10 rounded-[2rem] bg-gradient-to-b from-mist to-transparent dark:from-white/5" />
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ stats */

function Stats() {
  const stats = [
    { value: "1º no Brasil", label: "sistema de investigação defensiva" },
    { value: "Método", label: "do indício ao relatório" },
    { value: "Auto", label: "monitoramento de processos" },
    { value: "Sigilo", label: "isolado por investigação" },
  ];
  return (
    <section className="border-y border-line bg-mist/60 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-5 py-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-6 text-center">
            <div className="text-2xl font-semibold tracking-tight text-navy dark:text-green-bright">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-ink-soft dark:text-white/55">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- o que é (NEW) */

function WhatIs() {
  return (
    <section
      id="o-que-e"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-green">
            O que é
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-white">
            Investigação defensiva, sem mistério
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft dark:text-white/65">
            {whatIs.lead}
          </p>
          <div className="mt-6 inline-flex items-start gap-3 rounded-xl border border-line bg-mist/60 p-4 text-sm text-ink-soft dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60">
            <ScrollIcon className="mt-0.5 h-5 w-5 shrink-0 text-green dark:text-green-bright" />
            <span>{whatIs.note}</span>
          </div>
        </div>

        <div className="space-y-3">
          {whatIs.points.map((p, i) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-navy/20 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-sm font-semibold text-white dark:bg-green">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold tracking-tight text-ink dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft dark:text-white/60">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- features */

function Features() {
  return (
    <section
      id="recursos"
      className="scroll-mt-20 border-y border-line bg-mist/50 dark:border-white/10 dark:bg-white/[0.02]"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <SectionHead
          eyebrow="Recursos"
          title="Tudo o que a investigação defensiva precisa"
          subtitle="Do primeiro indício ao relatório final, com cada diligência, evidência e prazo sob controle."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = featureIcons[f.icon];
            return (
              <article
                key={f.title}
                className="group relative rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[var(--shadow-card)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/25"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy transition-colors group-hover:bg-green group-hover:text-white dark:bg-white/10 dark:text-green-bright dark:group-hover:bg-green dark:group-hover:text-white">
                  <Icon className="h-[22px] w-[22px]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft dark:text-white/60">
                  {f.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- differentiators */

function Differentiators() {
  const icons = [SparkIcon, TargetIcon, LockIcon];
  return (
    <section className="relative overflow-hidden bg-ink text-white dark:bg-ink-2">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-navy/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-green-bright">
            Por que o Legal Defense
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Não é um software jurídico genérico. É a investigação defensiva,
            estruturada.
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
          {differentiators.map((d, i) => {
            const Icon = icons[i];
            return (
              <div key={d.title} className="bg-ink/40 p-7 backdrop-blur-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-green-bright">
                  <Icon className="h-[22px] w-[22px]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {d.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">
                  {d.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ audience (NEW) */

function Audience() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <SectionHead
        eyebrow="Para quem é"
        title="Feito para quem faz defesa de verdade"
        subtitle="De criminalistas autônomos a bancas e núcleos — quem investiga para defender, com método e sigilo."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {audience.map((a) => {
          const Icon = audienceIcons[a.icon] ?? ShieldIcon;
          return (
            <div
              key={a.title}
              className="rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green dark:bg-green/15 dark:text-green-bright">
                <Icon className="h-[22px] w-[22px]" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink dark:text-white">
                {a.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft dark:text-white/60">
                {a.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- how it works */

function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-20 border-y border-line bg-mist/50 dark:border-white/10 dark:bg-white/[0.02]"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <SectionHead
          eyebrow="Como funciona"
          title="Da abertura ao relatório, em três passos"
          subtitle="Sem planilhas paralelas nem improviso — a investigação conduzida com método desde o primeiro dia."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              {i < steps.length - 1 && (
                <div className="absolute left-12 top-7 hidden h-px w-full bg-gradient-to-r from-line to-transparent md:block dark:from-white/15" />
              )}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white font-mono text-lg font-semibold text-navy shadow-[var(--shadow-soft)] dark:border-white/10 dark:bg-white/[0.06] dark:text-green-bright">
                {s.n}
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink dark:text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft dark:text-white/60">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- faq (NEW) */

function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-20 sm:py-28">
      <SectionHead
        eyebrow="FAQ"
        title="Perguntas frequentes"
        subtitle="O que escritórios costumam querer saber antes de começar."
      />
      <div className="mt-12 divide-y divide-line rounded-2xl border border-line bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
        {faq.map((item) => (
          <details key={item.q} className="group px-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-ink marker:hidden dark:text-white">
              {item.q}
              <ChevronDownIcon className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 dark:text-white/50" />
            </summary>
            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-ink-soft dark:text-white/60">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="border-t border-line bg-mist/50 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-white/55">
              {site.tagline} Das diligências às evidências, até o relatório que
              sustenta a defesa.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-white/40">
                Produto
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  { href: "#o-que-e", label: "O que é" },
                  { href: "#recursos", label: "Recursos" },
                  { href: "#faq", label: "FAQ" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-ink-soft hover:text-navy dark:text-white/60 dark:hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href={appLogin}
                    className="text-ink-soft hover:text-navy dark:text-white/60 dark:hover:text-white"
                  >
                    Entrar
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-white/40">
                Contato
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink-soft hover:text-navy dark:text-white/60 dark:hover:text-white"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href="#lista-de-espera"
                    className="text-ink-soft hover:text-navy dark:text-white/60 dark:hover:text-white"
                  >
                    Entrar na lista de espera
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row dark:border-white/10 dark:text-white/40">
          <p>
            © {new Date().getFullYear()} {site.name} · CNPJ {site.cnpj} · Todos
            os direitos reservados.
          </p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------ shared bits */

function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.16em] text-green dark:text-green-bright">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-white">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft dark:text-white/65">
        {subtitle}
      </p>
    </div>
  );
}
