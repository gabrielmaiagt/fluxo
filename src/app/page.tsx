
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, X, ArrowRight, Instagram, Phone, User, Copy, MessageSquare, Mic, BrainCircuit } from 'lucide-react';
import { Dashboard } from '@/components/landing/dashboard';
import { Typewriter } from '@/components/landing/typewriter';
import { useToast } from '@/hooks/use-toast';
import { AnimatedSection } from '@/components/landing/animated-section';
import { db } from '@/lib/firebase';
import { doc, writeBatch, increment, serverTimestamp, collection } from 'firebase/firestore';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}><path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.044-.53-.044-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.52-1.29.37-.775.37-1.447.28-1.595-.093-.143-.302-.215-.47-.215z" fill="currentColor"></path><path d=" M20.5 0c-8.48 0-15.4 6.87-15.4 15.3 0 4.2 1.7 8 4.5 10.8l-4.7 4.7 4.9-4.5c2.7 1.7 5.9 2.8 9.2 2.8C28.9 31.1 36 24.2 36 15.7S29 0 20.5 0zm0 29.3c-2.9 0-5.7-1-8.1-2.8l-.6-.4-6 5.5 5.7-5.8-.4-.6c-2-2.5-3.1-5.6-3.1-8.9 0-7.3 6-13.2 13.4-13.2 7.4 0 13.4 5.9 13.4 13.2.1 7.3-5.9 13.2-13.3 13.2z" fill="currentColor"></path></svg>
);

export default function LinkInBioPage() {
  const { toast } = useToast();

  const handleNotificationClick = async (url: string, label: string) => {
    // Abre a URL imediatamente para evitar bloqueadores de pop-up em navegadores móveis.
    window.open(url, '_blank', 'noopener,noreferrer');
    
    try {
        const batch = writeBatch(db);

        // Tarefa 1: Incrementar o contador de cliques para o dashboard
        const clickDocRef = doc(db, 'clickCounts', label);
        batch.set(clickDocRef, {
            count: increment(1),
            label: label,
            lastClicked: serverTimestamp()
        }, { merge: true });

        // Tarefa 2: Criar um documento gatilho para a notificação ao vivo na página de admin
        const liveNotificationRef = doc(collection(db, 'live_notifications'));
        batch.set(liveNotificationRef, {
            label: label,
            timestamp: serverTimestamp(),
            read: false
        });
        
        // Commita as duas operações atomicamente
        await batch.commit();

      } catch (error) {
        console.error("Erro ao registrar clique no Firestore:", error);
        // Opcional: Adicionar algum feedback de erro para o usuário/admin se necessário
      }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para sua área de transferência.",
      });
    }, (err) => {
      console.error('Could not copy text: ', err);
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    });
  };

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
          
          <Dialog>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-full space-y-4">
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider text-center">
                PRÉ-VENDA METODO FLUXO DE CAIXA
              </h2>
              <DialogTrigger asChild>
                <div 
                  className="block overflow-hidden rounded-lg shadow-red-glow transition-shadow duration-300 hover:shadow-destructive/80 cursor-pointer"
                >
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
                     <Button variant="destructive" className="w-full font-bold animate-breathing" onClick={() => handleNotificationClick('https://chat.whatsapp.com/HRRGV0rKCVI2h3unF10m9f', 'Grupo Pré-venda Fluxo de Caixa')}>
                        Entrar no Grupo
                    </Button>
                    <p className="text-xs text-center text-white/70 px-4">
                      Desconto e bônus especiais para as primeiras 50 pessoas.
                    </p>
                  </div>
                </DialogContent>
            </div>
          </Dialog>

          <Dialog>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-full space-y-4">
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider text-center">
                AVANÇADO
              </h2>
               <DialogTrigger asChild>
                  <div 
                    className="block overflow-hidden rounded-lg shadow-red-glow transition-shadow duration-300 hover:shadow-destructive/80 cursor-pointer"
                  >
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
                    <Button variant="destructive" className="w-full font-bold animate-breathing" onClick={() => handleNotificationClick('https://wa.link/3xmzej', 'Mentoria 1:1')}>
                        Quero a Mentoria 1:1
                    </Button>
                  </div>
              </DialogContent>
            </div>
          </Dialog>

          {/* Community Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-full">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider text-center">
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
                <DialogContent className="bg-white/10 backdrop-blur-md border-white/20 text-white w-[90vw] max-w-md rounded-2xl shadow-2xl p-6 flex flex-col">
                  <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl font-bold text-white">Entre no grupo de Networking no WhatsApp</DialogTitle>
                    <DialogDescription className="text-white/80 mt-2">
                      Dicas diárias de tráfego direto, criativos e x1. Sem spam.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <ul className="space-y-2 text-white/90 py-6 text-sm">
                      <li className="flex items-center gap-3">
                          <BrainCircuit className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span>Dicas diárias de tráfego direto</span>
                      </li>
                      <li className="flex items-center gap-3">
                          <MessageSquare className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span>Análise de criativos e estratégias X1</span>
                      </li>
                      <li className="flex items-center gap-3">
                          <Mic className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span>Calls semanais sobre os temas</span>
                      </li>
                  </ul>

                  <div className="flex flex-col items-center gap-3 mt-auto">
                    <Button 
                      className="w-full font-bold group"
                      onClick={() => handleNotificationClick('https://chat.whatsapp.com/Khh4Ulvu9elLgZvHjGWItX', 'Grupo de Networking WhatsApp')}
                    >
                      <WhatsAppIcon className="h-5 w-5 mr-2" />
                      Entrar no Grupo
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Button>
                     <Button 
                        variant="ghost" 
                        className="w-full text-white/70 hover:text-white"
                        onClick={() => copyToClipboard('https://chat.whatsapp.com/Khh4Ulvu9elLgZvHjGWItX')}
                     >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar o link do grupo
                    </Button>
                  </div>
                   <div className="text-center mt-6 space-y-3">
                      <p className="text-xs font-semibold text-white/60 tracking-wide">
                          Moderado diariamente • 100% grátis
                      </p>
                      <Link href="https://wa.me/5571991511702" target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white transition-colors inline-flex items-center gap-2">
                           <Phone className="h-3 w-3" /> Contato oficial: +55 71 99151-1702
                      </Link>
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
                <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-md rounded-2xl shadow-2xl p-6 flex flex-col">
                  <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl font-bold text-white">Networking no Discord (calls semanais)</DialogTitle>
                    <DialogDescription className="text-white/80 mt-2">
                      Sala de bate papo, resenha e trabalho.
                    </DialogDescription>
                  </DialogHeader>
                   <ul className="space-y-2 text-white/90 py-6 text-sm">
                      <li className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span>Encontros toda semana</span>
                      </li>
                      <li className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span>Faça networking com gente de alto nível</span>
                      </li>
                      <li className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span>Descubra estratégias avançadas</span>
                      </li>
                  </ul>
                  <div className="flex flex-col items-center gap-3 mt-auto">
                    <Button variant="destructive" className="w-full font-bold" onClick={() => handleNotificationClick('https://discord.gg/N22CvMkpUV', 'Grupo de Networking Discord')}>
                      Entrar no servidor agora <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="w-full text-white/70 hover:text-white"
                        onClick={() => copyToClipboard('https://discord.gg/N22CvMkpUV')}
                     >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar o link do servidor
                    </Button>
                  </div>
                   <div className="text-center mt-6">
                      <p className="text-xs text-white/70">
                          Dono: <span className="font-semibold">@garbiel1</span>
                      </p>
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
                <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white w-[90vw] max-w-md rounded-2xl p-6 flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">Siga no Instagram</DialogTitle>
                    <DialogDescription className="text-center text-white/80 mt-2">
                      Bastidores, provas e insights diários.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center flex-grow pt-6 gap-4">
                    <Button variant="destructive" className="w-full font-bold" onClick={() => handleNotificationClick('https://www.instagram.com/gabrielmaiagt/', 'Instagram')}>
                      Seguir no Instagram <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                   <div className="flex justify-center pt-4 mt-auto">
                    <div className="inline-flex items-center justify-center text-xs bg-white/10 text-white/70 px-3 py-1 rounded-full">
                      <Instagram className="h-3 w-3 mr-2" />
                      @gabrielmaiagt
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </main>
        
        <AnimatedSection animation="fade-up" delay={200}>
            <Dashboard />
        </AnimatedSection>

        {/* Footer */}
        <footer className="py-8 mt-4 text-center">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Gabriel Maia — Todos os direitos reservados.
          </p>
          <p className="text-xs text-neutral-300 mt-4 px-4">
            Se você não conseguir acessar algum link clicando nos botões, clique nos 3 pontinhos e clique em "Abrir no navegador".
          </p>
        </footer>
      </div>
    </div>
  );
}

