import { createRoot } from "react-dom/client";
import AppV3 from "./app/v3/AppV3.tsx";
import "./styles/index.css";

// Os endereços antigos, #/v2/<passo> e #/v3/<passo>, continuam a abrir o mesmo slide.
const legacy = window.location.hash.match(/^#\/v[23](\/.*)?$/);
if (legacy) window.history.replaceState(null, "", `#${legacy[1] ?? "/"}`);

createRoot(document.getElementById("root")!).render(<AppV3 />);
