'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BellRing, Check, Info } from 'lucide-react';
import { enablePushNotifications } from '@/lib/push';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    // O suporte a Push é mais complexo, envolve 'Notification', 'serviceWorker' e 'PushManager'
    const supported = isClient && 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
    setIsSupported(supported);
    if (supported) {
      setPermission(Notification.permission);
    }
  }, []);

  const handleRequestPermission = async () => {
    if (!isSupported) return;

    setIsLoading(true);
    try {
      await enablePushNotifications();
      
      setPermission('granted'); // Atualiza o estado da permissão na UI
      
      toast({
        title: "Sucesso!",
        description: "Você agora receberá notificações push sobre as ações dos usuários.",
        variant: "default",
      });

      // Notificação de confirmação
      new Notification("Notificações Ativadas", {
        body: "Tudo pronto para receber alertas em tempo real!",
        icon: "/favicon.ico"
      });

    } catch (error: any) {
      console.error("Erro ao ativar notificações:", error);
      toast({
        title: "Erro ao ativar notificações",
        description: `Detalhes: ${error.message}`,
        variant: "destructive",
        duration: 9000,
      });
      // Se o erro foi de permissão, atualiza o estado da UI
      if (error.message.includes('negada')) {
        setPermission('denied');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const getButtonText = () => {
    if(isLoading) return 'Ativando...';
    if(permission === 'granted') return ( <><Check className="mr-2 h-4 w-4" /> Notificações Ativadas</> );
    if(permission === 'denied') return 'Permissão Negada';
    return 'Ativar Notificações Push';
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card">
        <CardHeader>
          <CardTitle>Painel de Administrador</CardTitle>
          <CardDescription>
            Receba notificações push em tempo real sobre a atividade dos usuários.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSupported === false && (
             <Alert variant="destructive">
                <BellRing className="h-4 w-4" />
                <AlertTitle>Navegador não compatível!</AlertTitle>
                <AlertDescription>
                    Seu navegador atual não suporta a API de Notificações Push.
                </AlertDescription>
            </Alert>
          )}

          {isSupported && (
            <div className="space-y-4">
                <Alert variant="default" className="border-primary/50 text-primary-foreground">
                    <Info className="h-4 w-4 !text-primary" />
                    <AlertTitle>Como funciona?</AlertTitle>
                    <AlertDescription>
                        <p>Clique no botão abaixo para permitir as notificações. Uma vez ativado, você receberá um alerta no seu dispositivo sempre que um usuário clicar em um link importante, mesmo com esta página fechada.</p>
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
