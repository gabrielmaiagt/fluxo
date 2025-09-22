'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BellRing, Info } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where, Timestamp } from 'firebase/firestore';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    const supported = isClient && 'Notification' in window;
    setIsSupported(supported);
    if (supported) {
      setPermission(Notification.permission);
    }
  }, []);
  
  // Firestore listener
  useEffect(() => {
    if (permission !== 'granted') return;

    const fiveMinutesAgo = Timestamp.fromMillis(Date.now() - 5 * 60 * 1000);
    const q = query(collection(db, "userActions"), where("timestamp", ">=", fiveMinutesAgo));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const action = change.doc.data();
          new Notification('🔔 Nova Ação no Site', {
            body: `Um usuário clicou em: ${action.label}`,
            icon: '/favicon.ico' // Você pode mudar este ícone
          });
        }
      });
    }, (error) => {
        console.error("Erro ao ouvir o Firestore:", error);
        toast({
          title: "Erro de Conexão",
          description: "Não foi possível ouvir as atualizações do servidor.",
          variant: "destructive",
        });
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [permission, toast]);


  const handleRequestPermission = async () => {
    if (!isSupported) return;

    setIsLoading(true);
    try {
      const currentPermission = await Notification.requestPermission();
      setPermission(currentPermission);

      if (currentPermission === 'granted') {
        toast({
          title: "Sucesso!",
          description: "As notificações locais foram ativadas para esta sessão.",
          variant: "default",
        });
        new Notification("Notificações Ativadas", {
          body: "Você receberá alertas enquanto esta página estiver aberta.",
          icon: "/favicon.ico"
        });
      } else {
        throw new Error("A permissão para notificações foi negada.");
      }

    } catch (error: any) {
      console.error("Erro ao pedir permissão:", error);
      toast({
        title: "Erro ao ativar notificações",
        description: `Detalhes: ${error.message}`,
        variant: "destructive",
        duration: 9000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getButtonText = () => {
    if(isLoading) return 'Ativando...';
    if(permission === 'granted') return 'Notificações Ativadas';
    if(permission === 'denied') return 'Permissão Negada';
    return 'Ativar Notificações Locais';
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card">
        <CardHeader>
          <CardTitle>Painel de Administrador</CardTitle>
          <CardDescription>
            Ative as notificações para receber alertas em tempo real.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSupported === false && (
             <Alert variant="destructive">
                <BellRing className="h-4 w-4" />
                <AlertTitle>Navegador não compatível!</AlertTitle>
                <AlertDescription>
                    Seu navegador atual não suporta a API de Notificações.
                </AlertDescription>
            </Alert>
          )}

          {isSupported && (
            <div className="space-y-4">
                <Alert variant="default" className="border-primary/50 text-primary-foreground">
                    <Info className="h-4 w-4 !text-primary" />
                    <AlertTitle>Como funciona?</AlertTitle>
                    <AlertDescription>
                        <p>Ao ativar, seu navegador passará a receber notificações de novos cliques de usuários. Para que isso funcione, <strong>esta página de admin deve permanecer aberta</strong> em uma aba.</p>
                    </AlertDescription>
                </Alert>
              <Button 
                onClick={handleRequestPermission} 
                disabled={isLoading || permission === 'granted' || permission === 'denied'}
                className="w-full"
              >
                {getButtonText()}
              </Button>
               {permission === 'denied' && (
                 <p className="text-xs text-center text-destructive">
                   Você bloqueou as notificações. Para reativá-las, você precisa alterar as permissões nas configurações do seu navegador (geralmente no ícone de cadeado 🔒 na barra de endereço).
                 </p>
               )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
