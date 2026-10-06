import svgPaths from "./svg-p070wn3cp5";

function ArrowBackIosNew() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_back_ios_new">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_back_ios_new">
          <mask height="24" id="mask0_8_419" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_8_419)">
            <path d={svgPaths.p90d8b80} fill="var(--fill-0, white)" id="arrow_back_ios_new_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="bg-[#036ef2] content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[40px]" data-name="Arrow Left">
      <ArrowBackIosNew />
    </div>
  );
}

function ArrowForwardIos() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_forward_ios">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_forward_ios">
          <mask height="24" id="mask0_8_415" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_8_415)">
            <path d={svgPaths.p23cbb200} fill="var(--fill-0, white)" id="arrow_forward_ios_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="bg-[#036ef2] content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[40px]" data-name="Arrow Right">
      <ArrowForwardIos />
    </div>
  );
}

export default function NavigationContainer() {
  return (
    <div className="content-stretch flex gap-[32px] items-end justify-end relative size-full" data-name="Navigation Container">
      <ArrowLeft />
      <ArrowRight />
    </div>
  );
}