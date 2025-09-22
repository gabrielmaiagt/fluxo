
'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, BellRing, Check, Clock, Info, List, Loader2, RefreshCw } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where, Timestamp, orderBy, limit, getDocs } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface ClickCount {
    label: string;
    count: number;
}

// Componente do Dashboard de Cliques
function ClicksDashboard() {
  const [data, setData] = useState<ClickCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchClickData = async () => {
    setIsLoading(true);
    try {
        const q = query(collection(db, "clickCounts"), orderBy('count', 'desc'));
        const querySnapshot = await getDocs(q);
        const clickData = querySnapshot.docs.map(doc => doc.data() as ClickCount);
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
    // Adiciona um listener para atualizações em tempo real
    const q = query(collection(db, "clickCounts"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const clickData = snapshot.docs.map(doc => doc.data() as ClickCount).sort((a, b) => b.count - a.count);
        setData(clickData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card className="w-full bg-card">
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
function LiveNotificationsCard() {
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const startTimeRef = useRef(new Date());

  useEffect(() => {
    // Define o estado inicial da permissão ao carregar o componente
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Listener para novas notificações do Firestore
  useEffect(() => {
    if (permission !== 'granted') return;

    const q = query(
      collection(db, "live_notifications"),
      where('timestamp', '>', startTimeRef.current),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          console.log("Nova notificação recebida:", data);
          new Notification("🔔 Novo Clique no Site!", {
            body: `Um usuário clicou em: ${data.label}`,
            icon: 'https://i.postimg.cc/zGxkL1Hp/logo-escura.png',
            tag: change.doc.id, // Evita notificações duplicadas
          });
        }
      });
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, [permission]);


  const handleRequestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Este navegador não suporta notificações.');
      return;
    }

    const currentPermission = await Notification.requestPermission();
    setPermission(currentPermission);

    if (currentPermission === 'granted') {
      new Notification("Notificações Ativadas", {
        body: "Tudo pronto para receber alertas em tempo real nesta guia!",
        icon: 'https://i.postimg.cc/zGxkL1Hp/logo-escura.png'
      });
    }
  };
  
  const getButtonText = () => {
    if (permission === 'granted') return <><Check className="mr-2 h-4 w-4" /> Notificações Ativadas</>;
    if (permission === 'denied') return 'Permissão Negada';
    return 'Ativar Notificações';
  };
  
  // Se as notificações já estiverem ativadas, não renderiza nada.
  if (permission === 'granted') {
    return null;
  }

  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle>Painel de Administrador</CardTitle>
        <CardDescription>Receba notificações em tempo real sobre a atividade dos usuários.</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="space-y-4">
            <Alert variant="default" className="border-primary/50 text-primary-foreground">
              <Info className="h-4 w-4 !text-primary" />
              <AlertTitle>Como funciona?</AlertTitle>
              <AlertDescription>
                <p>Clique no botão para permitir as notificações. Sempre que um usuário clicar em um link, uma notificação aparecerá no seu dispositivo, **desde que esta página de admin esteja aberta em uma guia**.</p>
              </AlertDescription>
            </Alert>
            <Button onClick={handleRequestPermission} disabled={permission === 'granted' || permission === 'denied'} className="w-full">
              {getButtonText()}
            </Button>
            {permission === 'denied' && (
              <p className="text-xs text-center text-destructive">
                Você bloqueou as notificações. Para reativá-las, você precisa alterar as permissões nas configurações do seu navegador (geralmente no ícone de cadeado 🔒 na barra de endereço).
              </p>
            )}
          </div>
      </CardContent>
    </Card>
  );
}

// Componente de Log de Cliques Recentes
function RecentClicksLog() {
  const [clicks, setClicks] = useState<{ id: string; label: string; timestamp: Date }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "live_notifications"),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const recentClicks = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          label: data.label,
          // Converte o Timestamp do Firestore para um objeto Date do JS
          timestamp: (data.timestamp as Timestamp).toDate(), 
        };
      });
      setClicks(recentClicks);
      setIsLoading(false);
    }, (error) => {
      console.error("Erro ao buscar log de cliques:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>Os 10 últimos cliques registrados.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : clicks.length > 0 ? (
          <div className="space-y-4">
            {clicks.map((click) => (
              <div key={click.id} className="flex items-center justify-between">
                <p className="text-sm font-medium">{click.label}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatDistanceToNow(click.timestamp, { addSuffix: true, locale: ptBR })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <List className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">Nenhuma atividade registrada ainda.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


// Página principal do Admin
export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl space-y-8">
        <LiveNotificationsCard />
        <RecentClicksLog />
        <ClicksDashboard />
      </div>
    </div>
  );
}

    