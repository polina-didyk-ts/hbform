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
    await giftForm.submit();

    await expect(page.getByTestId("gift-submit-success")).toBeVisible();
  });

  test("submits the hub pickup branch and skips personal info", async ({ page }) => {
    const giftForm = new GiftFormPage(page);

    await giftForm.goto();
    await giftForm.start();
    await giftForm.selectSpaceBlanket();
    await giftForm.continueFromGiftDetail();
    await giftForm.selectDeliveryMethod("hub");
    await giftForm.selectPickupCity("kyiv");

    // Pickup branch goes straight to the thank-you screen — no personal info collected.
    await expect(page.getByTestId("gift-step-personal-info")).toHaveCount(0);

    await giftForm.submit();

    await expect(page.getByTestId("gift-submit-success")).toBeVisible();
  });

  test("submits the gift card branch and skips delivery questions", async ({ page }) => {
    const giftForm = new GiftFormPage(page);
    const member = createTestGiftMember(Date.now());

    await giftForm.goto();
    await giftForm.start();
    await giftForm.selectGiftCard();
    await giftForm.continueFromGiftCardDetail();
    await giftForm.fillPersonalInfo(member);
    await giftForm.selectGiftCardLocation("ukraine");
    await giftForm.selectGiftCardService("bodo");

    // Gift cards are digital — no delivery method or address collected.
    await expect(page.getByTestId("gift-step-delivery-method")).toHaveCount(0);

    await giftForm.submit();

    await expect(page.getByTestId("gift-submit-success")).toBeVisible();
  });

  test("submits the donation branch with a blank charity link", async ({ page }) => {
    const giftForm = new GiftFormPage(page);
    const member = createTestGiftMember(Date.now());

    await giftForm.goto();
    await giftForm.start();
    await giftForm.selectDonation();
    // Leaving the charity link blank is a valid answer — the manager picks one.
    await giftForm.submitDonation();
    await giftForm.fillPersonalInfo(member);
    await giftForm.submit();

    await expect(page.getByTestId("gift-submit-success")).toBeVisible();
  });

  test("submits the merch branch through the shared home delivery flow", async ({ page }) => {
    const giftForm = new GiftFormPage(page);
    const member = createTestGiftMember(Date.now());

    await giftForm.goto();
    await giftForm.start();
    await giftForm.selectMerch();
    await giftForm.continueFromMerchDetail();
    await giftForm.selectDeliveryMethod("home");
    await giftForm.fillPersonalInfo(member);
    await giftForm.fillContactInfo({
      addressLine1: "123 Main St",
      city: "Lviv",
      postalCode: "79000",
      country: "Ukraine",
    });
    await giftForm.fillPostOfficeAddress("Nova Poshta #12");
    await giftForm.submit();

    await expect(page.getByTestId("gift-submit-success")).toBeVisible();
  });
});
