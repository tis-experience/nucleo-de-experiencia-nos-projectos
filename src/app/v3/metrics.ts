/** As quatro perguntas da medição na TIS e os indicadores de cada uma, vindos do playbook (slide dos indicadores de
    sucesso) e agrupados pela pergunta a que respondem. */
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

export type MetricColumn = {
  title: string;
  items: string[];
};

/** Os grupos de indicadores de cada pergunta, pela ordem de PILLAR_CARDS. Os indicadores são os do playbook,
    redistribuídos pela pergunta a que respondem; "Sucesso de tarefa" e "Usability Score" saíram por repetirem a taxa
    de sucesso e o SUS. */
export const MEASURE_GROUPS: MetricColumn[][] = [
  [
    {
      title: "Entrada e adopção do processo",
      items: [
        "% de projectos com UX desde o kickoff",
        "% de pedidos com briefing completo",
        "Participação nos ritos",
        "Relação Design:DEV (Meta: 1:3)",
        "Nível de Maturidade (NN/g)",
      ],
    },
  ],
  [
    {
      title: "Adopção e saúde do Design System",
      items: [
        "% de projectos consumindo o Design System",
        "Adopção por projecto",
        "% de reutilização de componentes",
        "Componentes activos",
        "Cobertura de componentes, templates e padrões",
        "Backlog do DS",
        "Tempo de resposta",
        "Contribuição das áreas",
        "Itens deprecated",
      ],
    },
  ],
  [
    {
      title: "Qualidade",
      items: ["Taxa de bugs de UX/UI", "Consistência visual", "Conformidade com a WCAG AA", "Satisfação interna do time"],
    },
    {
      title: "Eficiência",
      items: [
        "Redução de retrabalho",
        "Tempo design -> dev",
        "Lead time de entrega",
        "Pedidos de suporte",
        "Tempo de manutenção",
        "Impacto em propostas comerciais",
      ],
    },
  ],
  [
    {
      title: "Usabilidade",
      items: ["Taxa de sucesso", "Tempo médio de conclusão de tarefas", "Taxa de erro"],
    },
    {
      title: "Satisfação",
      items: [
        "NPS (Net Promoter Score)",
        "CSAT (Customer Satisfaction Score)",
        "SUS (System Usability Scale)",
        "CES (Customer Effort Score)",
      ],
    },
    {
      title: "Comportamentais",
      items: ["Tempo de permanência (Dwell Time)", "Profundidade de rolagem (Scroll Depth)", "Taxa de retorno (Bounce Rate)"],
    },
  ],
];
