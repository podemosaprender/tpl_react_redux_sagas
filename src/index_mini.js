//INFO: entrada a la aplicacion, que se define en App junto a estilos, etc.

import React from "react";
import { createRoot } from "react-dom/client";

import App from './App'

const container= document.getElementById("root")
const root = createRoot(container); 
root.render(<App />);

