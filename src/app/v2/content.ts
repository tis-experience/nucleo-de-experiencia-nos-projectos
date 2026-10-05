import photoFelizardo from "./assets/equipa-felizardo.webp";
import photoJosue from "./assets/equipa-josue.webp";
import photoMarcell from "./assets/equipa-marcell.webp";

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

export type StageId = "descobrir" | "definir" | "explorar" | "validar" | "entregar" | "acompanhar";

/** As seis etapas do processo de UX, com os nomes da apresentação original (Descobrir, Definir, Explorar, Validar,
    Entregar, Acompanhar). O trabalho, o apoio de IA e as entregas vêm da proposta de actuação do Núcleo. */
export type Stage = {
  id: StageId;
  number: string;
  name: string;
  short: string;
  work: string;
  aiSupport: string;
  /** Métodos de UX da etapa, segundo a proposta de actuação e o processo técnico do Núcleo. */
  methods: string[];
  delivery: string;
  /** O que a entrega contém, segundo a tabela de entregáveis da proposta de actuação. */
  deliveryContents: string;
};

export const STAGES: Stage[] = [
  {
    id: "descobrir",
    number: "01",
    name: "Descobrir",
    short: "Descobrir",
    work: "Entender o problema, o utilizador e o contexto, com o solicitante e o PO, incluindo o que ainda é desconhecido.",
    aiSupport: "Organiza os materiais, resume as evidências com a origem e prepara perguntas.",
    methods: ["Entrevistas", "Observação da tarefa", "Análise de dados", "Revisão documental"],
    delivery: "Brief de UX",
    deliveryContents: "Problema, pessoas, contexto, evidências e dúvidas.",
  },
  {
    id: "definir",
    number: "02",
    name: "Definir",
    short: "Definir",
    work: "Estabelecer o escopo, as pessoas a servir e os critérios que dizem quando a solução resolve o problema.",
    aiSupport: "Cruza as evidências com as regras confirmadas e propõe critérios e cenários para rever.",
    methods: ["Personas", "Tarefa prioritária", "Critérios de sucesso"],
    delivery: "Escopo de UX",
    deliveryContents: "Tarefa prioritária, personas, restrições e critérios de sucesso.",
  },
  {
    id: "explorar",
    number: "03",
    name: "Explorar",
    short: "Explorar",
    work: "Gerar e comparar possibilidades de solução, do fluxo à interface, com o PO nas alternativas e a engenharia na viabilidade.",
    aiSupport: "Produz alternativas e constrói ecrãs a partir dos padrões do Design System.",
    methods: ["Fluxo de utilizador", "Arquitectura de informação", "Esboços", "Demonstração executável"],
    delivery: "Solução de UX/UI",
    deliveryContents: "Fluxos, conteúdo, interfaces, componentes, estados e decisões.",
  },
  {
    id: "validar",
    number: "04",
    name: "Validar",
    short: "Validar",
    work: "Testar com utilizadores, numa validação proporcional à dúvida, e iterar com a evidência recolhida.",
    aiSupport: "Prepara guiões e cenários e agrupa os problemas observados.",
    methods: ["Revisão especializada", "Conversa sobre o fluxo", "Teste de utilização"],
    delivery: "Solução revista",
    deliveryContents: "Problemas encontrados, evidências, decisões e questões ainda abertas.",
  },
  {
    id: "entregar",
    number: "05",
    name: "Entregar",
    short: "Entregar",
    work: "Especificar, alinhar com o desenvolvimento e acompanhar a construção com PO, engenharia e QA sobre a mesma versão executável.",
    aiSupport: "Prepara a especificação de UX e compara a versão com os critérios.",
    methods: ["Especificação de UX", "Revisão da implementação", "Avaliação de acessibilidade", "Verificações com QA"],
    delivery: "Especificação de UX",
    deliveryContents: "Comportamentos e critérios ligados aos requisitos e à versão construída.",
  },
  {
    id: "acompanhar",
    number: "06",
    name: "Acompanhar",
    short: "Acompanhar",
    work: "Avaliar o impacto da versão entregue a partir do feedback e da utilização, e extrair aprendizagens para o ciclo seguinte.",
    aiSupport: "Compara ecrãs e estados e organiza achados e feedback de utilização.",
    methods: ["Análise de feedback", "Análise da utilização", "Revisão da experiência"],
    delivery: "Análise da experiência entregue",
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
export const STAGE_VISUAL = [0, 1, 2, 3, 4, 5];

/** Legenda do desenho que representa cada tipo de entrega do Núcleo. */
export const DELIVERY_VISUALS: Record<number, string> = {
  0: "Evidências organizadas por temas",
  1: "Persona, escopo e critérios de sucesso",
  2: "Fluxo, alternativas e demonstração",
  3: "Achados de validação com evidência",
  4: "Interface, componentes e especificação de UX",
  5: "Análise da utilização",
};

/** As cinco fases do processo de desenvolvimento da TIS e o que o Núcleo entrega em cada uma. */
export const PHASES: { name: string; delivery: string; areas: string[]; stages: StageId[] }[] = [
  {
    name: "Proposta comercial",
    delivery: "Brief, fluxo principal e demonstração com a identidade do cliente, a tempo da proposta.",
    areas: ["pre-venda"],
    stages: ["explorar", "descobrir"],
  },
  {
    name: "Discovery",
    delivery: "Problema, utilizadores e métrica de sucesso, direcção visual e fluxos com os estados relevantes.",
    areas: ["requisitos", "produtos"],
    stages: ["descobrir", "definir", "explorar", "validar"],
  },
  {
    name: "Desenvolvimento",
    delivery: "Especificação de UX, componentes e revisão de design sobre a versão em construção.",
    areas: ["fabrica", "requisitos", "qa"],
    stages: ["entregar"],
  },
  {
    name: "Aceite e release",
    delivery: "Revisão de UX da versão a entregar: usabilidade, consistência visual e acessibilidade.",
    areas: ["qa", "requisitos"],
    stages: ["entregar", "validar"],
  },
  {
    name: "Sustentação",
    delivery: "Análise do feedback e do uso real, com recomendações de melhoria.",
    areas: ["produtos", "fabrica"],
    stages: ["acompanhar"],
  },
];

export type Area = {
  id: string;
  name: string;
  note?: string;
  /** Como o Núcleo contribui para o trabalho da área, numa frase. */
  role: string;
  gives: string;
  gets: string;
  /** Etapas de UX em que a área participa; a primeira é a principal e dá o desenho e a entrega mostrados. */
  stages: StageId[];
};

/** Participação do Núcleo nas áreas da TIS (secção 5 da proposta de actuação). */
export const AREAS: Area[] = [
  {
    id: "pre-venda",
    name: "Pré-venda",
    role: "Ajuda a esclarecer o problema do cliente e a mostrar a solução numa demonstração, dentro do prazo da proposta.",
    gives: "Contexto da oportunidade, prazo e restrições.",
    gets: "Brief, fluxo e demonstração, proposta de UX e estimativa da participação do Núcleo.",
    stages: ["explorar", "descobrir"],
  },
  {
    id: "fabrica",
    name: "Fábrica",
    role: "Trabalha com a engenharia sobre a versão em construção, para que a implementação preserve as decisões de experiência.",
    gives: "Requisitos, limitações técnicas e a aplicação em construção.",
    gets: "Fluxos, interfaces, componentes e orientações de comportamento, com acompanhamento da implementação.",
    stages: ["entregar", "explorar"],
  },
  {
    id: "requisitos",
    name: "Requisitos e ritos",
    note: "PO e Scrum Master",
    role: "Analisa as necessidades com o PO e leva fluxos e cenários aos ritos da equipa, para que as decisões sejam tomadas sobre algo concreto.",
    gives: "Regras e prioridades, com participação directa do PO na descoberta, na definição, na exploração de soluções e na validação.",
    gets: "Fluxos, cenários, conteúdo e demonstrações para o refinamento e as revisões.",
    stages: ["definir", "descobrir", "explorar", "validar"],
  },
  {
    id: "qa",
    name: "QA",
    role: "Ajuda a transformar os comportamentos esperados em critérios e avalia a usabilidade e a acessibilidade da versão em teste.",
    gives: "A versão em teste, os percursos que devem funcionar e os defeitos encontrados.",
    gets: "Critérios de interface e avaliação de usabilidade e acessibilidade, com achados e evidência.",
    stages: ["entregar", "validar"],
  },
  {
    id: "produtos",
    name: "Produtos TIS",
    note: "Academia, Saúde, Finanças e Setor Público",
    role: "Acompanha os produtos TIS de forma contínua, da pesquisa com utilizadores às melhorias depois da entrega.",
    gives: "Necessidades, regras, feedback e dados de utilização.",
    gets: "Pesquisas, fluxos, interfaces, validações e recomendações de melhoria.",
    stages: ["acompanhar", "descobrir"],
  },
  {
    id: "marketing",
    name: "Marketing",
    note: "Marca TIS e produtos TIS",
    role: "Apoia a experiência nos pontos de contacto da marca e dos produtos TIS, do conteúdo à navegação.",
    gives: "A comunicação da marca, o público e os canais.",
    gets: "Compreensão do público e experiência nos pontos de contacto, com apoio a conteúdo e navegação.",
    stages: ["descobrir", "explorar"],
  },
  {
    id: "pessoas",
    name: "Pessoas e Cultura",
    role: "Aplica o processo de UX à experiência dos colaboradores, em procedimentos, ferramentas e eventos internos.",
    gives: "Procedimentos, ferramentas, avaliações e eventos internos.",
    gets: "Fluxos, orientações, materiais ou interfaces, e validações com colaboradores.",
    stages: ["descobrir", "validar"],
  },
  {
    id: "inovacao",
    name: "Laboratório de Inovação",
    role: "Ajuda a definir o que cada experimento pretende verificar sobre a experiência e constrói a representação para o testar.",
    gives: "A ideia, o objectivo do experimento, o público previsto e as limitações.",
    gets: "Fluxos, demonstrações e recomendações fundamentadas no que foi observado.",
    stages: ["explorar", "validar"],
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
    role: "Líder da Equipa",
    intro: "Define como o Núcleo actua nos projectos e acompanha a qualidade do que é entregue.",
    photo: photoMarcell,
  },
  {
    name: "Felizardo Moisés",
    role: "Designer Analista",
    intro: "Desenha os fluxos e as interfaces com a equipa de cada projecto e acompanha a construção.",
    photo: photoFelizardo,
  },
  {
    name: "Josué Mbala",
    role: "Designer Analista",
    intro: "Desenha os fluxos e as interfaces com a equipa de cada projecto e acompanha a construção.",
    photo: photoJosue,
  },
];

/** Lugares vazios mostrados ao lado da equipa, só para sugerir que precisa de crescer (sem cargos nem prazos). */
export const TEAM_OPEN_SEATS = 3;

/** As cinco camadas da experiência (Jesse James Garrett), da mais visível à mais profunda. Textos da apresentação original, abreviados. */
export const UX_LAYERS = [
  {
    name: "Superfície",
    text: "A interface visual",
    question: "Como é visualmente a solução provável?",
    body: "Representa o que os utilizadores vêem e com que interagem directamente: cores, tipografia, ícones, imagens, botões e layout. É a camada mais visível, mas é apenas uma fracção da experiência completa.",
  },
  {
    name: "Esqueleto",
    text: "Componentes, wireframes e navegação",
    question: "Como são organizadas as informações e acções?",
    body: "Define como as decisões da estrutura são representadas na interface. É aqui que se organizam os componentes, os controlos, os conteúdos e os elementos de navegação, normalmente em wireframes.",
  },
  {
    name: "Estrutura",
    text: "Fluxos, arquitectura de informação e design de interacção",
    question: "Como deve o utilizador interagir com o produto? Que interacções podem melhorar a experiência?",
    body: "Define como o conteúdo e as funcionalidades são organizados e ligados, e como o produto responde às acções dos utilizadores, para que cada pessoa encontre o que precisa sem se perder.",
  },
  {
    name: "Escopo",
    text: "Funcionalidades, conteúdo e requisitos",
    question: "Quais informações e acções são necessárias?",
    body: "Define o que o produto deve fazer e que conteúdo precisa de oferecer. É aqui que as necessidades dos utilizadores e os objectivos de negócio são traduzidos em requisitos funcionais e de conteúdo.",
  },
  {
    name: "Estratégia",
    text: "Necessidades do utilizador e objectivos do produto",
    question: "O quê? Porquê? Para quem? Onde? Quando? Que valor isso cria para o utilizador e para o negócio?",
    body: "É onde são definidos os objectivos de negócio, as necessidades dos utilizadores e a proposta de valor do produto. É o alicerce que garante que cada escolha de design serve um propósito real.",
  },
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
  { id: "ponto-de-partida", scene: "partida", label: "Ponto de partida" },
  { id: "o-que-e-ux", scene: "ux", label: "O que é UX" },
  { id: "equipa", scene: "equipa", label: "A equipa do Núcleo" },
  { id: "processo-actual", scene: "mudanca", label: "Como decorre actualmente", build: 0 },
  { id: "com-processo", scene: "mudanca", label: "Com o processo de UX", build: 1 },
  ...STAGES.map((stage, stageIndex) => ({ id: stage.id, scene: "etapas" as const, label: stage.name, stageIndex })),
  { id: "areas", scene: "entregas", label: "Relação com as áreas" },
  { id: "design-system", scene: "ds", label: "Design System TIS" },
  { id: "mercado", scene: "resultados", label: "Resultados no mercado", build: 0 },
  { id: "medir", scene: "resultados", label: "Como vamos medir na TIS", build: 1 },
  { id: "fecho", scene: "fecho", label: "Obrigado" },
];
