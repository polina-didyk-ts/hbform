export type GiftOption = "space_blanket" | "gift_card" | "donation" | "merch";
export type DeliveryMethod = "home" | "hub";
export type PickupCity = "Lviv" | "Kyiv" | "Wroclaw";
export type GiftCardLocation = "Ukraine" | "Poland" | "Europe" | "Canada" | "USA" | "Other";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

// Screen 6 ("Fill the form with your contact information") fields aren't finalized yet,
// so this stays a flexible bag until the exact field list is confirmed.
export type ContactInfo = Record<string, string>;

export interface GiftFormAnswers {
  giftOption?: GiftOption;
  deliveryMethod?: DeliveryMethod;
  pickupCity?: PickupCity;
  personalInfo?: PersonalInfo;
  contactInfo?: ContactInfo;
  postOfficeAddress?: string;
  giftCardLocation?: GiftCardLocation;
  giftCardService?: string;
  donationCharityLink?: string;
}

export type StepId =
  | "intro"
  | "giftChoice"
  | "giftDetail_spaceBlanket"
  | "deliveryMethod"
  | "pickupCity"
  | "personalInfo"
  | "contactInfo"
  | "postOffice"
  | "giftDetail_giftCard"
  | "giftCardLocation"
  | "giftCardService_ukraine"
  | "giftCardService_poland"
  | "giftCardService_europe"
  | "giftCardService_canada"
  | "giftCardService_usa"
  | "giftCardService_other"
  | "giftDetail_donation"
  | "giftDetail_merch"
  | "thankYou";

export interface StepProps {
  answers: GiftFormAnswers;
  onNext: (stepId: StepId, patch: Partial<GiftFormAnswers>) => void;
  onBack: () => void;
  canGoBack: boolean;
}
