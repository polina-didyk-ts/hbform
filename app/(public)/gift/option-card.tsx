import type { ReactNode } from "react";
import { cn } from "@/src/lib/client";

interface OptionCardProps {
  label: string;
  description?: string;
  disabled?: boolean;
  testId: string;
  onSelect: () => void;
  children?: ReactNode;
}

export function OptionCard({
  label,
  description,
  disabled,
  testId,
  onSelect,
  children,
}: OptionCardProps) {
  return (
    <button
      type="button"
      data-testid={testId}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "w-full cursor-pointer rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all",
        "hover:border-foreground/30 hover:shadow-md active:scale-[0.99]",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:shadow-sm"
      )}
    >
      {children}
      <div className="font-medium text-foreground">{label}</div>
      {description && <div className="mt-1 text-sm text-muted-foreground">{description}</div>}
      {disabled && <div className="mt-1 text-xs text-muted-foreground">Coming soon</div>}
    </button>
  );
}
