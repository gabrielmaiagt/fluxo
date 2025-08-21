
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LinkInBioPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-black text-white font-sans p-4">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        
        {/* Header */}
        <header className="flex flex-col items-center text-center py-8">
          <Image
            src="https://placehold.co/120x120.png"
            alt="Foto de perfil de Gabriel Maia"
            width={96}
            height={96}
            className="rounded-full border-2 border-neutral-800"
            data-ai-hint="profile picture"
          />
          <h1 className="text-2xl font-bold mt-4">Gabriel Maia</h1>
          <p className="text-neutral-400 mt-1">gestor de tráfego | Método Fluxo de Caixa</p>
        </header>

        {/* Main Content */}
        <main className="w-full flex flex-col gap-4">
          
          {/* Main Program Card */}
          <div className="bg-[#111] border border-neutral-800 rounded-xl p-4 w-full">
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              PROGRAMA PRINCIPAL: MÉTODO FLUXO DE CAIXA
            </h2>
            <div className="my-4 flex items-center justify-center bg-neutral-900 h-24 rounded-lg">
                <span className="text-lg font-bold text-neutral-300">Fluxo de Caixa</span>
            </div>
            <Link href="#" className="block text-center text-white font-semibold py-2">
              [ Acessar o Método ]
            </Link>
          </div>

          {/* Info Card */}
          <div className="bg-[#111] border border-neutral-800 rounded-xl p-4 w-full">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
              INFOS
            </h2>
            <p className="text-neutral-300 mt-2 text-sm leading-relaxed">
              Minha estrutura validada para rodar ofertas de tráfego direto e manter caixa constante.
            </p>
            <Link href="#" className="block text-sm text-neutral-400 font-semibold py-2 mt-2">
              [ Ver detalhes ]
            </Link>
          </div>

        </main>

        {/* Footer */}
        <footer className="py-8 mt-4">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Gabriel Maia — Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}
