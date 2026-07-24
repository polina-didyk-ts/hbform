"use client";

import { useState } from "react";
import { getNextStep } from "./step-config";
import type { GiftFormAnswers, StepId } from "./types";
import { IntroStep } from "./steps/intro-step";
import { ImageChoiceStep } from "./steps/image-choice-step";
import { GiftDetailStep } from "./steps/gift-detail-step";
import { DeliveryMethodStep } from "./steps/delivery-method-step";
import { PickupCityStep } from "./steps/pickup-city-step";
import { PersonalInfoStep } from "./steps/personal-info-step";
import { ContactInfoStep } from "./steps/contact-info-step";
import { PostOfficeStep } from "./steps/post-office-step";
import { GiftDetailGiftCardStep } from "./steps/gift-detail-gift-card-step";
import { GiftCardLocationStep } from "./steps/gift-card-location-step";
import { GiftCardServiceStep } from "./steps/gift-card-service-step";
import { GiftDetailDonationStep } from "./steps/gift-detail-donation-step";
import { GiftDetailMerchStep } from "./steps/gift-detail-merch-step";
import { FeedbackStep } from "./steps/feedback-step";
import { ThankYouStep, type SubmitStatus } from "./steps/thank-you-step";

export function GiftForm() {
  const [currentStep, setCurrentStep] = useState<StepId>("intro");
  const [history, setHistory] = useState<StepId[]>([]);
  const [answers, setAnswers] = useState<GiftFormAnswers>({});
  const [stepAnswers, setStepAnswers] = useState<Record<string, unknown>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string>();

  function handleNext(stepId: StepId, patch: Partial<GiftFormAnswers>) {
    const nextAnswers = { ...answers, ...patch };
    const next = getNextStep(stepId, nextAnswers);
    if (!next) return;

    setAnswers(nextAnswers);
    setStepAnswers((prev) => ({ ...prev, [stepId]: patch }));
    setHistory((prev) => [...prev, stepId]);
    setCurrentStep(next);
  }

  function handleBack() {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentStep(previous);
  }

  async function handleSubmit() {
    setSubmitStatus("submitting");
    setSubmitError(undefined);

    try {
      const res = await fetch("/api/gift-responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, rawAnswers: stepAnswers }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed with status ${res.status}`);
      }

      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  const canGoBack = history.length > 0;

  switch (currentStep) {
    case "intro":
      return (
        <IntroStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "giftChoice":
      return (
        <ImageChoiceStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "giftDetail_spaceBlanket":
      return (
        <GiftDetailStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "deliveryMethod":
      return (
        <DeliveryMethodStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "pickupCity":
      return (
        <PickupCityStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "personalInfo":
      return (
        <PersonalInfoStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "contactInfo":
      return (
        <ContactInfoStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "postOffice":
      return (
        <PostOfficeStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "giftDetail_giftCard":
      return (
        <GiftDetailGiftCardStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "giftCardLocation":
      return (
        <GiftCardLocationStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "giftCardService_ukraine":
    case "giftCardService_poland":
    case "giftCardService_europe":
    case "giftCardService_canada":
    case "giftCardService_usa":
    case "giftCardService_other":
      return (
        <GiftCardServiceStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "giftDetail_donation":
      return (
        <GiftDetailDonationStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "giftDetail_merch":
      return (
        <GiftDetailMerchStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "feedback":
      return (
        <FeedbackStep
          answers={answers}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
    case "thankYou":
      return (
        <ThankYouStep
          status={submitStatus}
          errorMessage={submitError}
          onSubmit={handleSubmit}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      );
  }
}
