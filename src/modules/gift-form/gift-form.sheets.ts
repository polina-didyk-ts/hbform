import type { SubmitGiftResponseDto } from "./gift-form.dto";

// Explicit column order for the target spreadsheet. Kept as a hand-written mapping
// (rather than deriving columns from rawAnswers keys) so the sheet's header row stays
// stable as new gift branches are added later.
export const GIFT_RESPONSE_SHEET_HEADER = [
  "Submitted at",
  "Gift option",
  "Delivery method",
  "Pickup city",
  "First name",
  "Last name",
  "Phone",
  "Email",
  "Contact info",
  "Post office / parcel locker address",
  "Gift card location",
  "Gift card service",
  "Donation charity link",
];

export function buildGiftResponseSheetRow(
  data: SubmitGiftResponseDto,
  submittedAt: Date
): unknown[] {
  return [
    submittedAt.toISOString(),
    data.giftOption,
    data.deliveryMethod ?? "",
    data.pickupCity ?? "",
    data.personalInfo?.firstName ?? "",
    data.personalInfo?.lastName ?? "",
    data.personalInfo?.phone ?? "",
    data.personalInfo?.email ?? "",
    data.contactInfo ? JSON.stringify(data.contactInfo) : "",
    data.postOfficeAddress ?? "",
    data.giftCardLocation ?? "",
    data.giftCardService ?? "",
    data.donationCharityLink ?? "",
  ];
}
