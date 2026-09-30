import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { StepProps } from "../types";

export function GiftDetailCoinsStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  return (
    <StepShell
      testId="gift-step-detail-coins"
      progress={getProgress("giftDetail_coins", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <div className="border-l-2 border-foreground/20 pl-4">
        <h2 className="text-2xl font-semibold text-foreground">Coins</h2>
        <p className="mt-2 text-muted-foreground">
          Coins can be exchanged for merch, a gift card, or a donation on our CC portal. You can
          also choose to save them and use them later.
        </p>
      </div>
      <div className="relative aspect-square w-48 overflow-hidden rounded-lg">
        <Image
          src="/gift/coins.jpg"
          alt="Coins"
          fill
          priority
          sizes="192px"
          className="object-cover"
        />
      </div>
      <Button
        data-testid="gift-detail-coins-continue"
        onClick={() => onNext("giftDetail_coins", {})}
      >
        Continue
      </Button>
    </StepShell>
  );
}
