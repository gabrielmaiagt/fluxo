'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BellRing, Info } from 'lucide-react';

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

  const handleRequestPermission = async () => {
    if (!isSupported) return;

    setIsLoading(true);
    try {
      const currentPermission = await Notification.requestPermission();
      setPermission(currentPermission);

      if (currentPermission === 'granted') {
        toast({
          title: "Sucesso!",
          description: "As notificações nativas do navegador foram ativadas.",
          variant: "default",
        });
        new Notification("Notificações Ativadas", {
          body: "Você receberá alertas locais neste navegador.",
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
            Gerenciar notificações e outras configurações do site.
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
              <Alert variant="default" className="border-primary text-primary-foreground">
                  <Info className="h-4 w-4 !text-primary" />
                  <AlertTitle>Notificações Nativas do Navegador</AlertTitle>
                  <AlertDescription>
                    <p>Esta funcionalidade usa a API nativa do navegador para exibir notificações. Ela não usa Firebase Cloud Messaging ou chaves VAPID.</p>
                    <p className="mt-2 text-xs">Os alertas só aparecerão se esta página ou o site estiverem abertos em alguma aba.</p>
                  </AlertDescription>
                </Alert>
              
              <p className="text-sm text-muted-foreground">
                Clique no botão abaixo para permitir que este navegador exiba notificações nativas.
              </p>
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
