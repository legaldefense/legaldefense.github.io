/**
 * Conteúdo e constantes do site institucional.
 *
 * As CTAs apontam para o app em produção (mesmo domínio raiz, subdomínio `app`).
 * Hoje o app só expõe `/login` no frontend; quando houver página de cadastro,
 * basta trocar `appSignup`.
 */

export const APP_URL = "https://app.legaldefense.com.br";
export const appLogin = `${APP_URL}/login`;
export const appSignup = `${APP_URL}/login`; // TODO: trocar por /cadastro quando existir

export const site = {
  name: "Legal Defense",
  domain: "legaldefense.com.br",
  tagline: "O sistema de gestão para a advocacia de defesa criminal.",
  description:
    "Procedimentos, clientes, equipe e monitoramento de processos — tudo num só lugar, pensado para escritórios de defesa criminal e investigação defensiva.",
  email: "contato@legaldefense.com.br",
};

export type Feature = {
  title: string;
  description: string;
  icon: string; // chave do ícone em components/icons
};

export const features: Feature[] = [
  {
    title: "Procedimentos",
    description:
      "O coração do escritório. Cada caso com número, classe, prioridade, status, documentos e histórico completo — sempre vinculado ao cliente e ao responsável.",
    icon: "folder",
  },
  {
    title: "Clientes",
    description:
      "Cadastro completo de requerentes, com vínculo aos procedimentos, responsáveis e todo o histórico de relacionamento do escritório.",
    icon: "users",
  },
  {
    title: "Monitoramento de processos",
    description:
      "Acompanhamento automático das movimentações nos tribunais. As novidades chegam até você — sem precisar consultar processo por processo.",
    icon: "radar",
  },
  {
    title: "Equipe & permissões",
    description:
      "Multiescritório de verdade: cada dado pertence a um escritório e só é visto nele. Perfis de administrador e membro, com responsabilidades claras.",
    icon: "shield",
  },
  {
    title: "Documentos & histórico",
    description:
      "Reúna autos, peças e anexos por procedimento. Tudo versionado e rastreável, com a linha do tempo de cada caso à mão.",
    icon: "doc",
  },
  {
    title: "Painel & produtividade",
    description:
      "Indicadores do escritório, prazos, tarefas e agenda num painel único — para a equipe saber o que importa hoje, sem planilhas paralelas.",
    icon: "chart",
  },
];

export type Step = { n: string; title: string; description: string };

export const steps: Step[] = [
  {
    n: "01",
    title: "Crie seu escritório",
    description:
      "Cadastre o escritório e convide a equipe. Cada pessoa entra com o seu acesso e perfil.",
  },
  {
    n: "02",
    title: "Traga clientes e procedimentos",
    description:
      "Registre clientes e abra procedimentos com classe, prioridade e responsáveis. Importe o que já existe.",
  },
  {
    n: "03",
    title: "Acompanhe tudo num lugar",
    description:
      "Movimentações, prazos, documentos e tarefas num painel só. O escritório no controle, sem nada caindo no esquecimento.",
  },
];

export const differentiators: { title: string; description: string }[] = [
  {
    title: "Feito para a defesa criminal",
    description:
      "Não é um CRM genérico adaptado. A organização gira em torno do procedimento criminal e da investigação defensiva — do jeito que o seu trabalho realmente acontece.",
  },
  {
    title: "Investigação defensiva no fluxo",
    description:
      "Ferramentas de apoio à investigação e análise de documentos para sustentar a tese de defesa com mais profundidade e menos trabalho manual.",
  },
  {
    title: "Segurança e isolamento por escritório",
    description:
      "Autenticação robusta e separação total de dados entre escritórios. O sigilo do seu cliente é tratado como prioridade, não como detalhe.",
  },
];
