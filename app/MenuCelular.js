"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";

// Menu do celular. Usa <dialog> com showModal(): o navegador já prende o foco no painel,
// fecha com Esc e devolve o foco ao botão que abriu.
export default function MenuCelular({ links }) {
  const painel = useRef(null);
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <button
        type="button"
        className="menu-botao"
        aria-label="Abrir menu"
        aria-expanded={aberto}
        aria-controls="menu-celular"
        onClick={() => { painel.current.showModal(); setAberto(true); }}
      >
        <Menu size={24} aria-hidden="true" />
      </button>

      <dialog
        id="menu-celular"
        className="menu-painel"
        aria-label="Menu"
        ref={painel}
        onClose={() => setAberto(false)}
        // Fecha ao clicar fora (o clique no fundo chega no próprio <dialog>) ou em qualquer link.
        onClick={(e) => { if (e.target === e.currentTarget || e.target.closest("a")) painel.current.close(); }}
      >
        <div className="menu-dentro">
          <button type="button" className="menu-botao menu-fechar" aria-label="Fechar menu" onClick={() => painel.current.close()}>
            <X size={24} aria-hidden="true" />
          </button>
          <nav aria-label="Seções da página">
            {links.map(([href, nome]) => <a key={href} href={href}>{nome}</a>)}
          </nav>
          <a className="btn btn-pri" href="#agendamento">Agendar consulta</a>
        </div>
      </dialog>
    </>
  );
}
