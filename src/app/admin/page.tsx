'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { enableAdminPush } from '@/lib/push';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BellRing, Info } from 'lucide-react';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    const isSupportedNow = isClient && 'serviceWorker' in navigator && 'Notification' in window;
    setIsSupported(isSupportedNow);
    if (isClient) {
      // Basic check for iOS devices
      setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);
    }
  }, []);

  const handleEnablePush = async () => {
    setIsLoading(true);
    try {
      // Usando um ID fixo para o admin, como no seu exemplo.
      const adminId = 'gabriel'; 
      await enableAdminPush(adminId);
      
      toast({
        title: "Sucesso!",
        description: "Seu navegador está registrado para receber notificações.",
        variant: "default",
      });

    } catch (error: any) {
      console.error(error);
      let description = error.message || "Verifique o console para mais detalhes.";
      if (error.message.includes('negada')) {
        description = "A permissão foi negada. Verifique as configurações de notificação do seu navegador (no ícone de cadeado 🔒 na barra de endereço) e tente novamente."
      }
      
      toast({
        title: "Erro ao ativar notificações",
        description: description,
        variant: "destructive",
        duration: 9000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card">
        <CardHeader>
          <CardTitle>Painel de Administrador</CardTitle>
          <CardDescription>
            Use esta página para gerenciar as configurações do site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSupported === false && (
             <Alert variant="destructive">
                <BellRing className="h-4 w-4" />
                <AlertTitle>Navegador não compatível!</AlertTitle>
                <AlertDescription>
                    Seu navegador atual não suporta notificações push. Por favor, tente com outro navegador como Chrome ou Firefox em um desktop, ou siga as instruções para iOS se aplicável.
                </AlertDescription>
            </Alert>
          )}

          {isSupported && (
            <div className="space-y-4">
              {isIOS && (
                <Alert variant="default" className="border-primary text-primary-foreground">
                  <Info className="h-4 w-4 !text-primary" />
                  <AlertTitle>Instruções para iOS (iPhone/iPad)</AlertTitle>
                  <AlertDescription className="space-y-2">
                    <p>Para ativar notificações no iOS, você precisa primeiro adicionar este site à sua Tela de Início:</p>
                    <ol className="list-decimal pl-5 text-sm">
                      <li>Toque no ícone de <strong>Compartilhar</strong> no Safari.</li>
                      <li>Selecione <strong>"Adicionar à Tela de Início"</strong>.</li>
                      <li>Feche o navegador e abra o site pelo novo ícone na sua tela.</li>
                      <li>Clique no botão abaixo dentro do "aplicativo" da tela de início.</li>
                    </ol>
                  </AlertDescription>
                </Alert>
              )}
              <p className="text-sm text-muted-foreground">
                Clique no botão abaixo para permitir que este navegador receba notificações
                push quando os usuários realizarem ações importantes no site.
              </p>
              <Button 
                onClick={handleEnablePush} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Ativando...' : 'Ativar Notificações'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
