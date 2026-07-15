import { OptionCard } from "../option-card";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { GiftCardLocation, StepProps } from "../types";

const LOCATIONS: Array<{ id: GiftCardLocation; label: string }> = [
  { id: "Ukraine", label: "Ukraine 🇺🇦" },
  { id: "Poland", label: "Poland 🇵🇱" },
  { id: "Europe", label: "Europe 🇪🇺" },
  { id: "Canada", label: "Canada 🇨🇦" },
  { id: "USA", label: "USA 🇺🇸" },
  { id: "Other", label: "Other 🌍" },
];

export function GiftCardLocationStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  return (
    <StepShell
      testId="gift-step-gift-card-location"
      progress={getProgress("giftCardLocation", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">Your current location:</h2>
      <div className="space-y-3">
        {LOCATIONS.map((location) => (
          <OptionCard
            key={location.id}
            testId={`gift-card-location-${location.id.toLowerCase()}`}
            label={location.label}
            onSelect={() => onNext("giftCardLocation", { giftCardLocation: location.id })}
          />
        ))}
      </div>
    </StepShell>
  );
}
