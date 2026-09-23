# Núcleo de Experiência nos projectos

Apresentação executiva destinada às lideranças das áreas da TIS.

Este projecto deriva de `plano-de-implantacao`, mas possui outro propósito: demonstrar como o Núcleo de Experiência actua nos projectos, quais perguntas ajuda a responder, que evidências e entregáveis produz e o que muda quando existe um processo estruturado de UX.

## Estado

**Apresentação adaptada.** A sequência activa possui 11 páginas contínuas e apresenta como o Núcleo de Experiência actua nos projectos da TIS.

## Público e formato

- Público principal: lideranças de negócio, produto, tecnologia e áreas parceiras.
- Duração de referência: 12 a 15 minutos.
- Extensão actual: 11 páginas no total.
- Capa: título **Núcleo de Experiência nos projectos** e assinatura **TIS**, sem marcador de tipo de apresentação.
- Não é um kickoff, playbook ou plano de implantação.

## Segurança do projecto

Este projecto tem repositório próprio, [`tis-experience/nucleo-de-experiencia-nos-projectos`](https://github.com/tis-experience/nucleo-de-experiencia-nos-projectos), separado de `plano-de-implantacao`. Alterações feitas aqui não chegam ao projecto original.

Cada push para `main` publica a apresentação no GitHub Pages através do workflow [`deploy.yml`](./.github/workflows/deploy.yml), que também pode ser executado manualmente. Trabalho em curso deve ficar num branch próprio e só entrar em `main` quando estiver pronto para ser visto.

## Planeamento

O mapa completo de adaptação encontra-se em [PLANO-DE-ADAPTACAO.md](./PLANO-DE-ADAPTACAO.md).

A versão técnica destinada à equipa de desenvolvimento da fábrica de software está planeada em [PLANO-VERSAO-TECNICA.md](./PLANO-VERSAO-TECNICA.md).

## Execução local

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```
