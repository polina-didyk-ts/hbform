import { OptionCard } from "../option-card";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { DeliveryMethod, StepProps } from "../types";

const DELIVERY_METHODS: Array<{ id: DeliveryMethod; label: string }> = [
  { id: "home", label: "Delivery to my home address" },
  { id: "hub", label: "Pick up at the hub" },
];

export function DeliveryMethodStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  return (
    <StepShell
      testId="gift-step-delivery-method"
      progress={getProgress("deliveryMethod", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">
        How would you like to receive your gift?
      </h2>
      <div className="space-y-3">
        {DELIVERY_METHODS.map((method) => (
          <OptionCard
            key={method.id}
            testId={`gift-delivery-method-${method.id}`}
            label={method.label}
            onSelect={() => onNext("deliveryMethod", { deliveryMethod: method.id })}
          />
        ))}
      </div>
    </StepShell>
  );
}
