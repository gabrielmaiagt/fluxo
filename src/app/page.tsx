
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
          <p className="text-neutral-400 mt-1">Vendo info</p>
        </header>

        {/* Main Content */}
        <main className="w-full flex flex-col gap-4">
          
          {/* Main Program Card */}
          <div className="bg-[#111] border border-neutral-800 rounded-xl p-4 w-full flex flex-col">
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              PROGRAMA PRINCIPAL: MÉTODO FLUXO DE CAIXA
            </h2>
            <Link href="#" target="_blank" rel="noopener noreferrer" className="my-4 block overflow-hidden rounded-lg">
              <Image
                src="https://i.postimg.cc/rp6JLCGX/Chat-GPT-Image-21-de-ago-de-2025-14-56-44.png"
                alt="Fluxo de Caixa"
                width={400}
                height={200}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <Button asChild variant="primary" className="mt-auto w-full font-semibold">
              <Link href="#">
                Acessar o Método
              </Link>
            </Button>
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

          {/* Community Card */}
          <div className="bg-[#111] border border-neutral-800 rounded-xl p-4 w-full">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
              COMUNIDADE
            </h2>
            <div className="flex flex-col gap-3 mt-4">
              <Link href="#" className="block text-center text-white font-semibold py-2 border border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors">
                Grupo de Networking no Whatsapp
              </Link>
              <Link href="#" className="block text-center text-white font-semibold py-2 border border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors">
                Grupo de Networking no Discord
              </Link>
            </div>
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
