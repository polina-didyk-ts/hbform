import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { StepProps } from "../types";

// One photo/illustration slot — 1200x800px (landscape).
export function GiftDetailGiftCardStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  return (
    <StepShell
      testId="gift-step-detail-gift-card"
      progress={getProgress("giftDetail_giftCard", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <div className="border-l-2 border-foreground/20 pl-4">
        <h2 className="text-2xl font-semibold text-foreground">Gift card</h2>
        <p className="mt-2 text-muted-foreground">
          You can also choose a gift card for one of the available services, depending on your
          country of residence 🙌
        </p>
      </div>
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
        <Image
          src="/gift/gift-card.png"
          alt="Gift card"
          fill
          priority
          sizes="(min-width: 640px) 480px, 100vw"
          className="object-cover"
        />
      </div>
      <Button
        data-testid="gift-detail-gift-card-continue"
        onClick={() => onNext("giftDetail_giftCard", {})}
      >
        Continue
      </Button>
    </StepShell>
  );
}
