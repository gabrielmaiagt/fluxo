
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, Phone, User, X, Instagram } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Dashboard } from '@/components/landing/dashboard';
import { Typewriter } from '@/components/landing/typewriter';

export default function LinkInBioPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-black text-white font-sans p-4 overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/30 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full filter blur-3xl opacity-50"></div>


      <div className="w-full max-w-sm mx-auto flex flex-col items-center z-10">
        
        {/* Header */}
        <header className="flex flex-col items-center text-center py-8">
          <Image
            src="https://i.postimg.cc/JzPWt0nh/480825870-1360183581682280-6687349343385500519-n.jpg"
            alt="Foto de perfil de Gabriel Maia"
            width={96}
            height={96}
            className="rounded-full border-2 border-white/30 object-cover"
            data-ai-hint="profile picture"
          />
          <h1 className="text-2xl font-bold mt-4">Gabriel Maia</h1>
          <Typewriter text="Aprenda a lucrar todo dia." className="text-white mt-1 h-6" />
        </header>

        {/* Main Content */}
        <main className="w-full flex flex-col gap-4">
          
          {/* Main Program Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-full">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider text-center">
              PRÉ-VENDA METODO FLUXO DE CAIXA
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <div className="my-4 block overflow-hidden rounded-lg shadow-red-glow transition-shadow duration-300 hover:shadow-destructive/80 cursor-pointer">
                    <Image
                      src="https://i.postimg.cc/rp6JLCGX/Chat-GPT-Image-21-de-ago-de-2025-14-56-44.png"
                      alt="Fluxo de Caixa"
                      width={400}
                      height={200}
                      className="w-full h-auto object-cover"
                    />
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-md rounded-2xl p-6">
                <DialogHeader>
                  <DialogTitle className="text-center text-lg font-bold uppercase tracking-wider text-destructive">PRÉ-VENDA</DialogTitle>
                  <DialogDescription asChild>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mt-1">MÉTODO · FLUXO DE CAIXA</h3>
                      <p className="text-white/80 mt-2">Aprenda a validar e escalar oferta de X1 e tráfego direto.</p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-left pt-4">
                  <div>
                    <h4 className="font-semibold text-white text-md">Pra você que quer aprender:</h4>
                    <ul className="mt-2 space-y-2 text-white/80 text-sm">
                      <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" /> Espionagem Avançada</li>
                      <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" /> Criativos de Alta Conversão</li>
                      <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" /> Funis Completos</li>
                      <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" /> E muito mais...</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-md">Não é para:</h4>
                    <ul className="mt-2 space-y-2 text-white/80 text-sm">
                      <li className="flex items-start"><X className="h-4 w-4 mr-2 mt-0.5 text-destructive flex-shrink-0" /> quem busca “atalho” sem executar.</li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 pt-4">
                   <Button asChild variant="destructive" className="w-full font-bold animate-breathing">
                    <Link href="https://fluxodeoferta.site/fluxo" target="_blank" rel="noopener noreferrer">
                      Entrar no Grupo
                    </Link>
                  </Button>
                  <p className="text-xs text-center text-white/70 px-4">
                    Desconto e bônus especiais para as primeiras 50 pessoas.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Advanced Mentorship Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-full">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider text-center">
              AVANÇADO
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <div className="my-4 block overflow-hidden rounded-lg shadow-red-glow transition-shadow duration-300 hover:shadow-destructive/80 cursor-pointer">
                  <Image
                    src="https://i.postimg.cc/cC3tDxP0/Chat-GPT-Image-22-de-set-de-2025-04-56-32.png"
                    alt="Mentoria Individual Avançada"
                    width={400}
                    height={200}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-md rounded-2xl p-6">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold">Mentoria Individual 1:1</DialogTitle>
                </DialogHeader>
                <div className="text-white/90 space-y-4 pt-2 text-sm">
                  <p className="text-center italic">Se você investe e não volta o gasto diário, tem algo errado no sistema — e eu corrijo com você.</p>
                  <p>No 1:1 a gente ajusta oferta, funil, criativos e mídia, define um plano de ação e executa.</p>
                  
                  <div>
                    <h4 className="font-semibold text-white">O que rola na prática (ensino + correção):</h4>
                    <ul className="mt-2 space-y-1.5 list-disc list-inside text-white/80">
                      <li>Diagnóstico completo de oferta, funil e tráfego</li>
                      <li>Ajuste de criativos (angulações, hooks, copy e variações)</li>
                      <li>Plano de mídia direto/X1 com metas e orçamento</li>
                      <li>Checklist de execução + rotina semanal</li>
                      <li>Follow-up para dúvidas e correção de rota</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">Para quem é:</h4>
                    <ul className="mt-2 space-y-1.5 list-disc list-inside text-white/80">
                      <li>Quer girar caixa agora e escalar com previsibilidade</li>
                      <li>Tem (ou vai colocar) oferta/produto rodando</li>
                      <li>Topa executar entre as sessões</li>
                    </ul>
                  </div>

                  <p className="text-center font-semibold pt-2">Sem promessa vazia. Trabalho conjunto, entrega e cobrança.</p>
                </div>
                <div className="flex flex-col items-center gap-4 pt-4">
                    <div className="text-center">
                        <p className="text-sm text-white/80">Investimento (lote atual):</p>
                        <div className="flex items-baseline justify-center gap-2">
                           <span className="text-sm text-muted-foreground line-through">De R$2.997</span>
                           <span className="text-2xl font-bold text-white">por R$997</span>
                        </div>
                    </div>
                  <Button asChild variant="destructive" className="w-full font-bold animate-breathing">
                    <Link href="https://wa.link/3xmzej" target="_blank" rel="noopener noreferrer">
                      Quero a Mentoria 1:1
                    </Link>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Community Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-full">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
              Quem não está online… já está FORA DO JOGO.
            </h2>
            <div className="flex flex-col gap-3 mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="block rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-full shadow-red-glow hover:shadow-destructive/80 cursor-pointer">
                    <Image
                      src="https://i.postimg.cc/VLCtKv1T/Design-sem-nome-2.png"
                      alt="Grupo de Networking no Whatsapp"
                      width={400}
                      height={100}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-xs rounded-2xl p-6">
                  <DialogHeader className="items-center">
                    <DialogTitle className="text-center text-2xl font-bold">Networking no WhatsApp (GRÁTIS)</DialogTitle>
                    <DialogDescription className="text-center text-white/80 pt-2">
                      Networking diário, dicas e resenha.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-4 pt-4">
                    <Button asChild variant="destructive" className="w-full font-bold animate-breathing">
                      <Link href="https://chat.whatsapp.com/Khh4Ulvu9elLgZvHjGWItX" target="_blank" rel="noopener noreferrer">
                        Entrar no grupo
                      </Link>
                    </Button>
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs text-white/60 mt-2">
                      <Phone className="h-3 w-3" />
                      <span>Contato oficial: +55 71 99151-1702</span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="block rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-full shadow-red-glow hover:shadow-destructive/80 cursor-pointer">
                    <Image
                      src="https://i.postimg.cc/kXRcBpgR/Chat-GPT-Image-21-de-ago-de-2025-15-20-07.png"
                      alt="Grupo de Networking no Discord"
                      width={400}
                      height={100}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-xs rounded-2xl p-6">
                  <DialogHeader className="items-center">
                    <DialogTitle className="text-center text-2xl font-bold">Networking no Discord</DialogTitle>
                    <DialogDescription className="text-center text-white/80 pt-2">
                      Networking + calls semanais.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-4 pt-4">
                    <Button asChild variant="destructive" className="w-full font-bold animate-breathing">
                      <Link href="https://discord.gg/N22CvMkpUV" target="_blank" rel="noopener noreferrer">
                        Entrar no servidor
                      </Link>
                    </Button>
                     <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs text-white/60 mt-2">
                      <User className="h-3 w-3" />
                      <span>User do Dono: garbiel1</span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="block rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-full shadow-red-glow hover:shadow-destructive/80 cursor-pointer">
                    <Image
                      src="https://i.postimg.cc/xdY8YRQr/Chat-GPT-Image-22-de-ago-de-2025-01-05-59.png"
                      alt="Perfil no Instagram"
                      width={400}
                      height={100}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-xs rounded-2xl p-6">
                  <DialogHeader className="items-center">
                    <DialogTitle className="text-center text-2xl font-bold">Siga no Instagram</DialogTitle>
                    <DialogDescription className="text-center text-white/80 pt-2">
                      Bastidores, provas e insights diários.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-4 pt-4">
                    <Button asChild variant="destructive" className="animate-breathing">
                      <Link href="https://www.instagram.com/gabrielmaiagt/" target="_blank" rel="noopener noreferrer">
                        Visitar Perfil
                      </Link>
                    </Button>
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs text-white/60 mt-2">
                      <Instagram className="h-3 w-3" />
                      <span>@gabrielmaiagt</span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </main>
        
        <Dashboard />

        {/* Footer */}
        <footer className="py-8 mt-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Gabriel Maia — Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}

    
    
