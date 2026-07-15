import { z } from "zod";

export const giftOptionSchema = z.enum(["space_blanket", "gift_card", "donation", "merch"]);
export const deliveryMethodSchema = z.enum(["home", "hub"]);
export const pickupCitySchema = z.enum(["Lviv", "Kyiv", "Wroclaw"]);
export const giftCardLocationSchema = z.enum([
  "Ukraine",
  "Poland",
  "Europe",
  "Canada",
  "USA",
  "Other",
]);

export const personalInfoSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().min(1).max(30),
  email: z.email(),
});

export const submitGiftResponseSchema = z
  .object({
    giftOption: giftOptionSchema,
    deliveryMethod: deliveryMethodSchema.optional(),
    pickupCity: pickupCitySchema.optional(),
    personalInfo: personalInfoSchema.optional(),
    // Screen 6 ("Fill the form with your contact information") fields aren't finalized yet,
    // so this stays a flexible bag until the exact field list is confirmed.
    contactInfo: z.record(z.string(), z.string()).optional(),
    postOfficeAddress: z.string().min(1).max(500).optional(),
    giftCardLocation: giftCardLocationSchema.optional(),
    giftCardService: z.string().min(1).max(200).optional(),
    // Optional — leaving it blank means "let the manager pick a charity".
    donationCharityLink: z.string().max(500).optional(),
    // Full stepId -> answer map from the wizard, kept for forward-compat as new branches are added.
    rawAnswers: z.record(z.string(), z.unknown()),
  })
  .superRefine((data, ctx) => {
    // Merch physically ships, so it goes through the exact same delivery questions
    // as the space blanket branch.
    if (data.giftOption === "space_blanket" || data.giftOption === "merch") {
      if (!data.deliveryMethod) {
        ctx.addIssue({
          code: "custom",
          path: ["deliveryMethod"],
          message: `deliveryMethod is required when giftOption is '${data.giftOption}'`,
        });
      }

      if (data.deliveryMethod === "hub" && !data.pickupCity) {
        ctx.addIssue({
          code: "custom",
          path: ["pickupCity"],
          message: "pickupCity is required when deliveryMethod is 'hub'",
        });
      }

      if (data.deliveryMethod === "home") {
        if (!data.personalInfo) {
          ctx.addIssue({
            code: "custom",
            path: ["personalInfo"],
            message: "personalInfo is required when deliveryMethod is 'home'",
          });
        }
        if (!data.contactInfo) {
          ctx.addIssue({
            code: "custom",
            path: ["contactInfo"],
            message: "contactInfo is required when deliveryMethod is 'home'",
          });
        }
        if (!data.postOfficeAddress) {
          ctx.addIssue({
            code: "custom",
            path: ["postOfficeAddress"],
            message: "postOfficeAddress is required when deliveryMethod is 'home'",
          });
        }
      }
    }

    if (data.giftOption === "gift_card") {
      if (!data.giftCardLocation) {
        ctx.addIssue({
          code: "custom",
          path: ["giftCardLocation"],
          message: "giftCardLocation is required when giftOption is 'gift_card'",
        });
      }
      if (!data.giftCardService) {
        ctx.addIssue({
          code: "custom",
          path: ["giftCardService"],
          message: "giftCardService is required when giftOption is 'gift_card'",
        });
      }
    }
  });

export type SubmitGiftResponseDto = z.infer<typeof submitGiftResponseSchema>;
