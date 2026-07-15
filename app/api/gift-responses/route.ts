import { NextResponse } from "next/server";
import { apiHandler } from "@/src/lib/server";
import { giftFormService } from "@/src/modules/gift-form/gift-form.service";
import { submitGiftResponseSchema } from "@/src/modules/gift-form/gift-form.dto";

// Public endpoint: the gift form is a single shared link, no auth required.
export const POST = apiHandler(async (req) => {
  const data = submitGiftResponseSchema.parse(await req.json());
  const { id } = await giftFormService.submit(data);
  return NextResponse.json({ id }, { status: 201 });
});
