import type { GiftCardLocation, GiftFormAnswers, StepId } from "./types";

export const GIFT_CARD_SERVICE_STEP_BY_LOCATION: Record<GiftCardLocation, StepId> = {
  Ukraine: "giftCardService_ukraine",
  Poland: "giftCardService_poland",
  Europe: "giftCardService_europe",
  Canada: "giftCardService_canada",
  USA: "giftCardService_usa",
  Other: "giftCardService_other",
};

/**
 * Adding a new gift branch means: adding a `giftDetail_*` case here, pointing
 * `giftChoice`'s branch at it, and following it through to wherever that branch
 * rejoins the shared flow (usually `thankYou`, or `deliveryMethod` for gifts that
 * ship physically). No other step needs to change.
 */
export function getNextStep(current: StepId, answers: GiftFormAnswers): StepId | null {
  switch (current) {
    case "intro":
      return "giftChoice";
    case "giftChoice":
      switch (answers.giftOption) {
        case "space_blanket":
          return "giftDetail_spaceBlanket";
        case "gift_card":
          return "giftDetail_giftCard";
        case "donation":
          return "giftDetail_donation";
        case "merch":
          return "giftDetail_merch";
        default:
          return null;
      }
    case "giftDetail_spaceBlanket":
    case "giftDetail_merch":
      return "deliveryMethod";
    case "deliveryMethod":
      return answers.deliveryMethod === "hub" ? "pickupCity" : "personalInfo";
    case "pickupCity":
      return "thankYou";
    case "personalInfo":
      // personalInfo is shared across three branches, so where it goes next
      // depends on which one led here.
      if (answers.giftOption === "gift_card") return "giftCardLocation";
      if (answers.giftOption === "donation") return "thankYou";
      return "contactInfo";
    case "contactInfo":
      return "postOffice";
    case "postOffice":
      return "thankYou";
    case "giftDetail_giftCard":
      return "personalInfo";
    case "giftCardLocation":
      return answers.giftCardLocation
        ? GIFT_CARD_SERVICE_STEP_BY_LOCATION[answers.giftCardLocation]
        : null;
    case "giftCardService_ukraine":
    case "giftCardService_poland":
    case "giftCardService_europe":
    case "giftCardService_canada":
    case "giftCardService_usa":
    case "giftCardService_other":
      return "thankYou";
    case "giftDetail_donation":
      return "personalInfo";
    case "thankYou":
      return null;
  }
}

// Used only to render an approximate progress bar — exact once the branch is fully known.
const PATH_HUB: StepId[] = [
  "intro",
  "giftChoice",
  "giftDetail_spaceBlanket",
  "deliveryMethod",
  "pickupCity",
  "thankYou",
];

const PATH_HOME: StepId[] = [
  "intro",
  "giftChoice",
  "giftDetail_spaceBlanket",
  "deliveryMethod",
  "personalInfo",
  "contactInfo",
  "postOffice",
  "thankYou",
];

// All gift-card country variants share the same step count — only the destination
// screen id differs, so any one of them stands in for the whole family here.
const PATH_GIFT_CARD: StepId[] = [
  "intro",
  "giftChoice",
  "giftDetail_giftCard",
  "personalInfo",
  "giftCardLocation",
  "giftCardService_ukraine",
  "thankYou",
];

const PATH_DONATION: StepId[] = [
  "intro",
  "giftChoice",
  "giftDetail_donation",
  "personalInfo",
  "thankYou",
];

function canonicalizeForProgress(stepId: StepId): StepId {
  if (stepId.startsWith("giftCardService_")) return "giftCardService_ukraine";
  // Merch reuses the exact same delivery flow as the space blanket, just with a
  // different opening screen — canonicalize so it maps onto PATH_HUB/PATH_HOME.
  if (stepId === "giftDetail_merch") return "giftDetail_spaceBlanket";
  return stepId;
}

export function getProgress(
  current: StepId,
  answers: GiftFormAnswers
): { index: number; total: number } {
  const path =
    answers.giftOption === "gift_card"
      ? PATH_GIFT_CARD
      : answers.giftOption === "donation"
        ? PATH_DONATION
        : answers.deliveryMethod === "hub"
          ? PATH_HUB
          : PATH_HOME;
  const index = path.indexOf(canonicalizeForProgress(current));
  return { index: index === -1 ? 0 : index + 1, total: path.length };
}
