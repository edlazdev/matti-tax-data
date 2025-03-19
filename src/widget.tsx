import ReactDOM from "react-dom/client";
import App from "./App";

class TaxDataWidgetElement extends HTMLElement {
   mountPoint: HTMLDivElement;

  constructor() {
    super();
    this.mountPoint = document.createElement("div");
    this.attachShadow({ mode: "open" }).appendChild(this.mountPoint);
  }

  connectedCallback() {
    this.renderApp();
  }

  static get observedAttributes() {
    return ["color", "title", "data"]; // Atributos que queremos observar
  }

  attributeChangedCallback() {
    this.renderApp(); // Vuelve a renderizar cuando cambian los atributos
  }

  renderApp() {
    const color = this.getAttribute("color") ?? "blue";
    const title = this.getAttribute("title") ?? "Widget Fiscal";
    const data = JSON.parse(this.getAttribute("data") ?? "[]");

    const props = { color, title, data };

    ReactDOM.createRoot(this.mountPoint).render(<App {...props} />);
  }
}

customElements.define("tax-data-widget", TaxDataWidgetElement);
