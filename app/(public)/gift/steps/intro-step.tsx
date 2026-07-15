import { Clock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { StepShell } from "../step-shell";
import type { StepProps } from "../types";

export function IntroStep({ onNext }: StepProps) {
  return (
    <StepShell testId="gift-step-intro">
      <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        Your birthday is coming up, and our team is already starting preparations for the festive
        mission 🌟
      </h1>
      <p className="text-lg text-muted-foreground">
        Please choose a gift that you will really like and add a few details so that we can prepare
        everything on time.
      </p>
      <div className="space-y-3">
        <Button size="lg" data-testid="gift-start-button" onClick={() => onNext("intro", {})}>
          Start
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Takes 2 minutes
        </div>
      </div>
    </StepShell>
  );
}
