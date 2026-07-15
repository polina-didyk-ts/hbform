import { type ReactNode, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { OptionCard } from "../option-card";
import { StepShell } from "../step-shell";
import { getProgress, GIFT_CARD_SERVICE_STEP_BY_LOCATION } from "../step-config";
import type { GiftCardLocation, StepProps } from "../types";

interface Service {
  id: string;
  name: string;
  // Text immediately following the bold service name, e.g. " - is a service that...".
  suffix: string;
}

interface LocationConfig {
  title: string;
  intro: string;
  services: Service[];
}

const AMAZON: Service = {
  id: "amazon_gift_card",
  name: "Amazon Gift Card",
  suffix:
    " gives you access to a vast selection of products and services, including electronics, books, home goods, and more.",
};
const APPLE: Service = {
  id: "apple_gift_card",
  name: "Apple Gift Card",
  suffix: " allows you to purchase Apple products and services.",
};
const GIFTPAY: Service = {
  id: "giftpay_evouchers",
  name: "GiftPay eVouchers",
  suffix:
    " are digital gift vouchers that let you choose a gift card from a wide range of partner brands available in your country.",
};

// "Other" isn't a fixed set of services, so it isn't in this map — handled separately below.
const LOCATION_CONFIG: Record<Exclude<GiftCardLocation, "Other">, LocationConfig> = {
  Ukraine: {
    title: "Ukraine 🇺🇦",
    intro: "You can choose between the following two services:",
    services: [
      {
        id: "bodo",
        name: "Bodo",
        suffix:
          " - is a service that offers experiences as gifts. Instead of a traditional item, you receive an emotion or memorable experience, such as a flight, spa treatment, dinner, workshop, and more.",
      },
      {
        id: "bodocard",
        name: "Bodocard",
        suffix:
          " - is a separate service offering electronic gift cards for purchases at partner stores, including Comfy, EVA, Book24, Silpo, WOG, and others.",
      },
    ],
  },
  Poland: {
    title: "Poland 🇵🇱",
    intro: "You can choose from the following services:",
    services: [
      {
        id: "empik",
        name: "Empik",
        suffix:
          " specializes in products for leisure, culture, and education, including books, magazines, music, films, games, arts and crafts supplies, and more.",
      },
      {
        id: "superprezenty",
        name: "Superprezenty",
        suffix:
          " is a service that offers experiences as gifts. Instead of a traditional item, you receive an emotion or memorable experience, such as a flight, spa treatment, dinner, workshop, and more.",
      },
      {
        id: "allegro",
        name: "Allegro",
        suffix:
          " is Poland's largest online shopping platform, where you can find almost anything, including clothing, household appliances, electronics, home goods, sports equipment, groceries, and more.",
      },
    ],
  },
  Europe: {
    title: "Europe 🇪🇺",
    intro: "You can choose from the following services:",
    services: [AMAZON, APPLE, GIFTPAY],
  },
  Canada: {
    title: "Canada 🇨🇦",
    intro: "You can choose from the following services:",
    services: [
      AMAZON,
      APPLE,
      GIFTPAY,
      {
        id: "cardly",
        name: "Cardly",
        suffix:
          " offers gift vouchers that let you choose a gift card from a broad selection of partner brands available in your country, including Amazon, Walmart, IKEA, Apple, Google Play, Sephora, Starbucks, Uber Eats, Air Canada, and many others.",
      },
    ],
  },
  USA: {
    title: "USA 🇺🇸",
    intro: "You can choose from the following services:",
    services: [AMAZON, APPLE, GIFTPAY],
  },
};

function ServiceList({ services }: { services: Service[] }): ReactNode {
  return (
    <div className="space-y-3 text-muted-foreground">
      {services.map((service) => (
        <p key={service.id}>
          <strong className="text-foreground">{service.name}</strong>
          {service.suffix}
        </p>
      ))}
    </div>
  );
}

export function GiftCardServiceStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  const location = answers.giftCardLocation;
  const stepId = location ? GIFT_CARD_SERVICE_STEP_BY_LOCATION[location] : "giftCardLocation";

  // "Other" isn't one of the pre-defined markets, so instead of guessing service names,
  // this collects free text — flagged for the real copy once that's decided.
  const [otherService, setOtherService] = useState(answers.giftCardService ?? "");

  if (!location) return null;

  if (location === "Other") {
    return (
      <StepShell
        testId="gift-step-gift-card-service-other"
        progress={getProgress("giftCardService_other", answers)}
        showBack={canGoBack}
        onBack={onBack}
      >
        <h2 className="text-2xl font-semibold text-foreground">Other 🌍</h2>
        <p className="text-muted-foreground">
          Tell us which gift card or service you&apos;d like — we&apos;ll check availability for
          your country.
        </p>
        <Input
          data-testid="gift-card-service-other-input"
          value={otherService}
          onChange={(e) => setOtherService(e.target.value)}
          placeholder="e.g. a specific store or platform"
        />
        <Button
          data-testid="gift-card-service-other-continue"
          disabled={otherService.trim() === ""}
          onClick={() => onNext(stepId, { giftCardService: otherService })}
        >
          OK
        </Button>
      </StepShell>
    );
  }

  const config = LOCATION_CONFIG[location];

  return (
    <StepShell
      testId={`gift-step-gift-card-service-${location.toLowerCase()}`}
      progress={getProgress(stepId, answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">{config.title}</h2>
      <p className="text-muted-foreground">{config.intro}</p>
      <ServiceList services={config.services} />
      <div className="space-y-3">
        {config.services.map((service) => (
          <OptionCard
            key={service.id}
            testId={`gift-card-service-${service.id}`}
            label={service.name}
            onSelect={() => onNext(stepId, { giftCardService: service.id })}
          />
        ))}
      </div>
    </StepShell>
  );
}
