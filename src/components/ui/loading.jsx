import * as React from "react"
import { cn } from "../../lib/utils"

const LoadingSpinner = React.forwardRef(({ className, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "animate-spin rounded-full border-2 border-white/20 border-t-primary",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
})
LoadingSpinner.displayName = "LoadingSpinner"

const LoadingDots = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex space-x-1", className)} {...props}>
    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
  </div>
))
LoadingDots.displayName = "LoadingDots"

const LoadingPulse = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("animate-pulse-glow", className)}
    {...props}
  >
    {children}
  </div>
))
LoadingPulse.displayName = "LoadingPulse"

const LoadingOverlay = React.forwardRef(({ className, children, isLoading, ...props }, ref) => (
  <div ref={ref} className={cn("relative", className)} {...props}>
    {children}
    {isLoading && (
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
        <div className="glass-card p-6 rounded-2xl">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-white text-sm">Loading...</p>
        </div>
      </div>
    )}
  </div>
))
LoadingOverlay.displayName = "LoadingOverlay"

export { LoadingSpinner, LoadingDots, LoadingPulse, LoadingOverlay }
