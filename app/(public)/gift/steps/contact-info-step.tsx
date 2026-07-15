import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { ContactInfo, StepProps } from "../types";

// Best-guess field set (no Address line 2, per the confirmed flow) — swap for the
// real field list once it's shared.
const FIELDS: Array<{ key: string; label: string; placeholder: string }> = [
  { key: "addressLine1", label: "Address", placeholder: "123 Main St" },
  { key: "city", label: "City", placeholder: "Lviv" },
  { key: "postalCode", label: "Postal code", placeholder: "79000" },
  { key: "country", label: "Country", placeholder: "Ukraine" },
];

export function ContactInfoStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  const [form, setForm] = useState<ContactInfo>(
    answers.contactInfo ?? Object.fromEntries(FIELDS.map((f) => [f.key, ""]))
  );

  const isValid = FIELDS.every((f) => form[f.key]?.trim() !== "");

  return (
    <StepShell
      testId="gift-step-contact-info"
      progress={getProgress("contactInfo", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">
        Fill the form with your contact information
      </h2>
      <div className="space-y-4">
        {FIELDS.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              data-testid={`gift-contact-info-${field.key}`}
              value={form[field.key] ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
      <Button
        data-testid="gift-contact-info-continue"
        disabled={!isValid}
        onClick={() => onNext("contactInfo", { contactInfo: form })}
      >
        OK
      </Button>
    </StepShell>
  );
}
