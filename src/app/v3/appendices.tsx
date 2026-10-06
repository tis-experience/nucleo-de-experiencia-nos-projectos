import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  Accessibility,
  ArrowDownToLine,
  ArrowUpFromLine,
  BookOpen,
  Check,
  CheckSquare,
  Code,
  Compass,
  FolderInput,
  Info,
  LayoutGrid,
  LayoutTemplate,
  ListChecks,
  ScanEye,
  SearchCheck,
  ThumbsUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  AREA_PRINCIPLES,
  DS_BENEFITS,
  DS_FEATURES,
  DS_GOVERNANCE,
  DS_INTRO,
  DS_PREMISES,
  DS_ROI,
  FRONTS,
  FRONTS_INTRO,
  INTERACTION_MAP,
  MODELS_CLASSIFICATION,
  MODELS_CULTURE,
  PRODUCT_MATURITY,
  STEP_ROLES,
  STEP_ROLES_NOTE,
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
      data-size={size}
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
            className="v3-modal-body"
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

/** Um apêndice com páginas, cada uma com o rótulo, o título e o subtítulo do slide original. */
export function Appendix({
  title,
  pages,
  onClose,
}: {
  title: string;
  pages: { kicker: string; title: string; lead?: string; content: ReactNode }[];
  onClose: () => void;
}) {
  const [page, setPage] = useState(0);
  const current = pages[page];

  return (
    <Modal page={page} pages={pages.length} onPage={setPage} onClose={onClose} label={title} size="wide">
      <p className="v3-modal-tag">{current.kicker}</p>
      <h2>{current.title}</h2>
      {current.lead && <p className="v3-appendix-lead">{current.lead}</p>}
      {current.content}
    </Modal>
  );
}

/** Lista com marcadores quadrados, como nos slides originais. */
function SquareList({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`v3-pb-bullets${className ? ` ${className}` : ""}`}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

/* ── Modelos de actuação (slide 7 do playbook) ───────────────────────── */

function ModelsCulture() {
  return (
    <div className="v3-pb-models v3-pb-fill">
      <div>
        <SquareList
          items={MODELS_CULTURE.bullets.map((item) => (
            <>
              {item.lead} {item.strong && <b>{item.strong}</b>} {item.tail}
            </>
          ))}
        />
        <p className="v3-pb-statement">{MODELS_CULTURE.statement}</p>
      </div>
      <aside className="v3-pb-stat-card">
        <h3>{MODELS_CULTURE.card.title}</h3>
        <p>{MODELS_CULTURE.card.text}</p>
        <p className="v3-pb-stat">
          <b>{MODELS_CULTURE.card.stat}</b>
          <span>{MODELS_CULTURE.card.statCaption}</span>
        </p>
        <small>{MODELS_CULTURE.card.source}</small>
      </aside>
    </div>
  );
}

function ModelsClassification() {
  return (
    <div className="v3-pb-classify v3-pb-fill">
      <div>
        <p>{MODELS_CLASSIFICATION.intro}</p>
        <p className="v3-label">Critérios de classificação</p>
        <ol className="v3-pb-types">
          {MODELS_CLASSIFICATION.types.map((type, index) => (
            <li key={type.name}>
              <h3>
                {index + 1}. {type.name} <span>({type.certainty})</span>
              </h3>
              <p>{type.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="v3-pb-matrix">
        {MODELS_CLASSIFICATION.types.map((type, index) => (
          <div key={type.name}>
            <h3>
              {index + 1}. {type.name}
            </h3>
            <p className="v3-pb-matrix-head">
              {MODELS_CLASSIFICATION.columns.map((column) => (
                <span key={column}>{column}</span>
              ))}
            </p>
            <p className="v3-pb-matrix-track" aria-label={`Profundidade por fase: ${type.name}`}>
              {type.depth.map((depth, column) => (
                <i key={column} data-depth={depth} />
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductMaturity() {
  return (
    <div className="v3-pb-maturity v3-pb-fill">
      <p className="v3-label">Estratégia por maturidade do produto</p>
      {PRODUCT_MATURITY.map((item, index) => (
        <section key={item.name}>
          <h3>
            {index + 1}. {item.name}
          </h3>
          <p>{item.text}</p>
          <div className="v3-pb-flow">
            {item.flow.map((step, stepIndex) => (
              <span key={step} data-decision={step === "?" || undefined}>
                {stepIndex > 0 && <i aria-hidden />}
                <b>{step}</b>
              </span>
            ))}
            <small>{item.branches.join(" · ")}</small>
          </div>
        </section>
      ))}
    </div>
  );
}

export function StagesAppendix({ onClose }: { onClose: () => void }) {
  return (
    <Appendix
      title="Modelos de actuação"
      onClose={onClose}
      pages={[
        {
          kicker: "Padronização do trabalho",
          title: "Modelos de actuação",
          lead: MODELS_CULTURE.subtitle,
          content: <ModelsCulture />,
        },
        {
          kicker: "Padronização do trabalho",
          title: "Modelos de actuação",
          lead: MODELS_CULTURE.subtitle,
          content: <ModelsClassification />,
        },
        {
          kicker: "Padronização do trabalho",
          title: "Modelos de actuação",
          lead: "Mudança cultural para actuação orientada ao utilizador.",
          content: <ProductMaturity />,
        },
      ]}
    />
  );
}

/* ── Design System (slide 8 do playbook) ─────────────────────────────── */

function DsBenefits() {
  return (
    <div className="v3-pb-models v3-pb-fill">
      <div>
        <h3 className="v3-pb-heading">Benefícios na implantação</h3>
        <SquareList
          items={DS_BENEFITS.map((item) => (
            <>
              <b>{item.name}:</b> {item.text}
            </>
          ))}
        />
        <p className="v3-pb-statement">{DS_ROI.statement}</p>
      </div>
      <aside className="v3-pb-stat-card v3-pb-roi">
        <p className="v3-label">{DS_ROI.title}</p>
        <ul>
          {DS_ROI.items.map((item) => (
            <li key={item.label}>
              <b>{item.value}</b>
              <span>
                <strong>{item.label}</strong>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function DsFeatures() {
  return (
    <div className="v3-pb-fill">
      <ul className="v3-pb-outlined v3-pb-features">
        {DS_FEATURES.map((feature) => (
          <li key={feature.title}>
            <h3>{feature.title}</h3>
            <SquareList items={feature.items} />
          </li>
        ))}
      </ul>
      <ul className="v3-pb-outlined v3-pb-premises">
        {DS_PREMISES.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DsGovernance() {
  return (
    <div className="v3-pb-fill">
      <ol className="v3-pb-flowchart">
        {DS_GOVERNANCE.steps.map((step) => (
          <li key={step.name}>
            <h3>{step.name}</h3>
            <SquareList items={step.text.split(". ").map((part) => part.replace(/\.?$/, "."))} className="v3-pb-outlined-box" />
            <p className="v3-pb-ai">{step.ai}</p>
          </li>
        ))}
      </ol>
      <h3 className="v3-pb-heading v3-pb-divider">Camada de validação</h3>
      <ul className="v3-ds-checks" aria-label="Camada de validação">
        {DS_GOVERNANCE.checks.map((check) => (
          <li key={check}>
            <Check size={16} strokeWidth={2.5} aria-hidden />
            {check}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DsAppendix({ onClose }: { onClose: () => void }) {
  return (
    <Appendix
      title="Design System TIS"
      onClose={onClose}
      pages={[
        { kicker: "Em construção", title: "Design System TIS", lead: DS_INTRO, content: <DsBenefits /> },
        { kicker: "Em construção", title: "Design System TIS", content: <DsFeatures /> },
        {
          kicker: "Design System TIS",
          title: "Fluxo de governança do Design System",
          lead: DS_GOVERNANCE.intro,
          content: <DsGovernance />,
        },
      ]}
    />
  );
}

/* ── Áreas: frentes (slide 5) e conexões operacionais (slide 9) ──────── */

const FRONT_ICONS: LucideIcon[] = [SearchCheck, LayoutTemplate, Workflow, LayoutGrid, Accessibility, CheckSquare];
const STEP_ICONS: LucideIcon[] = [FolderInput, Compass, ListChecks, Code, ThumbsUp, ScanEye];

function Fronts() {
  return (
    <ul className="v3-pb-outlined v3-pb-fronts v3-pb-fill">
      {FRONTS.map((front, index) => {
        const Icon = FRONT_ICONS[index];
        return (
          <li key={front.id}>
            <h3>
              <Icon size={26} strokeWidth={2} aria-hidden />
              {front.name}
            </h3>
            <SquareList items={front.items} />
          </li>
        );
      })}
    </ul>
  );
}

function Principles() {
  return (
    <ul className="v3-principles">
      {AREA_PRINCIPLES.map((item, index) => (
        <li key={item.name}>
          <b className="v3-big-number" aria-hidden>
            0{index + 1}
          </b>
          <h3>{item.name}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

function InteractionMap({ from, to }: { from: number; to: number }) {
  return (
    <div className="v3-pb-map v3-pb-fill">
      <div className="v3-pb-anchor">
        <h3>Núcleo de Experiência</h3>
        <p>Equipa responsável pelo design de produtos e serviços da TIS.</p>
      </div>
      {INTERACTION_MAP.slice(from, to).map((area) => (
        <article key={area.name}>
          <h3>{area.name}</h3>
          <p>{area.intro}</p>
          <p>
            <b>Núcleo de Experiência</b> {area.role}
          </p>
          <div className="v3-pb-exchange">
            <p data-kind="in">
              <span>
                <ArrowDownToLine size={16} strokeWidth={2.2} aria-hidden />
                Recebe
              </span>
              {area.receives}
            </p>
            <p data-kind="out">
              <span>
                <ArrowUpFromLine size={16} strokeWidth={2.2} aria-hidden />
                Entrega
              </span>
              {area.delivers}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function StepRoles() {
  return (
    <div className="v3-pb-fill">
      <ul className="v3-pb-outlined v3-pb-steps">
        {STEP_ROLES.map((row, index) => {
          const Icon = STEP_ICONS[index];
          return (
            <li key={row.step}>
              <Icon size={40} strokeWidth={1.6} aria-hidden />
              <p className="v3-label">Etapa 0{index + 1}</p>
              <h3>{row.step}</h3>
              <p className="v3-pb-owner">
                <span>Responsável</span>
                {row.leads}
              </p>
              <p className="v3-pb-tag">
                <span>Apoio</span>
                {row.supports}
              </p>
              <p className="v3-pb-tag">
                <span>{row.validateLabel ?? "Validação"}</span>
                {row.validates}
              </p>
            </li>
          );
        })}
      </ul>
      <p className="v3-pb-note">
        <Info size={20} strokeWidth={2} aria-hidden />
        {STEP_ROLES_NOTE}
      </p>
    </div>
  );
}

export function AreasAppendix({ onClose }: { onClose: () => void }) {
  const map = {
    kicker: "Conexões operacionais",
    title: "Mapa de interacções",
    lead: "Áreas com as quais o Núcleo de Experiência interage e o tipo de relação em cada caso.",
  };

  return (
    <Appendix
      title="Conexões operacionais"
      onClose={onClose}
      pages={[
        {
          kicker: "Mudança de paradigma",
          title: "Núcleo de Experiência, além do design de interfaces",
          lead: FRONTS_INTRO,
          content: <Fronts />,
        },
        {
          kicker: "Conexões operacionais",
          title: "Interacções com as demais áreas",
          lead: "O Núcleo de Experiência como conexão entre negócio, utilizador e tecnologia.",
          content: <Principles />,
        },
        { ...map, content: <InteractionMap from={0} to={4} /> },
        { ...map, content: <InteractionMap from={4} to={8} /> },
        { ...map, content: <InteractionMap from={8} to={10} /> },
        {
          kicker: "Conexões operacionais",
          title: "Responsáveis por etapa",
          lead: "Em cada etapa do projecto, uma área conduz o trabalho, outras contribuem e uma terceira valida o resultado antes da fase seguinte.",
          content: <StepRoles />,
        },
      ]}
    />
  );
}
