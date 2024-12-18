import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "../index";
import { Provider } from "react-redux";
import { store } from "../redux";

const container = document.createElement("div");
document.body.appendChild(container);

const root = createRoot(container)
root.render(<Provider store={store} >
    <App />
</Provider>);