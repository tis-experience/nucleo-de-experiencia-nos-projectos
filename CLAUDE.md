# Núcleo de Experiência nos projectos

Apresentação do Núcleo de Experiência da TIS, publicada em
https://tis-experience.github.io/nucleo-de-experiencia-nos-projectos/. O repositório tem uma única versão, em
`src/app/v3/` (o nome da pasta e o prefixo das classes, `v3-*`, ficaram da fase em que coexistiam três versões).

A apresentação original, que esteve neste endereço até Outubro de 2026, vive agora no repositório `playbook`, em
https://tis-experience.github.io/playbook/. A v2 (a versão nova sem o slide da IA) ficou só no histórico do git.

## Regras de escrita

Valem para qualquer texto: respostas, textos dos slides, documentação, commits e comentários de código.

- Português de Portugal na grafia usada na TIS (pré-Acordo: "projecto", "actual", "equipa", "ecrã", "utilizador"), em registo adulto e directo.
- Nunca usar travessão (nem "—" nem "–"). Usar ponto, vírgula, dois-pontos ou parênteses.
- Prosa contínua, com vírgulas e orações subordinadas. Evitar frases curtas justapostas, que soam a slogan.
- Sem floreio e sem anunciar o que se vai dizer ("vou ser directo", "em resumo").
- Escrever pela positiva. Evitar a construção "isto e não aquilo" e as enumerações de efeito.
- Vocabulário simples, o do utilizador. Sem nomes inventados para o óbvio e sem jargão denso.
- Pode-se discordar do pedido quando houver razão, sem servilismo.

## Conteúdo

- Sem exemplos fictícios específicos e sem promessas exageradas. Os números de mercado têm sempre fonte.
- O Núcleo trabalha por trocas declaradas com as áreas, sem imposição. Os ganhos de um projecto são da equipa.
- O PO participa activamente na UX. O Marketing entra apenas na marca e nos produtos TIS.
- A IA é descrita de forma concreta: o que os agentes recebem, o que produzem e quem revê. No slide da IA diz-se
  "agentes"; nas etapas e no Design System ficou "assistente", a uniformizar quando se rever esse texto. Sem desenhar o fluxo como
  uma sequência simples (rascunho, revisão, projecto): o processo real tem muito mais passos, e o detalhe fica na
  fala do apresentador.
- A IA mostra-se ao nível da empresa, no slide a seguir à relação com as áreas, pela ordem Requisitos, Núcleo, Desenvolvimento e QA: Requisitos escreve e
  detalha os requisitos com IA, o Núcleo compõe ecrãs e protótipos funcionais em código com o Design System (os
  mesmos que servem aos testes de utilização e à validação pelo cliente), o Desenvolvimento (nome genérico, sem
  nomear a Fábrica) constrói sobre o protótipo e os requisitos sem reinterpretar o design, e QA gera casos e testes automatizados a
  partir dos requisitos e do protótipo e devolve os defeitos à base. Tudo bebe da mesma base documental do projecto.
- As fases da TIS e as etapas de UX não se alinham numa linha do tempo. A proposta comercial corre o processo de UX
  em miniatura, do problema à demonstração, para mostrar a solução possível e a sua identidade visual.
- O fecho é um agradecimento, sem pedidos às lideranças.
- O processo de UX tem seis etapas, com os nomes da apresentação original: Descobrir, Definir, Explorar, Validar,
  Entregar e Acompanhar. O trabalho, o apoio de IA e as entregas de cada etapa vêm da "Proposta de actuação do
  Núcleo de Experiência com IA".
- O processo de desenvolvimento da TIS tem cinco fases: Proposta comercial, Discovery, Desenvolvimento, Aceite e
  release, Sustentação.
- Qualquer slide que cite etapas, fases ou áreas lê-as de `src/app/v3/content.ts`, para os slides dizerem o mesmo.
- As seis frentes de actuação (Pesquisa e Discovery, Design de Interface e Interacção, Design de Serviço, Design
  System, Acessibilidade e Compliance, Validação e Testes) aparecem como etiquetas em cada etapa e como serviços na
  ficha de cada área, e explicam-se no apêndice das áreas.
- O conteúdo opcional fica em apêndices, janelas de ecrã inteiro abertas por uma ligação no canto do slide: tipos de
  pedido e maturidade do produto (etapas), arquitectura e governança (Design System), frentes, responsáveis por fase
  e princípios (áreas). Cada página é o próprio slide do playbook (slides 5, 7, 8 e 9), com os componentes originais
  copiados para `src/app/components` e mostrados tal e qual, com a sua navegação interna, a grafia e os nomes das
  áreas da original (Produto, Desenvolvimento, Comercial, Dados/BI, Suporte/CS). Não adaptar esse texto nem esse
  desenho; uma alteração faz-se primeiro no playbook e copia-se depois. Nada de essencial à apresentação pode
  depender de um apêndice.

## Direcção visual

- Segue as cores e a navegação da apresentação original: ecrãs brancos, títulos `#04165d`, destaques `#036ef2`,
  azul-escuro só na capa e no fecho, rodapé com número, nome e logótipo.
- Bronkoh apenas em títulos e destaques. Manrope em todo o texto de conteúdo, em tamanhos contidos.
- Sem amarelo nem cores fora da paleta, sem gradientes decorativos, sem caixas sólidas escuras, sem linhas a
  dividir colunas e sem navegação fixa em forma de timeline.
- Pouco texto visível de cada vez, organizado em blocos com fundo azul muito claro (`--tint`).
- A mudança mostra-se com movimento e com objectos que evoluem de slide para slide, como o desenho das etapas.
- A interacção tem de ser clara à primeira: o conteúdo ligado a um elemento aparece junto dele ou num painel único.
- Imagens sempre tratadas antes de entrarem no repositório (WebP, na dimensão em que são mostradas).

## Estrutura

- `content.ts`: todos os textos e dados, e a ordem dos slides em `STEPS`.
- `scenes.tsx` e `StageScene.tsx`: as cenas. `AppV3.tsx`: navegação, teclado, cursor e ecrã inteiro. `metrics.ts`:
  as listas de métricas do slide da medição. `appendices.tsx`: a janela partilhada (`Modal`), a ligação `MoreLink` e
  os três apêndices, que montam os slides do playbook dentro da janela de ecrã inteiro.
- `src/app/components`, `src/app/scaling.ts`, `src/app/constants` e `src/imports`: código e recursos copiados do
  playbook para os apêndices, sem alterações além das imagens convertidas para WebP. Os estilos genéricos da janela
  (`.v3-modal-card p`, botões) excluem a janela de ecrã inteiro para não contaminarem esses slides.
- `v3.css`: estilos, com classes `v3-*`. `fx.tsx`: animações partilhadas. `src/main.tsx` monta a apresentação e
  redirecciona os endereços antigos `#/v2/<passo>` e `#/v3/<passo>` para `#/<passo>`.
- O palco tem 1920 × 1080 e é escalado para a janela. As medidas no CSS são em px desse palco. Numa janela mais
  alta do que 16:9 (16:10, 3:2) o palco cresce em altura até 1320 e `--extra` guarda a diferença: os blocos de cada
  slide têm `top: calc(<px> + var(--extra) * <fracção>)`, com a fracção maior quanto mais abaixo estão, para o espaço
  a mais se repartir entre os grupos. Um bloco novo posicionado em absoluto deve seguir a mesma regra.
- `#/<passo>` abre um slide directamente. Acrescentar `?still` mostra o estado final sem animações, útil para
  rever o layout.

Ordem actual: capa, ponto de partida (maturidade e inquérito), equipa, camadas de UX, situação em que UX começa pelo
desenho, processo de UX com os métodos, as seis etapas, relação com as áreas, como a IA liga as equipas, Design
System, resultados (mercado e medição na TIS) e fecho.

## Comandos e publicação

- `npm run dev` para desenvolver e `npm run build` para verificar que compila. Não há testes nem verificação de tipos.
- Um push para `main` publica o site pelo GitHub Pages (`.github/workflows/deploy.yml`).
- As páginas ficam em cache cerca de dez minutos. Para rever logo a seguir, acrescentar `?v=<sha>` ao endereço.
- Mensagens de commit em português, no imperativo, sem travessões.

## Por confirmar com o autor

- Fonte primária de três números de mercado: McKinsey (+32 p.p.), Keep the Change e Xbox (19 entradas).
- Ligações deduzidas entre fases, áreas e etapas de UX, e os métodos atribuídos a cada etapa.
- Texto da etapa Definir e as frases de contribuição do Núcleo para cada área.
- As frases de papel dos dois designers na cena da equipa, que hoje são iguais.
- A medição na TIS com uma métrica de resultado por pergunta, e o texto da Pré-venda como processo em miniatura, foram
  experimentados e retirados; estão no histórico do git (commits 4b2ea13 e 49f1e82) se voltarem a ser precisos.
- Nos apêndices: as frentes atribuídas a cada etapa e a cada área. Os números de retorno do Design System (70%, 65%,
  85%, 800%) vieram do playbook sem fonte.
- Um mapa do processo de UX cruzado com as áreas de execução e as fases da TIS foi desenhado como infográfico fora da
  apresentação e ficou guardado para uma versão futura.
