# Plano da versão técnica: Núcleo de Experiência nos projectos

## 1. Direcção da versão técnica

### Propósito

Mostrar à equipa de desenvolvimento da fábrica de software, de forma concreta, o que muda no seu trabalho quando o Núcleo de Experiência participa num projecto: o que passa a receber, em que momento, em que formato e o que lhe é pedido em cada etapa.

A versão executiva respondeu às lideranças porque vale a pena ter um processo estruturado de UX. Esta versão parte do pressuposto de que essa decisão já foi apresentada aos gestores da fábrica e concentra-se no dia a dia de quem implementa.

### Público

- Público principal: desenvolvedores da fábrica de software (front-end, back-end e mobile, conforme a composição da equipa).
- Gestores da fábrica podem assistir, mas já conhecem a versão executiva e não são o alvo da narrativa.
- Análise de requisitos e QA não fazem parte da fábrica. Entram na apresentação como etapas do ciclo de desenvolvimento com que a fábrica se cruza, e não como público presente.

### Formato

- Duração de referência: 20 minutos de apresentação e 15 minutos de conversa.
- Extensão proposta: 12 páginas no total.
- Capa com o mesmo título, **Núcleo de Experiência nos projectos**, e a assinatura **TIS**. Pode receber um subtítulo curto, como "Como trabalhamos com o desenvolvimento", a validar.

### Perguntas que a apresentação deve responder

1. O que chega hoje ao desenvolvimento e porque isso gera dúvidas e retrabalho?
2. Em que etapas a fábrica participa e o que lhe é pedido em cada uma?
3. Que artefactos a fábrica passa a receber e o que deve estar presente num handoff pronto?
4. Como o trabalho de UX entra no fluxo de sprint que a equipa já utiliza?
5. Como o Design System se liga ao código e como a equipa pode contribuir?
6. Onde entram a análise de requisitos e a QA no ciclo?
7. Como saberemos se a colaboração está a funcionar?
8. O que muda a partir do próximo projecto?

### Princípios narrativos

- Trocar argumento por artefacto. Cada página deve mostrar algo que a equipa reconhece ou vai receber, como um ticket, uma checklist, um fluxo com estados ou um componente.
- Mostrar a estrutura dos artefactos sem recorrer a casos fictícios nem a exemplos demasiado específicos.
- Contar o problema actual pelas situações que a equipa vive no sprint, sem atribuir falhas a pessoas ou áreas. O problema continua a ser a ausência de um processo partilhado.
- Mostrar que o trabalho de UX acontece antes e em paralelo à implementação, e que o ganho para a equipa é menos ambiguidade e menos mudanças tardias, não mais documentação.
- Não prometer ausência de bugs nem eliminação total de retrabalho.
- Não usar percentagens de redução de custos, velocidade ou ROI sem fonte verificável. Esta audiência vai perguntar de onde vêm os números.
- Manter a terminologia da versão executiva: "sem processo estruturado de UX", "Núcleo de Experiência" e PT-AO pré-Acordo.
- Deixar a mensagem essencial visível no primeiro estado de cada página. Hover, carrossel e modal servem apenas para aprofundar.
- Utilizar no rodapé: **APLICAÇÃO PRÁTICA DE UX NOS PROJECTOS**, como na versão executiva.

## 2. Relação com a versão executiva

A versão técnica reaproveita a identidade visual, a navegação e parte dos componentes da versão executiva. O que muda é o ponto de vista: onde a versão executiva mostra decisões e valor para as lideranças, a versão técnica mostra entradas, saídas e responsabilidades para quem implementa.

| Página executiva actual | Componente | Decisão na versão técnica |
|---|---|---|
| 01 Capa | `App.tsx` | Manter, com subtítulo opcional |
| 02 Contexto actual | `Slide02` | Fundir com a 03 e recontar pelo ponto de vista do desenvolvimento |
| 03 Como decorre actualmente o trabalho de UX | `Slide03` | Adaptar os três estados para as consequências vividas no sprint |
| 04 A experiência tem 5 camadas | `Slide04` | Manter e ligar cada camada ao artefacto que a equipa consome |
| 05 Além do design de interfaces | `Slide05` | Retirar como página autónoma; frentes relevantes aparecem na nova 04 |
| 06 Processo em seis etapas | `Slide06` | Redesenhar com o que a fábrica recebe e o que lhe é pedido em cada etapa |
| 07 Modelo por risco e maturidade | `Slide07Model` | Manter a página de profundidade por risco, traduzida em artefactos; retirar a página Early, Growth e Core |
| 08 Design System | `Slide08DesignSystem` | Retirar a página de benefícios com percentagens; aprofundar arquitectura, integração e governança |
| 09 Interacções com as áreas | `Slide12AreaInteractions` | Substituir o mapa de todas as áreas pela matriz de responsáveis do ciclo de desenvolvimento |
| 10 Indicadores de sucesso | `Slide14IndicadoresDeSucesso` | Trocar métricas executivas por métricas sentidas pela equipa |
| 11 Encerramento | `ClosingSlide` | Reorientar para o que muda a partir do próximo projecto |

## 3. Estrutura proposta

| Página | Título de trabalho | Origem | Acção | O que entra | O que sai |
|---|---|---|---|---|---|
| 01 | **Núcleo de Experiência nos projectos** | Capa actual | Manter | Título, assinatura TIS e subtítulo opcional | Nada |
| 02 | **O que chega hoje ao desenvolvimento** | Páginas 02 e 03 | Recompor | Percurso `Pedido → Ecrãs → Desenvolvimento → Correcções`; situações típicas: ecrã sem estados de erro ou vazio, critério ambíguo, regra descoberta a meio da implementação, bug de UI reaberto | Inquérito interno e tom de diagnóstico da área |
| 03 | **A interface é só a camada visível** | Página 04 | Adaptar | As cinco camadas ligadas aos artefactos que a equipa consome (ver secção 4) | Perguntas genéricas por camada na vista principal |
| 04 | **As etapas e onde a fábrica entra** | Página 06 | Redesenhar | Seis etapas com três linhas: pergunta respondida, o que a fábrica recebe e o que se pede à fábrica (ver secção 5) | Lista longa de actividades e princípios de IA na vista principal |
| 05 | **O mesmo ticket, antes e depois** | Conteúdo novo | Criar | Uma user story como chega hoje ao lado da mesma story com o Núcleo envolvido (ver secção 6) | Nada |
| 06 | **A profundidade muda conforme o risco** | Página 07, primeira página interna | Adaptar | Quatro níveis (ajuste, evolução, novo fluxo, novo produto) e o que chega ao sprint em cada um | Página de maturidade do produto e textos longos |
| 07 | **Contrato de handoff** | Conteúdo novo | Criar | Checklist do que deve existir para uma entrega de design ser considerada pronta (ver secção 7) | Nada |
| 08 | **UX no fluxo de sprint** | Conteúdo novo | Criar | UX na Definition of Ready e na Definition of Done, revisão da implementação e canal de dúvidas durante o sprint (ver secção 8) | Nada |
| 09 | **Design System ligado ao código** | Página 08, páginas internas de arquitectura e governança | Aprofundar | Tokens em DTCG, core agnóstico à stack, três camadas, sincronização, changelog, versionamento, fluxo de contribuição, AGENTS.md e acessibilidade (ver secção 10) | Página de benefícios com percentagens de custo, velocidade e ROI |
| 10 | **Quem conduz cada etapa do ciclo** | Página 09 (`Slide12AreaInteractions`), vista "Responsáveis por etapa" | Simplificar | Matriz com Análise de requisitos, Núcleo de Experiência, Desenvolvimento, QA e Dados, etapa a etapa (ver secção 9) | Mapa de todas as áreas e princípios gerais de interacção |
| 11 | **Como saber se está a funcionar** | Página 10 | Substituir | Métricas sentidas pela equipa (ver secção 11) | Métricas de maturidade, adopção e impacto de negócio |
| 12 | **A partir do próximo projecto** | Encerramento | Reorientar | Projecto piloto, o que muda na primeira sprint, canal de dúvidas, ponto de contacto e convite para contribuir com o Design System | Agradecimento genérico |

## 4. Camadas da experiência ligadas a artefactos

A página 03 reaproveita o iceberg e acrescenta, em cada camada, o artefacto que chega ao desenvolvimento.

| Camada | O que define | Artefacto que a equipa consome |
|---|---|---|
| Estratégia | Objectivos do utilizador e do negócio | Problema definido, regras de negócio e critérios de sucesso |
| Escopo | Funcionalidades, conteúdo e requisitos | Requisitos funcionais, user stories e critérios de aceitação |
| Estrutura | Fluxos, arquitectura de informação e interacção | Fluxos com estados e transições, incluindo erro, vazio e carregamento |
| Esqueleto | Componentes, layout e navegação | Wireframes, protótipo e componentes do Design System utilizados |
| Superfície | Aparência visual | Tokens, estilos, assets e especificação final |

Mensagem da página: quando só a superfície chega ao desenvolvimento, as decisões das camadas de baixo são tomadas durante a implementação, muitas vezes sem quem tem o contexto.

## 5. Etapas: o que a fábrica recebe e o que lhe é pedido

Esta matriz orienta a página 04. A participação da fábrica é proporcional: nas primeiras etapas é pontual e consultiva, nas últimas passa a ser central.

| Etapa | Pergunta respondida | O que a fábrica recebe | O que se pede à fábrica |
|---|---|---|---|
| Descobrir | Quem é afectado e qual é o problema? | Contexto do projecto e síntese de pesquisa | Restrições técnicas conhecidas, sistemas legados envolvidos e dados já disponíveis |
| Definir | Que problema priorizar e como reconhecer o sucesso? | Problema definido, jornada prioritária, critérios de sucesso e requisitos vindos da análise | Sinalizar dependências, integrações e riscos técnicos; estimativa preliminar de ordem de grandeza |
| Explorar | Que alternativas resolvem o problema? | Fluxos e alternativas de solução | Avaliar viabilidade, propor alternativas técnicas equivalentes e fazer spikes quando houver incerteza |
| Validar | A solução é compreendida e utilizável? | Resultados dos testes e decisões tomadas | Participação opcional nas sessões de teste; rever o impacto técnico das alterações |
| Entregar | O que será desenvolvido e como garantir consistência? | Handoff completo segundo o contrato da secção 7 | Sessão de handoff, levantamento de dúvidas antes da estimativa final e sinalização de desvios durante a implementação |
| Acompanhar | A solução resolveu o problema? | Achados pós-release e itens priorizados para o backlog | Instrumentação dos eventos definidos e correcções priorizadas |

Frentes da antiga página 05 que tocam a fábrica (interface e interacção, validação, Design System e acessibilidade) aparecem aqui como entregáveis das etapas, sem página própria.

## 6. O mesmo ticket, antes e depois

A página 05 compara a estrutura de uma user story, como chega hoje e como chega com o Núcleo envolvido, sem recorrer a um caso específico. O formato deve lembrar a ferramenta de gestão de tickets que a fábrica utiliza.

### Antes, sem processo estruturado de UX

- Título genérico e descrição curta.
- "Conforme o Figma", com ligação para um ecrã isolado.
- Sem critérios de aceitação, ou com critérios vagos ("deve funcionar correctamente").
- Sem estados de erro, vazio ou carregamento.
- Regras de validação e textos por definir.

### Depois, com o Núcleo de Experiência

- Contexto em uma ou duas linhas: quem é o utilizador e que problema a story resolve.
- Critérios de aceitação no formato Dado / Quando / Então, incluindo casos de erro.
- Ligação para o fluxo completo e para o protótipo, com os estados previstos.
- Componentes do Design System utilizados e eventuais componentes novos assinalados.
- Regras de validação, textos finais e mensagens de erro.
- Requisitos de acessibilidade específicos, como ordem de foco, rótulos e contraste.
- Eventos de analytics a instrumentar, quando existirem.

Mensagem da página: a diferença não é a quantidade de documentação, é o número de decisões que deixam de ser tomadas a meio da sprint.

## 7. Contrato de handoff

A página 07 apresenta a checklist que define quando uma entrega de design está pronta para desenvolvimento. A mesma checklist pode ser reaproveitada depois como material de apoio fora da apresentação.

- Fluxo completo, com pontos de entrada e saída.
- Estados de cada ecrã: carregamento, vazio, erro, sucesso e permissões, quando aplicável.
- Comportamento responsivo nos breakpoints definidos.
- Regras de negócio e validações, alinhadas com a análise de requisitos.
- Textos finais, incluindo mensagens de erro e confirmação.
- Componentes e tokens do Design System, com indicação de componentes novos ou variantes.
- Requisitos de acessibilidade com referência ao WCAG AA.
- Interacções e animações relevantes, com duração e comportamento.
- Eventos de analytics, quando existirem.
- Critérios de aceitação que a QA poderá transformar em casos de teste.
- Dúvidas em aberto e decisões pendentes, explícitas e com responsável.

## 8. UX no fluxo de sprint

A página 08 mostra onde o trabalho de UX entra num fluxo que a equipa já conhece, sem criar cerimónias novas.

- **Definition of Ready:** uma story com impacto na interface só entra em sprint quando o contrato de handoff estiver cumprido para o seu âmbito.
- **Refinamento:** o Núcleo participa nas sessões de refinamento das stories com impacto na experiência.
- **Durante a sprint:** canal definido para dúvidas, com tempo de resposta acordado; desvios por inviabilidade técnica são discutidos antes de implementados.
- **Revisão da implementação:** antes de fechar a story, o Núcleo revê a implementação face ao design (design QA), dentro da própria sprint.
- **Definition of Done:** inclui a revisão da implementação e a conformidade com os requisitos de acessibilidade da story.

O antes e depois deve ser apresentado como um desenho do fluxo de sprint com os pontos de entrada do Núcleo marcados, e não como lista de regras.

## 9. Análise de requisitos e QA no ciclo

Análise de requisitos e QA não pertencem à fábrica, mas fazem parte do ciclo por onde passa o trabalho da fábrica. A página 10 deve deixar claro de onde vem cada artefacto que o desenvolvimento recebe e para onde segue o que produz.

| Etapa do ciclo | Conduz | Contribui | Valida |
|---|---|---|---|
| Entrada da demanda | Comercial ou stakeholder | Análise de requisitos, Núcleo de Experiência | Produto |
| Levantamento e discovery | Análise de requisitos e Núcleo de Experiência, em conjunto | Desenvolvimento (restrições técnicas), utilizadores | Produto |
| Desenho da solução | Núcleo de Experiência | Análise de requisitos, Desenvolvimento, utilizadores | Produto e stakeholder |
| Implementação | Desenvolvimento | Núcleo de Experiência (dúvidas e revisão) | Núcleo de Experiência (design QA) |
| Aceite | QA | Desenvolvimento, Núcleo de Experiência | Produto |
| Pós-release | Dados | Núcleo de Experiência, Desenvolvimento | Produto |

Fronteira entre análise e UX, a mencionar de forma breve: a análise de requisitos conduz regras de negócio e requisitos funcionais; o Núcleo conduz necessidades, comportamento do utilizador e desenho da interacção; os critérios de aceitação são construídos em conjunto. A conversa detalhada sobre esta fronteira deve acontecer com as equipas de análise num momento à parte.

A matriz reaproveita `stageResponsibilitiesData.ts`, que hoje não inclui a análise de requisitos e deve ser alterada apenas na versão técnica.

## 10. Design System para o desenvolvimento

A página 09 é onde a equipa de desenvolvimento ganha mais e deve ser a mais técnica. Pode manter páginas verticais, como na versão executiva.

1. **Arquitectura:** core agnóstico à stack, tokens em JSON no formato DTCG, arquitectura em três camadas e como os tokens chegam ao código.
2. **Integração e versionamento:** sincronização de tokens, changelog, política de versões, componentes activos, deprecated e backlog crítico.
3. **Contribuição e governança:** como um desenvolvedor pede um componente novo, propõe uma variante ou reporta divergência entre Figma e código; quem aprova e em que prazo.
4. **Acessibilidade e agentes de IA:** WCAG AA como premissa nos componentes; AGENTS.md, inventários e documentação que tornam o repositório legível para agentes de IA.

A página de benefícios da versão executiva (redução de custos com front-end, velocidade, débito técnico e ROI com percentagens) não entra.

## 11. Indicadores

A página 11 troca os indicadores executivos por métricas que a equipa sente no dia a dia. Todas precisam de linha de base antes do piloto.

| Grupo | Indicador | Decisão associada |
|---|---|---|
| Qualidade | Bugs de UI por release | Onde reforçar o handoff ou o Design System |
| Qualidade | Stories reabertas por divergência com o design | Se o contrato de handoff está a ser cumprido |
| Eficiência | Dúvidas levantadas depois do handoff | Que partes do contrato precisam de mais detalhe |
| Eficiência | Tempo entre handoff e início da implementação | Se as stories chegam prontas à sprint |
| Consistência | Cobertura de componentes do Design System nos ecrãs implementados | Que componentes priorizar no backlog do Design System |
| Acessibilidade | Conformidade WCAG AA nas stories entregues | Que padrões precisam de apoio adicional |

## 12. Objecções esperadas

A conversa final deve estar preparada para estas perguntas, que podem também orientar notas do apresentador.

| Objecção | Resposta a sustentar |
|---|---|
| "Isto é mais uma etapa e vai atrasar a sprint." | O trabalho de UX acontece antes e em paralelo; o objectivo é que a story chegue pronta, não criar uma fase entre design e código. |
| "O Figma muda depois de começarmos." | O contrato de handoff e a Definition of Ready existem para congelar o âmbito de cada story; mudanças posteriores passam pelo mesmo fluxo de alteração de escopo. |
| "O design não é viável tecnicamente." | A fábrica entra em Explorar para avaliar viabilidade antes do handoff; durante a sprint, desvios são discutidos no canal definido. |
| "Quem decide quando há conflito entre design e implementação?" | Produto decide, com a informação do Núcleo e do Desenvolvimento. |
| "A nossa stack não suporta o Design System." | O core é agnóstico à stack e os tokens em DTCG podem ser transformados para cada plataforma. |

## 13. Implementação

### Abordagem técnica recomendada

Implementar a versão técnica no mesmo projecto, como uma segunda sequência de páginas seleccionada por parâmetro (por exemplo, `?versao=tecnica`), em vez de uma cópia separada. Sete das doze páginas reaproveitam componentes existentes com variações de conteúdo, e uma cópia duplicaria a manutenção da identidade visual, da navegação e das correcções. A versão executiva deve permanecer inalterada quando o parâmetro não estiver presente.

### Fase 0: aprovação do plano

- Aprovar a sequência de 12 páginas.
- Confirmar a ferramenta de tickets da fábrica, para o formato do "antes e depois".
- Decidir entre a segunda sequência no mesmo projecto e uma apresentação separada.
- Validar os pontos do contrato de handoff e da Definition of Ready com quem conduz o Núcleo.

### Fase 1: estrutura

- Criar a selecção de versão e a sequência técnica, mantendo a executiva como predefinição.
- Separar conteúdo de estrutura nos componentes reaproveitados, para que o texto possa variar por versão.
- Implementar as páginas novas com blocos neutros no lugar das imagens.

### Fase 2: páginas novas

- O mesmo ticket, antes e depois.
- Contrato de handoff.
- UX no fluxo de sprint.

### Fase 3: páginas adaptadas

- Recompor as páginas 02 e 03, iceberg e etapas.
- Adaptar a profundidade por risco e retirar a página de maturidade do produto.
- Reorganizar o Design System e retirar a página de benefícios.
- Actualizar a matriz de responsáveis com a análise de requisitos.
- Substituir os indicadores e reorientar o encerramento.

### Fase 4: qualidade e ensaio

- Validar cada página em 1920 × 1080 e em ecrã de portátil.
- Testar navegação por teclado, controlos, modais e redução de movimento.
- Confirmar que a versão executiva continua idêntica à actual.
- Ensaiar a versão de 20 minutos e preparar as respostas às objecções.
- Rever com um desenvolvedor da fábrica que não participou da criação.

## 14. Critérios de conclusão

A versão técnica estará pronta quando:

- um desenvolvedor conseguir dizer, depois de ver a página 04, em que etapas participa e o que lhe é pedido;
- o "antes e depois" usar uma estrutura de ticket que a fábrica reconheça, sem depender de um caso específico;
- o contrato de handoff e os pontos de entrada no fluxo de sprint estiverem explícitos;
- ficar claro de onde vêm os artefactos da análise de requisitos e para onde segue o trabalho até à QA;
- a página de Design System explicar como os tokens chegam ao código e como contribuir;
- nenhuma página usar percentagens sem fonte verificável;
- os indicadores tiverem decisão associada e linha de base prevista;
- a apresentação funcionar sem abrir interacções;
- a versão executiva permanecer inalterada.

## 15. Decisões necessárias antes da implementação

1. Sequência das 12 páginas.
2. Segunda sequência no mesmo projecto ou apresentação separada.
3. Ferramenta de gestão de tickets usada pela fábrica.
4. Conteúdo do contrato de handoff e da Definition of Ready, validado pelo Núcleo.
5. Canal e tempo de resposta para dúvidas durante a sprint.
6. Projecto piloto e próximo passo apresentados no encerramento.
