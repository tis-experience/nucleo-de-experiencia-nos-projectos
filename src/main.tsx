import { lazy, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Versão alternativa em avaliação, servida em #/v2 sem alterar a apresentação actual.
const V2_HASH_PREFIX = "#/v2";
const AppV2 = lazy(() => import("./app/v2/AppV2.tsx"));

const isV2Hash = () => window.location.hash.startsWith(V2_HASH_PREFIX);

function Root() {
  const [isV2, setIsV2] = useState(isV2Hash);

  useEffect(() => {
    const handleHashChange = () => setIsV2(isV2Hash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (!isV2) return <App />;

  return (
    <Suspense fallback={null}>
      <AppV2 />
    </Suspense>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
