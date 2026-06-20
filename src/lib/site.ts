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
