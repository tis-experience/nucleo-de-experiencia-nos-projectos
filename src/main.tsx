import { lazy, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Versões em avaliação, servidas em #/v2 e #/v3 sem alterar a apresentação actual.
// A v3 é a v2 com a IA, o encaixe nas fases da TIS e a medição revistos.
const AppV2 = lazy(() => import("./app/v2/AppV2.tsx"));
const AppV3 = lazy(() => import("./app/v3/AppV3.tsx"));

type Version = "v1" | "v2" | "v3";

const readVersion = (): Version => {
  const hash = window.location.hash;
  if (hash.startsWith("#/v3")) return "v3";
  if (hash.startsWith("#/v2")) return "v2";
  return "v1";
};

function Root() {
  const [version, setVersion] = useState<Version>(readVersion);

  useEffect(() => {
    const handleHashChange = () => setVersion(readVersion());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (version === "v1") return <App />;

  return (
    <Suspense fallback={null}>
      {version === "v3" ? <AppV3 /> : <AppV2 />}
    </Suspense>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
