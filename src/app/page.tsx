
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function LinkInBioPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-black text-white font-sans p-4 overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>


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
          <h1 className="text-2xl font-bold mt-4">⥁ gabrielmaia'gt</h1>
          <p className="text-white mt-1">Todo mundo vende alguma coisa. Só alguns sabem LUCRAR TODO DIA.</p>
        </header>

        {/* Main Content */}
        <main className="w-full flex flex-col gap-4">
          
          {/* Main Program Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-full flex flex-col">
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
              <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-sm rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">🚀 Lançamento à Vista!</DialogTitle>
                    <DialogDescription asChild>
                      <div className="text-center text-white/80 pt-2 space-y-2">
                        <p>O <span className="font-bold text-white">Método Fluxo de Caixa</span> está chegando. Domine o tráfego direto e as automações de X1 no WhatsApp para nunca mais passar um dia sem vender.</p>
                        <p>As vagas serão limitadas. Entre no grupo VIP de pré-venda para garantir a sua e receber todas as informações em primeira mão.</p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center pt-4">
                    <Button asChild variant="destructive">
                      <Link href="https://fluxodeoferta.site/fluxo" target="_blank" rel="noopener noreferrer">
                        Entrar no Grupo de Pré-venda
                      </Link>
                    </Button>
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
              <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-sm rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold">Mentoria Individual</DialogTitle>
                  <DialogDescription asChild>
                    <div className="text-center text-white/80 pt-2 space-y-3">
                      <p>Receba acompanhamento individual e personalizado para acelerar seus resultados. Vamos analisar seu negócio, otimizar suas campanhas e escalar suas vendas juntos.</p>
                      <p className="text-white font-bold text-lg">Valor: R$997</p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 pt-4">
                  <Button asChild variant="destructive">
                    <Link href="https://wa.link/3xmzej" target="_blank" rel="noopener noreferrer">
                      Quero a Mentoria Individual
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
                <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-xs rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">71 99151-1702</DialogTitle>
                    <DialogDescription className="text-center text-white/80 pt-2">
                      Este é o meu número pessoal. O botão abaixo leva para o grupo de networking no WhatsApp.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center pt-4">
                    <Button asChild variant="destructive">
                      <Link href="https://chat.whatsapp.com/Khh4Ulvu9elLgZvHjGWItX" target="_blank" rel="noopener noreferrer">
                        Entrar no Grupo
                      </Link>
                    </Button>
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
                <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-xs rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">Discord: garbiel1</DialogTitle>
                    <DialogDescription className="text-center text-white/80 pt-2">
                      Você será redirecionado para o grupo de networking no Discord.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center pt-4">
                    <Button asChild variant="destructive">
                      <Link href="https://discord.gg/N22CvMkpUV" target="_blank" rel="noopener noreferrer">
                        Entrar no Grupo
                      </Link>
                    </Button>
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
                <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-xs rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">@gabrielmaiagt</DialogTitle>
                    <DialogDescription className="text-center text-white/80 pt-2">
                      Você será redirecionado para o Instagram.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center pt-4">
                    <Button asChild variant="destructive">
                      <Link href="https://www.instagram.com/gabrielmaiagt/" target="_blank" rel="noopener noreferrer">
                        Visitar Perfil
                      </Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="py-8 mt-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} ⥁ gabrielmaia'gt — Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}
