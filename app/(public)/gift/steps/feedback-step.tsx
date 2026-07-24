import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { StepProps } from "../types";

export function FeedbackStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  const [feedback, setFeedback] = useState(answers.feedback ?? "");

  return (
    <StepShell
      testId="gift-step-feedback"
      progress={getProgress("feedback", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">
        One last thing — any feedback for us?
      </h2>
      <p className="text-muted-foreground">
        Totally optional, but we&apos;d love to hear your thoughts 💬
      </p>
      <Textarea
        data-testid="gift-feedback-input"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Type your answer here..."
        rows={4}
        autoFocus
      />
      <Button data-testid="gift-feedback-continue" onClick={() => onNext("feedback", { feedback })}>
        OK
      </Button>
    </StepShell>
  );
}
