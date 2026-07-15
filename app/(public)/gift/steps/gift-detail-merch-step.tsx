import { Button } from "@/app/components/ui/button";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { StepProps } from "../types";

export function GiftDetailMerchStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  return (
    <StepShell
      testId="gift-step-detail-merch"
      progress={getProgress("giftDetail_merch", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <div className="border-l-2 border-foreground/20 pl-4">
        <h2 className="text-2xl font-semibold text-foreground">Company merch</h2>
        <p className="mt-2 text-muted-foreground">
          If you&apos;ve been with the company for 3+ years, you can choose from a range of merch
          that your manager will contact you about.
        </p>
      </div>
      <Button
        data-testid="gift-detail-merch-continue"
        onClick={() => onNext("giftDetail_merch", {})}
      >
        Continue
      </Button>
    </StepShell>
  );
}
