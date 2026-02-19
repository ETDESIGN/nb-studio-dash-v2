
import React, { useState, useMemo, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';
import { 
  Activity, RefreshCw, Zap, Bot,
  DollarSign, Check,
  Settings, ListTodo,
  Rocket,
  ShieldCheck, Trash2, Calendar, Sun,
  Construction,
  Cpu,
  Brain,
  AlertOctagon,
  UserCircle,
  MessageSquare,
  Database,
  Hash,
  Search,
  MoreHorizontal,
  Send,
  ToggleLeft,
  ToggleRight,
  Wifi,
  Power,
  Moon,
  Folder,
  FileCode,
  FileText,
  FileImage,
  Tv,
  Eye,
  Download,
  Terminal,
  Command,
  ChevronRight,
  Server,
  LayoutDashboard,
  Map,
  Globe,
  ArrowLeft,
  Loader2,
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  X,
  AlertTriangle,
  Info
} from 'lucide-react';
import clsx from 'clsx';

import { Shell, QuickActionButton } from './components/layout/Shell';
import { WidgetFrame } from './components/ui/WidgetFrame';
import { Modal } from './components/ui/Modal';
import { Agent, ViewType, VaultFile, Services, Notification, NotificationType, NotificationAction } from './types';
import { INITIAL_DATA, fetchMockData, generateChartData } from './mockData';

// ==========================================
// 1. SPECIFIC WIDGET RECIPES
// ==========================================

// A. The "Rings" Widget (Apple Watch Style)
const RingsWidget = ({ cpu, memory, budget }: { cpu: number, memory: number, budget: number }) => {
  const radius = 38;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  const Ring = ({ percent, color, size }: any) => {
    return (
      <div className="relative flex items-center justify-center">
         <svg height={radius * 2 * size} width={radius * 2 * size} className="transform -rotate-90">
             <circle
               stroke="currentColor"
               className="text-slate-100 dark:text-slate-700"
               strokeWidth={stroke}
               fill="transparent"
               r={normalizedRadius * size}
               cx={radius * size}
               cy={radius * size}
             />
             <circle
               stroke="currentColor"
               className={color}
               strokeWidth={stroke}
               strokeDasharray={circumference * size}
               strokeDashoffset={circumference * size - (percent / 100) * (circumference * size)}
               strokeLinecap="round"
               fill="transparent"
               r={normalizedRadius * size}
               cx={radius * size}
               cy={radius * size}
             />
         </svg>
      </div>
    )
  };

  return (
    <div className="flex items-center justify-around h-full">
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 flex items-center justify-center">
               <Ring percent={cpu} color="text-red-500" size={1} />
               <Activity className="absolute w-5 h-5 text-red-500" />
            </div>
            <div className="text-center">
                <div className="text-xl font-black text-slate-900 dark:text-white font-heading">{cpu}%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CPU</div>
            </div>
        </div>
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 flex items-center justify-center">
               <Ring percent={memory} color="text-blue-500" size={1} />
               <Zap className="absolute w-5 h-5 text-blue-500" />
            </div>
             <div className="text-center">
                <div className="text-xl font-black text-slate-900 dark:text-white font-heading">{memory}%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MEM</div>
            </div>
        </div>
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 flex items-center justify-center">
               <Ring percent={budget} color="text-emerald-500" size={1} />
               <DollarSign className="absolute w-5 h-5 text-emerald-500" />
            </div>
             <div className="text-center">
                <div className="text-xl font-black text-slate-900 dark:text-white font-heading">${budget.toFixed(2)}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">COST</div>
            </div>
        </div>
    </div>
  );
};

// B. The "Command Center" Widget
const CommandCenterWidget = ({ notify }: { notify: any }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full">
        <QuickActionButton icon={Rocket} label="Deploy" color="blue" onClick={() => notify('success', 'DEPLOY', 'Swarm initiated.')} />
        <QuickActionButton icon={RefreshCw} label="Reboot" color="green" onClick={() => notify('warning', 'REBOOT', 'Cycling power.')} />
        <QuickActionButton icon={ShieldCheck} label="Secure" color="purple" onClick={() => notify('info', 'SECURE', 'Protocols engaged.')} />
        <QuickActionButton icon={Trash2} label="Purge" color="red" onClick={() => notify('error', 'PURGE', 'Cache cleared.')} />
    </div>
);

// New Widget: Network Topology
const NetworkTopologyWidget = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950 rounded-2xl min-h-[200px]">
    {/* Grid Background */}
    <div className="absolute inset-0 grid-pattern opacity-20"></div>
    
    {/* Central Hub */}
    <div className="relative z-10">
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] animate-pulse">
        <Server className="w-8 h-8 text-white" />
      </div>
      {/* Orbiting Satellites */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-slate-700/50 rounded-full animate-[spin_10s_linear_infinite]">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>
      </div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-slate-700/30 rounded-full animate-[spin_7s_linear_infinite_reverse]">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#8b5cf6]"></div>
      </div>
    </div>
    
    {/* Connecting Lines (Static for visual) */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
       <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#94a3b8" strokeWidth="1" />
       <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#94a3b8" strokeWidth="1" />
       <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#94a3b8" strokeWidth="1" />
       <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#94a3b8" strokeWidth="1" />
    </svg>
    
    {/* Status Labels */}
    <div className="absolute top-4 left-4 text-[10px] font-mono text-emerald-500">
        UPLINK: ACTIVE<br/>
        PING: 24ms
    </div>
    <div className="absolute bottom-4 right-4 text-[10px] font-mono text-blue-400 text-right">
        NODES: 14<br/>
        REGION: US-EAST
    </div>
  </div>
);

// Service Status Widget
const ServiceHealthWidget = ({ services }: { services: Services }) => (
  <div className="grid grid-cols-1 gap-2 h-full overflow-y-auto">
    {Object.entries(services).map(([name, info]) => (
      <div key={name} className="bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
             <div className={clsx("w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]", 
              info.status === 'running' || info.status === 'active' ? 'bg-emerald-500 text-emerald-500' :
              info.status === 'sending' ? 'bg-blue-500 text-blue-500 animate-pulse' :
              'bg-red-500 text-red-500'
            )} />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              {name.replace(/([A-Z])/g, ' $1').trim()}
            </span>
        </div>
        <div className="text-[10px] font-mono text-slate-400">
             {info.status.toUpperCase()}
        </div>
      </div>
    ))}
  </div>
);

// C. The "Daily Briefing" (Gradient Card)
const BriefingWidget = () => (
    <WidgetFrame transparent className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/30 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md">
                    <Bot className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">AI Insight</span>
            </div>
            <h3 className="text-2xl font-heading font-extrabold mb-2 leading-tight">
                Optimization Complete.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Agent "CTO_Core" reduced API latency by 140ms. Runway extended by 3 days based on current spend.
            </p>
            <div className="mt-auto pt-4">
                <button className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors w-full">
                    View Full Report
                </button>
            </div>
        </div>
    </WidgetFrame>
);

// Agent Card for Swimlanes
interface AgentCardProps {
  agent: Agent;
  isActive?: boolean;
  onHalt?: (id: string) => void;
  onClick?: (agent: Agent) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive = false, onHalt, onClick }) => (
  <div 
    onClick={() => onClick && onClick(agent)}
    className={clsx(
    "relative p-4 rounded-2xl border transition-all duration-300 group cursor-pointer",
    isActive 
      ? "bg-white dark:bg-slate-800 border-blue-500/50 shadow-lg shadow-blue-500/10 hover:border-blue-500" 
      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
  )}>
    {isActive && (
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span className="text-[9px] font-bold text-blue-500 uppercase">Processing</span>
      </div>
    )}

    <div className="flex items-center gap-3 mb-3">
      <div className={clsx(
        "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md",
        agent.color === 'emerald' ? 'bg-emerald-500' :
        agent.color === 'cyan' ? 'bg-cyan-500' :
        agent.color === 'red' ? 'bg-red-500' : 'bg-slate-500'
      )}>
        <Bot className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate font-heading">{agent.name}</h4>
        <div className="text-[10px] text-slate-500 font-mono">{agent.model}</div>
      </div>
    </div>

    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-[10px] text-slate-400 mb-1 uppercase tracking-wider font-bold">
          <span>Current Task</span>
        </div>
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {agent.task}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>Context Window</span>
          <span className="font-mono">{agent.contextUsed} / {agent.contextTotal}k</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={clsx("h-full rounded-full transition-all duration-500", 
              agent.contextUsed > 100 ? "bg-red-500" : "bg-blue-500"
            )}
            style={{ width: `${(agent.contextUsed / agent.contextTotal) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {agent.tools && (
         <div className="flex flex-wrap gap-1 mt-2">
            {agent.tools.slice(0, 3).map((tool, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-600">
                    {tool}
                </span>
            ))}
         </div>
      )}

      {/* Manual Control for Active Agents */}
      {isActive && (
        <button 
            onClick={(e) => { e.stopPropagation(); onHalt && onHalt(agent.id); }}
            className="w-full mt-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center justify-center gap-2 opacity-80 hover:opacity-100"
        >
            <Power className="w-3 h-3" />
            HALT PROTOCOL
        </button>
      )}
    </div>
  </div>
);

// Smart Rail Widgets
const WeatherWidget = () => (
    <div className="flex items-center justify-between p-1">
        <div className="flex items-center gap-3">
            <div className="bg-amber-100 dark:bg-amber-500/20 p-2 rounded-xl text-amber-500">
                <Sun className="w-5 h-5" />
            </div>
            <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">72°F</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Sunny</div>
            </div>
        </div>
        <div className="text-right">
             <div className="text-[10px] text-slate-400">San Francisco</div>
             <div className="text-[10px] font-mono text-slate-300">HQ_01</div>
        </div>
    </div>
);

const ConnectionWidget = () => (
    <div className="flex items-center gap-3 p-1">
        <div className="relative">
             <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
             <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-50"></div>
        </div>
        <div className="flex-1">
             <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">System Online</span>
                <span className="text-[10px] font-mono text-emerald-500">99.9%</span>
             </div>
             <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[98%] rounded-full"></div>
             </div>
        </div>
    </div>
);

const LogWidget = () => (
    <div className="font-mono text-[10px] space-y-3 h-32 overflow-y-auto custom-scrollbar">
        <div className="flex gap-2 text-slate-500">
            <span className="text-slate-400">14:02</span>
            <span>Auth handshake verified</span>
        </div>
        <div className="flex gap-2 text-slate-500">
            <span className="text-slate-400">14:05</span>
            <span className="text-blue-500">Syncing database shards...</span>
        </div>
         <div className="flex gap-2 text-slate-500">
            <span className="text-slate-400">14:12</span>
            <span className="text-amber-500">Latency spike detected (40ms)</span>
        </div>
         <div className="flex gap-2 text-slate-500">
            <span className="text-slate-400">14:15</span>
            <span>Snapshot saved</span>
        </div>
    </div>
);

// Agent Detail View (for Modal)
const AgentDetailView = ({ agent, onHalt }: { agent: Agent, onHalt: (id: string) => void }) => {
  const [logs] = useState([
    "[INFO] Initializing context window...",
    `[INFO] Loading model weights: ${agent.model}`,
    "[DEBUG] Vector store connection established (ms=42)",
    "[INFO] Receiving task payload...",
    `[TASK] ${agent.task}`,
    "[THINK] Analyzing intent patterns...",
    "[ACTION] Querying external tool: 'VectorDB'",
    "[INFO] Data retrieved. Processing..."
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {/* Left Column: Stats */}
       <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Context Usage</div>
             <div className="relative h-32 w-full">
                <ResponsiveContainer>
                  <BarChart data={[agent.contextBreakdown]}>
                     <Bar dataKey="system" stackId="a" fill="#3b82f6" />
                     <Bar dataKey="user" stackId="a" fill="#10b981" />
                     <Bar dataKey="rag" stackId="a" fill="#f59e0b" />
                     <Bar dataKey="output" stackId="a" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
             </div>
             <div className="grid grid-cols-2 gap-2 mt-2 text-[10px] text-slate-500">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> System</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> User</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> RAG</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div> Output</div>
             </div>
          </div>

          <div className="space-y-2">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Capabilities</div>
             <div className="flex flex-wrap gap-2">
                {agent.tools.map(tool => (
                    <span key={tool} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-600">
                       {tool}
                    </span>
                ))}
             </div>
          </div>
       </div>

       {/* Right Column: Terminal */}
       <div className="md:col-span-2 flex flex-col h-[300px] bg-slate-900 rounded-2xl border border-slate-800 p-4 font-mono text-xs overflow-hidden relative">
           <div className="absolute top-0 inset-x-0 h-8 bg-slate-800/80 flex items-center px-4 border-b border-slate-700 text-slate-400 font-bold select-none">
              <Terminal className="w-3 h-3 mr-2" />
              TERMINAL_OUTPUT
           </div>
           <div className="mt-8 flex-1 overflow-y-auto custom-scrollbar space-y-1 text-slate-300">
               {logs.map((log, i) => (
                   <div key={i} className="flex gap-2">
                       <span className="text-slate-600 shrink-0">{new Date().toLocaleTimeString()}</span>
                       <span className={clsx(
                           log.includes("[ERROR]") ? "text-red-400" :
                           log.includes("[DEBUG]") ? "text-blue-400" :
                           log.includes("[ACTION]") ? "text-amber-400" : "text-slate-300"
                       )}>{log}</span>
                   </div>
               ))}
               <div className="animate-pulse">_</div>
           </div>
       </div>
    </div>
  )
}

// ==========================================
// 2. VIEWS & LAYOUTS
// ==========================================

const DashboardView = ({ data, notify, onSelectAgent }: any) => {
    const chartData = useMemo(() => generateChartData(), [data]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-5 lg:gap-6 grid-flow-dense pb-10">
            
            {/* 1. Daily Briefing (Tall) */}
            <div className="col-span-1 lg:col-span-1 xl:col-span-1 row-span-2">
                <BriefingWidget />
            </div>

            {/* 2. Vital Signs Rings (Wide) */}
            <div className="col-span-1 lg:col-span-2 xl:col-span-2 row-span-1">
                <WidgetFrame title="System Vitals" subtitle="Real-time Telemetry">
                    <RingsWidget 
                        cpu={data.systemHealth.cpu} 
                        memory={data.systemHealth.memory.percent} 
                        budget={(data.stats.costToday / 5) * 100}
                    />
                </WidgetFrame>
            </div>

            {/* 3. Analytics Chart (Large) */}
            <div className="col-span-1 lg:col-span-2 xl:col-span-2 row-span-2 min-h-[300px]">
                <WidgetFrame title="Token Volumetrics" subtitle={`${data.stats.tokensToday.toLocaleString()} Generated`} headerRight={
                    <select className="bg-slate-50 dark:bg-slate-700 border-none text-xs rounded-lg py-1 px-2 focus:ring-0 cursor-pointer">
                        <option>Last 6 Hours</option>
                        <option>24 Hours</option>
                    </select>
                }>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} className="dark:stroke-slate-700/50" />
                            <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff'}} 
                                itemStyle={{color: '#60a5fa'}}
                            />
                            <Area type="monotone" dataKey="tokens" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </WidgetFrame>
            </div>

            {/* 4. Active Agents (List) */}
             <div className="col-span-1 row-span-2">
                 <WidgetFrame title="Neural Grid" subtitle={`${data.stats.activeSessions} Active Agents`}>
                    <div className="flex flex-col gap-3 h-full overflow-y-auto custom-scrollbar pr-2">
                        {data.agents.map((agent: Agent, i: number) => (
                            <div 
                              key={i} 
                              onClick={() => onSelectAgent(agent)}
                              className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <div className={clsx("w-2 h-2 rounded-full shrink-0", 
                                    agent.status === 'working' ? 'bg-emerald-500 animate-pulse' : 
                                    agent.status === 'error' ? 'bg-red-500' : 'bg-slate-400'
                                )}></div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{agent.name}</div>
                                    <div className="text-[10px] text-slate-500 truncate">{agent.task}</div>
                                </div>
                                <div className={clsx("text-[10px] font-bold px-2 py-1 rounded-lg uppercase",
                                    agent.status === 'working' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                )}>
                                    {agent.status}
                                </div>
                            </div>
                        ))}
                    </div>
                 </WidgetFrame>
             </div>

             {/* 5. Network Topology (New) */}
             <div className="col-span-1 lg:col-span-1 xl:col-span-1 row-span-1">
                 <WidgetFrame title="Global Network">
                     <NetworkTopologyWidget />
                 </WidgetFrame>
             </div>

            {/* 6. Service Status */}
            <div className="col-span-1 lg:col-span-1 xl:col-span-1 row-span-1">
                <WidgetFrame title="Gateway Status" subtitle="OpenClaw Services">
                    <ServiceHealthWidget services={data.services} />
                </WidgetFrame>
            </div>

            {/* 7. Quick Actions (New Integration) */}
            <div className="col-span-1 lg:col-span-1 xl:col-span-2 row-span-1">
                <WidgetFrame title="Command Center" subtitle="Quick Actions">
                    <CommandCenterWidget notify={notify} />
                </WidgetFrame>
            </div>
            
             {/* 8. Model Metrics */}
             <div className="col-span-1 lg:col-span-1 xl:col-span-1 row-span-1 min-h-[200px]">
                <WidgetFrame title="Model Battle" subtitle="Efficiency Analysis">
                   <div className="h-full w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.modelMetrics} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} className="dark:stroke-slate-700/50" />
                          <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                          <YAxis dataKey="model" type="category" stroke="#94a3b8" fontSize={10} width={100} />
                          <Tooltip 
                              cursor={{fill: 'transparent'}}
                              contentStyle={{backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff'}} 
                          />
                          <Bar dataKey="efficiency" name="Eff." fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                     </ResponsiveContainer>
                   </div>
                </WidgetFrame>
            </div>
        </div>
    );
};

const AgentsView = ({ agents, onHaltAgent, onSelectAgent }: { agents: Agent[], onHaltAgent: (id: string) => void, onSelectAgent: (agent: Agent) => void }) => {
  const lanes = {
    queue: agents.filter(a => a.status === 'idle'),
    active: agents.filter(a => ['thinking', 'working'].includes(a.status)),
    done: agents.filter(a => ['offline', 'error'].includes(a.status))
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-hidden pb-10">
       {/* Lane 1: Queue */}
       <div className="flex flex-col gap-4 bg-slate-100/50 dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 h-full">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
            Queue / Standby
          </h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">
             {lanes.queue.length === 0 && <div className="text-center text-xs text-slate-400 py-10">No agents in queue.</div>}
             {lanes.queue.map(agent => <AgentCard key={agent.id} agent={agent} onClick={onSelectAgent} />)}
          </div>
       </div>

       {/* Lane 2: Active */}
       <div className="flex flex-col gap-4 bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-3xl border border-blue-100 dark:border-blue-900/30 h-full relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          <h3 className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Active Grid
          </h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">
             {lanes.active.length === 0 && <div className="text-center text-xs text-blue-400/50 py-10">Grid is silent.</div>}
             {lanes.active.map(agent => <AgentCard key={agent.id} agent={agent} isActive onHalt={onHaltAgent} onClick={onSelectAgent} />)}
          </div>
       </div>

       {/* Lane 3: Done/History */}
       <div className="flex flex-col gap-4 bg-slate-100/50 dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 h-full">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Errors / Offline
          </h3>
           <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">
             {lanes.done.length === 0 && <div className="text-center text-xs text-slate-400 py-10">System optimal.</div>}
             {lanes.done.map(agent => <AgentCard key={agent.id} agent={agent} onClick={onSelectAgent} />)}
          </div>
       </div>
    </div>
  )
}

const TasksView = ({ notify, onNavigate }: { notify: (type: NotificationType, title: string, msg: string, options?: any) => void, onNavigate: (view: ViewType) => void }) => {
  const [protocols, setProtocols] = useState([
    { id: 1, name: 'Daily Backup', schedule: '00:00 UTC', status: 'active', lastRun: '2h ago', type: 'maintenance' },
    { id: 2, name: 'Cache Warm-up', schedule: 'Every 4h', status: 'active', lastRun: '15m ago', type: 'performance' },
    { id: 3, name: 'Log Rotation', schedule: 'Weekly', status: 'pending', lastRun: '6d ago', type: 'maintenance' },
    { id: 4, name: 'Security Audit', schedule: 'Monthly', status: 'error', lastRun: '1mo ago', type: 'security' },
    { id: 5, name: 'Node Scaling', schedule: 'Auto', status: 'active', lastRun: '10m ago', type: 'performance' },
  ]);

  const [activeLog, setActiveLog] = useState<string[]>([]);
  const [activeTaskName, setActiveTaskName] = useState<string | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [activeLog]);

  const handleTrigger = (id: number, name: string) => {
     if (activeTaskName) return; // Prevent double trigger

     setActiveTaskName(name);
     setActiveLog([]);
     setProtocols(prev => prev.map(p => p.id === id ? { ...p, status: 'pending' } : p));
     
     // Special Case for Security Audit to demonstrate Action Notification
     if (name === 'Security Audit') {
         notify('info', 'PROTOCOL INITIATED', `Starting sequence: ${name}`);
         setTimeout(() => {
             notify('warning', 'SECURITY FLAG', 'Unauthorized access attempt detected in log stream.', {
                 duration: 10000,
                 action: {
                     label: 'View Vault Logs',
                     onClick: () => {
                         console.log("Navigating to Vault...");
                         onNavigate('vault');
                     }
                 }
             });
         }, 3000);
     } else {
         notify('info', 'PROTOCOL INITIATED', `Starting sequence: ${name}`);
     }

     const steps = [
        `[INIT] Initializing protocol: ${name.toUpperCase()}`,
        `[AUTH] Verifying administrative privileges... OK`,
        `[CONN] Establishing secure handshake with cluster...`,
        `[EXEC] Running pre-flight checks...`,
        `[EXEC] Executing main sequence batch 1/3...`,
        `[INFO] Throughput at 84% capacity`,
        `[EXEC] Executing main sequence batch 2/3...`,
        `[EXEC] Executing main sequence batch 3/3...`,
        `[VERI] Validating output integrity...`,
        `[DONE] Protocol completed successfully.`,
        `[EXIT] Closing secure channel.`
     ];

     let currentStep = 0;
     const interval = setInterval(() => {
        if (currentStep >= steps.length) {
            clearInterval(interval);
            setActiveTaskName(null);
            setProtocols(prev => prev.map(p => p.id === id ? { ...p, status: 'active', lastRun: 'Just now' } : p));
            if (name !== 'Security Audit') {
                notify('success', 'PROTOCOL COMPLETE', `${name} finished successfully.`);
            }
        } else {
            setActiveLog(prev => [...prev, `${new Date().toLocaleTimeString()} ${steps[currentStep]}`]);
            currentStep++;
        }
     }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-6">
        {/* Protocol List */}
        <div className="col-span-1 lg:col-span-2 flex flex-col h-full gap-6">
             <WidgetFrame title="Active Protocols" subtitle="System Automation" className="flex-1">
                <div className="flex flex-col gap-0 divider-y divide-slate-100 dark:divide-slate-700/50 overflow-y-auto custom-scrollbar pr-2">
                    {protocols.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className={clsx("p-2 rounded-lg transition-colors", 
                                    p.status === 'active' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 
                                    p.status === 'pending' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 animate-pulse' :
                                    p.status === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 'bg-slate-100 text-slate-500'
                                )}>
                                    {p.status === 'active' ? <CheckCircle2 className="w-5 h-5" /> : 
                                     p.status === 'error' ? <XCircle className="w-5 h-5" /> :
                                     p.status === 'pending' ? <Loader2 className="w-5 h-5 animate-spin" /> :
                                     <Clock className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        {p.name}
                                        <span className="text-[9px] font-normal px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400 uppercase tracking-wide">{p.type}</span>
                                    </h4>
                                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                                        <span className="font-mono">{p.schedule}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span>Last run: {p.lastRun}</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleTrigger(p.id, p.name)}
                                disabled={!!activeTaskName}
                                className={clsx(
                                    "px-4 py-2 text-xs font-bold rounded-lg border transition-all flex items-center gap-2",
                                    activeTaskName 
                                        ? "opacity-30 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent" 
                                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-600 dark:text-slate-300 hover:text-blue-500 shadow-sm hover:shadow active:scale-95"
                                )}
                            >
                                <Play className="w-3 h-3 fill-current" />
                                EXECUTE
                            </button>
                        </div>
                    ))}
                </div>
             </WidgetFrame>
        </div>

        {/* Live Terminal & History */}
        <div className="flex flex-col gap-6 h-full min-h-[500px]">
             {/* Live Execution Console */}
             <div className="flex-1 bg-slate-950 rounded-3xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl relative">
                 <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
                     <div className="flex items-center gap-2 text-slate-400">
                         <Terminal className="w-4 h-4" />
                         <span className="text-xs font-bold uppercase tracking-wider">Live Execution Log</span>
                     </div>
                     <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                     </div>
                 </div>
                 
                 <div 
                    ref={logContainerRef}
                    className="flex-1 p-4 font-mono text-[10px] sm:text-xs text-emerald-500 overflow-y-auto custom-scrollbar space-y-1"
                 >
                     {activeLog.length === 0 && !activeTaskName && (
                         <div className="h-full flex flex-col items-center justify-center text-slate-700 select-none">
                             <Terminal className="w-12 h-12 mb-4 opacity-20" />
                             <p>Awaiting command input...</p>
                         </div>
                     )}
                     
                     {activeLog.map((line, i) => (
                         <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                             <span className="opacity-50 mr-2">&gt;</span>
                             {line}
                         </div>
                     ))}
                     
                     {activeTaskName && (
                         <div className="animate-pulse text-emerald-400 mt-2">_</div>
                     )}
                 </div>
                 
                 {/* Status Bar */}
                 <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase shrink-0">
                     <span>Daemon: v2.4.1</span>
                     <span className={clsx(activeTaskName ? "text-emerald-500" : "text-slate-500")}>
                         {activeTaskName ? "PROCESS ACTIVE" : "IDLE"}
                     </span>
                 </div>
             </div>

             {/* Recent Activity (Mini) */}
             <WidgetFrame title="Recent Activity" className="h-1/3 min-h-[150px]">
                 <div className="space-y-4 relative pl-2 pt-1">
                     <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-800"></div>
                     
                     <div className="relative pl-6">
                         <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500 z-10"></div>
                         <div className="text-xs font-bold text-slate-900 dark:text-white">Backup Completed</div>
                         <div className="text-[10px] text-slate-500">2h ago • 4.2GB archived</div>
                     </div>
                     <div className="relative pl-6">
                         <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 z-10"></div>
                         <div className="text-xs font-bold text-slate-900 dark:text-white">Deploy v2.4.1</div>
                         <div className="text-[10px] text-slate-500">5h ago • Successful</div>
                     </div>
                 </div>
             </WidgetFrame>
        </div>
    </div>
  );
};

// IMPROVED: Kanban Style Growth View
const GrowthView = ({ socialQueue }: { socialQueue: any[] }) => {
    // Group By Status
    const columns = {
        'Idea': socialQueue.filter(i => i.status === 'Idea' || i.status === 'Draft'),
        'Scheduled': socialQueue.filter(i => i.status === 'Scheduled'),
        'Done': socialQueue.filter(i => i.status === 'Done'),
    };

    return (
        <div className="flex h-full gap-6 overflow-x-auto pb-6">
            {Object.entries(columns).map(([colName, items]) => (
                <div key={colName} className="flex-1 min-w-[300px] flex flex-col gap-4">
                     <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase text-slate-500 tracking-widest">{colName}</h3>
                        <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">{items.length}</span>
                     </div>
                     <div className="flex-1 bg-slate-100/50 dark:bg-slate-900/30 rounded-3xl p-4 border border-slate-200 dark:border-slate-800/50 flex flex-col gap-3">
                        {items.length === 0 && <div className="text-center text-xs text-slate-400 py-10 italic">Empty</div>}
                        {items.map((post: any, i: number) => (
                             <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-move active:scale-95 group">
                                  <div className="flex justify-between items-start mb-2">
                                     <span className={clsx("text-[9px] font-bold px-1.5 py-0.5 rounded uppercase",
                                        post.type === 'LinkedIn' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                        post.type === 'Twitter' ? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' :
                                        'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                                     )}>{post.type}</span>
                                     <MoreHorizontal className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 cursor-pointer" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">{post.title}</h4>
                                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                      <Calendar className="w-3 h-3" />
                                      <span>Day {post.day}</span>
                                  </div>
                             </div>
                        ))}
                     </div>
                </div>
            ))}
        </div>
    )
}

// IMPROVED: File System Style Vault View with Navigation
const VaultView = ({ files }: { files: VaultFile[] }) => {
    const [path, setPath] = useState<string[]>([]);
    
    // Simulate folder navigation by filtering mock data
    // In a real app, you'd fetch folder contents
    const currentFiles = useMemo(() => {
        if (path.length === 0) return files;
        // Just return a random subset to simulate "entering" a folder for this demo
        return files.filter((_, i) => i % 2 === 0);
    }, [path, files]);

    const handleEnterFolder = (name: string) => {
        setPath([...path, name]);
    };

    const handleUp = () => {
        setPath(path.slice(0, -1));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            <WidgetFrame title="Storage Metrics" subtitle="84% Used" className="md:col-span-1 h-fit">
                <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">4.2</span>
                    <span className="text-sm font-bold text-slate-500 mb-1">TB Total</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-4 rounded-full overflow-hidden mb-6">
                    <div className="bg-purple-500 h-full w-[84%]"></div>
                </div>
                <div className="space-y-4">
                     <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                         <div className="flex items-center gap-3">
                             <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 rounded-lg"><FileCode className="w-4 h-4" /></div>
                             <div className="text-xs font-bold text-slate-700 dark:text-slate-200">Source Code</div>
                         </div>
                         <div className="text-xs font-mono text-slate-500">1.2 TB</div>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                         <div className="flex items-center gap-3">
                             <div className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-600 rounded-lg"><Database className="w-4 h-4" /></div>
                             <div className="text-xs font-bold text-slate-700 dark:text-slate-200">Vector Index</div>
                         </div>
                         <div className="text-xs font-mono text-slate-500">2.8 TB</div>
                     </div>
                </div>
            </WidgetFrame>
            
            <WidgetFrame title="File Browser" className="md:col-span-2 flex flex-col">
                {/* File Toolbar */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                         {path.length > 0 && (
                            <button onClick={handleUp} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded mr-2">
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                         )}
                         <span className="hover:text-blue-500 cursor-pointer" onClick={() => setPath([])}>root</span>
                         {path.map((folder, i) => (
                             <React.Fragment key={folder}>
                                 <span>/</span>
                                 <span className={clsx(i === path.length - 1 ? "font-bold text-slate-900 dark:text-white" : "cursor-pointer hover:text-blue-500")} onClick={() => setPath(path.slice(0, i + 1))}>
                                     {folder}
                                 </span>
                             </React.Fragment>
                         ))}
                    </div>
                    <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"><Search className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"><Settings className="w-4 h-4" /></button>
                    </div>
                </div>

                {/* File Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pr-2">
                     {currentFiles.map((file) => (
                         <div 
                           key={file.id} 
                           onClick={() => file.type === 'folder' && handleEnterFolder(file.name)}
                           className="group p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col items-center text-center gap-3 transition-all cursor-pointer hover:bg-white dark:hover:bg-slate-800 active:scale-95"
                         >
                              <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                                   {file.type === 'folder' ? <Folder className="w-10 h-10 text-blue-300 dark:text-blue-500/50 fill-current" /> :
                                    file.category === 'code' ? <FileCode className="w-8 h-8 text-slate-400" /> :
                                    file.category === 'img' ? <FileImage className="w-8 h-8 text-purple-400" /> :
                                    <FileText className="w-8 h-8 text-slate-400" />
                                   }
                              </div>
                              <div className="min-w-0 w-full">
                                  <div className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{file.name}</div>
                                  <div className="text-[10px] text-slate-400 mt-1">{file.size || 'Folder'} • {file.modified}</div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 absolute top-2 right-2">
                                  <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><MoreHorizontal className="w-3 h-3 text-slate-400" /></button>
                              </div>
                         </div>
                     ))}
                </div>
            </WidgetFrame>
        </div>
    );
};

const CommsView = ({ agents }: { agents: Agent[] }) => {
    const [channels] = useState([
        { id: 'general', name: 'general', unread: 0 },
        { id: 'ops', name: 'ops-alerts', unread: 3 },
        { id: 'growth', name: 'growth-sync', unread: 0 },
        { id: 'random', name: 'random', unread: 0 },
    ]);
    
    const [messages, setMessages] = useState([
        { id: 1, agent: 'CTO_Core_v4', time: '14:02', content: 'Database migration completed. Shard 04 is online.' },
        { id: 2, agent: 'Growth_Engine_01', time: '14:05', content: 'Scheduled 3 new tweets for next week based on trending topic #AI.' },
        { id: 3, agent: 'System', time: '14:10', content: 'Warning: High latency detected in us-east-1.' },
        { id: 4, agent: 'CTO_Core_v4', time: '14:11', content: 'Acknowledged. Rerouting traffic to eu-central.' },
    ]);

    const [inputText, setInputText] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        
        const newMessage = {
            id: Date.now(),
            agent: 'Admin', // User acting as Admin
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: inputText
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSendMessage();
    }

    return (
        <div className="flex h-[calc(100vh-140px)] gap-6">
            {/* Sidebar / Channel List */}
            <div className="w-64 flex flex-col gap-2 shrink-0">
                <WidgetFrame className="h-full !p-3">
                    <div className="mb-4 px-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Channels</h3>
                        <div className="space-y-1">
                            {channels.map(ch => (
                                <button key={ch.id} className={clsx(
                                    "w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex justify-between items-center transition-colors",
                                    ch.id === 'general' ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                )}>
                                    <span className="flex items-center gap-2">
                                        <Hash className="w-4 h-4 opacity-50" />
                                        {ch.name}
                                    </span>
                                    {ch.unread > 0 && (
                                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full min-w-[1.25rem] text-center">{ch.unread}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-auto px-2">
                         <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Direct Messages</h3>
                         <div className="space-y-1">
                            {agents.map(agent => (
                                <button key={agent.id} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    <span className={clsx("w-2 h-2 rounded-full", 
                                        agent.status === 'working' ? 'bg-emerald-500' : 'bg-slate-400'
                                    )}></span>
                                    <span className="truncate">{agent.name}</span>
                                </button>
                            ))}
                         </div>
                    </div>
                </WidgetFrame>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col h-full">
                <WidgetFrame className="h-full !p-0 overflow-hidden flex flex-col relative">
                     {/* Chat Header */}
                     <div className="h-14 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm">
                         <div className="flex items-center gap-2">
                             <Hash className="w-5 h-5 text-slate-400" />
                             <h2 className="font-bold text-slate-900 dark:text-white">general</h2>
                             <span className="text-xs text-slate-500 ml-2">Topic: General coordination and announcements</span>
                         </div>
                         <div className="flex items-center gap-4 text-slate-400">
                             <Search className="w-4 h-4 cursor-pointer hover:text-slate-600 dark:hover:text-slate-200" />
                             <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-slate-600 dark:hover:text-slate-200" />
                         </div>
                     </div>

                     {/* Messages */}
                     <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
                         {messages.map(msg => (
                             <div key={msg.id} className="flex gap-4 group">
                                 <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", 
                                    msg.agent === 'Admin' ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                                 )}>
                                     {msg.agent === 'Admin' ? <UserCircle className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                                 </div>
                                 <div>
                                     <div className="flex items-baseline gap-2 mb-1">
                                         <span className="font-bold text-slate-900 dark:text-white">{msg.agent}</span>
                                         <span className="text-[10px] text-slate-400">{msg.time}</span>
                                     </div>
                                     <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                         {msg.content}
                                     </p>
                                 </div>
                             </div>
                         ))}
                         {/* Typing Indicator Simulation */}
                         <div className="flex gap-4 opacity-50">
                             <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700/50 flex items-center justify-center shrink-0">
                                 <Bot className="w-6 h-6 text-slate-400" />
                             </div>
                             <div>
                                <div className="flex items-center gap-1 mt-3">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                             </div>
                         </div>
                     </div>

                     {/* Input Area */}
                     <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 z-10">
                         <div className="relative">
                             <input 
                                type="text" 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message #general..." 
                                className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 transition-shadow outline-none"
                             />
                             <button 
                                onClick={handleSendMessage}
                                className="absolute right-2 top-2 p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                                disabled={!inputText.trim()}
                             >
                                 <Send className="w-4 h-4" />
                             </button>
                         </div>
                     </div>
                </WidgetFrame>
            </div>
        </div>
    );
};

const SettingsView = ({ 
    isDarkMode, 
    toggleTheme, 
    crtEnabled, 
    toggleCrt 
}: { 
    isDarkMode: boolean, 
    toggleTheme: () => void,
    crtEnabled: boolean, 
    toggleCrt: () => void
}) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">System Configuration</h2>
                    <p className="text-slate-500">Manage global settings and overrides</p>
                </div>
            </div>

            <WidgetFrame title="Display & Immersion">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white">Dark Mode</div>
                            <div className="text-xs text-slate-500">Override system appearance preference</div>
                        </div>
                        <button 
                            onClick={toggleTheme}
                            className={clsx("p-2 rounded-xl transition-colors", isDarkMode ? "text-blue-400 bg-blue-500/10" : "text-slate-400 bg-slate-100")}
                        >
                             {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                Retro Mode (CRT) 
                                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[9px] uppercase font-bold dark:bg-amber-900/30 dark:text-amber-400">Beta</span>
                            </div>
                            <div className="text-xs text-slate-500">Enable scanlines and phosphor glow effects</div>
                        </div>
                        <button 
                            onClick={toggleCrt}
                            className={clsx("p-2 rounded-xl transition-colors", crtEnabled ? "text-amber-500 bg-amber-500/10" : "text-slate-400 bg-slate-100")}
                        >
                             <Tv className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </WidgetFrame>

            <WidgetFrame title="Uplink Connection">
                 <div className="space-y-4">
                     <div className="flex gap-4">
                         <div className="flex-1">
                             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">API Endpoint</label>
                             <div className="relative">
                                 <Wifi className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                 <input type="text" value="https://api.nb-studio.net/uplink/v1" readOnly className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-600 dark:text-slate-300" />
                             </div>
                         </div>
                         <div className="w-1/3">
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Status</label>
                              <div className="flex items-center gap-2 h-[38px] px-3 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                  Connected
                              </div>
                         </div>
                     </div>
                 </div>
            </WidgetFrame>

            <WidgetFrame title="Danger Zone" className="border-red-200 dark:border-red-900/30">
                 <div className="flex items-center justify-between p-2">
                     <div>
                         <div className="font-bold text-red-600 dark:text-red-400">Emergency Stop</div>
                         <div className="text-xs text-slate-500">Immediately halt all active agents and sever cloud uplink.</div>
                     </div>
                     <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-red-600/20">
                         INITIATE SHUTDOWN
                     </button>
                 </div>
            </WidgetFrame>
        </div>
    )
}

// Command Palette Component
const CommandPalette = ({ isOpen, onClose, onNavigate, notify }: any) => {
    if (!isOpen) return null;

    const commands = [
        { id: 'dash', label: 'Go to Dashboard', icon: LayoutDashboard, action: () => onNavigate('dashboard') },
        { id: 'agents', label: 'View Neural Grid', icon: Bot, action: () => onNavigate('agents') },
        { id: 'tasks', label: 'Manage Protocols', icon: ListTodo, action: () => onNavigate('tasks') },
        { id: 'vault', label: 'Access Vault', icon: Database, action: () => onNavigate('vault') },
        { id: 'deploy', label: 'Trigger Deployment', icon: Rocket, action: () => notify('success', 'DEPLOY', 'Deployment sequence initiated') },
        { id: 'purge', label: 'Purge System Cache', icon: Trash2, action: () => notify('error', 'PURGE', 'System cache cleared') },
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
             <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>
             <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                      <Search className="w-5 h-5 text-slate-400" />
                      <input 
                        autoFocus 
                        placeholder="Type a command..." 
                        className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-500 text-sm"
                      />
                      <div className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">ESC</div>
                  </div>
                  <div className="p-2 max-h-[300px] overflow-y-auto">
                       <div className="text-[10px] font-bold text-slate-500 px-3 py-2 uppercase tracking-wider">Suggestions</div>
                       {commands.map((cmd) => (
                           <button 
                                key={cmd.id}
                                onClick={() => { cmd.action(); onClose(); }}
                                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group text-left"
                           >
                               <cmd.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                               <span className="flex-1 text-sm font-medium">{cmd.label}</span>
                               <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100" />
                           </button>
                       ))}
                  </div>
             </div>
        </div>
    )
}

// ==========================================
// 3. APP SHELL INTEGRATION
// ==========================================

const SmartRail = () => (
    <>
        <WidgetFrame title="Local Weather" className="min-h-[100px]">
            <WeatherWidget />
        </WidgetFrame>
        
        <WidgetFrame title="Uplink Status" className="min-h-[100px]">
             <ConnectionWidget />
        </WidgetFrame>

        <WidgetFrame title="System Log" className="flex-1">
            <LogWidget />
        </WidgetFrame>

        <WidgetFrame title="Next Protocol" className="min-h-[120px] bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900">
             <div className="flex items-start gap-3">
                 <div className="bg-white dark:bg-slate-800 p-2 rounded-xl text-blue-600 shadow-sm">
                     <Calendar className="w-5 h-5" />
                 </div>
                 <div>
                     <div className="text-sm font-bold text-slate-900 dark:text-white">Q3 Planning</div>
                     <div className="text-xs text-slate-500 mb-2">Today, 14:00</div>
                     <div className="flex -space-x-2">
                         <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900"></div>
                         <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white dark:border-slate-900"></div>
                     </div>
                 </div>
             </div>
        </WidgetFrame>
    </>
);

const App = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Initialize Theme based on HTML class or system preference
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
        setIsDarkMode(true);
    } else {
        setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
              e.preventDefault();
              setIsCommandPaletteOpen(prev => !prev);
          }
      }
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Notifications State (History)
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // Toasts State (Transient)
  const [toasts, setToasts] = useState<Notification[]>([]);

  const notify = (type: NotificationType, title: string, message: string, options?: { duration?: number, action?: NotificationAction }) => {
      const id = Math.random().toString(36).substr(2, 9);
      // Default duration: Error = 8s, Others = 5s
      const duration = options?.duration ?? (type === 'error' ? 8000 : 5000);
      
      const newNotif: Notification = { 
          id, 
          type, 
          title, 
          message, 
          timestamp: new Date(),
          duration,
          action: options?.action
      };

      // Add to History (Limit 20)
      setNotifications(prev => [newNotif, ...prev].slice(0, 20));
      
      // Add to Toasts (Limit 5 to prevent flooding)
      setToasts(prev => [newNotif, ...prev].slice(0, 5));

      // Auto Dismiss Toast
      if (duration !== Infinity) {
          setTimeout(() => {
              setToasts(prev => prev.filter(t => t.id !== id));
          }, duration);
      }
  };

  const handleDismissToast = (id: string) => {
      setToasts(prev => prev.filter(t => t.id !== id));
  };

  const { data } = useSWR('dashboard-data', fetchMockData, {
      refreshInterval: 2000,
      fallbackData: INITIAL_DATA
  });

  const handleHaltAgent = (id: string) => {
      notify('error', 'STOP COMMAND SENT', `Agent ${id} signal interruption sent.`);
  }

  if (!data) return <div className="flex items-center justify-center h-screen bg-[#f8fafb] dark:bg-slate-950 text-slate-400 font-sans">Initialize...</div>;

  return (
    <Shell 
        currentView={currentView} 
        onNavigate={setCurrentView}
        uplinkTime={data.uplinkTime}
        isRightSidebarOpen={isRightSidebarOpen}
        onToggleRightSidebar={() => setRightSidebarOpen(!isRightSidebarOpen)}
        rightSidebar={<SmartRail />}
        crtEnabled={crtEnabled}
        notifications={notifications}
        onClearNotifications={() => setNotifications([])}
    >
        {currentView === 'dashboard' && <DashboardView data={data} notify={notify} onSelectAgent={setSelectedAgent} />}
        {currentView === 'agents' && <AgentsView agents={data.agents} onHaltAgent={handleHaltAgent} onSelectAgent={setSelectedAgent} />}
        {currentView === 'tasks' && <TasksView notify={notify} onNavigate={setCurrentView} />}
        {currentView === 'growth' && <GrowthView socialQueue={data.socialQueue} />}
        {currentView === 'vault' && <VaultView files={data.vaultFiles} />}
        {currentView === 'comms' && <CommsView agents={data.agents} />}
        {currentView === 'settings' && <SettingsView isDarkMode={isDarkMode} toggleTheme={toggleTheme} crtEnabled={crtEnabled} toggleCrt={() => setCrtEnabled(!crtEnabled)} />}
        
        {/* Modal: Agent Details */}
        <Modal
            isOpen={!!selectedAgent}
            onClose={() => setSelectedAgent(null)}
            title={
                <div className="flex items-center gap-3">
                    <div className={clsx("w-3 h-3 rounded-full", 
                        selectedAgent?.status === 'working' ? "bg-emerald-500 animate-pulse" : 
                        selectedAgent?.status === 'error' ? "bg-red-500" : "bg-slate-400"
                    )}></div>
                    <span>{selectedAgent?.name}</span>
                    <span className="text-xs font-normal text-slate-400 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">{selectedAgent?.role}</span>
                </div>
            }
            maxWidth="max-w-4xl"
        >
            {selectedAgent && <AgentDetailView agent={selectedAgent} onHalt={handleHaltAgent} />}
        </Modal>

        {/* Command Palette */}
        <CommandPalette 
            isOpen={isCommandPaletteOpen} 
            onClose={() => setIsCommandPaletteOpen(false)} 
            onNavigate={setCurrentView}
            notify={notify}
        />

        {/* Placeholder for other undefined views */}
        {currentView !== 'dashboard' && currentView !== 'agents' && currentView !== 'tasks' && currentView !== 'growth' && currentView !== 'vault' && currentView !== 'comms' && currentView !== 'settings' && (
             <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                 <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-4 text-slate-400">
                     <ConstructionIcon view={currentView} />
                 </div>
                 <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Module Under Construction</h2>
                 <p className="text-slate-500 max-w-md mt-2">The {currentView} interface is currently being refactored to match the new design system.</p>
             </div>
        )}
        
        {/* Notifications Toast */}
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
            {toasts.map((notif) => (
                <div key={notif.id} className="pointer-events-auto w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-xl flex items-start gap-3 animate-in slide-in-from-right relative group">
                     {/* Dismiss Button */}
                     <button 
                        onClick={() => handleDismissToast(notif.id)}
                        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                     >
                        <X className="w-3 h-3" />
                     </button>

                     <div className={clsx("p-2 rounded-xl shrink-0", 
                        notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 
                        notif.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                     )}>
                         {notif.type === 'success' ? <Check className="w-4 h-4"/> : 
                          notif.type === 'error' ? <AlertTriangle className="w-4 h-4"/> :
                          <Activity className="w-4 h-4"/>}
                     </div>
                     <div className="flex-1">
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white pr-4">{notif.title}</h4>
                         <p className="text-xs text-slate-500 mt-1">{notif.message}</p>
                         
                         {/* Action Button in Toast */}
                         {notif.action && (
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    notif.action?.onClick();
                                    handleDismissToast(notif.id);
                                }}
                                className="mt-3 text-[10px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                            >
                                {notif.action.label}
                                <ChevronRight className="w-3 h-3" />
                            </button>
                         )}
                     </div>
                </div>
            ))}
        </div>
    </Shell>
  );
};

const ConstructionIcon = ({ view }: { view: string }) => {
    switch(view) {
        case 'agents': return <Bot className="w-8 h-8" />;
        case 'tasks': return <ListTodo className="w-8 h-8" />;
        default: return <Settings className="w-8 h-8" />;
    }
}

export default App;
