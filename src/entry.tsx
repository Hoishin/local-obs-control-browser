import "modern-normalize";

import { createRoot } from "react-dom/client";
import { App } from "./app.js";

createRoot(document.querySelector("#root") as HTMLElement).render(<App />);
