import { test, expect } from "@playwright/test";
import { GiftFormPage } from "../../pages/gift/gift-form.page";
import { createTestGiftMember } from "../../fixtures/test-data";

test.describe("Gift form", () => {
  test("submits the home delivery branch", async ({ page }) => {
    const giftForm = new GiftFormPage(page);
    const member = createTestGiftMember(Date.now());

    await giftForm.goto();
    await giftForm.start();
    await giftForm.selectSpaceBlanket();
    await giftForm.continueFromGiftDetail();
    await giftForm.selectDeliveryMethod("home");
    await giftForm.fillPersonalInfo(member);
    await giftForm.fillContactInfo({
      addressLine1: "123 Main St",
      city: "Lviv",
      postalCode: "79000",
      country: "Ukraine",
    });
    await giftForm.fillPostOfficeAddress("Nova Poshta #12");
    await giftForm.fillFeedback("Loved the process, thanks!");
    await giftForm.submit();

    await expect(page.getByTestId("gift-submit-success")).toBeVisible();
  });

  test("submits the hub pickup branch through personal info and pickup city", async ({ page }) => {
    const giftForm = new GiftFormPage(page);
    const member = createTestGiftMember(Date.now());

    await giftForm.goto();
    await giftForm.start();
    await giftForm.selectSpaceBlanket();
    await giftForm.continueFromGiftDetail();
    await giftForm.selectDeliveryMethod("hub");
    await giftForm.fillPersonalInfo(member);
    await giftForm.selectPickupCity("kyiv");

    // Pickup branch skips the shipping address/post office screens.
    await expect(page.getByTestId("gift-step-contact-info")).toHaveCount(0);

    await giftForm.fillFeedback();
    await giftForm.submit();

    await expect(page.getByTestId("gift-submit-success")).toBeVisible();
  });

  test("submits the coins branch straight through to the thank-you page", async ({ page }) => {
    const giftForm = new GiftFormPage(page);

    await giftForm.goto();
    await giftForm.start();
    await giftForm.selectCoins();

    await expect(page.getByTestId("gift-step-detail-coins")).toBeVisible();
    await giftForm.continueFromCoinsDetail();

    // Coins is purely informational — no personal info or feedback collected.
    await expect(page.getByTestId("gift-step-personal-info")).toHaveCount(0);
    await expect(page.getByTestId("gift-step-feedback")).toHaveCount(0);
    await expect(page.getByTestId("gift-step-thank-you")).toBeVisible();

    await giftForm.submit();

    await expect(page.getByTestId("gift-submit-success")).toBeVisible();
  });
});
