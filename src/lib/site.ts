/**
 * Conteúdo e constantes do site institucional.
 *
 * Posicionamento: o **primeiro sistema de gestão de procedimentos de
 * investigação defensiva do Brasil** (não é um software de gestão de
 * escritório — é a investigação defensiva, estruturada).
 *
 * As CTAs apontam para o app em produção (subdomínio `app`). Hoje o app só
 * expõe `/login`; quando houver página de cadastro, basta trocar `appSignup`.
 */

export const APP_URL = "https://app.legaldefense.com.br";
export const appLogin = `${APP_URL}/login`;
export const appSignup = `${APP_URL}/login`; // TODO: trocar por /cadastro quando existir

export const site = {
  name: "Legal Defense",
  domain: "legaldefense.com.br",
  tagline:
    "O primeiro sistema de gestão de procedimentos de investigação defensiva do Brasil.",
  description:
    "Abra procedimentos, registre diligências e evidências, acompanhe os processos e produza o relatório que sustenta a defesa — tudo num só lugar, com método e sigilo.",
  email: "contato@legaldefense.com.br",
  cnpj: "60.646.864/0001-07",
};

export type Feature = {
  title: string;
  description: string;
  icon: string; // chave do ícone em components/icons
};

export const features: Feature[] = [
  {
    title: "Procedimentos de investigação",
    description:
      "O coração do sistema. Abra e conduza cada investigação defensiva com método: objeto, fase, responsável, status e o histórico completo do procedimento.",
    icon: "folder",
  },
  {
    title: "Diligências",
    description:
      "Planeje e registre cada diligência — entrevistas, requisições, perícias — com prazos, responsáveis e resultados rastreáveis. Nada se perde.",
    icon: "search",
  },
  {
    title: "Evidências & documentos",
    description:
      "Colete, organize e versione evidências e documentos por procedimento, com rastreabilidade e zelo pela cadeia de custódia.",
    icon: "doc",
  },
  {
    title: "Monitoramento de processos",
    description:
      "Acompanhe automaticamente as movimentações dos processos relacionados à investigação — sem precisar consultar um a um.",
    icon: "radar",
  },
  {
    title: "Relatório de investigação",
    description:
      "Consolide tudo no relatório de investigação defensiva — base sólida para a tese e a estratégia de defesa, pronta quando você precisar.",
    icon: "chart",
  },
  {
    title: "Equipe & sigilo",
    description:
      "Multiescritório de verdade: cada investigação isolada, com perfis e permissões. O sigilo do assistido é tratado como prioridade.",
    icon: "lock",
  },
];

export type Step = { n: string; title: string; description: string };

export const steps: Step[] = [
  {
    n: "01",
    title: "Abra o procedimento",
    description:
      "Defina o objeto da investigação, o assistido e os responsáveis. Comece com método desde o primeiro indício.",
  },
  {
    n: "02",
    title: "Registre diligências e evidências",
    description:
      "Documente entrevistas, requisições e perícias; reúna provas e documentos — tudo rastreável e dentro do prazo.",
  },
  {
    n: "03",
    title: "Conclua com o relatório",
    description:
      "Consolide a investigação no relatório de investigação defensiva, pronto para sustentar a tese e a estratégia de defesa.",
  },
];

export const differentiators: { title: string; description: string }[] = [
  {
    title: "Pioneiro no Brasil",
    description:
      "O primeiro sistema feito para a investigação defensiva. Em vez de adaptar planilhas e softwares genéricos, você trabalha numa ferramenta pensada exatamente para isso.",
  },
  {
    title: "Método para a investigação defensiva",
    description:
      "Estrutura o procedimento conforme a prática da investigação defensiva (Provimento OAB nº 188/2018): das diligências às evidências, até o relatório final.",
  },
  {
    title: "Sigilo e cadeia de custódia",
    description:
      "Evidências organizadas com rastreabilidade e isolamento total entre investigações. O sigilo do seu assistido é prioridade, não detalhe.",
  },
];

/** Seção educativa: o que é investigação defensiva (reforça o pioneirismo). */
export const whatIs = {
  lead: "É a investigação conduzida pela própria defesa — para reunir, de forma lícita e documentada, os elementos que esclarecem os fatos e sustentam a tese de defesa.",
  points: [
    {
      title: "Conduzida pela defesa",
      description:
        "O advogado investiga ativamente, com iniciativa própria, em vez de apenas reagir à acusação.",
    },
    {
      title: "Lícita e documentada",
      description:
        "Diligências, entrevistas e perícias registradas com método, prazos e rastreabilidade.",
    },
    {
      title: "A serviço da tese",
      description:
        "Tudo converge para o relatório de investigação que embasa a estratégia de defesa.",
    },
  ],
  note: "Alinhado à prática regulamentada pela OAB — Provimento nº 188/2018 (atualizado pelo nº 213/2021).",
};

export type Audience = { title: string; description: string; icon: string };

export const audience: Audience[] = [
  {
    title: "Advogados criminalistas",
    description:
      "Conduza a investigação defensiva dos seus casos com método — do primeiro indício ao relatório.",
    icon: "scale",
  },
  {
    title: "Bancas e escritórios de defesa",
    description:
      "Padronize procedimentos, distribua diligências e dê visibilidade à equipe num só lugar.",
    icon: "users",
  },
  {
    title: "Núcleos e assistência",
    description:
      "Organização e escala para lidar com grandes volumes de procedimentos sem perder o controle.",
    icon: "shield",
  },
];

export type Faq = { q: string; a: string };

export const faq: Faq[] = [
  {
    q: "O que é investigação defensiva?",
    a: "É a investigação conduzida pela defesa para reunir, de forma lícita, elementos que esclareçam os fatos e fortaleçam a tese — entrevistas, documentos, perícias e diligências. É regulamentada pela OAB (Provimento nº 188/2018).",
  },
  {
    q: "Os dados e o sigilo do assistido ficam protegidos?",
    a: "Sim. Cada investigação é isolada por escritório, com autenticação robusta e permissões por perfil. Evidências e documentos ficam organizados com rastreabilidade e zelo pela cadeia de custódia.",
  },
  {
    q: "Está alinhado às regras da OAB?",
    a: "O sistema estrutura o procedimento conforme a prática da investigação defensiva prevista no Provimento OAB nº 188/2018 (e na atualização nº 213/2021). A responsabilidade pela condução segue sendo do advogado.",
  },
  {
    q: "O que preciso para começar?",
    a: "Só criar a conta do seu escritório e convidar a equipe. Você abre o primeiro procedimento em minutos — sem instalar nada e sem migração demorada.",
  },
  {
    q: "Serve para quais tipos de caso?",
    a: "Para qualquer procedimento de investigação defensiva na esfera criminal — da fase de inquérito à instrução. Você acompanha ainda as movimentações dos processos relacionados.",
  },
];
