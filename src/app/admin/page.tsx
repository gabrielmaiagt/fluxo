'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, BellRing, Check, Info, Loader2, RefreshCw } from 'lucide-react';
import { enablePushNotifications } from '@/lib/push';
import { getClickCounts, type ClickCount } from '@/ai/flows/getClickCounts';

import { Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';


// Componente do Dashboard de Cliques
function ClicksDashboard() {
  const [data, setData] = useState<ClickCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchClickData = async () => {
    setIsLoading(true);
    try {
      const clickData = await getClickCounts();
      setData(clickData);
    } catch (error) {
      console.error("Erro ao buscar dados de cliques:", error);
      toast({
        title: "Erro ao carregar dashboard",
        description: "Não foi possível buscar os dados de contagem de cliques.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClickData();
  }, []);

  return (
    <Card className="w-full bg-card mt-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="grid gap-2">
            <CardTitle>Dashboard de Cliques</CardTitle>
            <CardDescription>
                Quantidade de cliques em cada botão.
            </CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={fetchClickData} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            <span className="sr-only">Atualizar</span>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && !data.length ? (
            <div className="flex items-center justify-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical" margin={{ left: 100 }}>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="label" 
                type="category" 
                stroke="hsl(var(--foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                width={200}
                interval={0}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent))' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Botão
                            </span>
                            <span className="font-bold text-foreground">
                              {payload[0].payload.label}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Cliques
                            </span>
                            <span className="font-bold text-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
                <BarChart className="h-10 w-10 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">Nenhum dado de clique encontrado ainda.</p>
                <p className="text-xs text-muted-foreground">Compartilhe sua página para começar.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}


// Componente de Ativação de Notificações
function PushNotificationsCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkSupport = () => {
      const isClient = typeof window !== 'undefined';
      const supported = isClient && 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
      setIsSupported(supported);
      if (supported) {
        setPermission(Notification.permission);
      }
    };
    checkSupport();
  }, []);

  const handleRequestPermission = async () => {
    if (!isSupported) return;
    setIsLoading(true);
    try {
      await enablePushNotifications();
      setPermission('granted');
      toast({
        title: "Sucesso!",
        description: "Você agora receberá notificações push sobre as ações dos usuários.",
      });
      new Notification("Notificações Ativadas", {
        body: "Tudo pronto para receber alertas em tempo real!",
        icon: 'https://i.postimg.cc/zGxkL1Hp/logo-escura.png'
      });
    } catch (error: any) {
      console.error("Erro ao ativar notificações:", error);
      toast({
        title: "Erro ao ativar notificações",
        description: `${error.code ? `(${error.code})` : ''} ${error.message}`,
        variant: "destructive",
        duration: 9000,
      });
      if (error.message.includes('negada')) {
        setPermission('denied');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const getButtonText = () => {
    if (isLoading) return <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ativando...</>;
    if (permission === 'granted') return <><Check className="mr-2 h-4 w-4" /> Notificações Ativadas</>;
    if (permission === 'denied') return 'Permissão Negada';
    return 'Ativar Notificações Push';
  };

  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle>Painel de Administrador</CardTitle>
        <CardDescription>Receba notificações push em tempo real sobre a atividade dos usuários.</CardDescription>
      </CardHeader>
      <CardContent>
        {isSupported === false && (
          <Alert variant="destructive">
            <BellRing className="h-4 w-4" />
            <AlertTitle>Navegador não compatível!</AlertTitle>
            <AlertDescription>Seu navegador atual não suporta a API de Notificações Push.</AlertDescription>
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
            <Button onClick={handleRequestPermission} disabled={isLoading || permission === 'granted' || permission === 'denied'} className="w-full">
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
  );
}

// Página principal do Admin
export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-2xl space-y-8">
        <PushNotificationsCard />
        <ClicksDashboard />
      </div>
    </div>
  );
}
