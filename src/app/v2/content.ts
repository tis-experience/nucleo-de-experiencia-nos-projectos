/* Conteúdo da apresentação. Fontes: a apresentação original do Núcleo, a "Proposta de actuação do Núcleo de
   Experiência com IA" e o "Processo de desenvolvimento de software com IA". */

/** Escala de maturidade de UX da NN/g; a TIS situa-se entre os níveis 2 e 3. */
export const MATURITY_LEVELS = ["Ausente", "Limitado", "Emergente", "Estruturado", "Integrado", "Orientado ao utilizador"];

/** Inquérito interno da TIS (Nov/2024), 143 respostas. */
export const SURVEY = [
  { value: 83, caption: "acredita que um profissional de UX seria útil para a sua equipa" },
  { value: 72, caption: "considera que UX impacta muito o sucesso dos produtos" },
  { value: 53, caption: "não conhece bem o conceito de User Experience" },
  { value: 34, caption: "acha que UX é responsabilidade apenas dos designers" },
];

/** Como decorre actualmente o trabalho de UX (página 03 da apresentação original).
    Nos passos em falta, `stem` é o ponto da linha do processo (em px) onde o passo devia acontecer. */
export const CURRENT_PROCESS = [
  {
    label: "Como entramos",
    headline: "UX entra na proposta comercial, para desenhar ecrãs",
    items: [
      {
        title: "Entrada via proposta comercial",
        text: "O Núcleo é accionado para produzir ecrãs em prazos curtos, com pouca análise prévia.",
        stem: 30,
      },
      {
        title: "O projecto inicia-se pelo desenho",
        text: "Os ecrãs são a primeira entrega esperada e, quando aprovados, seguem directamente para desenvolvimento.",
        stem: 30,
      },
    ],
  },
  {
    label: "O que fica por fazer",
    headline: "O problema por trás do pedido fica por investigar",
    items: [
      {
        title: "Escopo rígido e fragmentado",
        text: "As orientações chegam com pouco contexto, sem margem para investigar o problema real.",
        stem: 60,
      },
      {
        title: "Discovery inexistente ou superficial",
        text: "A compreensão do problema baseia-se em suposições, sem contacto directo com utilizadores.",
        stem: 336,
      },
      {
        title: "Validação sem utilizadores reais",
        text: "As decisões de design são validadas internamente, com base em opiniões.",
        stem: 672,
      },
    ],
  },
  {
    label: "Consequência",
    headline: "Os problemas só aparecem depois da implementação",
    items: [
      {
        title: "Experiências comprometidas",
        text: "As soluções não correspondem ao problema real dos utilizadores.",
        stem: 30,
      },
      {
        title: "Potencial inexplorado",
        text: "Oportunidades de melhoria passam despercebidas.",
        stem: 30,
      },
      {
        title: "Retrabalho e projectos descartados",
        text: "Decisões sem validação voltam para trás depois da implementação.",
        stem: 30,
      },
    ],
  },
];

export type StageId = "compreender" | "desenhar" | "avaliar" | "construir" | "validar";

/** As cinco etapas do trabalho de UX, segundo a proposta de actuação do Núcleo. */
export type Stage = {
  id: StageId;
  number: string;
  name: string;
  short: string;
  work: string;
  aiSupport: string;
  delivery: string;
  /** O que a entrega contém, segundo a tabela de entregáveis da proposta de actuação. */
  deliveryContents: string;
};

export const STAGES: Stage[] = [
  {
    id: "compreender",
    number: "01",
    name: "Compreender o problema",
    short: "Compreender",
    work: "Perceber a dificuldade, o resultado esperado e o que ainda é desconhecido, com o solicitante e o PO.",
    aiSupport: "Organiza os materiais, resume as evidências com a origem e prepara perguntas.",
    delivery: "Brief de UX",
    deliveryContents: "Problema, pessoas, tarefa prioritária, evidências e dúvidas.",
  },
  {
    id: "desenhar",
    number: "02",
    name: "Desenhar o fluxo e a solução",
    short: "Desenhar",
    work: "Desenhar o percurso da pessoa e o comportamento da interface, com o PO nas alternativas e a engenharia na viabilidade.",
    aiSupport: "Produz alternativas e constrói ecrãs a partir dos padrões do Design System.",
    delivery: "Solução de UX/UI",
    deliveryContents: "Fluxos, conteúdo, interfaces, componentes, estados e decisões.",
  },
  {
    id: "avaliar",
    number: "03",
    name: "Avaliar a solução e ajustar",
    short: "Avaliar",
    work: "Escolher uma validação proporcional à dúvida e observar se a pessoa consegue concluir a tarefa.",
    aiSupport: "Prepara guiões e cenários e agrupa os problemas observados.",
    delivery: "Solução revista",
    deliveryContents: "Problemas encontrados, evidências, decisões e questões ainda abertas.",
  },
  {
    id: "construir",
    number: "04",
    name: "Acompanhar a construção",
    short: "Construir",
    work: "Trabalhar com PO, engenharia e QA sobre a mesma versão executável, sem um handoff separado.",
    aiSupport: "Prepara a especificação de UX e compara a versão com os critérios.",
    delivery: "Especificação de UX",
    deliveryContents: "Comportamentos e critérios ligados aos requisitos e à versão construída.",
  },
  {
    id: "validar",
    number: "05",
    name: "Validar a experiência entregue",
    short: "Validar",
    work: "Rever fluxos, conteúdo, consistência visual e acessibilidade na versão entregue.",
    aiSupport: "Compara ecrãs e estados e organiza achados e feedback de utilização.",
    delivery: "Validação de UX",
    deliveryContents: "Problemas observados, efeitos na utilização, prioridades e recomendações.",
  },
];

export type MarketExample = {
  company: string;
  name: string;
  description: string;
  result: string;
  resultCaption: string;
  source: string;
};

export const MARKET_EXAMPLES: MarketExample[] = [
  {
    company: "Bank of America, com a IDEO",
    name: "Keep the Change",
    description:
      "A observação da relação das pessoas com o dinheiro revelou o hábito de arredondar valores, que deu origem a um serviço de poupança automática.",
    result: "12 milhões",
    resultCaption: "de clientes aderiram e pouparam mais de 2 mil milhões de dólares.",
    source: "This is Design Thinking, 2018",
  },
  {
    company: "Government Digital Service",
    name: "GOV.UK",
    description:
      "Um serviço desenhado com pesquisa contínua junto dos utilizadores substituiu 1 882 sites do governo britânico por um só.",
    result: "< 30%",
    resultCaption: "do custo anual dos sites que substituiu.",
    source: "Public Digital, GDS",
  },
  {
    company: "Microsoft",
    name: "Xbox Adaptive Controller",
    description:
      "Um comando desenhado com jogadores com mobilidade reduzida e com organizações que os representam, do primeiro protótipo à embalagem.",
    result: "19 entradas",
    resultCaption: "para ligar os dispositivos de que cada jogador precisa.",
    source: "Microsoft, 2018",
  },
];

export type Metric = {
  prefix?: string;
  number: number;
  decimals?: number;
  unit: string;
  caption: string;
  source: string;
};

export const BENEFIT_METRICS: Metric[] = [
  {
    prefix: "+",
    number: 32,
    unit: "p.p.",
    caption: "de crescimento de receita em cinco anos nas empresas do quartil superior em design.",
    source: "McKinsey, The Business Value of Design, 2018. 300 empresas.",
  },
  {
    number: 301,
    unit: "%",
    caption: "de retorno em três anos de uma prática de design, com 75% menos tempo de design.",
    source: "Forrester para a IBM, 2018. 4 clientes entrevistados e 60 inquiridos.",
  },
  {
    number: 34,
    unit: "%",
    caption: "mais depressa a concluir o mesmo objectivo de design com um Design System.",
    source: "Figma, 2019. Experiência com designers.",
  },
  {
    number: 47,
    unit: "%",
    caption: "mais depressa a desenvolver um formulário com um Design System.",
    source: "Sparkbox, com o Carbon da IBM. 8 programadores.",
  },
];

/** Como a IA entra no trabalho de UX (secção 2 da proposta de actuação). */
export const AI_FLOW = {
  inputs: [
    {
      title: "Base de conhecimento de UX",
      text: "Design System, padrões de interacção, linguagem, acessibilidade e critérios de revisão.",
    },
    {
      title: "Contexto do projecto",
      text: "Problema, utilizadores, regras confirmadas, identidade do cliente e limitações.",
    },
  ],
  reviewers: [
    { who: "Núcleo", what: "revê a coerência da experiência" },
    { who: "Engenharia", what: "revê a implementação" },
    { who: "PO", what: "confirma regras e âmbito" },
  ],
};

export const DS_POINTS = [
  {
    title: "Tokens e componentes em código",
    text: "Padrões de ecrã prontos a reutilizar por designers e programadores.",
  },
  {
    title: "Tema por cliente",
    text: "Tipografia, cor e densidade definidas pelo designer antes de qualquer geração.",
  },
  {
    title: "Contexto para os assistentes de IA",
    text: "Os ecrãs são compostos com os componentes do sistema, o que evita interfaces genéricas.",
  },
  {
    title: "Verificações automáticas",
    text: "Desvios ao Design System e problemas de acessibilidade detectados em cada alteração.",
  },
];

/** Desenho que representa a entrega de cada etapa de UX (índices do desenho, pela ordem de STAGES). */
export const STAGE_VISUAL = [0, 2, 3, 4, 5];

/** Legenda do desenho que representa cada tipo de entrega do Núcleo. */
export const DELIVERY_VISUALS: Record<number, string> = {
  0: "Evidências organizadas por temas",
  2: "Alternativas de fluxo e demonstração",
  3: "Achados de validação com evidência",
  4: "Interface, componentes e especificação de UX",
  5: "Análise da utilização",
};

/** As cinco fases do processo de desenvolvimento da TIS e o que o Núcleo entrega em cada uma. */
export const PHASES = [
  {
    name: "Proposta comercial",
    delivery: "Brief, fluxo principal e demonstração com a identidade do cliente, a tempo da proposta.",
    areas: ["pre-venda"],
    visual: 2,
  },
  {
    name: "Discovery",
    delivery: "Problema, utilizadores e métrica de sucesso, direcção visual e fluxos com os estados relevantes.",
    areas: ["requisitos", "produtos"],
    visual: 0,
  },
  {
    name: "Desenvolvimento",
    delivery: "Especificação de UX, componentes e revisão de design sobre a versão em construção.",
    areas: ["fabrica", "requisitos", "qa"],
    visual: 4,
  },
  {
    name: "Aceite e release",
    delivery: "Validação de UX: usabilidade, consistência visual e acessibilidade da versão a entregar.",
    areas: ["qa", "requisitos"],
    visual: 3,
  },
  {
    name: "Sustentação",
    delivery: "Análise do feedback e do uso real, com recomendações de melhoria.",
    areas: ["produtos", "fabrica"],
    visual: 5,
  },
];

export type Area = {
  id: string;
  name: string;
  note?: string;
  gives: string;
  gets: string;
  visual: number;
};

/** Participação do Núcleo nas áreas da TIS (secção 5 da proposta de actuação). */
export const AREAS: Area[] = [
  {
    id: "pre-venda",
    name: "Pré-venda",
    gives: "Contexto da oportunidade, prazo e restrições.",
    gets: "Brief, fluxo e demonstração, proposta de UX e estimativa da participação do Núcleo.",
    visual: 2,
  },
  {
    id: "fabrica",
    name: "Fábrica",
    gives: "Requisitos, limitações técnicas e a aplicação em construção.",
    gets: "Fluxos, interfaces, componentes e orientações de comportamento, com acompanhamento da implementação.",
    visual: 4,
  },
  {
    id: "requisitos",
    name: "Requisitos e ritos",
    note: "PO e Scrum Master",
    gives: "Regras e prioridades, com participação directa do PO na descoberta, no desenho e na validação.",
    gets: "Fluxos, cenários, conteúdo e demonstrações para o refinamento e as revisões.",
    visual: 2,
  },
  {
    id: "qa",
    name: "QA",
    gives: "A versão em teste, os percursos que devem funcionar e os defeitos encontrados.",
    gets: "Critérios de interface e avaliação de usabilidade e acessibilidade, com achados e evidência.",
    visual: 3,
  },
  {
    id: "produtos",
    name: "Produtos TIS",
    note: "Academia, Saúde, Finanças e Setor Público",
    gives: "Necessidades, regras, feedback e dados de utilização.",
    gets: "Pesquisas, fluxos, interfaces, validações e recomendações de melhoria.",
    visual: 5,
  },
  {
    id: "marketing",
    name: "Marketing",
    note: "Marca TIS e produtos TIS",
    gives: "A comunicação da marca, o público e os canais.",
    gets: "Compreensão do público e experiência nos pontos de contacto, com apoio a conteúdo e navegação.",
    visual: 4,
  },
  {
    id: "pessoas",
    name: "Pessoas e Cultura",
    gives: "Procedimentos, ferramentas, avaliações e eventos internos.",
    gets: "Fluxos, orientações, materiais ou interfaces, e validações com colaboradores.",
    visual: 0,
  },
  {
    id: "inovacao",
    name: "Laboratório de Inovação",
    gives: "A ideia, o objectivo do experimento, o público previsto e as limitações.",
    gets: "Fluxos, demonstrações e recomendações fundamentadas no que foi observado.",
    visual: 2,
  },
];

/** Temas de cliente sobre os mesmos componentes: cor, cantos e tratamento visual diferentes. */
export const THEMES = [
  { id: "a", name: "Cliente A", color: "#036ef2", card: 18, item: 8, pill: 999 },
  { id: "b", name: "Cliente B", color: "#078207", card: 0, item: 0, pill: 0 },
  { id: "c", name: "Cliente C", color: "#3126b4", card: 32, item: 18, pill: 16 },
];

/** Equipa actual do Núcleo. `photo` é opcional: caminho de uma imagem em src/assets; sem ela mostram-se as iniciais. */
export const TEAM: { name: string; role: string; intro: string; photo?: string }[] = [
  {
    name: "Marcell da Silva",
    role: "Design Lead",
    intro: "Define como o Núcleo actua nos projectos e acompanha a qualidade do que é entregue.",
  },
  {
    name: "",
    role: "Designer Analista",
    intro: "Desenha os fluxos e as interfaces com a equipa de cada projecto e acompanha a construção.",
  },
  {
    name: "",
    role: "Designer Analista",
    intro: "Desenha os fluxos e as interfaces com a equipa de cada projecto e acompanha a construção.",
  },
];

/** Reforço previsto no cenário a 6 meses da apresentação original (página de composição da equipa). */
export const TEAM_NEXT = ["Designer Analista", "Designer Analista", "UX Researcher"];

/** As cinco camadas da experiência (Jesse James Garrett), da mais visível à mais profunda. */
export const UX_LAYERS = [
  { name: "Superfície", text: "A interface visual" },
  { name: "Esqueleto", text: "Componentes, wireframes e navegação" },
  { name: "Estrutura", text: "Fluxos, arquitectura de informação e design de interacção" },
  { name: "Escopo", text: "Funcionalidades, conteúdo e requisitos" },
  { name: "Estratégia", text: "Necessidades do utilizador e objectivos do produto" },
];

export type SceneId =
  | "capa"
  | "ux"
  | "partida"
  | "mudanca"
  | "etapas"
  | "ds"
  | "entregas"
  | "resultados"
  | "equipa"
  | "fecho";

/** Cada passo é um avanço do apresentador; uma cena pode ter vários passos. */
export type Step = { id: string; scene: SceneId; label: string; build?: number; stageIndex?: number };

export const STEPS: Step[] = [
  { id: "capa", scene: "capa", label: "Abertura" },
  { id: "equipa", scene: "equipa", label: "A equipa do Núcleo" },
  { id: "o-que-e-ux", scene: "ux", label: "O que é UX" },
  { id: "ponto-de-partida", scene: "partida", label: "Ponto de partida" },
  { id: "processo-actual", scene: "mudanca", label: "Como decorre actualmente", build: 0 },
  { id: "com-processo", scene: "mudanca", label: "Com o processo de UX", build: 1 },
  ...STAGES.map((stage, stageIndex) => ({ id: stage.id, scene: "etapas" as const, label: stage.name, stageIndex })),
  { id: "ia", scene: "entregas", label: "O que o Núcleo entrega, com IA", build: 0 },
  { id: "fases", scene: "entregas", label: "O que o Núcleo entrega, por fase", build: 1 },
  { id: "areas", scene: "entregas", label: "O que o Núcleo entrega, por área", build: 2 },
  { id: "design-system", scene: "ds", label: "Design System TIS" },
  { id: "mercado", scene: "resultados", label: "Resultados no mercado", build: 0 },
  { id: "medir", scene: "resultados", label: "Como vamos medir na TIS", build: 1 },
  { id: "fecho", scene: "fecho", label: "Obrigado" },
];
