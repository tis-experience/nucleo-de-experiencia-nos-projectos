import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Activity, BadgeCheck, Blocks, Braces, Palette, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import logoPaths from "../../imports/01Capa/svg-9xym7sn689";
import layerScope from "./assets/camada-escopo.webp";
import layerSkeleton from "./assets/camada-esqueleto.webp";
import layerStrategy from "./assets/camada-estrategia.webp";
import layerStructure from "./assets/camada-estrutura.webp";
import layerSurface from "./assets/camada-superficie.webp";
import { MEASURE_GROUPS, PILLAR_CARDS } from "./metrics";
import {
  AI_CHAIN,
  AREAS,
  FRONTS,
  CURRENT_PROCESS,
  DS_POINTS,
  BENEFIT_METRICS,
  MARKET_EXAMPLES,
  MATURITY_DETAILS,
  MATURITY_LEVELS,
  PHASES,
  STAGES,
  STAGE_VISUAL,
  SURVEY,
  TEAM,
  TEAM_OPEN_SEATS,
  THEMES,
  UX_LAYERS,
} from "./content";
import { CountUp, EASE, MaskLine, STILL, Swap, fade, rise, spring, tween } from "./fx";
import { ArtifactCanvas, Screen } from "./StageScene";
import { Modal } from "./modal";

const exit = { opacity: 0, transition: { duration: 0.25 } };

function Mark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 540 538.358" fill="none" aria-hidden>
      <path d={logoPaths.p26e5dc80} fill="currentColor" />
      <path d={logoPaths.p2da8a80} fill="currentColor" />
      <path d={logoPaths.p21370b80} fill="currentColor" />
    </svg>
  );
}

/** Selecção dentro de uma cena, por clique ou pelas setas cima e baixo; pode avançar sozinha até haver interacção. */
function useSelected(count: number, autoAdvanceMs = 0, initial = 0) {
  const [selected, setSelected] = useState(initial);
  const [auto, setAuto] = useState(autoAdvanceMs > 0 && !STILL);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      setAuto(false);
      setSelected((current) => (current + (event.key === "ArrowDown" ? 1 : -1) + count) % count);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [count]);

  useEffect(() => {
    if (!auto) return undefined;
    const timer = window.setInterval(() => setSelected((current) => (current + 1) % count), autoAdvanceMs);
    return () => window.clearInterval(timer);
  }, [auto, autoAdvanceMs, count]);

  const select = (index: number) => {
    setAuto(false);
    setSelected(index);
  };

  return [selected, select, auto] as const;
}

/** Selector de ópticas: o marcador azul desliza para a opção escolhida. */
const number = (index: number) => String(index + 1).padStart(2, "0");

/* ── Abertura e fecho ─────────────────────────────────────────────────── */

const MARK_IDLE_DELAY_MS = 560;
const MARK_SPRING = { damping: 20, stiffness: 200, mass: 0.5 };

/** Símbolo da capa: inclina-se em 3D conforme o rato e oscila sozinho quando o rato pára, como na apresentação actual. */
function CoverMark({ rotate }: { rotate: number }) {
  const tiltX = useSpring(useMotionValue(0), MARK_SPRING);
  const tiltY = useSpring(useMotionValue(0), MARK_SPRING);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    if (STILL || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    let lastMove = -Infinity;
    const handleMove = (event: MouseEvent) => {
      lastMove = performance.now();
      tiltX.set((event.clientX / window.innerWidth - 0.5) * 1.32);
      tiltY.set((event.clientY / window.innerHeight - 0.5) * 1.32);
    };
    const tick = (time: number) => {
      if (time - lastMove > MARK_IDLE_DELAY_MS) {
        const t = time / 1000;
        tiltX.set(Math.sin(t * 0.82) * 0.34 + Math.sin(t * 0.35 + 1.7) * 0.08);
        tiltY.set(Math.cos(t * 0.71 + 0.8) * 0.29 + Math.sin(t * 0.38 + 2.4) * 0.07);
      }
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", handleMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [tiltX, tiltY]);

  return (
    <motion.div
      className="v3-cover-mark"
      initial={STILL ? false : { opacity: 0, scale: 0.7, rotate }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={spring(0.2, 40, 14)}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Mark className="v3-cover-symbol" />
      </motion.div>
    </motion.div>
  );
}

export function CoverScene() {
  return (
    <section className="v3-scene" aria-labelledby="v3-cover-title">
      <CoverMark rotate={-20} />
      <div className="v3-cover">
        <h1 id="v3-cover-title" className="v3-cover-title">
          <MaskLine delay={0.15}>Núcleo de</MaskLine>
          <MaskLine delay={0.3}>Experiência</MaskLine>
          <MaskLine delay={0.45}>nos projectos</MaskLine>
        </h1>
        <motion.p className="v3-cover-lead" {...rise(1)}>
          Como o processo de UX se integra nos projectos da TIS.
        </motion.p>
      </div>
    </section>
  );
}

export function ClosingScene() {
  return (
    <section className="v3-scene" aria-labelledby="v3-closing-title">
      <CoverMark rotate={20} />
      <div className="v3-cover" data-position="middle">
        <h1 id="v3-closing-title" className="v3-cover-title">
          <MaskLine delay={0.15}>Muito</MaskLine>
          <MaskLine delay={0.3}>obrigado!</MaskLine>
        </h1>
      </div>
    </section>
  );
}

/** O papel do Núcleo numa frase, centrada no ecrã, logo a seguir à equipa. */
export function RoleScene() {
  return (
    <section className="v3-scene" aria-labelledby="v3-role-title">
      <div className="v3-statement">
        <motion.p className="v3-kicker v3-statement-kicker" {...rise(0.1, 12)}>
          O papel do Núcleo de Experiência
        </motion.p>
        <h1 id="v3-role-title" className="v3-statement-title">
          <MaskLine delay={0.35}>Entender o real problema</MaskLine>
          <MaskLine delay={0.5}>para projectar a melhor solução</MaskLine>
        </h1>
      </div>
    </section>
  );
}

/* ── Ponto de partida: maturidade e inquérito ─────────────────────────── */

const LAYER_GAP = 64;
const LAYER_OPEN = 26;
const LAYER_IMAGES = [layerSurface, layerSkeleton, layerStructure, layerScope, layerStrategy];

/** A pilha das cinco camadas serve de índice: a camada escolhida (clique ou setas cima e baixo) destaca-se da pilha e o cartão ao lado mostra o conteúdo dela. */
export function UxScene() {
  // Abre na camada mais profunda, onde o trabalho começa.
  const [selected, select] = useSelected(UX_LAYERS.length, 0, UX_LAYERS.length - 1);
  const layer = UX_LAYERS[selected];

  // As cinco ilustrações ficam em memória logo à entrada, para a troca de camada não esperar pelo carregamento.
  useEffect(() => {
    LAYER_IMAGES.forEach((source) => {
      new Image().src = source;
    });
  }, []);

  return (
    <section className="v3-scene" aria-labelledby="v3-ux-title">
      <motion.p className="v3-kicker v3-scene-kicker" {...fade(0.1)}>
        O que é UX
      </motion.p>
      <div className="v3-head">
        <h1 id="v3-ux-title" className="v3-title">
          <MaskLine>A experiência tem 5 camadas</MaskLine>
        </h1>
        <motion.p className="v3-lead" style={{ maxWidth: "none" }} {...rise(0.3, 20)}>
          A interface é a parte visível de um trabalho que começa muito antes do desenho do ecrã.
        </motion.p>
      </div>

      <ol className="v3-layers">
        {UX_LAYERS.map((item, index) => {
          const offset = index > selected || (selected === 0 && index > 0) ? LAYER_OPEN * 2 : index === selected && index > 0 ? LAYER_OPEN : 0;
          return (
            <motion.li
              key={item.name}
              data-active={selected === index || undefined}
              style={{ top: index * LAYER_GAP, zIndex: UX_LAYERS.length - index }}
              initial={STILL ? false : { y: -index * LAYER_GAP, opacity: index === 0 ? 1 : 0 }}
              animate={{ y: offset, opacity: 1 }}
              transition={STILL ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 18 }}
            >
              <i className="v3-plane" data-depth={index} role="button" aria-hidden onClick={() => select(index)} />
              <button type="button" aria-pressed={selected === index} onClick={() => select(index)}>
                {item.name}
              </button>
            </motion.li>
          );
        })}
      </ol>
      <p className="v3-source v3-ux-source">Modelo: Jesse James Garrett (2002)</p>

      <motion.div className="v3-layer-card" {...rise(0.6, 24)}>
        <Swap>
          <motion.div
            key={selected}
            initial={STILL ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={exit}
            transition={tween(0.35)}
          >
            <img src={LAYER_IMAGES[selected]} alt="" width={1040} height={330} decoding="async" />
            <div className="v3-layer-copy">
              <div>
                <p className="v3-label">
                  Camada {selected + 1} de {UX_LAYERS.length}
                </p>
                <h2>{layer.name}</h2>
                <p className="v3-layer-text">{layer.text}</p>
              </div>
              <div>
                <p className="v3-layer-body">{layer.body}</p>
                <p className="v3-layer-question">{layer.question}</p>
              </div>
            </div>
          </motion.div>
        </Swap>
      </motion.div>
    </section>
  );
}

/** Janela com a descrição de um nível de maturidade. Fecha com Esc ou clique fora e muda de nível com as setas. */
function MaturityModal({ index, onChange }: { index: number; onChange: (index: number | null) => void }) {
  const detail = MATURITY_DETAILS[index];

  return (
    <Modal
      page={index}
      pages={MATURITY_LEVELS.length}
      onPage={onChange}
      onClose={() => onChange(null)}
      label={`Nível ${index + 1}: ${MATURITY_LEVELS[index]}`}
    >
      <p className="v3-modal-tag">
        Nível {index + 1}
        {index === 2 && <span>TIS hoje, entre o 2 e o 3</span>}
      </p>
      <h2>{MATURITY_LEVELS[index]}</h2>
      <p className="v3-modal-quote">{detail.quote}</p>
      <p>{detail.body}</p>
      {detail.list && (
        <ol>
          {detail.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )}
    </Modal>
  );
}

export function StartScene() {
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  return (
    <section className="v3-scene" aria-labelledby="v3-start-title">
      <motion.p className="v3-kicker v3-scene-kicker" {...fade(0.1)}>
        Ponto de partida
      </motion.p>
      <div className="v3-head">
        <h1 id="v3-start-title" className="v3-title">
          <MaskLine>A maturidade de UX na TIS hoje</MaskLine>
        </h1>
        <motion.p className="v3-lead" {...rise(0.3, 20)}>
          A TIS situa-se entre os níveis 2 e 3 da escala de maturidade de UX da NN/g, um ponto de partida com espaço
          claro para evoluir.
        </motion.p>
      </div>

      <div className="v3-maturity">
        <ol>
          {MATURITY_LEVELS.map((level, index) => (
            <li key={level} data-state={index < 2 ? "done" : index === 2 ? "current" : "next"}>
              <button type="button" aria-haspopup="dialog" onClick={() => setOpenLevel(index)}>
                <motion.i
                  style={{ height: 80 + index * 44 }}
                  initial={STILL ? false : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={tween(0.7, 0.4 + index * 0.1)}
                  aria-hidden
                />
                <span>Nível {index + 1}</span>
                <b>{level}</b>
              </button>
            </li>
          ))}
        </ol>
        <motion.p className="v3-maturity-marker" {...rise(1.3, -20)}>
          <span className="v3-bob">TIS hoje</span>
        </motion.p>
      </div>

      <div className="v3-survey">
        <motion.p className="v3-label" {...fade(0.8)}>
          Inquérito interno (Nov/2024) · 143 respostas
        </motion.p>
        <ul>
          {SURVEY.map((item, index) => (
            <motion.li key={item.caption} {...rise(0.9 + index * 0.12, 20)}>
              <b>
                <CountUp value={item.value} delay={0.9 + index * 0.12} />%
              </b>
              {item.caption}
            </motion.li>
          ))}
        </ul>
      </div>

      <Swap mode="sync">
        {openLevel !== null && <MaturityModal key="modal" index={openLevel} onChange={setOpenLevel} />}
      </Swap>
    </section>
  );
}

/* ── Do processo actual ao processo de UX ─────────────────────────────── */

const CHART_WIDTH = 1680;
const CHART_BASELINE = 290;
const effort = (t: number) => 14 + 250 * Math.pow(t, 2.4);

const EFFORT_PATH = (() => {
  const points = Array.from({ length: 41 }, (_, index) => {
    const t = index / 40;
    return `${(t * CHART_WIDTH).toFixed(1)} ${(CHART_BASELINE - effort(t)).toFixed(1)}`;
  });
  return `M${points.join("L")}`;
})();

/** [posição no processo actual, posição com o processo de UX, altura relativa sob a curva] */
const PROBLEMS = [
  [0.72, 0.04, 0.5],
  [0.76, 0.08, 0.25],
  [0.795, 0.12, 0.75],
  [0.83, 0.16, 0.4],
  [0.86, 0.2, 0.62],
  [0.885, 0.245, 0.22],
  [0.91, 0.29, 0.8],
  [0.93, 0.34, 0.45],
  [0.95, 0.39, 0.3],
  [0.965, 0.455, 0.66],
  [0.98, 0.64, 0.4],
  [0.992, 0.87, 0.5],
];

/** As bolas têm um tamanho fixo e mudam de posição e de escala por transformação, sem recalcular o layout. */
const PROBLEM_SIZE = 84;
const PROBLEM_TONES = ["#04165d", "#036ef2", "#7db3f8", "#036ef2"];
const CURRENT_PHASES = ["Proposta comercial", "Ecrãs", "Desenvolvimento", "Release", "Retrabalho"];

const [ENTRY, MISSING, RESULT] = CURRENT_PROCESS;

const CHANGE_HEADS = [
  {
    kicker: "Uma situação frequente nos projectos",
    title: "Quando UX começa pelo desenho, os problemas só são descobertos depois da implementação",
    lead: "",
  },
  {
    kicker: "Com um processo de UX",
    title: "O processo de UX encontra os problemas antes da construção",
    lead: "O problema é investigado e a solução é avaliada cedo, quando mudar ainda é simples.",
  },
];

/** Uma só cena: como entramos, o que fica por fazer e a consequência, na mesma linha do processo.
    Os problemas nascem nos passos em falta e só aparecem, maiores, depois do release. */
export function ChangeScene({ build }: { build: number }) {
  const head = CHANGE_HEADS[build];
  const current = build === 0;
  const phases = current ? CURRENT_PHASES : STAGES.map((stage) => stage.short);
  const pushRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // As bolas afastam-se ligeiramente do cursor.
  useEffect(() => {
    if (STILL) return undefined;
    let frame = 0;
    let pointer = { x: 0, y: 0 };
    // Uma actualização por fotograma: primeiro lêem-se todas as posições, depois escrevem-se os desvios.
    const update = () => {
      frame = 0;
      const elements = pushRefs.current.filter((element): element is HTMLSpanElement => Boolean(element));
      const rects = elements.map((element) => element.parentElement!.getBoundingClientRect());
      elements.forEach((element, index) => {
        const rect = rects[index];
        const dx = rect.left + rect.width / 2 - pointer.x;
        const dy = rect.top + rect.height / 2 - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        const reach = 240;
        const force = distance < reach ? (1 - distance / reach) * 40 : 0;
        element.style.transform = force ? `translate(${(dx / distance) * force}px, ${(dy / distance) * force}px)` : "";
      });
    };
    const handleMove = (event: MouseEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="v3-scene" aria-labelledby="v3-change-title">
      <div className="v3-head">
        <Swap>
          <motion.div key={build} exit={exit}>
            <motion.p className="v3-kicker" {...fade(0.05)}>
              {head.kicker}
            </motion.p>
            <h1 id="v3-change-title" className="v3-title v3-title-compact">
              <MaskLine>{head.title}</MaskLine>
            </h1>
            {head.lead && (
              <motion.p className="v3-lead" {...rise(0.4, 20)}>
                {head.lead}
              </motion.p>
            )}
          </motion.div>
        </Swap>
      </div>

      <Swap>
        {current && (
          <motion.div key="current" className="v3-layer" exit={exit}>
            <div className="v3-story">
              <motion.p className="v3-label" {...fade(0.3)}>
                {ENTRY.label}
              </motion.p>
              <motion.p className="v3-label" data-group="result" {...fade(1.9)}>
                {RESULT.label}
              </motion.p>
              <ul>
                {[...ENTRY.items, ...RESULT.items].map((card, index) => (
                  <motion.li
                    key={card.title}
                    data-kind={index < ENTRY.items.length ? "entry" : "result"}
                    {...rise(index < ENTRY.items.length ? 0.3 + index * 0.12 : 1.6 + index * 0.1, 24)}
                  >
                    <h2>{card.title}</h2>
                    <p>{card.text}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="v3-missing">
              <motion.p className="v3-label" {...fade(0.8)}>
                {MISSING.label}
              </motion.p>
              {MISSING.items.map((item, index) => (
                <motion.p key={item.title} className="v3-missing-step" style={{ left: item.stem }} {...rise(0.85 + index * 0.12, 16)}>
                  {item.title}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </Swap>

      {/* Com o processo de UX, cada etapa mostra os métodos que usa, presos à etapa por uma linha. */}
      <Swap>
        {!current && (
          <motion.ol key="methods" className="v3-methods" exit={exit} aria-label="Métodos de UX por etapa">
            {STAGES.map((stage, index) => (
              <motion.li key={stage.id} {...rise(0.5 + index * 0.1, 16)}>
                <ul>
                  {stage.methods.map((method) => (
                    <li key={method}>{method}</li>
                  ))}
                </ul>
                <motion.i
                  aria-hidden
                  initial={STILL ? false : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={tween(0.6, 0.8 + index * 0.1)}
                />
              </motion.li>
            ))}
          </motion.ol>
        )}
      </Swap>

      <div className="v3-change-chart">
        <motion.svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_BASELINE}`} fill="none" aria-hidden {...fade(current ? 1.1 : 0, 0.6)}>
          <defs>
            <linearGradient id="v3-effort" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#036EF2" stopOpacity="0" />
              <stop offset="1" stopColor="#036EF2" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          <path d={`${EFFORT_PATH}L${CHART_WIDTH} ${CHART_BASELINE}L0 ${CHART_BASELINE}Z`} fill="url(#v3-effort)" />
          <path d={EFFORT_PATH} stroke="#036EF2" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
        </motion.svg>

        {PROBLEMS.map(([late, early, lift], index) => {
          const t = current ? late : early;
          const size = 16 + 68 * Math.pow(t, 2.4);
          const origin = MISSING.items[index % MISSING.items.length].stem;
          return (
            <motion.i
              key={index}
              className="v3-problem"
              aria-hidden
              initial={STILL ? false : { opacity: 0, x: origin, y: CHART_BASELINE, scale: 10 / PROBLEM_SIZE }}
              animate={{
                opacity: 1,
                x: t * CHART_WIDTH,
                y: CHART_BASELINE - effort(t) * lift,
                scale: size / PROBLEM_SIZE,
              }}
              transition={spring(current ? 1.2 + index * 0.05 : index * 0.03, 70, 15)}
            >
              <span
                ref={(element) => {
                  pushRefs.current[index] = element;
                }}
              >
                <span
                  style={
                    {
                      "--tone": PROBLEM_TONES[index % PROBLEM_TONES.length],
                      opacity: 0.62 + ((index * 7) % 4) * 0.1,
                      animationDuration: `${3.2 + (index % 4) * 0.7}s`,
                      animationDelay: `${-index * 0.45}s`,
                    } as CSSProperties
                  }
                />
              </span>
            </motion.i>
          );
        })}

        <motion.p className="v3-chart-note" data-side="right" {...fade(current ? 1.4 : 0.2)}>
          Esforço para corrigir
        </motion.p>

        <Swap>
          <motion.ol key={build} className="v3-phases" exit={exit} {...fade(0.2)}>
            {phases.map((phase) => (
              <li key={phase}>{phase}</li>
            ))}
          </motion.ol>
        </Swap>
      </div>
    </section>
  );
}

/* ── Design System TIS ────────────────────────────────────────────────── */

/* ── Como a IA entra ───────────────────────────────────────────────────── */

/** As equipas em cadeia sobre a mesma base; a equipa escolhida mostra o que recebe, prepara, devolve e quem revê. */
export function AiScene() {
  const [selected, select] = useSelected(AI_CHAIN.teams.length);
  const team = AI_CHAIN.teams[selected];

  return (
    <section className="v3-scene" aria-labelledby="v3-ai-title">
      <motion.p className="v3-kicker v3-scene-kicker" {...fade(0.1)}>
        Aceleração com IA
      </motion.p>
      <div className="v3-head">
        <h1 id="v3-ai-title" className="v3-title">
          <MaskLine>Todas as equipas bebem da mesma fonte</MaskLine>
        </h1>
        <motion.p className="v3-lead" style={{ maxWidth: "none" }} {...rise(0.3, 20)}>
          Requisitos, design, construção e testes partem do mesmo repositório de documentos do projecto, com agentes a
          preparar o trabalho de cada equipa.
        </motion.p>
      </div>

      <div className="v3-chain">
        <ol className="v3-chain-teams" aria-label="Equipas">
          {AI_CHAIN.teams.map((item, index) => (
            <motion.li key={item.id} {...rise(0.4 + index * 0.12, 20)}>
              <button type="button" aria-pressed={index === selected} onClick={() => select(index)}>
                <b>{item.name}</b>
                <span>
                  <Sparkles size={15} strokeWidth={2} aria-hidden />
                  {item.ai}
                </span>
              </button>
              {index < AI_CHAIN.teams.length - 1 && <i className="v3-chain-next" aria-hidden />}
              <i className="v3-chain-drop" aria-hidden />
            </motion.li>
          ))}
        </ol>

        <motion.div className="v3-chain-base" {...rise(0.9, 16)}>
          <b>{AI_CHAIN.base.title}</b>
          <span>{AI_CHAIN.base.text}</span>
        </motion.div>
      </div>

      <div className="v3-chain-detail" aria-live="polite">
        <Swap>
          <motion.dl key={selected} exit={exit} {...rise(0.05, 12)}>
            <div>
              <dt className="v3-label">Recebe da base</dt>
              <dd>{team.receives}</dd>
            </div>
            <div>
              <dt className="v3-label">Prepara com os agentes</dt>
              <dd>{team.produces}</dd>
            </div>
            <div>
              <dt className="v3-label">Devolve à base</dt>
              <dd>{team.feeds}</dd>
            </div>
            <div>
              <dt className="v3-label">Quem revê</dt>
              <dd>{team.reviews}</dd>
            </div>
          </motion.dl>
        </Swap>
      </div>

      <motion.p className="v3-footnote" data-raised {...fade(1.2)}>
        {AI_CHAIN.closing}
      </motion.p>
    </section>
  );
}

/** Um ícone por ponto do Design System, pela ordem de DS_POINTS em content.ts. */
const DS_ICONS = [Braces, Palette, Sparkles, ShieldCheck];

export function DesignSystemScene() {
  // Os temas alternam sozinhos, com alguns segundos em cada um, até alguém escolher um.
  const [selected, select] = useSelected(THEMES.length, 4500);
  const theme = THEMES[selected];
  const themeStyle = {
    "--theme": theme.color,
    "--r-card": `${theme.card}px`,
    "--r-item": `${theme.item}px`,
    "--r-pill": `${theme.pill}px`,
  } as CSSProperties;

  return (
    <section className="v3-scene" aria-labelledby="v3-ds-title">
      <motion.p className="v3-kicker v3-scene-kicker" {...fade(0.1)}>
        Produtos consistentes
      </motion.p>
      <div className="v3-head" data-width="narrow">
        <h1 id="v3-ds-title" className="v3-title">
          <MaskLine>Design System TIS</MaskLine>
        </h1>
        <motion.p className="v3-lead" {...rise(0.3, 20)}>
          Os mesmos componentes dão origem a produtos consistentes, com a identidade de cada cliente.
        </motion.p>
      </div>

      <ul className="v3-ds-points">
        {DS_POINTS.map((point, index) => {
          const Icon = DS_ICONS[index];
          return (
            <motion.li key={point.title} {...rise(0.4 + index * 0.1, 20)}>
              <span className="v3-ds-icon" aria-hidden>
                <Icon size={24} strokeWidth={1.8} />
              </span>
              <h2>{point.title}</h2>
              <p>{point.text}</p>
            </motion.li>
          );
        })}
      </ul>

      <motion.div className="v3-ds-demo" data-theme={theme.id} style={themeStyle} {...rise(0.6, 24)}>
        <Screen fidelity="final" />
        <div className="v3-ds-parts" aria-hidden>
          <span className="v3-ds-button">Botão</span>
          <span className="v3-ds-button" data-variant="outline">
            Botão
          </span>
          <span className="v3-ds-chip">Etiqueta</span>
          <span className="v3-ds-input">Campo de texto</span>
          <span className="v3-ds-toggle" />
        </div>
        <div className="v3-ds-switch" role="group" aria-label="Tema do cliente">
          {THEMES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={index === selected}
              style={{ "--swatch": item.color, "--swatch-radius": `${Math.min(item.item, 16)}px` } as CSSProperties}
              onClick={() => select(index)}
            >
              <i aria-hidden />
              {item.name}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ── Relação com as áreas ─────────────────────────────────────────────── */

const ORBIT = { cx: 370, cy: 600, rx: 215, ry: 215 };

const orbitPoint = (index: number) => {
  const angle = ((-90 + index * (360 / AREAS.length)) * Math.PI) / 180;
  return { x: ORBIT.cx + ORBIT.rx * Math.cos(angle), y: ORBIT.cy + ORBIT.ry * Math.sin(angle) };
};

/** O Núcleo ao centro e as áreas à volta. A ficha mostra como o Núcleo contribui para a área escolhida,
    o que cada lado traz e as etapas de UX em que trabalham juntos. */
export function AreasScene({ areaId, onSelectArea }: { areaId: string; onSelectArea: (id: string) => void }) {
  const area = AREAS.find((item) => item.id === areaId) ?? AREAS[0];

  return (
    <section className="v3-scene" aria-labelledby="v3-areas-title">
      <motion.p className="v3-kicker v3-scene-kicker" {...fade(0.1)}>
        Relação com as áreas
      </motion.p>
      <h1 id="v3-areas-title" className="v3-title v3-scene-title">
        <MaskLine>Como o Núcleo contribui com cada área</MaskLine>
      </h1>

      <motion.div className="v3-layer" {...fade(0.1)}>
        <svg className="v3-orbit-lines" viewBox="0 0 1920 1080" fill="none" aria-hidden>
          {AREAS.map((item, index) => {
            const point = orbitPoint(index);
            return (
              <line key={item.id} x1={ORBIT.cx} y1={ORBIT.cy} x2={point.x} y2={point.y} data-on={item.id === area.id} />
            );
          })}
        </svg>
        <motion.div
          className="v3-orbit-core"
          style={{ left: ORBIT.cx, top: ORBIT.cy }}
          initial={STILL ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={spring(0.2, 120, 14)}
        >
          <Mark className="v3-orbit-mark" />
        </motion.div>
        <ul className="v3-orbit" aria-label="Áreas">
          {AREAS.map((item, index) => {
            const point = orbitPoint(index);
            return (
              <motion.li
                key={item.id}
                style={{ left: point.x, top: point.y }}
                initial={STILL ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring(0.3 + index * 0.06, 160, 16)}
              >
                <button type="button" aria-pressed={item.id === area.id} onClick={() => onSelectArea(item.id)}>
                  {item.name}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>

      <div className="v3-area" aria-live="polite">
        <Swap>
          <motion.div key={area.id} exit={exit} {...rise(0.2, 16)}>
            <h2>
              {area.name}
              {area.note && <small>{area.note}</small>}
            </h2>
            <p className="v3-area-role">{area.role}</p>

            <div className="v3-area-exchange">
              <p>
                <span className="v3-label">A área traz</span>
                {area.gives}
              </p>
              <svg viewBox="0 0 40 40" fill="none" aria-hidden>
                <path d="M6 14h26m-7-7 7 7-7 7M34 27H8m7 7-7-7 7-7" />
              </svg>
              <p>
                <span className="v3-label">O Núcleo devolve</span>
                {area.gets}
              </p>
            </div>

            <dl className="v3-area-links">
              <div className="v3-area-services">
                <dt>Serviços do Núcleo</dt>
                <dd className="v3-links">
                  {FRONTS.filter((front) => area.fronts.includes(front.id)).map((front) => (
                    <span key={front.id}>{front.name}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Etapas de UX em conjunto</dt>
                <dd className="v3-links">
                  {STAGES.filter((item) => area.stages.includes(item.id)).map((item) => (
                    <span key={item.id}>
                      {item.number} {item.name}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Fases do projecto</dt>
                <dd className="v3-links">
                  {PHASES.filter((item) => item.areas.includes(area.id)).map((item) => (
                    <span key={item.name}>{item.name}</span>
                  ))}
                  {!PHASES.some((item) => item.areas.includes(area.id)) && <span>Iniciativas próprias da área</span>}
                </dd>
              </div>
            </dl>
          </motion.div>
        </Swap>
      </div>
    </section>
  );
}

/* ── Resultados: uma cena, duas ópticas ───────────────────────────────── */

const RESULT_TITLES = ["Dados de mercado sobre UX", "Como devemos medir"];

function MarketResults() {
  const [selected, select] = useSelected(MARKET_EXAMPLES.length);

  return (
    <>
      <ul className="v3-cases" aria-label="Cases de mercado">
        {MARKET_EXAMPLES.map((example, index) => (
          <motion.li key={example.name} data-active={index === selected} {...rise(0.3 + index * 0.1, 24)}>
            <button type="button" aria-expanded={index === selected} onClick={() => select(index)}>
              <span className="v3-label">{example.company}</span>
              <span className="v3-case-name">{example.name}</span>
              <b className="v3-case-result">{example.result}</b>
              {index === selected && (
                <motion.span className="v3-case-detail" {...fade(0.25, 0.5)}>
                  <span className="v3-case-caption">{example.resultCaption}</span>
                  <span className="v3-case-text">{example.description}</span>
                  <span className="v3-source">Fonte: {example.source}</span>
                </motion.span>
              )}
            </button>
          </motion.li>
        ))}
      </ul>

      <motion.p className="v3-label v3-studies-label" {...fade(0.7)}>
        Estudos publicados
      </motion.p>
      <ul className="v3-studies">
        {BENEFIT_METRICS.map((metric, index) => {
          const delay = 0.75 + index * 0.12;
          return (
            <motion.li key={metric.caption} {...rise(delay, 20)}>
              <p className="v3-number">
                {metric.prefix}
                <CountUp value={metric.number} decimals={metric.decimals} delay={delay} />
                <small>{metric.unit}</small>
              </p>
              <p>{metric.caption}</p>
              <p className="v3-source">{metric.source}</p>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}

/** Um ícone por pergunta da medição, pela ordem de PILLAR_CARDS. */
const PILLAR_ICONS = [Workflow, Blocks, BadgeCheck, Activity];

function TisMeasures() {
  const [selected, select] = useSelected(PILLAR_CARDS.length);

  return (
    <>
      <ol className="v3-pillars" aria-label="Perguntas">
        {PILLAR_CARDS.map((pillar, index) => {
          const Icon = PILLAR_ICONS[index];
          return (
            <motion.li key={pillar.title} {...rise(0.3 + index * 0.1, 20)}>
              <button type="button" aria-pressed={index === selected} onClick={() => select(index)}>
                <span className="v3-pillar-icon">
                  <Icon size={22} strokeWidth={2} aria-hidden />
                </span>
                <span className="v3-label">{pillar.title}</span>
                <b>{pillar.body}</b>
              </button>
            </motion.li>
          );
        })}
      </ol>

      {/* Um painel com os grupos de indicadores da pergunta escolhida; com menos grupos, cada lista abre em mais colunas. */}
      <div className="v3-measures" aria-live="polite">
        <Swap>
          <motion.div
            key={selected}
            exit={exit}
            style={{ "--groups": MEASURE_GROUPS[selected].length, "--cols": 4 - MEASURE_GROUPS[selected].length } as CSSProperties}
          >
            {MEASURE_GROUPS[selected].map((group, groupIndex) => (
              <motion.section key={group.title} {...rise(0.08 + groupIndex * 0.1, 14)}>
                <p className="v3-label">{group.title}</p>
                <ul>
                  {group.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={STILL ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.15 + groupIndex * 0.1 + itemIndex * 0.04, ease: EASE }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </motion.div>
        </Swap>
      </div>

      <motion.p className="v3-footnote" {...fade(1)}>
        Indicadores do playbook. Linha de base nos primeiros projectos que entram no processo e uma leitura a cada
        release; uma métrica só fica se tiver pergunta clara, forma de observação e decisão possível.
      </motion.p>
    </>
  );
}

/** Dois passos: os dados de mercado e, no passo seguinte, a medição na TIS. */
export function ResultsScene({ lens }: { lens: number }) {
  return (
    <section className="v3-scene" aria-labelledby="v3-results-title">
      <p className="v3-kicker v3-scene-kicker">Resultados</p>
      <h1 id="v3-results-title" className="v3-title v3-scene-title">
        <Swap>
          <motion.span key={lens} style={{ display: "block" }} exit={exit}>
            <MaskLine>{RESULT_TITLES[lens]}</MaskLine>
          </motion.span>
        </Swap>
      </h1>

      <Swap>
        <motion.div key={lens} className="v3-layer" exit={exit}>
          {lens === 0 ? <MarketResults /> : <TisMeasures />}
        </motion.div>
      </Swap>
    </section>
  );
}

/* ── A equipa ─────────────────────────────────────────────────────────── */

const initials = (name: string) =>
  name
    .split(" ")
    .filter((part) => part.length > 2)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export function TeamScene() {
  return (
    <section className="v3-scene" aria-labelledby="v3-team-title">
      <motion.p className="v3-kicker v3-scene-kicker" {...fade(0.1)}>
        Equipa
      </motion.p>
      <div className="v3-head">
        <h1 id="v3-team-title" className="v3-title">
          <MaskLine>O Núcleo de Experiência</MaskLine>
        </h1>
        <motion.p className="v3-lead" {...rise(0.3, 20)}>
          Trabalhamos com as equipas dos projectos da TIS, desde o pedido inicial até à versão entregue.
        </motion.p>
      </div>

      <div className="v3-team">
        <ul>
          {TEAM.map((person, index) => (
            <motion.li key={index} {...rise(0.45 + index * 0.14, 28)}>
              <span className="v3-avatar v3-bob" style={{ animationDelay: `${-index * 0.8}s` }}>
                {person.photo ? <img src={person.photo} alt="" /> : initials(person.name) || <Mark className="v3-avatar-mark" />}
              </span>
              <b>{person.name || "Nome a indicar"}</b>
              <span className="v3-team-role">{person.role}</span>
              <p>{person.intro}</p>
            </motion.li>
          ))}
          <motion.li className="v3-team-open" {...fade(1.1, 0.8)}>
            <div aria-hidden>
              {Array.from({ length: TEAM_OPEN_SEATS }, (_, index) => (
                <i key={index} />
              ))}
            </div>
            <p>Espaço para a equipa crescer</p>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}
