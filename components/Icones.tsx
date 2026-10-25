import type { ReactNode } from "react";

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "h-7 w-7"}
    >
      {children}
    </svg>
  );
}

const icones: Record<string, ReactNode> = {
  piscina: (
    <>
      <path d="M2 17c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" />
      <path d="M2 21c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" />
      <path d="M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 1 4 0M8 9h8" />
    </>
  ),
  cobertura: (
    <>
      <path d="M2 9l10-5 10 5z" />
      <path d="M5 9v11M19 9v11M3 20h18" />
      <circle cx="12" cy="16.5" r="2" />
    </>
  ),
  churrasqueira: (
    <>
      <path d="M8 3c0 2 2 2 2 4s-2 2-2 4M13 3c0 2 2 2 2 4s-2 2-2 4" />
      <path d="M4 14h16l-2 6H6z" />
    </>
  ),
  fogueira: (
    <>
      <path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 .3 1 .8 1.6 1.5 2C12 7 11.5 5 12 3z" />
      <path d="M4 21l16-3M4 18l16 3" />
    </>
  ),
  casa: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  quartos: (
    <>
      <path d="M3 19V6M21 19v-5a3 3 0 0 0-3-3H8" />
      <path d="M3 15h18" />
      <circle cx="6.5" cy="11" r="1.5" />
    </>
  ),
};

export function Icone({ nome, className }: { nome: string; className?: string }) {
  return <Svg className={className}>{icones[nome] ?? icones.casa}</Svg>;
}

export function IconeWhatsapp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className ?? "h-6 w-6"}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.27-1.5A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.2 15l-.3-.18-3.1.9.93-3-.2-.32A8.1 8.1 0 0 1 12.04 3.8zM8.6 7.3c-.2 0-.5.07-.77.37-.26.3-1 1-1 2.4 0 1.4 1.03 2.8 1.17 3 .15.2 2 3.2 4.9 4.3 2.4.95 2.9.76 3.4.7.52-.05 1.7-.7 1.95-1.4.24-.7.24-1.3.17-1.4-.07-.13-.27-.2-.57-.35s-1.7-.84-1.97-.94c-.27-.1-.47-.15-.67.15s-.77.94-.94 1.13c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.4-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3 0-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.67-.5z" />
    </svg>
  );
}
