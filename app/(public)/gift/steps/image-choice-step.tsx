import Image from "next/image";
import { OptionCard } from "../option-card";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { GiftOption, StepProps } from "../types";

// Thumbnail source images should be delivered at 1200x1200px (square).
const GIFT_OPTIONS: Array<{ id: GiftOption; label: string; image: string }> = [
  { id: "space_blanket", label: "Space blanket", image: "/gift/space-blanket.png" },
  { id: "gift_card", label: "Gift card", image: "/gift/gift-card.png" },
  { id: "donation", label: "Donation", image: "/gift/donation.png" },
  { id: "merch", label: "Company merch", image: "/gift/merch.png" },
];

export function ImageChoiceStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  return (
    <StepShell
      testId="gift-step-choice"
      progress={getProgress("giftChoice", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">Pick your gift</h2>
      <div className="grid grid-cols-2 gap-4">
        {GIFT_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            testId={`gift-option-${option.id}`}
            label={option.label}
            onSelect={() => onNext("giftChoice", { giftOption: option.id })}
          >
            <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={option.image}
                alt={option.label}
                fill
                priority
                sizes="(min-width: 640px) 260px, 45vw"
                className="object-cover"
              />
            </div>
          </OptionCard>
        ))}
      </div>
    </StepShell>
  );
}
