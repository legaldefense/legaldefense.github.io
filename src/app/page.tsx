import Link from "next/link";

import { Logo } from "@/components/logo";
import { DashboardMock } from "@/components/dashboard-mock";
import {
  ArrowRightIcon,
  CheckIcon,
  featureIcons,
  LockIcon,
  SearchIcon,
  SparkIcon,
} from "@/components/icons";
import {
  appLogin,
  appSignup,
  differentiators,
  features,
  site,
  steps,
} from "@/lib/site";

const nav = [
  { href: "#recursos", label: "Recursos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#diferenciais", label: "Diferenciais" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Differentiators />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------------- header */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="Legal Defense — início">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-navy"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={appLogin}
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-navy"
          >
            Entrar
          </Link>
          <Link
            href={appSignup}
            className="group inline-flex items-center gap-1.5 rounded-lg bg-navy px-3.5 py-2 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:bg-navy-700"
          >
            Começar
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* glows de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-navy-50 to-green-50 blur-3xl" />
        <div className="absolute inset-0 bg-grid-ink opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-soft shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
            </span>
            Feito para escritórios de defesa criminal
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            A gestão do seu escritório,{" "}
            <span className="text-gradient">no controle</span>.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
            {site.description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={appSignup}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green px-6 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:bg-green-bright hover:shadow-[var(--shadow-card)] sm:w-auto"
            >
              Criar conta do escritório
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={appLogin}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:border-navy/30 hover:text-navy sm:w-auto"
            >
              Entrar na plataforma
            </Link>
          </div>

          <p className="mt-4 text-sm text-muted">
            Acesso imediato · Seus dados isolados por escritório
          </p>
        </div>

        {/* produto */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          <div className="absolute -inset-x-8 -top-6 bottom-0 -z-10 rounded-[2rem] bg-gradient-to-b from-mist to-transparent" />
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ stats */

function Stats() {
  const stats = [
    { value: "1 painel", label: "para todo o escritório" },
    { value: "Multi", label: "escritório, dados isolados" },
    { value: "Auto", label: "monitoramento de processos" },
    { value: "100%", label: "focado em defesa criminal" },
  ];
  return (
    <section className="border-y border-line bg-mist/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-5 py-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-6 text-center">
            <div className="text-2xl font-semibold tracking-tight text-navy">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- features */

function Features() {
  return (
    <section id="recursos" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
      <SectionHead
        eyebrow="Recursos"
        title="Tudo o que o escritório precisa, num lugar só"
        subtitle="Do primeiro atendimento ao arquivamento, com cada procedimento, cliente e prazo sob controle."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = featureIcons[f.icon];
          return (
            <article
              key={f.title}
              className="group relative rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy transition-colors group-hover:bg-green group-hover:text-white">
                <Icon className="h-[22px] w-[22px]" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {f.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- differentiators */

function Differentiators() {
  const icons = [SearchIcon, SparkIcon, LockIcon];
  return (
    <section id="diferenciais" className="relative scroll-mt-20 overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-navy/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-green-bright">
            Por que o Legal Defense
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Não é um CRM genérico. É a sua prática, organizada.
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

/* ----------------------------------------------------------- how it works */

function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
      <SectionHead
        eyebrow="Como funciona"
        title="Do zero ao escritório organizado em três passos"
        subtitle="Sem migração interminável nem treinamento longo — a equipe começa a usar no mesmo dia."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.n} className="relative">
            {i < steps.length - 1 && (
              <div className="absolute left-12 top-7 hidden h-px w-full bg-gradient-to-r from-line to-transparent md:block" />
            )}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white font-mono text-lg font-semibold text-navy shadow-[var(--shadow-soft)]">
              {s.n}
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
              {s.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- final cta */

function FinalCta() {
  const bullets = [
    "Procedimentos, clientes e equipe num só lugar",
    "Monitoramento automático de movimentações",
    "Dados isolados e protegidos por escritório",
  ];
  return (
    <section className="px-5 pb-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-700 to-ink px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-green/25 blur-3xl" />

        <div className="relative">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Coloque o seu escritório no controle hoje
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-white/70">
            Crie a conta do escritório e traga a equipe. É rápido, e o seu dia a
            dia agradece.
          </p>

          <ul className="mx-auto mt-8 flex max-w-2xl flex-col flex-wrap items-start justify-center gap-3 text-left sm:flex-row sm:items-center sm:gap-x-6">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-white/85">
                <CheckIcon className="h-4 w-4 shrink-0 text-green-bright" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={appSignup}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-green-bright sm:w-auto"
            >
              Criar conta do escritório
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={appLogin}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="border-t border-line bg-mist/50">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {site.tagline} Gestão de procedimentos, clientes e processos para a
              advocacia criminal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Produto
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="#recursos" className="text-ink-soft hover:text-navy">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#como-funciona" className="text-ink-soft hover:text-navy">
                    Como funciona
                  </a>
                </li>
                <li>
                  <Link href={appLogin} className="text-ink-soft hover:text-navy">
                    Entrar
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Contato
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink-soft hover:text-navy"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <Link href={appSignup} className="text-ink-soft hover:text-navy">
                    Criar conta
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos
            reservados.
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
      <span className="text-sm font-semibold uppercase tracking-[0.16em] text-green">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
        {subtitle}
      </p>
    </div>
  );
}
