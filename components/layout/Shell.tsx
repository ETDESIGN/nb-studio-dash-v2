
import React, { useState } from 'react';
import { 
  Rocket, 
  LayoutDashboard, 
  Bot, 
  Database, 
  MessageSquare, 
  ListTodo,
  TrendingUp,
  Search,
  Bell,
  Menu,
  X,
  UserCircle,
  Settings,
  Check,
  AlertTriangle,
  Info,
  ChevronRight
} from 'lucide-react';
import clsx from 'clsx';
import { ViewType, Notification } from '../../types';

interface ShellProps {
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  uplinkTime?: string;
  isRightSidebarOpen: boolean;
  onToggleRightSidebar: () => void;
  crtEnabled?: boolean;
  notifications?: Notification[];
  onClearNotifications?: () => void;
}

// Navigation Configuration
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'agents', label: 'Neural Grid', icon: Bot },
  { id: 'tasks', label: 'Protocols', icon: ListTodo },
  { id: 'growth', label: 'Growth', icon: TrendingUp },
  { id: 'vault', label: 'Vault', icon: Database },
  { id: 'comms', label: 'Comms', icon: MessageSquare },
];

const SystemTicker = () => (
  <div className="h-6 bg-slate-950 text-slate-400 text-[10px] font-mono flex items-center overflow-hidden relative border-b border-slate-800 z-20">
    <div className="animate-ticker whitespace-nowrap flex gap-12 px-4 select-none">
      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> SYSTEM: OPTIMIZATION COMPLETE [14:00]</span>
      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> AGENT_01: API LATENCY REDUCED BY 12%</span>
      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> SECURITY: AUTH HANDSHAKE VERIFIED</span>
      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> CLOUD: UPLINK ESTABLISHED</span>
      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span> BUDGET: DAILY SPEND AT 42%</span>
      
      {/* Duplicates for seamless loop */}
      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> SYSTEM: OPTIMIZATION COMPLETE [14:00]</span>
      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> AGENT_01: API LATENCY REDUCED BY 12%</span>
      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> SECURITY: AUTH HANDSHAKE VERIFIED</span>
      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> CLOUD: UPLINK ESTABLISHED</span>
    </div>
  </div>
);

export const Shell: React.FC<ShellProps> = ({ 
  children, 
  rightSidebar, 
  currentView, 
  onNavigate, 
  isRightSidebarOpen,
  onToggleRightSidebar,
  crtEnabled = false,
  notifications = [],
  onClearNotifications
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);

  const unreadCount = notifications.length;

  return (
    <div className={clsx(
        "fixed inset-0 h-[100dvh] w-full flex flex-col bg-[#f8fafb] dark:bg-[#0f172a] overflow-hidden text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500",
        crtEnabled && "crt-overlay contrast-125 brightness-110"
    )}>
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none grid-pattern opacity-[0.03] dark:opacity-[0.08]" />

      {/* 1. Header (Fixed Height 64px) */}
      <header className="h-16 flex-none border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-30 flex items-center justify-between px-4 md:px-6 relative">
        
        {/* Left: Logo & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Rocket className="text-white w-5 h-5 fill-current" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-none">
                NB Studio
              </h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Mission Control
              </p>
            </div>
          </div>
        </div>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/50">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewType)}
              className={clsx(
                "px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                currentView === item.id 
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/30"
              )}
            >
              <item.icon className={clsx("w-4 h-4", currentView === item.id ? "stroke-[2.5px]" : "stroke-[2px]")} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
           {/* Search Trigger */}
           <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium text-slate-500 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors w-48">
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="ml-auto text-[9px] font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 text-slate-400">⌘K</kbd>
           </button>

           <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

           <button 
             className={clsx(
                "p-2 relative text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors",
                currentView === 'settings' && "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
             )}
             onClick={() => onNavigate('settings')}
           >
              <Settings className="w-5 h-5" />
           </button>

           <div className="relative">
             <button 
               onClick={() => setIsNotifPanelOpen(!isNotifPanelOpen)}
               className={clsx(
                 "p-2 relative text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors",
                 isNotifPanelOpen && "bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
               )}
             >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                )}
             </button>

             {/* Notification Dropdown Panel */}
             {isNotifPanelOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                        {unreadCount > 0 && (
                           <button onClick={onClearNotifications} className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                               Clear All
                           </button>
                        )}
                    </div>
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-slate-400">
                                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-xs">No new notifications</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {notifications.map((n) => (
                                    <div key={n.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-3 group relative">
                                        <div className={clsx(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                                            n.type === 'success' ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                                            n.type === 'error' ? "bg-red-50 border-red-100 text-red-600" :
                                            n.type === 'warning' ? "bg-amber-50 border-amber-100 text-amber-600" :
                                            "bg-blue-50 border-blue-100 text-blue-600"
                                        )}>
                                            {n.type === 'success' ? <Check className="w-4 h-4" /> :
                                             n.type === 'error' ? <AlertTriangle className="w-4 h-4" /> :
                                             n.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                                             <Info className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-[10px] text-slate-400">{n.timestamp.toLocaleTimeString()}</span>
                                                {n.action && (
                                                    <button 
                                                        onClick={(e) => { 
                                                            e.stopPropagation(); 
                                                            n.action?.onClick(); 
                                                            setIsNotifPanelOpen(false); 
                                                        }}
                                                        className="text-[10px] font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1 hover:underline"
                                                    >
                                                        {n.action.label}
                                                        <ChevronRight className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
             )}
           </div>
           
           <button 
             onClick={onToggleRightSidebar}
             className={clsx(
               "p-2 rounded-xl transition-colors border",
               isRightSidebarOpen 
                 ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-blue-200 dark:border-blue-800" 
                 : "text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
             )}
           >
             <UserCircle className="w-6 h-6" />
           </button>
        </div>
      </header>
      
      {/* 2. System Ticker */}
      <SystemTicker />

      {/* 3. Main Workspace (Flex Row) */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative z-10">
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-64 h-full bg-white dark:bg-slate-900 p-4 border-r border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
               <div className="flex justify-between items-center mb-6">
                 <h2 className="font-bold text-lg font-heading">Menu</h2>
                 <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
               </div>
               <nav className="flex flex-col gap-2">
                 {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { onNavigate(item.id as ViewType); setIsMobileMenuOpen(false); }}
                      className={clsx(
                        "px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-3",
                        currentView === item.id 
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                          : "text-slate-600 dark:text-slate-400"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                  <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
                  <button
                      onClick={() => { onNavigate('settings'); setIsMobileMenuOpen(false); }}
                      className={clsx(
                        "px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-3",
                        currentView === 'settings'
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                          : "text-slate-600 dark:text-slate-400"
                      )}
                    >
                      <Settings className="w-5 h-5" />
                      Settings
                    </button>
               </nav>
            </div>
          </div>
        )}

        {/* 4. Main Content Area (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-32 custom-scrollbar relative">
           <div className="max-w-7xl mx-auto h-full">
              {children}
           </div>
        </main>

        {/* 5. "Smart Rail" Sidebar (Fixed Width 320px) */}
        <aside 
          className={clsx(
            "flex-none bg-slate-50 dark:bg-slate-900/50 border-l border-slate-200 dark:border-slate-800 overflow-y-auto hidden transition-all duration-300 ease-in-out backdrop-blur-sm",
            isRightSidebarOpen ? "xl:block w-80 p-5" : "w-0 opacity-0 overflow-hidden border-none"
          )}
        >
           <div className="w-full flex flex-col gap-5">
              {rightSidebar}
           </div>
        </aside>
      </div>
    </div>
  );
};

export const QuickActionButton = ({ 
  icon: Icon, 
  label, 
  color = 'blue',
  onClick
}: { 
  icon: any, 
  label: string, 
  color?: string,
  onClick?: () => void
}) => {
  const colorStyles: any = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20",
    red: "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20",
    green: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20",
    purple: "bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20",
  };

  return (
    <button 
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center justify-center gap-2 aspect-square rounded-2xl transition-all duration-200 active:scale-95",
        colorStyles[color] || colorStyles.blue
      )}
    >
      <Icon className="w-6 h-6" strokeWidth={2} />
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
};
