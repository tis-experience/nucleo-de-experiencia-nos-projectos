import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { Slide05 } from "../components/Slide05";
import { Slide07Model } from "../components/Slide07Model";
import { Slide08DesignSystem } from "../components/Slide08DesignSystem";
import { Slide12AreaInteractions } from "../components/Slide12AreaInteractions";
import { Modal } from "./modal";
import { STILL, tween } from "./fx";

const DESIGN_HEIGHT = 1080;

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
