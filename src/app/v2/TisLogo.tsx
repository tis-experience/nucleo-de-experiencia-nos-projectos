import svgPaths from "../../imports/06EstruturaEProcessoIdeal/svg-qr6s1d1r3a";
import { imgGroup } from "../../imports/06EstruturaEProcessoIdeal/svg-cceda";

/** Logótipo TIS do rodapé, igual ao das páginas da apresentação actual. */
export function TisLogo() {
  return (
    <div
      className="v2-tis-logo"
      style={{ maskImage: `url('${imgGroup}')`, WebkitMaskImage: `url('${imgGroup}')` }}
      aria-label="TIS"
      role="img"
    >
      <svg fill="none" preserveAspectRatio="none" viewBox="0 0 119.929 53.6039">
        <path d={svgPaths.p1bc3fc80} fill="#036EF2" />
        <path d={svgPaths.p8ed8880} fill="#036EF2" />
        <path d={svgPaths.p79b1980} fill="#036EF2" />
        <path d={svgPaths.p3380500} fill="#04165D" />
        <path d={svgPaths.p3777a600} fill="#04165D" />
        <path d={svgPaths.p30300b00} fill="#04165D" />
      </svg>
    </div>
  );
}
