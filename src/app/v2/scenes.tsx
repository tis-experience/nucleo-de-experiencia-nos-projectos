import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import logoPaths from "../../imports/01Capa/svg-9xym7sn689";
import { OPERACIONAL_COLUMNS, PILLAR_CARDS, UX_COLUMNS } from "../components/slide14MetricsData";
import {
  AI_FLOW,
  AREAS,
  BENEFIT_METRICS,
  CURRENT_PROCESS,
  DELIVERY_VISUALS,
  DS_POINTS,
  MARKET_EXAMPLES,
  MATURITY_LEVELS,
  PHASES,
  STAGES,
  SURVEY,
  THEMES,
  type StageId,
} from "./content";
import { CountUp, EASE, MaskLine, STILL, Swap, fade, rise, spring, tween } from "./fx";
import { ArtifactCanvas, Screen } from "./StageScene";

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
function useSelected(count: number, autoAdvanceMs = 0) {
  const [selected, setSelected] = useState(0);
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

const number = (index: number) => String(index + 1).padStart(2, "0");

const stageNames = (stages: StageId[]) =>
  stages.length === STAGES.length
    ? "todas"
    : STAGES.filter((stage) => stages.includes(stage.id))
        .map((stage) => stage.short)
        .join(", ");

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
      className="v2-cover-mark"
      initial={STILL ? false : { opacity: 0, scale: 0.7, rotate }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={spring(0.2, 40, 14)}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Mark className="v2-cover-symbol" />
      </motion.div>
    </motion.div>
  );
}

export function CoverScene() {
  return (
    <section className="v2-scene" aria-labelledby="v2-cover-title">
      <CoverMark rotate={-20} />
      <div className="v2-cover">
        <h1 id="v2-cover-title" className="v2-cover-title">
          <MaskLine delay={0.15}>Núcleo de</MaskLine>
          <MaskLine delay={0.3}>Experiência</MaskLine>
          <MaskLine delay={0.45}>nos projectos</MaskLine>
        </h1>
        <motion.p className="v2-cover-lead" {...rise(1)}>
          Como o processo de UX, acelerado por IA, se integra nos projectos da TIS.
        </motion.p>
      </div>
    </section>
  );
}

export function ClosingScene() {
  return (
    <section className="v2-scene" aria-labelledby="v2-closing-title">
      <CoverMark rotate={20} />
      <div className="v2-cover" data-position="middle">
        <h1 id="v2-closing-title" className="v2-cover-title">
          <MaskLine delay={0.15}>Muito</MaskLine>
          <MaskLine delay={0.3}>obrigado!</MaskLine>
        </h1>
      </div>
    </section>
  );
}

/* ── Ponto de partida: maturidade e inquérito ─────────────────────────── */

export function StartScene() {
  return (
    <section className="v2-scene" aria-labelledby="v2-start-title">
      <motion.p className="v2-kicker v2-scene-kicker" {...fade(0.1)}>
        Ponto de partida
      </motion.p>
      <div className="v2-head">
        <h1 id="v2-start-title" className="v2-title">
          <MaskLine>Onde está a UX na TIS</MaskLine>
        </h1>
        <motion.p className="v2-lead" {...rise(0.3, 20)}>
          A TIS situa-se entre os níveis 2 e 3 da escala de maturidade de UX da NN/g, um ponto de partida com espaço
          claro para evoluir.
        </motion.p>
      </div>

      <div className="v2-maturity">
        <ol>
          {MATURITY_LEVELS.map((level, index) => (
            <li key={level} data-state={index < 2 ? "done" : index === 2 ? "current" : "next"}>
              <motion.i
                style={{ height: 80 + index * 44 }}
                initial={STILL ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={tween(0.7, 0.4 + index * 0.1)}
                aria-hidden
              />
              <span>Nível {index + 1}</span>
              <b>{level}</b>
            </li>
          ))}
        </ol>
        <motion.p className="v2-maturity-marker" {...rise(1.3, -20)}>
          <span className="v2-bob">TIS hoje</span>
        </motion.p>
      </div>

      <div className="v2-survey">
        <motion.p className="v2-label" {...fade(0.8)}>
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

const PROBLEM_TONES = ["#04165d", "#036ef2", "#7db3f8", "#036ef2"];
const CURRENT_PHASES = ["Proposta comercial", "Ecrãs", "Desenvolvimento", "Release", "Retrabalho"];
const [ENTRY, MISSING, RESULT] = CURRENT_PROCESS;

const CHANGE_HEADS = [
  {
    kicker: "Como decorre actualmente o trabalho de UX",
    title: "UX começa pelo desenho, e os problemas aparecem depois da implementação",
    lead: "",
  },
  {
    kicker: "Como passa a decorrer",
    title: "Com o processo de UX, os problemas aparecem cedo",
    lead: "O problema é investigado e a solução é avaliada antes da construção, quando mudar ainda é simples.",
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
    const handleMove = (event: MouseEvent) => {
      for (const element of pushRefs.current) {
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        const dx = rect.left + rect.width / 2 - event.clientX;
        const dy = rect.top + rect.height / 2 - event.clientY;
        const distance = Math.hypot(dx, dy) || 1;
        const reach = 240;
        const force = distance < reach ? (1 - distance / reach) * 40 : 0;
        element.style.transform = `translate(${(dx / distance) * force}px, ${(dy / distance) * force}px)`;
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="v2-scene" aria-labelledby="v2-change-title">
      <div className="v2-head">
        <Swap>
          <motion.div key={build} exit={exit}>
            <motion.p className="v2-kicker" {...fade(0.05)}>
              {head.kicker}
            </motion.p>
            <h1 id="v2-change-title" className="v2-title">
              <MaskLine>{head.title}</MaskLine>
            </h1>
            {head.lead && (
              <motion.p className="v2-lead" {...rise(0.4, 20)}>
                {head.lead}
              </motion.p>
            )}
          </motion.div>
        </Swap>
      </div>

      <Swap>
        {current && (
          <motion.div key="current" className="v2-layer" exit={exit}>
            <div className="v2-story">
              <motion.p className="v2-label" {...fade(0.3)}>
                {ENTRY.label}
              </motion.p>
              <motion.p className="v2-label" data-group="result" {...fade(3.4)}>
                {RESULT.label}
              </motion.p>
              <ul>
                {[...ENTRY.items, ...RESULT.items].map((card, index) => (
                  <motion.li
                    key={card.title}
                    data-kind={index < ENTRY.items.length ? "entry" : "result"}
                    {...rise(index < ENTRY.items.length ? 0.35 + index * 0.15 : 3.3 + index * 0.12, 24)}
                  >
                    <h2>{card.title}</h2>
                    <p>{card.text}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="v2-missing">
              <motion.p className="v2-label" {...fade(1.3)}>
                {MISSING.label}
              </motion.p>
              {MISSING.items.map((item, index) => (
                <motion.p key={item.title} className="v2-missing-step" style={{ left: item.stem }} {...rise(1.4 + index * 0.2, 16)}>
                  {item.title}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </Swap>

      <div className="v2-change-chart">
        <motion.svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_BASELINE}`} fill="none" aria-hidden {...fade(current ? 2.2 : 0, 1)}>
          <defs>
            <linearGradient id="v2-effort" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#036EF2" stopOpacity="0" />
              <stop offset="1" stopColor="#036EF2" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          <path d={`${EFFORT_PATH}L${CHART_WIDTH} ${CHART_BASELINE}L0 ${CHART_BASELINE}Z`} fill="url(#v2-effort)" />
          <path d={EFFORT_PATH} stroke="#036EF2" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
        </motion.svg>

        {PROBLEMS.map(([late, early, lift], index) => {
          const t = current ? late : early;
          const size = 16 + 68 * Math.pow(t, 2.4);
          const origin = MISSING.items[index % MISSING.items.length].stem;
          return (
            <motion.i
              key={index}
              className="v2-problem"
              aria-hidden
              style={{ x: "-50%", y: "-50%" }}
              initial={STILL ? false : { opacity: 0, left: origin, top: CHART_BASELINE, width: 10, height: 10 }}
              animate={{
                opacity: 1,
                left: t * CHART_WIDTH,
                top: CHART_BASELINE - effort(t) * lift,
                width: size,
                height: size,
              }}
              transition={spring(current ? 2.3 + index * 0.09 : index * 0.04, 34, 11)}
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

        <motion.p className="v2-chart-note" data-side="right" {...fade(current ? 2.6 : 0.2)}>
          Esforço para corrigir
        </motion.p>

        <Swap>
          <motion.ol key={build} className="v2-phases" exit={exit} {...fade(0.2)}>
            {phases.map((phase) => (
              <li key={phase}>{phase}</li>
            ))}
          </motion.ol>
        </Swap>
      </div>
    </section>
  );
}

/* ── Cases e resultados de mercado ────────────────────────────────────── */

export function ResultsScene() {
  const [selected, select] = useSelected(MARKET_EXAMPLES.length);

  return (
    <section className="v2-scene" aria-labelledby="v2-results-title">
      <motion.p className="v2-kicker v2-scene-kicker" {...fade(0.1)}>
        O processo de UX no mercado
      </motion.p>
      <h1 id="v2-results-title" className="v2-title v2-scene-title">
        <MaskLine>Cases e resultados de mercado</MaskLine>
      </h1>

      <ul className="v2-cases" aria-label="Cases de mercado">
        {MARKET_EXAMPLES.map((example, index) => (
          <motion.li key={example.name} data-active={index === selected} {...rise(0.35 + index * 0.1, 24)}>
            <button type="button" aria-expanded={index === selected} onClick={() => select(index)}>
              <span className="v2-label">{example.company}</span>
              <span className="v2-case-name">{example.name}</span>
              <b className="v2-case-result">{example.result}</b>
              {index === selected && (
                <motion.span className="v2-case-detail" {...fade(0.25, 0.5)}>
                  <span className="v2-case-caption">{example.resultCaption}</span>
                  <span className="v2-case-text">{example.description}</span>
                  <span className="v2-source">
                    Etapas: {stageNames(example.stages)} · Fonte: {example.source}
                  </span>
                </motion.span>
              )}
            </button>
          </motion.li>
        ))}
      </ul>

      <motion.p className="v2-label v2-studies-label" {...fade(0.8)}>
        O que os estudos publicados medem
      </motion.p>
      <ul className="v2-studies">
        {BENEFIT_METRICS.map((metric, index) => {
          const delay = 0.85 + index * 0.12;
          return (
            <motion.li key={metric.source} {...rise(delay, 20)}>
              <p className="v2-number">
                {metric.prefix}
                <CountUp value={metric.number} decimals={metric.decimals} delay={delay} />
                <small>{metric.unit}</small>
              </p>
              <p>{metric.caption}</p>
              <p className="v2-source">{metric.source}</p>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

/* ── Como a IA entra no trabalho de UX ────────────────────────────────── */

const AI_STEP_MS = 3600;
/** Limites horizontais das três colunas da cena (px no palco). */
const AI_X = { inputs: 330, tasksLeft: 402, tasksRight: 782, output: 854 };

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const middle = (x1 + x2) / 2;
  return `M${x1} ${y1}C${middle} ${y1} ${middle} ${y2} ${x2} ${y2}`;
};

export function AiScene() {
  const [selected, select] = useSelected(AI_FLOW.assistants.length, AI_STEP_MS);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const taskRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const [links, setLinks] = useState<string[]>([]);

  // As ligações partem do que os assistentes recebem, passam pela tarefa activa e chegam ao que é produzido.
  useLayoutEffect(() => {
    const centre = (element: HTMLElement | null) => (element ? element.offsetTop + element.offsetHeight / 2 : 0);
    const measure = () => {
      const task = centre(taskRefs.current[selected]);
      setLinks([
        ...inputRefs.current.map((input) => curve(AI_X.inputs, centre(input), AI_X.tasksLeft, task)),
        curve(AI_X.tasksRight, task, AI_X.output, centre(outputRef.current)),
      ]);
    };
    measure();
    void document.fonts.ready.then(measure);
  }, [selected]);

  return (
    <section className="v2-scene" aria-labelledby="v2-ai-title">
      <motion.p className="v2-kicker v2-scene-kicker" {...fade(0.1)}>
        Aceleração com IA
      </motion.p>
      <h1 id="v2-ai-title" className="v2-title v2-scene-title">
        <MaskLine>Como a IA entra no trabalho de UX</MaskLine>
      </h1>

      <div className="v2-ai">
        <motion.svg className="v2-ai-links" aria-hidden {...fade(1.2, 0.8)}>
          {links.map((d, index) => (
            <g key={index}>
              <motion.path d={d} initial={false} animate={{ d }} transition={spring(0, 120, 20)} />
              {!STILL && (
                <circle r="5">
                  <animateMotion dur="1.8s" begin={`${index * 0.3}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          ))}
        </motion.svg>

        <motion.div className="v2-ai-inputs" {...rise(0.4, 24)}>
          <p className="v2-label">Os assistentes recebem</p>
          {AI_FLOW.inputs.map((input, index) => (
            <div
              key={input.title}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
            >
              <h2>{input.title}</h2>
              <p>{input.text}</p>
            </div>
          ))}
        </motion.div>

        <motion.div className="v2-ai-tasks" {...rise(0.7, 24)}>
          <p className="v2-label">Os assistentes fazem</p>
          {AI_FLOW.assistants.map((assistant, index) => (
            <button
              key={assistant.task}
              ref={(element) => {
                taskRefs.current[index] = element;
              }}
              type="button"
              aria-pressed={index === selected}
              onClick={() => select(index)}
            >
              {assistant.task}
            </button>
          ))}
        </motion.div>

        <motion.div className="v2-ai-output" {...rise(1, 24)}>
          <p className="v2-label">O que produzem, e as pessoas revêem</p>
          <div className="v2-preview" data-size="large" ref={outputRef}>
            <ArtifactCanvas stageIndex={AI_FLOW.assistants[selected].visual} />
          </div>
          <ul>
            {AI_FLOW.reviewers.map((reviewer) => (
              <li key={reviewer.who}>
                <b>{reviewer.who}</b> {reviewer.what}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Design System TIS ────────────────────────────────────────────────── */

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
    <section className="v2-scene" aria-labelledby="v2-ds-title">
      <motion.p className="v2-kicker v2-scene-kicker" {...fade(0.1)}>
        Produtos consistentes
      </motion.p>
      <div className="v2-head" data-width="narrow">
        <h1 id="v2-ds-title" className="v2-title">
          <MaskLine>Design System TIS</MaskLine>
        </h1>
        <motion.p className="v2-lead" {...rise(0.3, 20)}>
          Os mesmos componentes dão origem a produtos consistentes, com a identidade de cada cliente.
        </motion.p>
      </div>

      <ul className="v2-ds-points">
        {DS_POINTS.map((point, index) => (
          <motion.li key={point.title} {...rise(0.4 + index * 0.1, 20)}>
            <h2>{point.title}</h2>
            <p>{point.text}</p>
          </motion.li>
        ))}
      </ul>

      <motion.div className="v2-ds-demo" data-theme={theme.id} style={themeStyle} {...rise(0.6, 24)}>
        <Screen fidelity="final" />
        <div className="v2-ds-parts" aria-hidden>
          <span className="v2-ds-button">Botão</span>
          <span className="v2-ds-button" data-variant="outline">
            Botão
          </span>
          <span className="v2-ds-chip">Etiqueta</span>
          <span className="v2-ds-input">Campo de texto</span>
          <span className="v2-ds-toggle" />
        </div>
        <div className="v2-ds-switch" role="group" aria-label="Tema do cliente">
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

/* ── O que o Núcleo entrega: por fase e por área ──────────────────────── */

const ORBIT = { cx: 400, cy: 600, rx: 270, ry: 230 };

const orbitPoint = (index: number) => {
  const angle = ((-90 + index * (360 / AREAS.length)) * Math.PI) / 180;
  return { x: ORBIT.cx + ORBIT.rx * Math.cos(angle), y: ORBIT.cy + ORBIT.ry * Math.sin(angle) };
};

export function DeliveriesScene({
  view,
  phaseIndex,
  areaId,
  onView,
  onSelectPhase,
  onSelectArea,
}: {
  view: number;
  phaseIndex: number;
  areaId: string;
  onView: (view: number) => void;
  onSelectPhase: (index: number) => void;
  onSelectArea: (id: string) => void;
}) {
  const byArea = view === 1;
  const phase = PHASES[phaseIndex];
  const area = AREAS.find((item) => item.id === areaId) ?? AREAS[0];
  const visual = byArea ? area.visual : phase.visual;

  return (
    <section className="v2-scene" aria-labelledby="v2-deliveries-title">
      <motion.p className="v2-kicker v2-scene-kicker" {...fade(0.1)}>
        Integração com o processo da TIS
      </motion.p>
      <h1 id="v2-deliveries-title" className="v2-title v2-scene-title">
        <MaskLine>O que o Núcleo entrega</MaskLine>
      </h1>

      <div className="v2-toggle" role="group" aria-label="Vista">
        {["Por fase", "Por área"].map((label, index) => (
          <button key={label} type="button" aria-pressed={view === index} onClick={() => onView(index)}>
            {label}
          </button>
        ))}
      </div>

      <Swap>
        {byArea ? (
          <motion.div key="areas" className="v2-layer" exit={exit} {...fade(0.1)}>
            <svg className="v2-orbit-lines" viewBox="0 0 1920 1080" fill="none" aria-hidden>
              {AREAS.map((item, index) => {
                const point = orbitPoint(index);
                return (
                  <line
                    key={item.id}
                    x1={ORBIT.cx}
                    y1={ORBIT.cy}
                    x2={point.x}
                    y2={point.y}
                    data-on={item.id === area.id}
                  />
                );
              })}
            </svg>
            <motion.div
              className="v2-orbit-core"
              style={{ left: ORBIT.cx, top: ORBIT.cy }}
              initial={STILL ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={spring(0.2, 120, 14)}
            >
              <Mark className="v2-orbit-mark" />
            </motion.div>
            <ul className="v2-orbit" aria-label="Áreas">
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
        ) : (
          <motion.ol key="phases" className="v2-phase-list" exit={exit} aria-label="Fases do projecto">
            {PHASES.map((item, index) => (
              <motion.li key={item.name} {...rise(0.3 + index * 0.08, 20)}>
                <button type="button" aria-pressed={index === phaseIndex} onClick={() => onSelectPhase(index)}>
                  <b>{number(index)}</b>
                  {item.name}
                </button>
              </motion.li>
            ))}
          </motion.ol>
        )}
      </Swap>

      <div className="v2-delivery" aria-live="polite">
        <Swap>
          <motion.div key={byArea ? area.id : phase.name} exit={exit}>
            <h2 className="v2-delivery-name">
              <MaskLine>{byArea ? area.name : phase.name}</MaskLine>
            </h2>
            {byArea && area.note && (
              <motion.p className="v2-delivery-note" {...fade(0.2)}>
                {area.note}
              </motion.p>
            )}
            <motion.dl className="v2-delivery-facts" {...rise(0.25, 16)}>
              {byArea ? (
                <>
                  <div>
                    <dt>Entrega ao Núcleo</dt>
                    <dd>{area.gives}</dd>
                  </div>
                  <div>
                    <dt>Recebe do Núcleo</dt>
                    <dd data-kind="strong">{area.gets}</dd>
                  </div>
                  <div>
                    <dt>Fases em que participa</dt>
                    <dd className="v2-links">
                      {PHASES.map((item, index) =>
                        item.areas.includes(area.id) ? (
                          <button key={item.name} type="button" onClick={() => (onSelectPhase(index), onView(0))}>
                            {item.name}
                          </button>
                        ) : null,
                      )}
                      {!PHASES.some((item) => item.areas.includes(area.id)) && "Iniciativas próprias da área"}
                    </dd>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <dt>O Núcleo entrega</dt>
                    <dd data-kind="strong">{phase.delivery}</dd>
                  </div>
                  <div>
                    <dt>Áreas envolvidas</dt>
                    <dd className="v2-links">
                      {AREAS.filter((item) => phase.areas.includes(item.id)).map((item) => (
                        <button key={item.id} type="button" onClick={() => (onSelectArea(item.id), onView(1))}>
                          {item.name}
                        </button>
                      ))}
                    </dd>
                  </div>
                </>
              )}
            </motion.dl>
          </motion.div>
        </Swap>
      </div>

      <motion.figure className="v2-delivery-visual" {...rise(0.5, 24)}>
        <div className="v2-preview">
          <ArtifactCanvas stageIndex={visual} />
        </div>
        <figcaption>{DELIVERY_VISUALS[visual]}</figcaption>
      </motion.figure>
    </section>
  );
}

/* ── Como se mede a UX ────────────────────────────────────────────────── */

const MEASURE_GROUPS = [
  [OPERACIONAL_COLUMNS[0]],
  [OPERACIONAL_COLUMNS[1]],
  [OPERACIONAL_COLUMNS[2], OPERACIONAL_COLUMNS[3]],
  UX_COLUMNS,
];

export function MeasureScene() {
  const [selected, select] = useSelected(PILLAR_CARDS.length);

  return (
    <section className="v2-scene" aria-labelledby="v2-measure-title">
      <motion.p className="v2-kicker v2-scene-kicker" {...fade(0.1)}>
        Como vamos medir
      </motion.p>
      <div className="v2-head">
        <h1 id="v2-measure-title" className="v2-title">
          <MaskLine>Como se mede a UX</MaskLine>
        </h1>
        <motion.p className="v2-lead" {...rise(0.3, 20)}>
          Começar com poucas perguntas e decidir o que manter, corrigir, investigar e registar.
        </motion.p>
      </div>

      <ul className="v2-questions" aria-label="Perguntas">
        {PILLAR_CARDS.map((pillar, index) => (
          <motion.li key={pillar.title} {...rise(0.4 + index * 0.1, 20)}>
            <button type="button" aria-pressed={index === selected} onClick={() => select(index)}>
              <span className="v2-label">{pillar.title}</span>
              {pillar.body}
            </button>
          </motion.li>
        ))}
      </ul>

      <div className="v2-metrics" aria-live="polite">
        <Swap>
          <motion.div key={selected} exit={exit}>
            {MEASURE_GROUPS[selected].map((group, groupIndex) => (
              <motion.div key={group.title} {...rise(0.1 + groupIndex * 0.12, 16)}>
                <p className="v2-label">{group.title}</p>
                <ul>
                  {group.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={STILL ? false : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: 0.15 + groupIndex * 0.12 + itemIndex * 0.04, ease: EASE }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </Swap>
      </div>

      <motion.p className="v2-footnote" {...fade(1)}>
        Uma métrica só entra se tiver pergunta clara, forma de observação e decisão possível.
      </motion.p>
    </section>
  );
}
