import { prisma, logger, appendRow } from "@/src/lib/server";
import type { Prisma } from "../../../prisma/generated/client";
import type { SubmitGiftResponseDto } from "./gift-form.dto";
import { buildGiftResponseSheetRow } from "./gift-form.sheets";

const log = logger.child({ module: "gift-form.service" });

const SHEETS_RANGE = "Responses!A:M";

export const giftFormService = {
  async submit(data: SubmitGiftResponseDto) {
    log.debug(
      { giftOption: data.giftOption, deliveryMethod: data.deliveryMethod },
      "Submitting gift response"
    );

    const response = await prisma.giftResponse.create({
      data: {
        giftOption: data.giftOption,
        deliveryMethod: data.deliveryMethod,
        pickupCity: data.pickupCity,
        firstName: data.personalInfo?.firstName,
        lastName: data.personalInfo?.lastName,
        phone: data.personalInfo?.phone,
        email: data.personalInfo?.email,
        contactInfo: data.contactInfo as Prisma.InputJsonValue | undefined,
        postOfficeAddress: data.postOfficeAddress,
        giftCardLocation: data.giftCardLocation,
        giftCardService: data.giftCardService,
        donationCharityLink: data.donationCharityLink,
        rawAnswers: data.rawAnswers as Prisma.InputJsonValue,
      },
    });

    log.info({ giftResponseId: response.id }, "Gift response saved");

    // Best-effort: the DB write above is the source of truth, so a Sheets outage
    // must never fail the member's submission.
    await syncToSheets(response.id, data, response.createdAt);

    return { id: response.id };
  },
};

async function syncToSheets(
  giftResponseId: string,
  data: SubmitGiftResponseDto,
  submittedAt: Date
) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    log.warn(
      { giftResponseId },
      "GOOGLE_SHEETS_SPREADSHEET_ID not configured, skipping Sheets sync"
    );
    return;
  }

  try {
    await appendRow(spreadsheetId, SHEETS_RANGE, buildGiftResponseSheetRow(data, submittedAt));
    await prisma.giftResponse.update({
      where: { id: giftResponseId },
      data: { sheetsSyncedAt: new Date() },
    });
    log.info({ giftResponseId }, "Gift response synced to Google Sheets");
  } catch (error) {
    log.warn({ giftResponseId, err: error }, "Failed to sync gift response to Google Sheets");
  }
}
