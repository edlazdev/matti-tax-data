import { createRoot } from "react-dom/client";
import App from "./App";

export function renderFiscalForm(elementId: string, props: any) {
  const container = document.getElementById(elementId);
  if (container) {
    const root = createRoot(container);
    root.render(<App {...props} />);
  }
}
