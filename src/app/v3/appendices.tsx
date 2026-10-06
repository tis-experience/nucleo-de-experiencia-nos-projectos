import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { BookOpen, Check, Sparkles } from "lucide-react";
import {
  AREA_PRINCIPLES,
  DS_ARCHITECTURE,
  DS_GOVERNANCE,
  FRONTS,
  PHASE_ROLES,
  PRODUCT_MATURITY,
  REQUEST_INTRO,
  REQUEST_TYPES,
  STAGES,
} from "./content";
import { STILL, Swap, tween } from "./fx";

const exit = { opacity: 0, transition: { duration: 0.25 } };

/** Janela sobre o slide. Fecha com Esc ou clique fora; com várias páginas, as setas mudam de página. */
export function Modal({
  page,
  pages,
  onPage,
  onClose,
  label,
  size,
  children,
}: {
  page: number;
  pages: number;
  onPage: (page: number) => void;
  onClose: () => void;
  label: string;
  size?: "wide";
  children: ReactNode;
}) {
  // Enquanto a janela está aberta, as teclas ficam com ela e não chegam à navegação da apresentação.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight" || event.key === "ArrowDown") onPage((page + 1) % pages);
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") onPage((page - 1 + pages) % pages);
      else if (event.key !== " " && event.key !== "PageDown" && event.key !== "PageUp") return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [page, pages, onPage, onClose]);

  return (
    <motion.div
      className="v3-modal"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      initial={STILL ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={exit}
      transition={tween(0.25)}
      onClick={(event) => {
        event.stopPropagation();
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="v3-modal-card"
        data-size={size}
        initial={STILL ? false : { y: 24, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        transition={tween(0.35)}
      >
        <button type="button" className="v3-modal-close" aria-label="Fechar" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <Swap>
          <motion.div
            key={page}
            initial={STILL ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={exit}
            transition={tween(0.25)}
          >
            {children}
          </motion.div>
        </Swap>
        {pages > 1 && (
          <div className="v3-modal-nav">
            <button type="button" aria-label="Página anterior" onClick={() => onPage((page - 1 + pages) % pages)}>
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M19 12H5m6-6-6 6 6 6" />
              </svg>
            </button>
            <span aria-hidden>
              {Array.from({ length: pages }, (_, dot) => (
                <i key={dot} data-on={dot === page || undefined} />
              ))}
            </span>
            <button type="button" aria-label="Página seguinte" onClick={() => onPage((page + 1) % pages)}>
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/** Ligação, no canto do slide, que abre um apêndice. */
export function MoreLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      className="v3-more"
      aria-haspopup="dialog"
      onClick={onClick}
      initial={STILL ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={tween(0.5, 1.2)}
    >
      <BookOpen size={18} strokeWidth={2} aria-hidden />
      {label}
    </motion.button>
  );
}

/** Um apêndice com páginas: cada página tem um nome para a etiqueta e o seu conteúdo. */
export function Appendix({
  title,
  pages,
  onClose,
}: {
  title: string;
  pages: { name: string; content: ReactNode }[];
  onClose: () => void;
}) {
  const [page, setPage] = useState(0);

  return (
    <Modal page={page} pages={pages.length} onPage={setPage} onClose={onClose} label={title} size="wide">
      <p className="v3-modal-tag">
        {title}
        <span>{pages[page].name}</span>
      </p>
      {pages[page].content}
    </Modal>
  );
}

/* ── Etapas: tipos de pedido e maturidade do produto ─────────────────── */

function RequestTypes() {
  return (
    <>
      <h2>{REQUEST_INTRO.title}</h2>
      <p className="v3-appendix-lead">{REQUEST_INTRO.text}</p>
      <div className="v3-requests" role="table" aria-label="Profundidade de cada etapa por tipo de pedido">
        <div className="v3-requests-head" role="row">
          <span role="columnheader">Tipo de pedido</span>
          <span role="columnheader" className="v3-requests-stages">
            {STAGES.map((stage) => (
              <b key={stage.id}>{stage.short}</b>
            ))}
          </span>
          <span role="columnheader">Como se trabalha</span>
        </div>
        {REQUEST_TYPES.map((type) => (
          <div key={type.name} role="row">
            <span role="cell">
              <b>{type.name}</b>
              <small>{type.certainty}</small>
            </span>
            <span role="cell" className="v3-requests-stages">
              {STAGES.map((stage) => (
                <i key={stage.id} data-depth={type.depth[stage.id]} title={stage.name} />
              ))}
            </span>
            <span role="cell">{type.text}</span>
          </div>
        ))}
      </div>
      <p className="v3-appendix-legend">
        <i data-depth={2} /> a etapa corre inteira <i data-depth={1} /> corre de forma leve <i data-depth={0} /> não corre
      </p>
    </>
  );
}

function ProductMaturity() {
  return (
    <>
      <h2>A actuação muda com a maturidade do produto</h2>
      <p className="v3-appendix-lead">
        O mesmo processo serve a uma aposta, a um produto em escala e a um produto maduro, com ciclos e objectivos
        diferentes em cada caso.
      </p>
      <ul className="v3-maturity-cards">
        {PRODUCT_MATURITY.map((item, index) => (
          <li key={item.name}>
            <p className="v3-label">
              {index + 1}. {item.stage}
            </p>
            <h3>{item.name}</h3>
            <p>{item.text}</p>
            <ol>
              {item.loop.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </>
  );
}

export function StagesAppendix({ onClose }: { onClose: () => void }) {
  return (
    <Appendix
      title="Apêndice das etapas"
      onClose={onClose}
      pages={[
        { name: "Tipos de pedido", content: <RequestTypes /> },
        { name: "Maturidade do produto", content: <ProductMaturity /> },
      ]}
    />
  );
}

/* ── Design System: arquitectura e governança ────────────────────────── */

function DsArchitecture() {
  return (
    <>
      <h2>Arquitectura do Design System</h2>
      <div className="v3-ds-arch">
        <ol className="v3-ds-layers" aria-label="Camadas de tokens">
          {DS_ARCHITECTURE.layers.map((layer) => (
            <li key={layer.name}>
              <b>{layer.name}</b>
              <span>{layer.text}</span>
            </li>
          ))}
        </ol>
        <ul className="v3-appendix-points">
          {DS_ARCHITECTURE.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

function DsGovernance() {
  return (
    <>
      <h2>Como o Design System evolui</h2>
      <p className="v3-appendix-lead">{DS_GOVERNANCE.intro}</p>
      <ol className="v3-ds-steps">
        {DS_GOVERNANCE.steps.map((step, index) => (
          <li key={step.name}>
            <p className="v3-label">Passo {index + 1}</p>
            <h3>{step.name}</h3>
            <p>{step.text}</p>
            <p className="v3-ds-step-ai">
              <Sparkles size={16} strokeWidth={2} aria-hidden />
              {step.ai}
            </p>
          </li>
        ))}
      </ol>
      <ul className="v3-ds-checks" aria-label="Verificação antes de entrar no sistema">
        {DS_GOVERNANCE.checks.map((check) => (
          <li key={check}>
            <Check size={16} strokeWidth={2.5} aria-hidden />
            {check}
          </li>
        ))}
      </ul>
    </>
  );
}

export function DsAppendix({ onClose }: { onClose: () => void }) {
  return (
    <Appendix
      title="Apêndice do Design System"
      onClose={onClose}
      pages={[
        { name: "Arquitectura", content: <DsArchitecture /> },
        { name: "Governança", content: <DsGovernance /> },
      ]}
    />
  );
}

/* ── Áreas: frentes, responsáveis por fase e princípios ──────────────── */

function Fronts() {
  return (
    <>
      <h2>As seis frentes de actuação do Núcleo</h2>
      <p className="v3-appendix-lead">
        São os serviços que o Núcleo presta às áreas e aos projectos. Cada etapa do processo apoia-se em uma ou duas
        destas frentes.
      </p>
      <ul className="v3-fronts">
        {FRONTS.map((front, index) => (
          <li key={front.id}>
            <p className="v3-label">0{index + 1}</p>
            <h3>{front.name}</h3>
            <ul>
              {front.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

function PhaseRoles() {
  return (
    <>
      <h2>Quem conduz, quem apoia e quem valida em cada fase</h2>
      <p className="v3-appendix-lead">
        Em cada fase do projecto uma área conduz o trabalho, outras contribuem e uma terceira valida o resultado antes
        da fase seguinte. O Núcleo acompanha a experiência ao longo de todo o ciclo.
      </p>
      <div className="v3-roles" role="table" aria-label="Responsáveis por fase">
        <div className="v3-roles-head" role="row">
          <span role="columnheader">Fase</span>
          <span role="columnheader">Conduz</span>
          <span role="columnheader">Apoia</span>
          <span role="columnheader">Valida</span>
        </div>
        {PHASE_ROLES.map((row) => (
          <div key={row.phase} role="row">
            <span role="cell">
              <b>{row.phase}</b>
            </span>
            <span role="cell" data-lead>
              {row.leads}
            </span>
            <span role="cell">{row.supports}</span>
            <span role="cell">
              {row.validateLabel && <small>{row.validateLabel}</small>}
              {row.validates}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function Principles() {
  return (
    <>
      <h2>Os princípios da relação com as áreas</h2>
      <ul className="v3-principles">
        {AREA_PRINCIPLES.map((item, index) => (
          <li key={item.name}>
            <p className="v3-label">0{index + 1}</p>
            <h3>{item.name}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export function AreasAppendix({ onClose }: { onClose: () => void }) {
  return (
    <Appendix
      title="Apêndice das áreas"
      onClose={onClose}
      pages={[
        { name: "Frentes de actuação", content: <Fronts /> },
        { name: "Responsáveis por fase", content: <PhaseRoles /> },
        { name: "Princípios", content: <Principles /> },
      ]}
    />
  );
}
