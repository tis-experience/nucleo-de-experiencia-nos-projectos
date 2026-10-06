# Núcleo de Experiência nos projectos

Apresentação do Núcleo de Experiência da TIS, publicada em
https://tis-experience.github.io/nucleo-de-experiencia-nos-projectos/. O repositório tem duas versões:

- A apresentação original, na raiz do site (`src/app/App.tsx` e `src/app/components/`).
- A versão nova, em `#/v2` (`src/app/v2/`). A original só é alterada a pedido.
- A v3, em `#/v3` (`src/app/v3/`), cópia da v2 com duas revisões: um slide com os princípios de como a IA entra no
  processo e a medição na TIS com uma métrica de resultado por pergunta. É onde decorre o trabalho actual; a v2
  fica como estava. As classes da v3 são `v3-*`.

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
- A IA é descrita de forma concreta: o que o assistente recebe, o que produz e quem revê. Sem desenhar o fluxo como
  uma sequência simples (rascunho, revisão, projecto): o processo real tem muito mais passos, e o detalhe fica na
  fala do apresentador.
- As fases da TIS e as etapas de UX não se alinham numa linha do tempo. A proposta comercial corre o processo de UX
  em miniatura, do problema à demonstração, para mostrar a solução possível e a sua identidade visual.
- O fecho é um agradecimento, sem pedidos às lideranças.
- O processo de UX tem seis etapas, com os nomes da apresentação original: Descobrir, Definir, Explorar, Validar,
  Entregar e Acompanhar. O trabalho, o apoio de IA e as entregas de cada etapa vêm da "Proposta de actuação do
  Núcleo de Experiência com IA".
- O processo de desenvolvimento da TIS tem cinco fases: Proposta comercial, Discovery, Desenvolvimento, Aceite e
  release, Sustentação.
- Qualquer slide que cite etapas, fases ou áreas lê-as de `src/app/v2/content.ts`, para os slides dizerem o mesmo.

## Direcção visual da v2

- Segue as cores e a navegação da apresentação original: ecrãs brancos, títulos `#04165d`, destaques `#036ef2`,
  azul-escuro só na capa e no fecho, rodapé com número, nome e logótipo.
- Bronkoh apenas em títulos e destaques. Manrope em todo o texto de conteúdo, em tamanhos contidos.
- Sem amarelo nem cores fora da paleta, sem gradientes decorativos, sem caixas sólidas escuras, sem linhas a
  dividir colunas e sem navegação fixa em forma de timeline.
- Pouco texto visível de cada vez, organizado em blocos com fundo azul muito claro (`--tint`).
- A mudança mostra-se com movimento e com objectos que evoluem de slide para slide, como o desenho das etapas.
- A interacção tem de ser clara à primeira: o conteúdo ligado a um elemento aparece junto dele ou num painel único.
- Imagens sempre tratadas antes de entrarem no repositório (WebP, na dimensão em que são mostradas).

## Estrutura da v2

- `content.ts`: todos os textos e dados, e a ordem dos slides em `STEPS`.
- `scenes.tsx` e `StageScene.tsx`: as cenas. `AppV2.tsx`: navegação, teclado, cursor e ecrã inteiro.
- `v2.css`: estilos, com classes `v2-*`. `fx.tsx`: animações partilhadas.
- O palco tem 1920 × 1080 e é escalado para a janela. As medidas no CSS são em px desse palco.
- `#/v2/<passo>` abre um slide directamente. Acrescentar `?still` mostra o estado final sem animações, útil para
  rever o layout.

Ordem actual: capa, ponto de partida (maturidade e inquérito), camadas de UX, equipa, situação em que UX começa pelo
desenho, processo de UX com os métodos, como a IA entra (só na v3), as seis etapas, relação com as áreas, Design
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
- Na v3: as quatro métricas de resultado e a forma de as observar, e a linha de base "nos primeiros projectos, em
  2026".
