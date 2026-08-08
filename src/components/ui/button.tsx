import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default:
        'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50',
      destructive:
        'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50',
      outline:
        'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50',
      secondary:
        'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-50',
      ghost:
        'hover:bg-slate-100 active:bg-slate-200 text-slate-900 disabled:opacity-50',
    }

    const sizes = {
      default: 'h-10 px-4 py-2 text-sm font-medium',
      sm: 'h-8 px-3 py-1 text-xs font-medium',
      lg: 'h-12 px-6 py-3 text-base font-medium',
    }

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
