import * as React from "react"
import { cn } from "../../lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary/20 text-primary border-primary/30",
    secondary: "bg-secondary/20 text-secondary border-secondary/30",
    accent: "bg-accent/20 text-accent border-accent/30",
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    danger: "bg-red-500/20 text-red-400 border-red-500/30",
    glass: "glass-card border-white/20 text-white",
    gradient: "bg-gradient-to-r from-primary to-secondary text-white border-0"
  }

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 hover:opacity-90",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

const Avatar = React.forwardRef(({ className, src, alt, fallback, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    default: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary ring-2 ring-white/20 overflow-hidden",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-white">{fallback}</span>
      )}
    </div>
  )
})
Avatar.displayName = "Avatar"

const ProgressBar = React.forwardRef(({ className, value = 0, max = 100, variant = "default", ...props }, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const variants = {
    default: "from-primary to-secondary",
    success: "from-green-500 to-green-600",
    warning: "from-yellow-500 to-orange-500",
    danger: "from-red-500 to-red-600",
    rainbow: "from-pink-500 via-purple-500 to-blue-500"
  }

  return (
    <div
      ref={ref}
      className={cn("w-full bg-white/10 rounded-full h-2 overflow-hidden", className)}
      {...props}
    >
      <div
        className={cn(
          "h-full bg-gradient-to-r transition-all duration-500 ease-out rounded-full",
          variants[variant]
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
})
ProgressBar.displayName = "ProgressBar"

export { Badge, Avatar, ProgressBar }
