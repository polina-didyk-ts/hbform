import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { StepShell } from "../step-shell";
import { getProgress } from "../step-config";
import type { StepProps } from "../types";

const DETAIL_IMAGES = [
  "/gift/space-blanket-detail-1.jpg",
  "/gift/space-blanket-detail-2.jpg",
  "/gift/space-blanket-detail-3.jpg",
];

// Mirrors the 3-photo collage layout from the reference Typeform draft.
export function GiftDetailStep({ answers, onNext, onBack, canGoBack }: StepProps) {
  return (
    <StepShell
      testId="gift-step-detail-space-blanket"
      progress={getProgress("giftDetail_spaceBlanket", answers)}
      showBack={canGoBack}
      onBack={onBack}
    >
      <div className="border-l-2 border-foreground/20 pl-4">
        <h2 className="text-2xl font-semibold text-foreground">Space blanket</h2>
        <p className="mt-2 text-muted-foreground">
          This blanket features the Techstack star, with its coordinates incorporated into the
          design. It was created for cozy evenings and little pauses between big tasks. A gift that
          brings comfort, warmth, and the feeling that you&apos;re part of our galaxy 🪐
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {DETAIL_IMAGES.map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={src}
              alt="Space blanket detail"
              fill
              sizes="(min-width: 640px) 160px, 30vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <Button
        data-testid="gift-detail-continue"
        onClick={() => onNext("giftDetail_spaceBlanket", {})}
      >
        Continue
      </Button>
    </StepShell>
  );
}
