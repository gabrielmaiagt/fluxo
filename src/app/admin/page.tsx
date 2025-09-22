'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { enableAdminPush } from '@/lib/push';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      toast({
        title: "Erro ao ativar notificações",
        description: error.message || "Verifique o console para mais detalhes.",
        variant: "destructive",
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
        </CardContent>
      </Card>
    </div>
  );
}
