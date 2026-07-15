import { OptionCard } from "../option-card";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { PickupCity, StepProps } from "../types";

const CITIES: PickupCity[] = ["Lviv", "Kyiv", "Wroclaw"];

export function PickupCityStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  return (
    <StepShell
      testId="gift-step-pickup-city"
      progress={getProgress("pickupCity", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">
        Please specify the city where you would like to pick up your gift from the hub
      </h2>
      <div className="space-y-3">
        {CITIES.map((city) => (
          <OptionCard
            key={city}
            testId={`gift-pickup-city-${city.toLowerCase()}`}
            label={city}
            onSelect={() => onNext("pickupCity", { pickupCity: city })}
          />
        ))}
      </div>
    </StepShell>
  );
}
