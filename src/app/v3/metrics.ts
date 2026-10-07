/** As quatro perguntas da medição na TIS e, para cada uma, três métricas: o que se mede, como se observa e a decisão
    que permite tomar. A lista original de indicadores do playbook foi reduzida a estas. */
export const PILLAR_CARDS = [
  {
    icon: "flowsheet",
    title: "Operação",
    body: "O problema foi entendido antes da solução?",
  },
  {
    icon: "modeling",
    title: "Design System",
    body: "Há padrões reutilizáveis sendo aplicados?",
  },
  {
    icon: "workspace-premium",
    title: "Qualidade",
    body: "A entrega reduz dúvidas e retrabalho?",
  },
  {
    icon: "thumbs-up-down",
    title: "Impacto",
    body: "Há sinal real de uso, satisfação ou atrito?",
  },
] as const;

export type Measure = {
  name: string;
  /** Onde e como o número se observa. */
  how: string;
  /** A decisão que o número permite tomar. */
  decision: string;
};

/** Três métricas por pergunta, pela ordem de PILLAR_CARDS. */
export const MEASURES: Measure[][] = [
  [
    {
      name: "Projectos com UX desde o início",
      how: "Percentagem de projectos em que o Núcleo entra na proposta ou no Discovery.",
      decision: "Onde o processo entra tarde e porquê.",
    },
    {
      name: "Pedidos com brief completo",
      how: "Percentagem de pedidos que chegam com problema, pessoas e contexto escritos.",
      decision: "Reforçar o brief com Requisitos e Pré-venda.",
    },
    {
      name: "Nível de maturidade de UX",
      how: "Escala da NN/g, revista uma vez por ano.",
      decision: "Confirmar se a TIS sai dos níveis 2 e 3.",
    },
  ],
  [
    {
      name: "Projectos que usam o Design System",
      how: "Percentagem de projectos com componentes e tokens do sistema em produção.",
      decision: "Prioridades de evolução do sistema.",
    },
    {
      name: "Reutilização de componentes",
      how: "Percentagem de ecrãs compostos com componentes já existentes.",
      decision: "Que componentes faltam ou se repetem.",
    },
    {
      name: "Tempo de resposta do Design System",
      how: "Dias entre o pedido de um componente e a sua publicação.",
      decision: "Capacidade da equipa do sistema.",
    },
  ],
  [
    {
      name: "Dúvidas por entrega",
      how: "Perguntas do desenvolvimento ao Núcleo depois da especificação.",
      decision: "Onde a especificação falha.",
    },
    {
      name: "Defeitos de interface",
      how: "Defeitos de UX e UI apanhados por QA e em produção.",
      decision: "O que corrigir na especificação e nos componentes.",
    },
    {
      name: "Conformidade com a WCAG AA",
      how: "Verificação automática e revisão em cada entrega.",
      decision: "Barreiras a resolver antes do release.",
    },
  ],
  [
    {
      name: "Sucesso na tarefa",
      how: "Taxa de conclusão e tempo das tarefas principais, nos testes e em produção.",
      decision: "Que fluxos rever primeiro.",
    },
    {
      name: "Satisfação",
      how: "SUS ou CSAT nos testes de utilização e depois do release.",
      decision: "Se a experiência melhora entre versões.",
    },
    {
      name: "Atrito",
      how: "Erros, abandonos e pedidos de suporte por fluxo.",
      decision: "Onde o produto precisa de atenção.",
    },
  ],
];
