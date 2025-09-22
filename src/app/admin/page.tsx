'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { enableAdminPush } from '@/lib/push';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BellRing, Terminal } from 'lucide-react';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Verifica o suporte apenas no lado do cliente
    setIsSupported(
      typeof window !== 'undefined' &&
        'serviceWorker' in navigator &&
        'Notification' in window
    );
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
                    Seu navegador atual não suporta notificações push. Por favor, tente com outro navegador como Chrome ou Firefox em um desktop.
                </AlertDescription>
            </Alert>
          )}

          {isSupported && (
            <div className="space-y-4">
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
