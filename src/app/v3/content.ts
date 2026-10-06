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

/** Descrição de cada nível da escala da NN/g, com os textos da janela de detalhe da apresentação original. */
export const MATURITY_DETAILS: { quote: string; body: string; list?: string[] }[] = [
  {
    quote: "A UX é ignorada ou desconhecida. Foco total no produto/negócio, sem considerar o utilizador.",
    body: "Nas organizações de estágio 1, a experiência do utilizador (UX) está completamente ausente. Uma empresa neste estágio ou não tem consciência do pensamento centrado no utilizador, ou acredita que não precisa dele. O trabalho de UX não é planeado, muito menos incorporado na visão da organização. As poucas pessoas na organização que pensam nos utilizadores são ignoradas ou desvalorizadas.",
  },
  {
    quote: "Esforços de UX são esporádicos, informais e pouco valorizados. O design é considerado apenas fazer a interface.",
    body: "Uma organização na fase limitada aborda o UX de forma errática. São feitos pequenos esforços de UX, geralmente por uma das três razões:",
    list: [
      "Necessidade legal",
      "Um indivíduo consciente de UX (talvez líder) que toma a iniciativa",
      "Uma equipa experimental que tenta métodos de UX",
    ],
  },
  {
    quote: "O trabalho de UX é funcional e promissor, mas é realizado de forma inconsistente e ineficiente.",
    body: "Em empresas com maturidade emergente em UX, várias equipas realizam trabalho de UX. As empresas envolvem-se em algum planeamento relacionado com UX e podem ter orçamentos para UX. No entanto, os esforços de UX são pequenos, instáveis e baseados em iniciativas de gestores individuais, em vez de políticas organizacionais.",
  },
  {
    quote: "A empresa reconhece o valor da UX. Existe uma equipa, processos definidos e apoio da liderança, resultando em qualidade.",
    body: "As organizações de Nível 4 reconhecem o valor do UX e possuem uma ou mais equipas de UX estabelecidas. A liderança geralmente apoia o UX e, por vezes, até o incorpora em estratégias e iniciativas de alto nível. O design é amplamente compreendido em toda a organização e existe um processo iterativo de design centrado no ser humano bem estabelecido. A pesquisa com utilizadores é realizada ao longo de todo o ciclo de vida do produto.",
  },
  {
    quote: "A UX está enraizada na cultura e no fluxo de trabalho. O design é contínuo e gera resultados consistentes.",
    body: "Quando as organizações atingem o estágio de UX integrado, o seu trabalho de UX torna-se abrangente, omnipresente e universal. Quase todas as equipas dentro da organização realizam actividades relacionadas com UX de forma eficiente e eficaz. Muitas vezes há inovação nos métodos e processos de UX e até contribuições para o campo do UX.",
  },
  {
    quote: "O nível mais alto, onde a investigação e a UX impulsionam a estratégia de negócios e a inovação.",
    body: "Nas organizações de estágio 6, todos estão plenamente conscientes do valor do design centrado no utilizador. A investigação com utilizadores e o design centrado no utilizador são a força motriz por trás de tudo o que estas organizações fazem, desde o mais alto nível da estratégia organizacional até ao menor elemento de design dentro de um sistema de design. Tanto indivíduos como equipas planeiam para a mudança e inovação, e a investigação com utilizadores impulsiona novos investimentos ao responder a necessidades não satisfeitas no mercado.",
  },
];

/** Uma situação frequente nos projectos, contada sem apontar a ninguém: o que acontece quando UX começa pelo desenho
    (adaptado da página 03 da apresentação original).
    Nos passos em falta, `stem` é o ponto da linha do processo (em px) onde o passo devia acontecer. */
export const CURRENT_PROCESS = [
  {
    label: "Como UX entra",
    headline: "UX entra na proposta comercial, para desenhar ecrãs",
    items: [
      {
        title: "Entrada via proposta comercial",
        text: "A equipa de UX é chamada para produzir ecrãs em prazos curtos, com pouca análise prévia.",
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
  /** O conteúdo da entrega, item a item, escrito como artefactos, para as etiquetas do slide da etapa. */
  deliverables: string[];
  /** Frentes de actuação do Núcleo que mais pesam nesta etapa. */
  fronts: FrontId[];
};

export const STAGES: Stage[] = [
  {
    id: "descobrir",
    number: "01",
    name: "Descobrir",
    short: "Descobrir",
    work: "Investigar o problema, as pessoas e o contexto a partir do enquadramento inicial, para identificar o problema a resolver e as necessidades que o sustentam.",
    aiSupport: "Organiza os materiais, resume as evidências com a origem e prepara perguntas.",
    methods: ["Entrevistas", "Observação da tarefa", "Análise de dados", "Revisão documental"],
    delivery: "Brief de UX",
    deliveryContents: "Problema, pessoas, contexto, evidências e dúvidas.",
    deliverables: ["Enunciado do problema", "Perfil das pessoas", "Mapa de contexto", "Registo de evidências", "Lista de dúvidas"],
    fronts: ["pesquisa", "servico"],
  },
  {
    id: "definir",
    number: "02",
    name: "Definir",
    short: "Definir",
    work: "Transformar o que se descobriu em escopo: as pessoas a servir, a tarefa prioritária e os critérios que dizem quando a solução resolve o problema.",
    aiSupport: "Cruza as evidências com as regras confirmadas e propõe critérios e cenários para rever.",
    methods: ["Personas", "Tarefa prioritária", "Critérios de sucesso"],
    delivery: "Escopo de UX",
    deliveryContents: "Tarefa prioritária, personas, restrições e critérios de sucesso.",
    deliverables: ["Descrição da tarefa prioritária", "Personas", "Lista de restrições", "Critérios de sucesso"],
    fronts: ["pesquisa", "servico"],
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
    deliverables: ["Fluxos de utilizador", "Conteúdo dos ecrãs", "Desenho das interfaces", "Componentes", "Estados dos ecrãs", "Registo de decisões"],
    fronts: ["interface", "design-system"],
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
    deliverables: ["Lista de problemas encontrados", "Evidências dos testes", "Registo de decisões", "Questões em aberto"],
    fronts: ["validacao", "acessibilidade"],
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
    deliverables: ["Especificação de comportamentos", "Critérios ligados aos requisitos", "Revisão da versão construída"],
    fronts: ["interface", "design-system", "acessibilidade"],
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
    deliverables: ["Lista de problemas observados", "Relatório de utilização", "Prioridades", "Recomendações"],
    fronts: ["validacao", "pesquisa"],
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

/** Como a IA entra no processo da empresa: as equipas em cadeia sobre a mesma base do projecto. Cada equipa diz o que
    recebe da base, o que prepara com os agentes, o que devolve à base e quem revê. */
export const AI_CHAIN = {
  base: {
    title: "A mesma base do projecto",
    text: "Requisitos, design e critérios, documentados desde o princípio e lidos pelas equipas e pelos agentes.",
  },
  teams: [
    {
      id: "requisitos",
      name: "Requisitos",
      ai: "escreve e detalha os requisitos",
      receives: "O problema, as pessoas e o contexto do brief de UX.",
      produces: "Requisitos escritos e detalhados com os agentes, com critérios de aceitação.",
      feeds: "Requisitos e regras confirmadas.",
      reviews: "O PO confirma regras e âmbito.",
    },
    {
      id: "design",
      name: "Núcleo de Experiência",
      ai: "compõe ecrãs e protótipos em código",
      receives: "Requisitos e regras confirmadas.",
      produces:
        "Fluxos e ecrãs compostos com o Design System, entregues como protótipo funcional em código, o mesmo que serve aos testes de utilização e à validação pelo cliente.",
      feeds: "Protótipo, especificação de UX e critérios de experiência.",
      reviews: "O Núcleo revê a experiência e o PO valida com o cliente.",
    },
    {
      id: "desenvolvimento",
      name: "Desenvolvimento",
      ai: "constrói sobre o protótipo e os requisitos",
      receives: "Requisitos, protótipo em código e especificação de UX.",
      produces: "A construção segue os requisitos, o protótipo e os componentes do Design System, sem reinterpretar o design.",
      feeds: "A versão construída e as limitações técnicas.",
      reviews: "A engenharia revê o código e o Núcleo revê a implementação.",
    },
    {
      id: "qa",
      name: "QA",
      ai: "gera casos e testes automatizados",
      receives: "Requisitos, critérios, protótipo e a versão construída.",
      produces: "Casos de teste e testes automatizados preparados a partir dos requisitos e do protótipo.",
      feeds: "Casos de teste, resultados e defeitos encontrados, que voltam à base para corrigir requisitos, protótipo e construção.",
      reviews: "QA revê os casos antes de os correr.",
    },
  ],
  closing:
    "Tudo bebe da mesma fonte: menos interpretação em cada camada e uma base documental desde o princípio, à qual o feedback da utilização volta.",
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
  /** Frentes de actuação que o Núcleo presta à área, mostradas como etiquetas de serviço. */
  fronts: FrontId[];
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
    fronts: ["pesquisa", "interface"],
  },
  {
    id: "fabrica",
    name: "Fábrica",
    role: "Trabalha com a engenharia sobre a versão em construção, para que a implementação preserve as decisões de experiência.",
    gives: "Requisitos, limitações técnicas e a aplicação em construção.",
    gets: "Fluxos, interfaces, componentes e orientações de comportamento, com acompanhamento da implementação.",
    stages: ["entregar", "explorar"],
    fronts: ["interface", "design-system", "acessibilidade"],
  },
  {
    id: "requisitos",
    name: "Requisitos e ritos",
    note: "PO e Scrum Master",
    role: "Analisa as necessidades com o PO e leva fluxos e cenários aos ritos da equipa, para que as decisões sejam tomadas sobre algo concreto.",
    gives: "Regras e prioridades, com participação directa do PO na descoberta, na definição, na exploração de soluções e na validação.",
    gets: "Fluxos, cenários, conteúdo e demonstrações para o refinamento e as revisões.",
    stages: ["definir", "descobrir", "explorar", "validar"],
    fronts: ["pesquisa", "servico", "interface"],
  },
  {
    id: "qa",
    name: "QA",
    role: "Ajuda a transformar os comportamentos esperados em critérios e avalia a usabilidade e a acessibilidade da versão em teste.",
    gives: "A versão em teste, os percursos que devem funcionar e os defeitos encontrados.",
    gets: "Critérios de interface e avaliação de usabilidade e acessibilidade, com achados e evidência.",
    stages: ["entregar", "validar"],
    fronts: ["validacao", "acessibilidade"],
  },
  {
    id: "produtos",
    name: "Produtos TIS",
    note: "Academia, Saúde, Finanças e Setor Público",
    role: "Acompanha os produtos TIS de forma contínua, da pesquisa com utilizadores às melhorias depois da entrega.",
    gives: "Necessidades, regras, feedback e dados de utilização.",
    gets: "Pesquisas, fluxos, interfaces, validações e recomendações de melhoria.",
    stages: ["acompanhar", "descobrir"],
    fronts: ["pesquisa", "interface", "validacao", "acessibilidade"],
  },
  {
    id: "marketing",
    name: "Marketing",
    note: "Marca TIS e produtos TIS",
    role: "Apoia a experiência nos pontos de contacto da marca e dos produtos TIS, do conteúdo à navegação.",
    gives: "A comunicação da marca, o público e os canais.",
    gets: "Compreensão do público e experiência nos pontos de contacto, com apoio a conteúdo e navegação.",
    stages: ["descobrir", "explorar"],
    fronts: ["interface", "design-system"],
  },
  {
    id: "pessoas",
    name: "Pessoas e Cultura",
    role: "Aplica o processo de UX à experiência dos colaboradores, em procedimentos, ferramentas e eventos internos.",
    gives: "Procedimentos, ferramentas, avaliações e eventos internos.",
    gets: "Fluxos, orientações, materiais ou interfaces, e validações com colaboradores.",
    stages: ["descobrir", "validar"],
    fronts: ["servico", "pesquisa"],
  },
  {
    id: "inovacao",
    name: "Laboratório de Inovação",
    role: "Ajuda a definir o que cada experimento pretende verificar sobre a experiência e constrói a representação para o testar.",
    gives: "A ideia, o objectivo do experimento, o público previsto e as limitações.",
    gets: "Fluxos, demonstrações e recomendações fundamentadas no que foi observado.",
    stages: ["explorar", "validar"],
    fronts: ["pesquisa", "interface", "validacao"],
  },
];

/** As seis frentes de actuação do Núcleo, com os nomes da apresentação original e três exemplos de trabalho cada. */
export type FrontId = "pesquisa" | "interface" | "servico" | "design-system" | "acessibilidade" | "validacao";

export const FRONTS: { id: FrontId; name: string; items: string[] }[] = [
  {
    id: "pesquisa",
    name: "Pesquisa e Discovery",
    items: ["Entrevistas com utilizadores e stakeholders", "Personas e jornadas", "Benchmarks e análise de contexto"],
  },
  {
    id: "interface",
    name: "Design de Interface e Interacção",
    items: ["Wireframes, fluxos e protótipos", "Design de alta fidelidade", "Especificação para o desenvolvimento"],
  },
  {
    id: "servico",
    name: "Design de Serviço",
    items: ["Mapeamento de processos", "Service blueprints", "Desenho de jornadas operacionais"],
  },
  {
    id: "design-system",
    name: "Design System",
    items: ["Tokens, componentes e padrões", "Documentação e governança", "Integração com o desenvolvimento"],
  },
  {
    id: "acessibilidade",
    name: "Acessibilidade e Compliance",
    items: ["Auditoria WCAG", "Documentação de boas práticas", "Testes com utilizadores diversos"],
  },
  {
    id: "validacao",
    name: "Validação e Testes",
    items: ["Testes de usabilidade", "Análise de dados qualitativos", "Iteração com base em evidência"],
  },
];

/** Apêndices: o conteúdo dos slides da apresentação original (playbook), com os nomes das áreas ajustados aos desta
    apresentação. Modelos de actuação (slide 7), Design System (slide 8) e conexões operacionais (slide 9). */
export const MODELS_CULTURE = {
  subtitle: "Mudança cultural e actuação orientada ao problema.",
  bullets: [
    {
      lead: "É necessário ter uma mudança de cultura, onde se deve questionar:",
      strong: "objectivos de negócio, público (personas), stakeholders, contexto de uso, restrições, prazo e critérios de sucesso.",
    },
    {
      lead: "Envolver o utilizador no processo desde o início:",
      strong: "entrevistas, testes de usabilidade e validações contínuas",
      tail: "contribuem para que as decisões respondam a necessidades reais.",
    },
    {
      lead: "Cada pedido deve ser classificado considerando o nível de risco e incerteza. Isso permite definir os métodos, prazos, papéis e entregáveis.",
    },
  ],
  statement:
    "Ao focar no problema real e envolver o utilizador desde o início, eliminamos retrabalho causado por decisões baseadas apenas em percepção interna.",
  card: {
    title: "Pesquisa e Discovery",
    text: "Compreender o problema antes de resolver reduz o risco de construir o produto errado.",
    stat: "135%",
    statCaption: "de melhoria média nas métricas após redesenho focado em usabilidade",
    source: "Nielsen Norman Group",
  },
};

export const MODELS_CLASSIFICATION = {
  intro:
    "O processo e os entregáveis mudam conforme a necessidade, considerando o grau de risco e incerteza envolvidos. Nem todo o pedido precisa de Discovery completo, mas todo o pedido precisa de seguir um critério claro.",
  columns: ["Discovery", "Pesquisa", "Ideação", "Design", "Monitorização"],
  /** Profundidade por coluna: 0 não corre, 1 leve, 2 média, 3 inteira. */
  types: [
    {
      name: "Quick win",
      certainty: "Muita certeza, baixo risco",
      text: "Ajuste visual rápido ou alteração simples no fluxo com grande potencial de sucesso, que já seja uma necessidade comprovada e também de fácil reversão, se necessário.",
      depth: [0, 0, 1, 3, 3],
    },
    {
      name: "Melhoria",
      certainty: "Alguma certeza, risco médio",
      text: "Possui um maior risco por se tratar de mudança em funcionalidade existente, sendo necessário alinhamento com os stakeholders e análise de métricas. Desk research e benchmark ajudam na exploração de ideias, e também o teste A/B (idealmente), num ciclo mais curto.",
      depth: [0, 1, 2, 3, 3],
    },
    {
      name: "Nova funcionalidade",
      certainty: "Pouca certeza, risco alto",
      text: "É importante aumentar o grau de certeza, pois o risco de criar algo que pode não ser utilizado é real. Convém um discovery mais estruturado, com pesquisa, benchmark, entrevistas com os utilizadores, definição de fluxo, ideação, testes de usabilidade e handoff mais robusto.",
      depth: [1, 2, 3, 3, 3],
    },
    {
      name: "Novo produto",
      certainty: "Escopo estratégico ou incerto",
      text: "A construção de um novo produto envolve um risco muito elevado aliado a muitas incertezas. É importante focar nos problemas certos para alcançar o MVP que dará base para escalar. Discovery e pesquisa são obrigatórios, com o utilizador como participante activo e todas as áreas da equipa envolvidas em cada etapa.",
      depth: [3, 3, 3, 3, 3],
    },
  ],
};

/** Estratégia por maturidade do produto (página 3 dos modelos de actuação): o fluxo de cada caso como na original. */
export const PRODUCT_MATURITY = [
  {
    name: "Apostas (Early stage)",
    text: "Produtos com alta incerteza. O foco correcto é aprendizagem validada, protótipos, testes com clientes e decisão rápida: continuar, ajustar ou despriorizar.",
    flow: ["Protótipos", "Testes com público-alvo (gerar aprendizagem)", "?", "Backlog de produto e/ou produção"],
    branches: ["Despriorizar ou pivotar", "Continuar a aprender (novos testes)"],
  },
  {
    name: "Produtos em escala (Growth)",
    text: "Produtos já validados parcialmente, com base activa e sinais de uso. O foco passa a ser escalar, medir adopção, retenção, satisfação, qualidade e operação em produção.",
    flow: ["Protótipos", "Testes com clientes (rápidos, de avaliação)", "Produto em produção", "Versão validada"],
    branches: ["Ciclo de testes e acompanhamento"],
  },
  {
    name: "Produtos maduros (Core)",
    text: "Produtos estabelecidos. O foco é optimização contínua, retenção, eficiência, suporte, evolução incremental e decisões de refresh, consolidação ou eventual descontinuação.",
    flow: ["Pesquisas, feedback, pedidos de suporte e analytics", "Oportunidades de melhoria", "Protótipos", "Testes com clientes (gerar aprendizagem)", "Backlog de produto e/ou produção"],
    branches: ["Ciclo de testes e acompanhamento"],
  },
];

/** Design System (slide 8): benefícios, retorno, arquitectura e integração, e o fluxo de governança. */
export const DS_INTRO =
  "Design System como infra-estrutura operacional para consistência, velocidade, acessibilidade e integração com o desenvolvimento.";

export const DS_BENEFITS = [
  { name: "Escalabilidade", text: "Permite criar novos ecrãs e funcionalidades muito mais rápido." },
  {
    name: "Consistência",
    text: "Garante que o utilizador tem a mesma experiência em diferentes partes do produto ou em dispositivos variados.",
  },
  {
    name: "Eficiência de custos",
    text: "Reduz o retrabalho de designers e programadores ao evitar que criem o mesmo componente do zero várias vezes.",
  },
  { name: "Melhor comunicação", text: "Serve como uma linguagem comum entre as equipas de design e engenharia." },
];

export const DS_ROI = {
  title: "Redução de custos e retorno (Design System com IA)",
  items: [
    { value: "Até 70%", label: "Redução de custos com front-end", text: "Automação da escrita de código e geração de componentes com IA." },
    { value: "65%", label: "Mais velocidade nas entregas", text: "Redução do ciclo entre a descoberta do problema e a entrega da solução." },
    { value: "85%", label: "Redução de dívida técnica", text: "Eliminação de componentes duplicados e padronização automática de código legado." },
    { value: "800%", label: "Retorno sobre o investimento anual", text: "Impacto gerado pela escala da automação em múltiplos produtos e equipas." },
  ],
  statement: "O nosso Design System já nasce preparado para o uso por agentes, fornecendo contexto e acelerando o processo.",
};

export const DS_FEATURES = [
  {
    title: "Arquitectura",
    items: [
      "Core agnóstico à stack, preparado para múltiplos produtos, frameworks e contextos.",
      "Tokens em JSON (DTCG) como contrato entre design, código, documentação e IA.",
      "Arquitectura em três camadas: Foundation (valores primitivos do sistema), Semantic (intenções, estados, hierarquia e contexto) e Component (tokens específicos de componentes).",
    ],
  },
  {
    title: "Governança e documentação",
    items: [
      "Documentação estruturada em páginas publicadas e ficheiros .md.",
      "ADRs registam decisões arquitecturais, compromissos e mudanças de direcção.",
      "Brand Principles orientam fundamentos de marca, tom, identidade e critérios de evolução.",
      "Changelog, inventários, guias de processo e documentação técnica garantem rastreabilidade.",
    ],
  },
  {
    title: "Integração com o desenvolvimento",
    items: [
      "Tokens sincronizados entre Figma e código.",
      "Handoff com propriedades, estados, adaptação responsiva e critérios de aceite.",
      "Storybook com documentação viva para consumo técnico.",
      "QA visual e acessibilidade como parte do componente.",
    ],
  },
  {
    title: "Operação e métricas",
    items: [
      "% de projectos a consumir o DS e % de reutilização de componentes.",
      "Tempo de design para desenvolvimento e redução de retrabalho.",
      "Cobertura de templates e playbooks, e conformidade WCAG AA.",
      "Bugs de UI por release; componentes activos, deprecated e backlog crítico.",
    ],
  },
];

export const DS_PREMISES = [
  {
    title: "Uso por agentes de IA",
    text: "AGENTS.md define regras operacionais para agentes, enquanto documentação, inventários e APIs tornam o repositório legível para auditoria, manutenção e planeamento apoiados por IA.",
  },
  {
    title: "Acessibilidade como premissa",
    text: "WCAG AA como referência de qualidade. Tokens, componentes e documentação consideram contraste, foco visível, estados, ARIA e padrões acessíveis de interacção.",
  },
];

export const DS_GOVERNANCE = {
  intro:
    "A IA acelera análise, síntese e produção assistida. Decisão, qualidade, acessibilidade e aceite permanecem sob responsabilidade da equipa.",
  steps: [
    {
      name: "Entrada e triagem",
      text: "A necessidade vem de um projecto real, incidente, dívida ou padrão recorrente. Responsável, objectivo, impacto e urgência ficam registados na solicitação.",
      ai: "A IA compara o pedido com o que já existe. A equipa valida a necessidade e as variações.",
    },
    {
      name: "Descoberta e especificação",
      text: "Mapear variantes, estados, conteúdo, acessibilidade, tokens e dependências. Verificar se um componente existente resolve o caso.",
      ai: "A IA identifica padrões e pontos de ajuste. A equipa decide o que muda.",
    },
    {
      name: "Design e protótipo",
      text: "Criar o componente em Figma com propriedades, estados e adaptação responsiva. Aplicar tokens e nomenclatura do Design System.",
      ai: "A IA sugere estrutura e nomes. O designer valida anatomia e uso.",
    },
    {
      name: "Aprovação e plano técnico",
      text: "Revisão pelo responsável do Design System e pela engenharia. Definir versão, impacto e migração quando necessário.",
      ai: "A IA resume o impacto. O responsável avalia e aprova o avanço.",
    },
    {
      name: "Implementação e QA",
      text: "Código, testes de estados, acessibilidade e exemplos. Verificar tokens, temas e comportamento responsivo.",
      ai: "A IA apoia a implementação e a documentação. A engenharia valida qualidade e testes.",
    },
    {
      name: "Release e adopção",
      text: "Publicar em Figma, código e documentação. Comunicar uso recomendado e substituições.",
      ai: "A IA identifica desvios de uso. A equipa ajusta documentação e adopção.",
    },
  ],
  checks: [
    "Necessidade comprovada",
    "Sem duplicação funcional",
    "Componente criado com tokens, estados e acessibilidade",
    "Documentação publicada",
    "Adopção por projecto",
  ],
};

/** Conexões operacionais (slide 9): princípios, mapa de interacções e responsáveis por etapa. */
export const FRONTS_INTRO =
  "O Núcleo deve assegurar que as soluções atendem a problemas reais, funcionam adequadamente em cada contexto de uso e cumprem os requisitos de negócio. Para isso, existem seis frentes nas quais devemos actuar com protagonismo.";

export const AREA_PRINCIPLES = [
  {
    name: "Tradução entre partes",
    text: "O Núcleo traduz a estratégia do negócio, a necessidade do utilizador e a viabilidade do desenvolvimento numa linguagem única, mantendo o produto coerente entre essas três perspectivas durante todo o projecto.",
  },
  {
    name: "Trocas declaradas",
    text: "Cada relação com outra área tem entradas e saídas declaradas, de forma que aquilo que recebemos e devolvemos faz parte de um contrato explícito de trabalho, sem ficar subentendido ou dependente da boa vontade.",
  },
  {
    name: "Responsabilidade partilhada",
    text: "Uma boa experiência não é responsabilidade exclusiva de uma área, e cada equipa que toca o projecto carrega a sua parte do compromisso com o utilizador, dentro daquilo que a sua competência permite entregar.",
  },
  {
    name: "Difusão de conhecimento",
    text: "O Núcleo amplia a maturidade da empresa ao partilhar método, vocabulário e referências com as equipas com que opera, e o ganho de cada projecto espalha-se pela organização em vez de ficar restrito à entrega.",
  },
];

/** Mapa de interacções: cada área com o que faz, o papel do Núcleo, o que o Núcleo recebe e o que entrega. Os nomes
    das áreas que existem nesta apresentação (PO, Fábrica, Pré-venda) substituem os originais (Produto, Desenvolvimento,
    Comercial). */
export const INTERACTION_MAP = [
  {
    name: "Requisitos e ritos (PO)",
    intro: "Recebe o pedido, enquadra e prioriza o backlog.",
    role: "investiga o problema real e desenha a solução que serve o utilizador final.",
    receives: "Pedido priorizado, contexto de negócio e expectativas de resultado.",
    delivers: "Fluxos validados, protótipos e especificações de handoff.",
  },
  {
    name: "Fábrica",
    intro: "Recebe o handoff e implementa.",
    role: "acompanha a fidelidade e resolve dúvidas técnicas.",
    receives: "Feedback técnico e limitações de plataforma.",
    delivers: "Handoff estruturado e suporte durante o desenvolvimento.",
  },
  {
    name: "QA",
    intro: "Valida a experiência antes do release.",
    role: "apoia na definição dos critérios de aceite.",
    receives: "Reporte de divergências entre protótipo e produto entregue.",
    delivers: "Critérios de aceite visuais e interactivos, e suporte na revisão.",
  },
  {
    name: "Dados e BI",
    intro: "Fornece métricas de comportamento.",
    role: "usa dados para validar hipóteses e orientar decisões.",
    receives: "Métricas de comportamento, dashboards e insights quantitativos sobre o uso.",
    delivers: "Perguntas de pesquisa, hipóteses a validar e eventos e jornadas a instrumentar.",
  },
  {
    name: "Pré-venda",
    intro: "Levanta pedidos e contexto do cliente.",
    role: "valida viabilidade e propõe soluções.",
    receives: "Contexto do cliente, restrições e expectativas do projecto.",
    delivers: "Proposta de solução e materiais de apresentação.",
  },
  {
    name: "Marketing",
    intro: "Define identidade e tom de voz da marca.",
    role: "alinha a experiência com o posicionamento.",
    receives: "Directrizes de marca, tom de voz e activos visuais.",
    delivers: "Experiências alinhadas à identidade e ao posicionamento.",
  },
  {
    name: "Suporte e CS",
    intro: "Traz fricções e problemas reais dos utilizadores.",
    role: "transforma-os em oportunidades de melhoria.",
    receives: "Reporte de problemas recorrentes dos utilizadores.",
    delivers: "Melhorias priorizadas com foco na redução de fricção.",
  },
  {
    name: "Segurança e Compliance",
    intro: "Estabelece restrições técnicas e regulatórias.",
    role: "assegura que o design respeita esses limites.",
    receives: "Restrições regulatórias, requisitos de privacidade e critérios de conformidade (protecção de dados, acessibilidade, auditoria).",
    delivers: "Fluxos, protótipos e pontos de recolha e tratamento de dados para revisão.",
  },
  {
    name: "Digital Office",
    intro: "Define a estratégia de transição para o ambiente de trabalho digital.",
    role: "garante a adopção dessas tecnologias através de um design centrado no comportamento humano.",
    receives: "Requisitos de negócio, escopo de projectos de digitalização e regras de compliance.",
    delivers: "Visão de produto (Product Discovery), fluxos de navegação validados e protótipos de média e alta fidelidade.",
  },
  {
    name: "Analytics e IA",
    intro: "Desenvolve inteligência preditiva, modelos de IA e análises de dados para o negócio.",
    role: "transforma os dados em melhorias práticas na experiência do produto.",
    receives: "Modelos de inteligência artificial aplicados e insights baseados em dados de negócio.",
    delivers: "Experiências digitais inteligentes e interacções personalizadas para o utilizador.",
  },
];

/** Responsáveis por etapa: em cada etapa do projecto uma área conduz, outras apoiam e uma valida. */
export const STEP_ROLES: { step: string; leads: string; supports: string; validates: string; validateLabel?: string }[] = [
  { step: "Entrada do pedido", leads: "Pré-venda e stakeholder", supports: "Núcleo de Experiência e PO", validates: "Direcção" },
  { step: "Discovery", leads: "Núcleo de Experiência", supports: "PO e Dados e BI", validates: "PO" },
  {
    step: "Desenho da solução",
    leads: "Núcleo de Experiência",
    supports: "PO, Fábrica, stakeholder e utilizador",
    validates: "PO, stakeholder e utilizador",
  },
  { step: "Implementação", leads: "Fábrica", supports: "Núcleo de Experiência e PO", validates: "QA, PO e Núcleo de Experiência" },
  { step: "Aceite", leads: "QA", supports: "Núcleo de Experiência", validates: "PO e stakeholder" },
  {
    step: "Pós-release",
    leads: "Dados e BI",
    supports: "Núcleo de Experiência e Suporte e CS",
    validates: "Núcleo de Experiência e PO",
    validateLabel: "Avalia",
  },
];
export const STEP_ROLES_NOTE = "Núcleo de Experiência como guardião da experiência ao longo do ciclo.";

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
  | "ia"
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
  { id: "equipa", scene: "equipa", label: "A equipa do Núcleo" },
  { id: "o-que-e-ux", scene: "ux", label: "O que é UX" },
  { id: "processo-actual", scene: "mudanca", label: "Quando UX começa pelo desenho", build: 0 },
  { id: "com-processo", scene: "mudanca", label: "Com o processo de UX", build: 1 },
  ...STAGES.map((stage, stageIndex) => ({ id: stage.id, scene: "etapas" as const, label: stage.name, stageIndex })),
  { id: "areas", scene: "entregas", label: "Relação com as áreas" },
  { id: "ia", scene: "ia", label: "Como a IA entra" },
  { id: "design-system", scene: "ds", label: "Design System TIS" },
  { id: "mercado", scene: "resultados", label: "Resultados no mercado", build: 0 },
  { id: "medir", scene: "resultados", label: "Como vamos medir na TIS", build: 1 },
  { id: "fecho", scene: "fecho", label: "Obrigado" },
];
