import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { STILL, Swap, tween } from "./fx";

const exit = { opacity: 0, transition: { duration: 0.25 } };

/** Janela sobre o slide. Fecha com Esc ou clique fora; com várias páginas, as setas mudam de página. Com uma só
    página, as teclas de navegação ficam bloqueadas para a apresentação por trás não avançar. */
export function Modal({
  page,
  pages,
  onPage,
  onClose,
  label,
  children,
}: {
  page: number;
  pages: number;
  onPage: (page: number) => void;
  onClose: () => void;
  label: string;
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
