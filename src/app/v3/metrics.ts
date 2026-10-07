/** As quatro perguntas da medição e as tabelas de métricas, copiadas do slide dos indicadores de sucesso do
    playbook. As perguntas e as tabelas são coisas separadas, como lá. */
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

/** As métricas do playbook, tal e qual, em dois separadores: operacionais e de UX. */
export const METRIC_TABS: { title: string; columns: MetricColumn[] }[] = [
  {
    title: "Métricas operacionais",
    columns: [
      {
        title: "Maturidade e adopção",
        items: [
          "Nível de Maturidade (NN/g)",
          "% de projectos com UX desde o kickoff",
          "% de projectos consumindo o Design System",
          "% de pedidos com briefing completo",
          "Relação Design:DEV (Meta: 1:3)",
          "Participação nos ritos",
        ],
      },
      {
        title: "Saúde da operação",
        items: [
          "Backlog do DS",
          "Tempo de resposta",
          "Contribuição das áreas",
          "Componentes activos",
          "Adopção por projecto",
          "Itens deprecated",
          "Cobertura de componentes, templates e padrões",
        ],
      },
      {
        title: "Qualidade",
        items: [
          "Sucesso de tarefa",
          "Usability Score",
          "Taxa de bugs de UX/UI",
          "Satisfação interna do time",
          "Consistência visual",
          "Conformidade com a WCAG AA",
        ],
      },
      {
        title: "Eficiência",
        items: [
          "Tempo design -> dev",
          "Lead time de entrega",
          "% de reutilização de componentes",
          "Redução de retrabalho",
          "Pedidos de suporte",
          "Tempo de manutenção",
          "Impacto em propostas comerciais",
        ],
      },
    ],
  },
  {
    title: "Métricas de UX",
    columns: [
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
  },
];
