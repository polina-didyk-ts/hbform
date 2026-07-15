import { OptionCard, PlaceholderImage } from "../option-card";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { GiftOption, StepProps } from "../types";

// Thumbnail source images should be delivered at 1200x1200px (square).
const GIFT_OPTIONS: Array<{ id: GiftOption; label: string }> = [
  { id: "space_blanket", label: "Space blanket" },
  { id: "gift_card", label: "Gift card" },
  { id: "donation", label: "Donation" },
  { id: "merch", label: "Company merch" },
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
            <PlaceholderImage className="mb-3 aspect-square w-full" label="1200×1200" />
          </OptionCard>
        ))}
      </div>
    </StepShell>
  );
}
