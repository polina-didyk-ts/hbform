import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";

interface StepShellProps {
  progress?: { index: number; total: number };
  showBack?: boolean;
  onBack?: () => void;
  testId: string;
  children: ReactNode;
}

export function StepShell({ progress, showBack, onBack, testId, children }: StepShellProps) {
  return (
    <div
      data-testid={testId}
      className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-background"
    >
      {progress && (
        <div className="absolute inset-x-0 top-0 z-10 p-0">
          <Progress value={(progress.index / progress.total) * 100} className="rounded-none" />
        </div>
      )}

      {showBack && (
        <button
          type="button"
          data-testid="gift-form-back"
          onClick={onBack}
          className="absolute left-4 top-6 z-10 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:left-6 sm:top-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[70vh] w-[70vw] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, #f59e0b, #ec4899 35%, #a855f7 60%, #3b82f6 85%)",
        }}
      />

      <div className="relative z-[1] flex flex-1 items-center px-6 py-24 sm:px-16">
        <div className="w-full max-w-2xl space-y-8">{children}</div>
      </div>
    </div>
  );
}
