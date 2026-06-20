// ==============================================
// Animated Progress Bar Component
// ==============================================

"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = "md",
  color,
}: ProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  // Animate the progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {showPercentage && (
            <span className="text-xs text-muted-foreground">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full ${sizeClasses[size]} bg-secondary rounded-full overflow-hidden`}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${animatedValue}%`,
            background: color || "linear-gradient(90deg, var(--primary), oklch(0.7 0.2 300))",
          }}
        />
      </div>
    </div>
  );
}
