import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring } from "motion/react";
import forwardPaths from "../../imports/01Capa/svg-9xym7sn689";
import backPaths from "../../imports/Back/svg-v4jzanzdmi";
import { AREAS, PHASES, STEPS } from "./content";
import { STILL, Swap } from "./fx";
import { StageScene } from "./StageScene";
import { TisLogo } from "./TisLogo";
import {
  AiScene,
  ChangeScene,
  ClosingScene,
  CoverScene,
  DeliveriesScene,
  DesignSystemScene,
  MeasureScene,
  ResultsScene,
  StartScene,
} from "./scenes";
import "./v2.css";

const V2_HASH_PREFIX = "#/v2";
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const REPEAT_ICON_PATH =
  "M35.3 12.65C32.4 9.75 28.4 8 24 8C15.15 8 8 15.15 8 24C8 32.85 15.15 40 24 40C31.45 40 37.7 34.9 39.45 28H35.25C33.6 32.65 29.15 36 24 36C17.35 36 12 30.65 12 24C12 17.35 17.35 12 24 12C27.3 12 30.25 13.35 32.4 15.5L26 22H40V8L35.3 12.65Z";
// Os mesmos ícones de expandir e recolher usados no infográfico da apresentação actual.
const FULLSCREEN_ENTER_PATH =
  "M5 19v-6h2v4h4v2H5Zm12-8V7h-4V5h6v6h-2Z";
const FULLSCREEN_EXIT_PATH = "M11 13v6H9v-4H5v-2h6Zm4-8v4h4v2h-6V5h2Z";
const INTERACTIVE = "button, a, input, select, textarea, [role='button']";
const CURSOR_SPRING = { damping: 28, stiffness: 350, mass: 0.5 };

/** `#/v2/<passo>/<área>`: ligação directa para um ecrã ou para a página de uma área. */
function readHash() {
  const [, , stepId, areaId] = window.location.hash.split("?")[0].split("/");
  const stepIndex = STEPS.findIndex((step) => step.id === stepId);

  return {
    stepIndex: stepIndex === -1 ? 0 : stepIndex,
    areaId: AREAS.some((area) => area.id === areaId) ? areaId : AREAS[0].id,
  };
}

export default function AppV2() {
  const [scale, setScale] = useState(1);
  const [stepIndex, setStepIndex] = useState(() => readHash().stepIndex);
  const [areaId, setAreaId] = useState(() => readHash().areaId);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isLeftHalf, setIsLeftHalf] = useState(false);
  const [isOnInteractive, setIsOnInteractive] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement));

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const cursorX = useSpring(mouseX, CURSOR_SPRING);
  const cursorY = useSpring(mouseY, CURSOR_SPRING);

  const step = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;
  const isDark = step.scene === "capa" || step.scene === "fecho";
  const goTo = (index: number) => setStepIndex(Math.max(0, Math.min(STEPS.length - 1, index)));

  // Secções da cena actual (os dois caminhos, as seis etapas), para as setas cima e baixo.
  const sceneStart = STEPS.findIndex((item) => item.scene === step.scene);
  const sceneLength = STEPS.filter((item) => item.scene === step.scene).length;
  const sectionIndex = stepIndex - sceneStart;

  useEffect(() => {
    const update = () =>
      setScale(Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const next = readHash();
      setStepIndex(next.stepIndex);
      setAreaId(next.areaId);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const path = step.id === "areas" ? `${step.id}/${areaId}` : step.id;
    window.history.replaceState(null, "", `${V2_HASH_PREFIX}/${path}${STILL ? "?still" : ""}`);
    document.title = `${step.label} · Núcleo de Experiência`;
  }, [step, areaId]);

  // ── Ecrã inteiro ───────────────────────────────────────────────────────
  useEffect(() => {
    const handleChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen();
  };

  // ── Navegação por teclado ──────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      // Num botão com foco, o espaço activa o botão em vez de avançar.
      const isSpace = event.key === " " && !(event.target instanceof HTMLButtonElement);

      if (event.key === "ArrowRight" || event.key === "PageDown" || isSpace) goTo(stepIndex + 1);
      else if (event.key === "ArrowLeft" || event.key === "PageUp") goTo(stepIndex - 1);
      else if (event.key === "Home" || event.key === "r" || event.key === "R") goTo(0);
      else if (event.key === "End") goTo(STEPS.length - 1);
      else if (event.key === "f" || event.key === "F") toggleFullscreen();
      else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        const offset = event.key === "ArrowDown" ? 1 : -1;
        if (step.id === "areas") {
          const current = AREAS.findIndex((area) => area.id === areaId);
          setAreaId(AREAS[(current + offset + AREAS.length) % AREAS.length].id);
        } else if (step.id === "fases") {
          setPhaseIndex((phaseIndex + offset + PHASES.length) % PHASES.length);
        } else if (sceneLength > 1) {
          goTo(sceneStart + ((sectionIndex + offset + sceneLength) % sceneLength));
        } else return; // As restantes cenas tratam das suas próprias selecções.
      } else return;

      event.preventDefault();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stepIndex, step, areaId, phaseIndex]);

  // ── Navegação pelo cursor: metade direita avança, metade esquerda recua ─
  const handleMouseMove = (event: MouseEvent) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
    setIsLeftHalf(event.clientX < window.innerWidth / 2);
    setIsOnInteractive(Boolean((event.target as Element).closest(INTERACTIVE)));
    if (!cursorVisible) setCursorVisible(true);
  };

  const handleClick = (event: MouseEvent) => {
    if ((event.target as Element).closest(INTERACTIVE)) return;

    const clickIsLeftHalf = event.clientX < window.innerWidth / 2;
    setIsTapping(true);
    window.setTimeout(() => setIsTapping(false), 180);

    if (isLast && !clickIsLeftHalf) goTo(0);
    else if (isFirst || !clickIsLeftHalf) goTo(stepIndex + 1);
    else goTo(stepIndex - 1);
  };

  const showBackCursor = !isFirst && isLeftHalf;
  const showRepeatCursor = isLast && !isLeftHalf;
  const cursorIcon = showBackCursor ? "back" : showRepeatCursor ? "repeat" : "forward";
  const cursorSize = (showBackCursor ? 56 : 80) * scale;
  const cursorShown = cursorVisible && !isOnInteractive && !STILL;

  const footer = isDark
    ? step.scene === "capa"
      ? ["2026", "TIS"]
      : ["TIS", "Núcleo de Experiência"]
    : [String(stepIndex + 1).padStart(2, "0"), "Núcleo de Experiência nos projectos"];

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`v2-root${STILL ? " v2-still" : ""}`}
        data-dark={isDark}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
        onClick={handleClick}
      >
        <p className="v2-sr-only" aria-live="polite">
          Ecrã {stepIndex + 1} de {STEPS.length}: {step.label}
        </p>

        <div className="v2-stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          <Swap>
            <motion.main
              key={step.scene}
              className="v2-main"
              initial={STILL ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {step.scene === "capa" && <CoverScene />}
              {step.scene === "partida" && <StartScene />}
              {step.scene === "mudanca" && <ChangeScene build={step.build ?? 0} />}
              {step.scene === "etapas" && <StageScene stageIndex={step.stageIndex ?? 0} />}
              {step.scene === "resultados" && <ResultsScene />}
              {step.scene === "ia" && <AiScene />}
              {step.scene === "ds" && <DesignSystemScene />}
              {step.scene === "entregas" && (
                <DeliveriesScene
                  view={step.build ?? 0}
                  phaseIndex={phaseIndex}
                  areaId={areaId}
                  onView={(view) => goTo(sceneStart + view)}
                  onSelectPhase={setPhaseIndex}
                  onSelectArea={setAreaId}
                />
              )}
              {step.scene === "medir" && <MeasureScene />}
              {step.scene === "fecho" && <ClosingScene />}
            </motion.main>
          </Swap>

          <footer className="v2-footer">
            <p className="v2-foot-id">
              <b>{footer[0]}</b>
              <i aria-hidden />
              <span>{footer[1]}</span>
            </p>
            {!isDark && <TisLogo />}
          </footer>
        </div>

        <button
          type="button"
          className="v2-fullscreen"
          aria-label={isFullscreen ? "Sair do ecrã inteiro" : "Ver em ecrã inteiro"}
          title={isFullscreen ? "Sair do ecrã inteiro (F)" : "Ver em ecrã inteiro (F)"}
          aria-pressed={isFullscreen}
          onClick={toggleFullscreen}
        >
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d={isFullscreen ? FULLSCREEN_EXIT_PATH : FULLSCREEN_ENTER_PATH} />
          </svg>
        </button>

        {/* ── Cursor de navegação ── */}
        <motion.div
          className="v2-cursor"
          aria-hidden
          style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}
          animate={{
            opacity: cursorShown ? 1 : 0,
            scale: cursorShown ? (isTapping ? 0.82 : 1) : 0.4,
            width: cursorSize,
            height: cursorSize,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.svg
              key={cursorIcon}
              initial={{ opacity: 0, rotate: cursorIcon === "back" ? 45 : -45, scale: 0.4 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              viewBox={cursorIcon === "back" ? "0 0 32 32" : "0 0 48 48"}
              style={{ width: "58%", height: "58%" }}
              fill="white"
            >
              <path
                d={
                  cursorIcon === "back"
                    ? backPaths.p1cb876f0
                    : cursorIcon === "repeat"
                      ? REPEAT_ICON_PATH
                      : forwardPaths.pa0c5900
                }
              />
            </motion.svg>
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
