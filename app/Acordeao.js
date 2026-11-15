"use client";

import { useId, useState } from "react";

// Item expansível acessível: botão com aria-expanded controlando um painel.
// A animação de abrir/fechar é só CSS (grid 0fr → 1fr), em globals.css.
export default function Acordeao({ rotulo, children, className = "" }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();
  return (
    <div className={`ac ${className}`} data-aberto={aberto || undefined}>
      <button type="button" className="ac-botao" aria-expanded={aberto} aria-controls={id} onClick={() => setAberto(!aberto)}>
        <span>{rotulo}</span>
        <span className="ac-mais" aria-hidden="true" />
      </button>
      <div className="ac-painel" id={id}>
        <div>{children}</div>
      </div>
    </div>
  );
}
