import type { ReactNode } from "react";
import { motion } from "motion/react";
import { AREAS, PHASES, STAGES, STAGE_VISUAL } from "./content";
import { EASE, MaskLine, STILL, Swap, fade, rise, spring, tween, useAfter } from "./fx";

type Fidelity = "wire" | "final";

const exit = { opacity: 0, transition: { duration: 0.25 } };

/** Ecrã genérico do produto: o mesmo objecto passa de esboço a interface final ao longo das etapas. */
export function Screen({ variant = "b", fidelity }: { variant?: "a" | "b" | "c"; fidelity: Fidelity }) {
  return (
    <div className="v2-screen" data-fidelity={fidelity}>
      <div className="v2-screen-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="v2-screen-body">
        <b className="v2-s-title" />
        {variant === "b" && (
          <>
            <b className="v2-s-hero" />
            <b className="v2-s-row" />
            <b className="v2-s-row" />
          </>
        )}
        {variant === "a" && (
          <>
            <div className="v2-s-split">
              <b className="v2-s-hero" />
              <div>
                <b className="v2-s-line" />
                <b className="v2-s-line" />
                <b className="v2-s-line" />
              </div>
            </div>
            <b className="v2-s-row" />
          </>
        )}
        {variant === "c" && (
          <div className="v2-s-tiles">
            <b />
            <b />
            <b />
            <b />
          </div>
        )}
        <b className="v2-s-cta" />
      </div>
    </div>
  );
}

const NOTE_SCATTER = [
  [40, 70, -8],
  [270, 20, 5],
  [500, 96, -4],
  [760, 30, 7],
  [800, 190, -6],
  [120, 230, 6],
  [370, 260, -5],
  [590, 310, 4],
  [790, 370, -7],
  [50, 410, 5],
  [300, 440, -3],
  [560, 450, 6],
];

function Notes() {
  const grouped = useAfter(1300, "notes");

  return (
    <>
      {[0, 1, 2].map((column) => (
        <motion.p
          key={column}
          className="v2-theme"
          style={{ left: 80 + column * 330 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: grouped ? 1 : 0, y: grouped ? 0 : 16 }}
          transition={tween(0.5, 0.5 + column * 0.12)}
        >
          Tema {column + 1}
        </motion.p>
      ))}
      {NOTE_SCATTER.map(([x, y, rotate], index) => {
        const column = index % 3;
        const row = Math.floor(index / 3);
        return (
          <motion.div
            key={index}
            className="v2-note"
            data-grouped={grouped}
            initial={STILL ? false : { opacity: 0, x, y: y + 30, rotate }}
            animate={
              grouped
                ? { opacity: 1, x: 80 + column * 330, y: 104 + row * 96, rotate: 0 }
                : { opacity: 1, x, y, rotate }
            }
            transition={spring(grouped ? index * 0.04 : index * 0.05, 90, 15)}
          >
            <b />
            <b />
          </motion.div>
        );
      })}
    </>
  );
}

/** Etapa Definir: a pessoa a servir, o que fica dentro do escopo e os critérios de sucesso. */
function Definition() {
  return (
    <div className="v2-def">
      <motion.div className="v2-def-card" {...rise(0.2, 20)}>
        <p className="v2-canvas-label">Persona</p>
        <i className="v2-def-avatar" />
        <b style={{ width: 150 }} />
        <b style={{ width: 210 }} data-soft />
        <b style={{ width: 180 }} data-soft />
        <span>
          <b />
          <b />
        </span>
      </motion.div>

      <motion.div className="v2-def-scope" {...rise(0.4, 20)}>
        <p className="v2-canvas-label">Escopo</p>
        <div>
          {[0, 1, 2].map((index) => (
            <motion.i
              key={index}
              initial={STILL ? false : { opacity: 0, x: 160 }}
              animate={{ opacity: 1, x: 0 }}
              transition={spring(0.7 + index * 0.12, 90, 16)}
            />
          ))}
        </div>
        <i data-out />
        <i data-out />
      </motion.div>

      <motion.div className="v2-def-card" data-kind="criteria" {...rise(0.6, 20)}>
        <p className="v2-canvas-label">Critérios</p>
        {[170, 200, 150].map((width, index) => (
          <span key={index}>
            <motion.i
              initial={STILL ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={spring(1.1 + index * 0.18, 260, 16)}
            >
              ✓
            </motion.i>
            <b style={{ width }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const PINS = [
  [246, 104],
  [36, 250],
  [160, 344],
];

function Findings({ resolved }: { resolved: boolean }) {
  return (
    <ul className="v2-findings">
      {["alta", "média", "baixa"].map((severity, index) => (
        <motion.li key={severity} data-resolved={resolved} {...rise(0.5 + index * 0.15, 20)}>
          <i>{index + 1}</i>
          <span>
            Achado de gravidade {severity}
            <small>{resolved ? "Corrigido na versão revista" : "Observado nas sessões"}</small>
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

const CALLOUTS = [
  { title: "Componentes do Design System", side: "left", top: 110 },
  { title: "Especificação de UX", side: "left", top: 330 },
  { title: "Estados de erro, vazio e carregamento", side: "right", top: 110 },
  { title: "A mesma versão para design, engenharia e QA", side: "right", top: 330 },
] as const;

const BARS = [84, 128, 116, 176, 226, 268];

function UsageChart() {
  const points = BARS.map((height, index) => `${64 + index * 78},${300 - height - 26}`).join(" ");

  return (
    <motion.div className="v2-chart" {...rise(0.3, 24)}>
      <p className="v2-canvas-label">Utilização da versão entregue</p>
      <svg viewBox="0 0 500 310" fill="none" aria-hidden>
        <path d="M20 300h460" stroke="#C7CAD1" strokeWidth="2" />
        {BARS.map((height, index) => (
          <motion.rect
            key={index}
            x={40 + index * 78}
            width="48"
            rx="8"
            fill={index > 3 ? "#036EF2" : "#B8CBE0"}
            initial={STILL ? false : { height: 0, y: 300 }}
            animate={{ height, y: 300 - height }}
            transition={tween(0.8, 0.5 + index * 0.1)}
          />
        ))}
        <motion.polyline
          points={points}
          stroke="#04165D"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={STILL ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
        />
      </svg>
      <p className="v2-loop">
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M17.7 6.3A8 8 0 1 0 20 12h-2a6 6 0 1 1-1.8-4.2L13 11h7V4z" />
        </svg>
        O feedback volta a alimentar o processo
      </p>
    </motion.div>
  );
}

/** Passos do fluxo: [x, y, destaque]. O passo em destaque é o que se transforma no ecrã ao lado. */
const FLOW_STEPS: [number, number, boolean][] = [
  [150, 225, false],
  [440, 82, true],
  [440, 398, false],
];

/** Ligações do fluxo, pela ordem em que se desenham; a última é o regresso ao passo anterior. */
const FLOW_LINKS = [
  { d: "M112 260H140", dashed: false },
  { d: "M290 260H338", dashed: false },
  { d: "M380 222V117H430", dashed: false },
  { d: "M380 298V433H430", dashed: false },
  { d: "M580 117H636", dashed: false },
  { d: "M510 478V510H220V305", dashed: true },
];

/** O percurso da pessoa em passos e decisões, com um dos passos a dar origem ao ecrã. */
function Flow() {
  return (
    <svg className="v2-flow" viewBox="0 0 1000 540" fill="none">
      <defs>
        <marker id="v2-flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 1L9 5L1 9" stroke="#036EF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      {FLOW_LINKS.map((link, index) => (
        <motion.path
          key={link.d}
          d={link.d}
          stroke="#036EF2"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={link.dashed ? "3 9" : undefined}
          markerEnd="url(#v2-flow-arrow)"
          initial={STILL ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={tween(0.4, 0.45 + index * 0.14)}
        />
      ))}
      <motion.g {...fade(0.2)}>
        <rect x="20" y="238" width="92" height="44" rx="22" fill="#036EF2" />
        <rect x="42" y="255" width="48" height="10" rx="5" fill="#ffffff" opacity="0.85" />
      </motion.g>
      <motion.g {...fade(0.6)}>
        <rect x="353" y="233" width="54" height="54" rx="10" transform="rotate(45 380 260)" fill="#f0f7ff" stroke="#036EF2" strokeWidth="2.5" />
      </motion.g>
      {FLOW_STEPS.map(([x, y, active], index) => (
        <motion.g key={index} {...fade(0.35 + index * 0.25)}>
          <rect
            x={x}
            y={y}
            width="140"
            height="70"
            rx="14"
            fill={active ? "#f0f7ff" : "#f7f9fc"}
            stroke={active ? "#036EF2" : "#9aa3b5"}
            strokeWidth="2"
            strokeDasharray={active ? undefined : "5 5"}
          />
          <rect x={x + 20} y={y + 20} width="70" height="10" rx="5" fill={active ? "#036EF2" : "#b7bfcd"} />
          <rect x={x + 20} y={y + 40} width="100" height="10" rx="5" fill="#d5dae3" />
        </motion.g>
      ))}
    </svg>
  );
}

const MAIN_SCREEN = [
  { x: 650, y: 40, scale: 0.9, rotate: 0 },
  { x: 90, y: 30, scale: 1.18, rotate: 0 },
  { x: 323, y: 30, scale: 1.18, rotate: 0 },
  { x: 40, y: 90, scale: 0.9, rotate: 0 },
];

export function ArtifactCanvas({ stageIndex }: { stageIndex: number }) {
  const resolved = useAfter(1900, stageIndex) && stageIndex === 3;
  const layer = (key: string, children: ReactNode) => (
    <motion.div key={key} className="v2-layer" exit={exit}>
      {children}
    </motion.div>
  );

  return (
    <div className="v2-canvas" aria-hidden>
      <Swap mode="sync">
        {stageIndex === 0 && layer("notes", <Notes />)}

        {stageIndex === 1 && layer("definition", <Definition />)}

        {stageIndex === 2 && layer("flow", <Flow />)}

        {/* As alternativas ficam em pilha por trás do ecrã escolhido. */}
        {stageIndex === 2 &&
          (["c", "a"] as const).map((variant, index) => (
            <motion.div
              key={variant}
              className="v2-screen-slot"
              initial={STILL ? false : { opacity: 0, x: 650, y: 40, scale: 0.9, rotate: 0 }}
              animate={{ opacity: 0.5, x: index === 0 ? 676 : 702, y: index === 0 ? 62 : 84, scale: 0.9, rotate: 0 }}
              exit={{ opacity: 0, x: 650, y: 40, transition: { duration: 0.35 } }}
              transition={spring(1.1 + index * 0.12, 80, 15)}
            >
              <Screen variant={variant} fidelity="wire" />
            </motion.div>
          ))}

        {stageIndex >= 2 && (
          <motion.div
            key="main"
            className="v2-screen-slot"
            initial={STILL ? false : { opacity: 0, ...MAIN_SCREEN[0], y: 120 }}
            animate={{ opacity: 1, ...MAIN_SCREEN[stageIndex - 2] }}
            exit={exit}
            transition={spring(0.1, 70, 16)}
          >
            <Screen fidelity={stageIndex >= 4 ? "final" : "wire"} />
            {stageIndex === 3 &&
              PINS.map(([left, top], index) => (
                <motion.i
                  key={index}
                  className="v2-pin"
                  data-resolved={resolved}
                  style={{ left, top }}
                  initial={STILL ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={spring(0.7 + index * 0.2, 260, 14)}
                >
                  {resolved ? "✓" : index + 1}
                </motion.i>
              ))}
          </motion.div>
        )}

        {stageIndex === 3 && layer("findings", <Findings resolved={resolved} />)}

        {stageIndex === 4 &&
          layer(
            "callouts",
            CALLOUTS.map((callout, index) => (
              <motion.p
                key={callout.title}
                className="v2-callout"
                data-side={callout.side}
                style={{ top: callout.top }}
                {...rise(0.9 + index * 0.15, 16)}
              >
                {callout.title}
              </motion.p>
            )),
          )}

        {stageIndex === 5 && layer("chart", <UsageChart />)}
      </Swap>
    </div>
  );
}

export function StageScene({ stageIndex }: { stageIndex: number }) {
  const stage = STAGES[stageIndex];
  const next = STAGES[stageIndex + 1];

  return (
    <section className="v2-scene" aria-labelledby="v2-process-title">
      <p className="v2-kicker v2-scene-kicker">O processo de UX nos projectos</p>
      <h1 id="v2-process-title" className="v2-title v2-scene-title">
        O que o Núcleo faz e entrega em cada etapa
      </h1>

      <div className="v2-stage-head">
        <Swap>
          <motion.div key={stage.id} exit={exit}>
            <motion.p className="v2-kicker" {...fade(0.1)}>
              Etapa {stage.number} de 06
            </motion.p>
            <h2 className="v2-stage-name">
              <MaskLine delay={0.05}>{stage.name}</MaskLine>
            </h2>
            <motion.p className="v2-stage-work" {...rise(0.3, 20)}>
              {stage.work}
            </motion.p>
            <motion.dl className="v2-stage-facts" {...rise(0.5, 16)}>
              <div>
                <dt>Apoio de IA</dt>
                <dd>{stage.aiSupport}</dd>
              </div>
              <div>
                <dt>Fases do projecto</dt>
                <dd className="v2-links">
                  {PHASES.filter((phase) => phase.stages.includes(stage.id)).map((phase) => (
                    <span key={phase.name}>{phase.name}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Com quem</dt>
                <dd className="v2-links">
                  {AREAS.filter((area) => area.stages.includes(stage.id)).map((area) => (
                    <span key={area.id}>{area.name}</span>
                  ))}
                </dd>
              </div>
            </motion.dl>
          </motion.div>
        </Swap>
      </div>

      <div className="v2-preview" data-size="stage">
        <ArtifactCanvas stageIndex={STAGE_VISUAL[stageIndex]} />
      </div>

      {/* A entrega fica presa ao desenho que a representa e aponta para a etapa que a recebe. */}
      <div className="v2-stage-delivery">
        <Swap>
          <motion.div key={stage.id} exit={exit} {...rise(0.9, 16)}>
            <p>
              <span className="v2-label">Entrega</span>
              <b>{stage.delivery}</b>
            </p>
            <p>{stage.deliveryContents}</p>
            <p className="v2-stage-next">
              <span className="v2-label">{next ? "Segue para" : "Volta a alimentar"}</span>
              {next ? next.name : STAGES[0].name}
            </p>
          </motion.div>
        </Swap>
      </div>
    </section>
  );
}
