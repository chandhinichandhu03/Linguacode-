// ==============================================
// Loading Spinner Component
// ==============================================

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} rounded-full border-primary/30 border-t-primary animate-spin`}
      />
    </div>
  );
}

// Full-page loading state
export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
