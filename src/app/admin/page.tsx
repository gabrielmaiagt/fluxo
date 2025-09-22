
'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AreaChart, BarChart as BarChartIcon, BellRing, Check, Clock, Info, List, Loader2, RefreshCw, Pointer } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where, Timestamp, orderBy, limit, getDocs } from 'firebase/firestore';
import { format, subDays, startOfDay, eachDayOfInterval, endOfDay } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Area, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart as RechartsAreaChart, CartesianGrid } from 'recharts';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


interface ClickData {
    timestamp: Timestamp;
    label: string;
}

interface ChartData {
    date: string;
    clicks: number;
}

type TimeRange = '7d' | '30d' | 'all';

function ClicksChart() {
    const [allClicks, setAllClicks] = useState<ClickData[] | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [timeRange, setTimeRange] = useState<TimeRange>('7d');
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    // 1. Fetch all data once
    useEffect(() => {
        setIsLoading(true);
        const q = query(collection(db, "live_notifications"), orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const clicks = snapshot.docs.map(doc => doc.data() as ClickData);
            setAllClicks(clicks);
            setIsLoading(false);
        }, (error) => {
            console.error("Erro ao buscar dados de cliques:", error);
            toast({
                title: "Erro ao carregar dados",
                description: "Não foi possível buscar o histórico de cliques.",
                variant: "destructive",
            });
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [toast]);

    // 2. Process data when timeRange or allClicks changes
    useEffect(() => {
        if (isLoading || allClicks === null) return;

        const now = new Date();
        const getStartDate = (range: TimeRange) => {
            if (range === '7d') return startOfDay(subDays(now, 6));
            if (range === '30d') return startOfDay(subDays(now, 29));
            if (allClicks.length > 0) {
                // For 'all', find the earliest click date
                const firstClickDate = allClicks[0].timestamp.toDate();
                return startOfDay(firstClickDate);
            }
            return startOfDay(now); // Default if no clicks
        };
        
        const startDate = getStartDate(timeRange);
        const endDate = endOfDay(now);

        // Ensure interval is valid
        if (startDate > endDate) {
             setChartData([]);
             return;
        }

        const dateInterval = eachDayOfInterval({ start: startDate, end: endDate });

        const clicksByDay = allClicks.reduce((acc, click) => {
            const day = format(click.timestamp.toDate(), 'yyyy-MM-dd');
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        const dataForChart = dateInterval.map(date => {
            const formattedDay = format(date, 'yyyy-MM-dd');
            return {
                date: format(date, 'dd/MM'),
                clicks: clicksByDay[formattedDay] || 0,
            };
        });

        setChartData(dataForChart);

    }, [timeRange, allClicks, isLoading]);
    
    return (
        <Card className="w-full bg-card">
            <CardHeader>
                <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle>Visão Geral de Cliques</CardTitle>
                        <CardDescription>Quantidade de cliques por dia.</CardDescription>
                    </div>
                     <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)} className="w-full sm:w-auto">
                        <TabsList className="grid w-full grid-cols-3 h-9">
                            <TabsTrigger value="7d" className="text-xs px-2">7 dias</TabsTrigger>
                            <TabsTrigger value="30d" className="text-xs px-2">30 dias</TabsTrigger>
                            <TabsTrigger value="all" className="text-xs px-2">Tudo</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center h-72">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : chartData.length > 1 ? (
                    <ResponsiveContainer width="100%" height={300}>
                         <RechartsAreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                             <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                            <XAxis 
                                dataKey="date" 
                                stroke="hsl(var(--foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                            />
                            <YAxis 
                                stroke="hsl(var(--foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tickFormatter={(value) => `${value}`}
                                allowDecimals={false}
                             />
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                            <Tooltip
                                 content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                          <div className="grid grid-cols-1 gap-2">
                                            <div className="flex flex-col">
                                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                Data
                                              </span>
                                              <span className="font-bold text-foreground">
                                                {label}
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
                                  cursor={{ fill: 'hsl(var(--accent))' }}
                            />
                            <Area 
                                type="natural" 
                                dataKey="clicks" 
                                stroke="hsl(var(--primary))" 
                                fill="url(#gradient)" 
                                strokeWidth={2}
                            />
                        </RechartsAreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex flex-col items-center justify-center h-72 text-center">
                        <AreaChart className="h-10 w-10 text-muted-foreground" />
                         {allClicks && allClicks.length > 0 ? (
                            <p className="mt-4 text-sm text-muted-foreground">Dados insuficientes para exibir o gráfico. É necessário pelo menos 2 dias de atividade.</p>
                        ) : (
                            <>
                                <p className="mt-4 text-sm text-muted-foreground">Nenhum dado de clique encontrado ainda.</p>
                                <p className="text-xs text-muted-foreground">Compartilhe sua página para começar a coletar dados.</p>
                            </>
                        )}
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

const ALL_TRACKABLE_LINKS = [
    'Grupo Pré-venda Fluxo de Caixa',
    'Mentoria 1:1',
    'Grupo de Networking WhatsApp',
    'Grupo de Networking Discord',
    'Instagram'
];

function ClickCountsList() {
    const [counts, setCounts] = useState<{ id: string; label: string; count: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize with all links having 0 clicks
        const initialCounts = ALL_TRACKABLE_LINKS.map(label => ({
            id: label,
            label: label,
            count: 0
        }));

        const q = query(collection(db, "clickCounts"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const countsFromDb = snapshot.docs.reduce((acc, doc) => {
                const data = doc.data();
                acc[data.label] = data.count || 0;
                return acc;
            }, {} as {[key: string]: number});
            
            const mergedCounts = initialCounts.map(item => ({
                ...item,
                count: countsFromDb[item.label] || 0
            })).sort((a, b) => b.count - a.count); // Sort by count descending

            setCounts(mergedCounts);
            setIsLoading(false);
        }, (error) => {
            console.error("Erro ao buscar contagem de cliques:", error);
            setCounts(initialCounts); // Fallback to initial state on error
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Card className="w-full bg-card">
            <CardHeader>
                <CardTitle>Contagem de Cliques por Link</CardTitle>
                <CardDescription>Total de cliques registrados para cada botão.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : counts.length > 0 ? (
                    <div className="space-y-4">
                        {counts.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                                <p className="text-sm font-medium">{item.label}</p>
                                <div className="flex items-center gap-2 text-sm font-bold">
                                    <Pointer className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-primary w-4 text-right">{item.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                        <Pointer className="h-10 w-10 text-muted-foreground" />
                        <p className="mt-4 text-sm text-muted-foreground">Nenhum clique contabilizado ainda.</p>
                         <p className="text-xs text-muted-foreground">Os links rastreáveis aparecerão aqui.</p>
                    </div>
                )}
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
                  {format(click.timestamp, "HH:mm dd/MM/yyyy", { locale: ptBR })}
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
      <div className="w-full max-w-4xl space-y-8">
        <LiveNotificationsCard />
        <ClicksChart />
        <ClickCountsList />
        <RecentClicksLog />
      </div>
    </div>
  );
}
