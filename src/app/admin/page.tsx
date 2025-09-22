
'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AreaChart, BellRing, Check, Clock, Info, List, Loader2, Pointer, Eye, Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where, Timestamp, orderBy, limit } from 'firebase/firestore';
import { format, subDays, startOfDay, eachDayOfInterval, endOfDay, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Area, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart as RechartsAreaChart, CartesianGrid } from 'recharts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { clearAllAnalytics } from '@/actions/analytics';


interface ClickData {
    timestamp: Timestamp;
    label: string;
}

// All trackable links must be defined here
const ALL_TRACKABLE_LINKS = [
    'Grupo Pré-venda Fluxo de Caixa',
    'Mentoria 1:1',
    'Grupo de Networking WhatsApp',
    'Grupo de Networking Discord',
    'Instagram'
];

const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
];

interface ChartData {
    date: string;
    [key: string]: number | string; // Each key is a button label
}

type TimeRangePreset = 'today' | 'yesterday' | '7d' | '30d' | 'this_month' | 'all' | 'custom';

function ClicksChart() {
    const [allClicks, setAllClicks] = useState<ClickData[] | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [timeRange, setTimeRange] = useState<TimeRangePreset>('7d');
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: subDays(new Date(), 6),
      to: new Date(),
    });
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [isPopoverOpen, setPopoverOpen] = useState(false);


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
    
    useEffect(() => {
        if (timeRange === 'custom') return;

        const now = new Date();
        let fromDate: Date | undefined;
        let toDate: Date | undefined = now;

        switch(timeRange) {
            case 'today':
                fromDate = now;
                break;
            case 'yesterday':
                fromDate = subDays(now, 1);
                toDate = subDays(now, 1);
                break;
            case '7d':
                fromDate = subDays(now, 6);
                break;
            case '30d':
                fromDate = subDays(now, 29);
                break;
            case 'this_month':
                fromDate = startOfMonth(now);
                break;
            case 'all':
                fromDate = allClicks?.[0]?.timestamp.toDate() ?? startOfDay(subDays(now, 3650));
                toDate = endOfDay(now);
                break;
            default:
                fromDate = undefined;
                toDate = undefined;
        }
        setDateRange({ from: fromDate, to: toDate });
    }, [timeRange, allClicks]);

    useEffect(() => {
        if (isLoading || allClicks === null || !dateRange?.from) {
             setChartData([]);
             return;
        };

        const startDate = startOfDay(dateRange.from);
        const endDate = dateRange.to ? endOfDay(dateRange.to) : endOfDay(new Date());

        if (startDate > endDate) {
             setChartData([]);
             return;
        }

        const dateInterval = eachDayOfInterval({ start: startDate, end: endDate });

        const clicksByDayAndLabel = allClicks.reduce((acc, click) => {
            const day = format(click.timestamp.toDate(), 'yyyy-MM-dd');
            if (!acc[day]) {
                acc[day] = {};
            }
            acc[day][click.label] = (acc[day][click.label] || 0) + 1;
            return acc;
        }, {} as { [key: string]: { [label: string]: number } });

        const dataForChart = dateInterval.map(date => {
            const formattedDay = format(date, 'yyyy-MM-dd');
            const dayData: ChartData = {
                date: format(date, 'dd/MM'),
            };

            ALL_TRACKABLE_LINKS.forEach(label => {
                dayData[label] = clicksByDayAndLabel[formattedDay]?.[label] || 0;
            });
            
            return dayData;
        });

        setChartData(dataForChart);

    }, [dateRange, allClicks, isLoading]);
    
    const handleDateRangeChange = (range: DateRange | undefined) => {
        setTimeRange('custom');
        setDateRange(range);
    }
    
    const DatePresetButton = ({ label, preset }: { label: string; preset: TimeRangePreset }) => (
        <Button
            variant="ghost"
            className={cn("w-full justify-start", timeRange === preset && 'bg-accent text-accent-foreground')}
            onClick={() => {
                setTimeRange(preset);
                setPopoverOpen(false);
            }}
        >
            {label}
        </Button>
    );

    return (
        <Card className="w-full bg-card">
            <CardHeader>
                <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle>Visão Geral de Cliques</CardTitle>
                        <CardDescription>Quantidade de cliques por dia, por botão.</CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                  id="date"
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !dateRange && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {dateRange?.from ? (
                                    dateRange.to && dateRange.to !== dateRange.from ? (
                                      <>
                                        {format(dateRange.from, "dd/MM/yy", {locale: ptBR})} -{" "}
                                        {format(dateRange.to, "dd/MM/yy", {locale: ptBR})}
                                      </>
                                    ) : (
                                      format(dateRange.from, "dd/MM/yy", {locale: ptBR})
                                    )
                                  ) : (
                                    <span>Selecione um período</span>
                                  )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="flex w-auto p-0" align="end">
                                 <div className="flex flex-col space-y-2 border-r p-4">
                                     <DatePresetButton label="Hoje" preset="today" />
                                     <DatePresetButton label="Ontem" preset="yesterday" />
                                     <DatePresetButton label="Últimos 7 dias" preset="7d" />
                                     <DatePresetButton label="Últimos 30 dias" preset="30d" />
                                     <DatePresetButton label="Este mês" preset="this_month" />
                                     <DatePresetButton label="Máximo" preset="all" />
                                </div>
                                <Calendar
                                  initialFocus
                                  mode="range"
                                  defaultMonth={dateRange?.from}
                                  selected={dateRange}
                                  onSelect={handleDateRangeChange}
                                  numberOfMonths={2}
                                  locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>
                     </div>
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
                                {ALL_TRACKABLE_LINKS.map((label, index) => (
                                     <linearGradient key={label} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                         <stop offset="5%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8}/>
                                         <stop offset="95%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.1}/>
                                     </linearGradient>
                                ))}
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
                                      const total = payload.reduce((sum, item) => sum + (item.value as number), 0);
                                      return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm min-w-[200px]">
                                          <div className="grid grid-cols-1 gap-2">
                                            <div className="flex flex-col mb-1 border-b pb-1">
                                              <span className="font-bold text-foreground text-base">
                                                {label}
                                              </span>
                                              <span className="text-sm text-muted-foreground">
                                                Total: {total} cliques
                                              </span>
                                            </div>
                                            {payload.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                                        <span className="text-sm text-muted-foreground">{item.name}</span>
                                                    </div>
                                                    <span className="font-bold text-foreground text-sm">
                                                        {item.value}
                                                    </span>
                                                </div>
                                            )).reverse()}
                                          </div>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                  cursor={{ fill: 'hsl(var(--accent))' }}
                            />
                             {ALL_TRACKABLE_LINKS.map((label, index) => (
                                <Area 
                                    key={label}
                                    type="natural" 
                                    dataKey={label}
                                    name={label}
                                    stackId="1"
                                    stroke={COLORS[index % COLORS.length]}
                                    fill={`url(#gradient-${index})`}
                                    strokeWidth={2}
                                />
                             ))}
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
  
  if (permission === 'granted') {
    return null;
  }
  
  const isButtonDisabled = permission === 'denied';

  const getButtonText = () => {
    if (permission === 'denied') return 'Permissão Negada';
    return 'Ativar Notificações';
  };

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
            <Button onClick={handleRequestPermission} disabled={isButtonDisabled} className="w-full">
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

function SiteVisitsCard() {
    const [visitCount, setVisitCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "visits"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setVisitCount(snapshot.size);
            setIsLoading(false);
        }, (error) => {
            console.error("Erro ao buscar contagem de visitas:", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Card className="w-full bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Visitas no Site</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? (
                     <div className="flex items-center justify-center h-10">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <div className="text-2xl font-bold">{visitCount}</div>
                )}
                <p className="text-xs text-muted-foreground">
                    Total de visitas únicas diárias
                </p>
            </CardContent>
        </Card>
    );
}

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
      orderBy('timestamp', 'desc')
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
        <CardTitle>Log de Cliques</CardTitle>
        <CardDescription>Todos os cliques registrados em ordem cronológica.</CardDescription>
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

function DangerZone() {
  const { toast } = useToast();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearData = async () => {
    setIsClearing(true);
    const result = await clearAllAnalytics();
    if (result.success) {
      toast({
        title: "Sucesso!",
        description: "Todos os dados de visitas e cliques foram apagados.",
        variant: "default",
      });
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível apagar os dados. Tente novamente.",
        variant: "destructive",
      });
    }
    setIsClearing(false);
  };

  return (
    <Card className="w-full bg-card border-destructive">
      <CardHeader>
        <CardTitle>Ações Perigosas</CardTitle>
        <CardDescription>
          Essas ações são irreversíveis. Use com cuidado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar Todos os Dados
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso irá apagar permanentemente
                todos os registros de visitas, cliques e notificações.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isClearing}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleClearData}
                disabled={isClearing}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isClearing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isClearing ? 'Limpando...' : 'Sim, limpar tudo'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Esta operação removerá todos os dados das coleções `visits`, `live_notifications`, e `clickCounts`.
        </p>
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
        <div className="grid gap-8 md:grid-cols-2">
            <SiteVisitsCard />
            {/* Placeholder for another card if needed */}
        </div>
        <ClicksChart />
        <ClickCountsList />
        <RecentClicksLog />
        <DangerZone />
      </div>
    </div>
  );
}
