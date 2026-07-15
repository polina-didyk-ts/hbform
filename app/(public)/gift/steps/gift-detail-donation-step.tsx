import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { StepProps } from "../types";

export function GiftDetailDonationStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  const [link, setLink] = useState(answers.donationCharityLink ?? "");

  return (
    <StepShell
      testId="gift-step-detail-donation"
      progress={getProgress("giftDetail_donation", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">Donation</h2>
      <p className="text-muted-foreground">
        Thank you for your contribution. Please leave a link to the charity or foundation you would
        like us to donate to.
      </p>
      <p className="text-muted-foreground">
        If you don&apos;t have a specific organization in mind, leave this field blank, and the
        manager will choose one at their discretion.
      </p>
      <Input
        data-testid="gift-donation-charity-link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Type your answer here..."
        autoFocus
      />
      <Button
        data-testid="gift-donation-continue"
        onClick={() => onNext("giftDetail_donation", { donationCharityLink: link })}
      >
        OK
      </Button>
    </StepShell>
  );
}
