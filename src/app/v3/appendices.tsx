import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { Slide05 } from "../components/Slide05";
import { Slide07Model } from "../components/Slide07Model";
import { Slide08DesignSystem } from "../components/Slide08DesignSystem";
import { Slide12AreaInteractions } from "../components/Slide12AreaInteractions";
import { STILL, Swap, tween } from "./fx";

const exit = { opacity: 0, transition: { duration: 0.25 } };
const DESIGN_HEIGHT = 1080;

/** Janela sobre o slide. Fecha com Esc ou clique fora; com várias páginas, as setas mudam de página. Com uma só
    página, as teclas de navegação ficam bloqueadas para a apresentação por trás não avançar. */
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
  size?: "full";
  children: ReactNode;
}) {
  // Enquanto a janela está aberta, as teclas ficam com ela e não chegam à navegação da apresentação.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (pages > 1 && (event.key === "ArrowRight" || event.key === "ArrowDown")) onPage((page + 1) % pages);
      else if (pages > 1 && (event.key === "ArrowLeft" || event.key === "ArrowUp")) onPage((page - 1 + pages) % pages);
      else if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", " ", "PageDown", "PageUp"].includes(event.key)) return;
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

/** Um slide da apresentação original (playbook), tal como lá está, dentro de uma janela de ecrã inteiro. */
function PlaybookSlide({
  label,
  onClose,
  children,
}: {
  label: string;
  onClose: () => void;
  children: (scale: { scaleX: number; scaleY: number }) => ReactNode;
}) {
  return (
    <Modal page={0} pages={1} onPage={() => undefined} onClose={onClose} label={label} size="full">
      <PlaybookFrame>{children}</PlaybookFrame>
    </Modal>
  );
}

const noop = () => undefined;

/** Slide 7 do playbook: modelos de actuação, critérios de classificação e maturidade do produto. */
export function StagesAppendix({ onClose }: { onClose: () => void }) {
  return (
    <PlaybookSlide label="Modelos de actuação" onClose={onClose}>
      {(scale) => <Slide07Model {...scale} />}
    </PlaybookSlide>
  );
}

/** Slide 8 do playbook: Design System TIS, arquitectura, integração e fluxo de governança. */
export function DsAppendix({ onClose }: { onClose: () => void }) {
  return (
    <PlaybookSlide label="Design System TIS" onClose={onClose}>
      {(scale) => <Slide08DesignSystem {...scale} />}
    </PlaybookSlide>
  );
}

/** Slides 5 e 9 do playbook: as seis frentes, e as conexões operacionais (princípios, mapa de interacções e
    responsáveis por etapa). */
export function AreasAppendix({ onClose }: { onClose: () => void }) {
  const [page, setPage] = useState(0);

  return (
    <Modal page={page} pages={2} onPage={setPage} onClose={onClose} label="Frentes e conexões operacionais" size="full">
      <PlaybookFrame>
        {(scale) =>
          page === 0 ? (
            <Slide05 {...scale} onPrev={noop} onNext={noop} />
          ) : (
            <Slide12AreaInteractions {...scale} />
          )
        }
      </PlaybookFrame>
    </Modal>
  );
}

/** A moldura que mede a altura disponível e dá a escala vertical ao slide: desenha-se a 1920 de largura e estica em
    altura com o palco, como na original. */
function PlaybookFrame({ children }: { children: (scale: { scaleX: number; scaleY: number }) => ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [scaleY, setScaleY] = useState(1);

  useLayoutEffect(() => {
    const measure = () => {
      if (frame.current) setScaleY(frame.current.offsetHeight / DESIGN_HEIGHT);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={frame} className="v3-playbook">
      {children({ scaleX: 1, scaleY })}
    </div>
  );
}
