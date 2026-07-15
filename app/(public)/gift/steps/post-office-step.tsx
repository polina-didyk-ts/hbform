import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { StepProps } from "../types";

export function PostOfficeStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  const [value, setValue] = useState(answers.postOfficeAddress ?? "");

  return (
    <StepShell
      testId="gift-step-post-office"
      progress={getProgress("postOffice", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">
        Post office or parcel locker address
      </h2>
      <Input
        data-testid="gift-post-office-address"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your answer here..."
        autoFocus
      />
      <Button
        data-testid="gift-post-office-continue"
        disabled={value.trim() === ""}
        onClick={() => onNext("postOffice", { postOfficeAddress: value })}
      >
        OK
      </Button>
    </StepShell>
  );
}
