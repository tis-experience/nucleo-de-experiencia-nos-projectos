import type { ReactNode } from "react";
import { motion } from "motion/react";
import { STAGES } from "./content";
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

const MAIN_SCREEN = [
  { x: 350, y: 70, scale: 1, rotate: 0 },
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

        {stageIndex === 2 &&
          (["a", "c"] as const).map((variant, index) => (
            <motion.div
              key={variant}
              className="v2-screen-slot"
              initial={STILL ? false : { opacity: 0, x: 350, y: 70, rotate: 0 }}
              animate={{ opacity: 1, x: index === 0 ? 30 : 670, y: 96, rotate: index === 0 ? -5 : 5 }}
              exit={{ opacity: 0, x: 350, transition: { duration: 0.35 } }}
              transition={spring(0.35, 80, 15)}
            >
              <span className="v2-alt">{variant.toUpperCase()}</span>
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
            {stageIndex === 2 && <span className="v2-alt">B</span>}
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

/** Desenho que acompanha cada uma das cinco etapas: notas, alternativas, testes, construção e uso. */
const STAGE_VISUAL = [0, 2, 3, 4, 5];

export function StageScene({ stageIndex }: { stageIndex: number }) {
  const stage = STAGES[stageIndex];
  const next = STAGES[stageIndex + 1];

  return (
    <section className="v2-scene" aria-labelledby="v2-process-title">
      <p className="v2-kicker v2-scene-kicker">O processo de UX</p>
      <h1 id="v2-process-title" className="v2-title v2-scene-title">
        Cinco etapas, aceleradas por IA
      </h1>

      <div className="v2-stage-head">
        <Swap>
          <motion.div key={stage.id} exit={exit}>
            <motion.p className="v2-label" {...fade(0.1)}>
              Etapa {stage.number} de 05
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
