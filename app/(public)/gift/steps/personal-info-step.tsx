import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { PersonalInfo, StepProps } from "../types";

export function PersonalInfoStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  const [form, setForm] = useState<PersonalInfo>(
    answers.personalInfo ?? { firstName: "", lastName: "", phone: "", email: "" }
  );

  const isValid =
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.phone.trim() !== "" &&
    /^\S+@\S+\.\S+$/.test(form.email);

  function update<K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <StepShell
      testId="gift-step-personal-info"
      progress={getProgress("personalInfo", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">Please, type your personal info</h2>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            data-testid="gift-personal-info-first-name"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="Jane"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            data-testid="gift-personal-info-last-name"
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="Smith"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            data-testid="gift-personal-info-phone"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="050 123 4567"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            data-testid="gift-personal-info-email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="name@example.com"
          />
        </div>
      </div>
      <Button
        data-testid="gift-personal-info-continue"
        disabled={!isValid}
        onClick={() => onNext("personalInfo", { personalInfo: form })}
      >
        OK
      </Button>
    </StepShell>
  );
}
