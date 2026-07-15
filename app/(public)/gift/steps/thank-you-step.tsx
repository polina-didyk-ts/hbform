import { Button } from "@/app/components/ui/button";
import { StepShell } from "../step-shell";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface ThankYouStepProps {
  status: SubmitStatus;
  errorMessage?: string;
  onSubmit: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function ThankYouStep({
  status,
  errorMessage,
  onSubmit,
  onBack,
  canGoBack,
}: ThankYouStepProps) {
  return (
    <StepShell
      testId="gift-step-thank-you"
      showBack={canGoBack && status !== "success"}
      onBack={onBack}
    >
      <h2 className="text-2xl font-semibold text-foreground">
        Thank you for completing the form ✨
      </h2>
      <p className="text-muted-foreground">
        Your choice is already in our orbit, and we&apos;re starting preparations for the birthday
        mission.
      </p>
      <p className="text-muted-foreground">
        May your birthday be warm, bright, and just a little cosmic 🪐
      </p>

      {status === "success" ? (
        <p data-testid="gift-submit-success" className="font-medium text-foreground">
          Saved — see you soon!
        </p>
      ) : (
        <div className="space-y-2">
          <Button
            data-testid="gift-submit-button"
            disabled={status === "submitting"}
            onClick={onSubmit}
          >
            {status === "submitting" ? "Submitting…" : "Submit"}
          </Button>
          {status === "error" && (
            <p data-testid="gift-submit-error" className="text-sm text-destructive">
              {errorMessage ?? "Something went wrong. Please try again."}
            </p>
          )}
        </div>
      )}
    </StepShell>
  );
}
