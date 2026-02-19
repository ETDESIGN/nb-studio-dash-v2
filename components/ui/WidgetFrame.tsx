
import React from 'react';
import clsx from 'clsx';

export interface WidgetFrameProps {
  title?: string;
  subtitle?: string; // For the big number/data
  children: React.ReactNode;
  className?: string;
  icon?: React.ElementType;
  hoverColor?: 'emerald' | 'cyan' | 'amber' | 'red' | 'blue';
  headerRight?: React.ReactNode;
  transparent?: boolean; // For gradient cards
}

export const WidgetFrame: React.FC<WidgetFrameProps> = ({ 
  title, 
  subtitle,
  children, 
  className = '',
  icon: Icon,
  hoverColor = 'blue',
  headerRight,
  transparent = false
}) => {
  
  // If transparent (e.g. Briefing Widget), return a simplified container
  if (transparent) {
    return (
      <div className={clsx(
        'rounded-3xl relative overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5',
        className
      )}>
        {children}
      </div>
    )
  }

  return (
    <div className={clsx(
      'bg-white dark:bg-slate-800',
      'border border-slate-200 dark:border-slate-700',
      'rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5',
      'flex flex-col h-full p-5',
      className
    )}>
      
      {/* Card Header */}
      {(title || subtitle || Icon) && (
        <div className="flex justify-between items-start mb-4 shrink-0">
          <div className="min-w-0 flex-1 mr-2">
            {/* Micro Label */}
            {title && (
              <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 font-sans">
                {title}
              </h3>
            )}
            {/* Primary Value / Subtitle */}
            {subtitle && (
              <div className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white font-heading leading-tight truncate">
                {subtitle}
              </div>
            )}
          </div>
          
          {/* Optional Top-Right Icon or Action */}
          <div className="flex items-center gap-2">
             {headerRight}
             {Icon && <Icon className="text-slate-400 w-5 h-5" />}
          </div>
        </div>
      )}
      
      {/* Card Body */}
      <div className="flex-1 min-h-0 relative flex flex-col">
        {children}
      </div>
    </div>
  );
};
