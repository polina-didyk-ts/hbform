# Google Sheets Setup (Gift Form)

The gift form (`/gift`) writes each submission to Postgres first, then makes a best-effort
append to a Google Sheet via a service account. Postgres is the source of truth — if Sheets
sync fails, the submission is not lost (see `giftFormService.submit` in
`src/modules/gift-form/gift-form.service.ts`).

## 1. Create a Google Cloud project (or reuse an existing one)

1. Go to [console.cloud.google.com](https://console.cloud.google.com/) → select or create a
   project.

## 2. Enable the Sheets API

1. **APIs & Services → Library** → search "Google Sheets API" → **Enable**.

## 3. Create a service account

1. **APIs & Services → Credentials → Create Credentials → Service account**.
2. Give it a name (e.g. `gift-form-sheets-sync`). No project-level role is needed — access is
   granted per-spreadsheet in step 5.
3. Open the created service account → **Keys → Add key → Create new key → JSON**. This
   downloads a JSON file — keep it private, it's a credential.

## 4. Extract the credentials

From the downloaded JSON:

- `client_email` → `GOOGLE_SHEETS_CLIENT_EMAIL`
- `private_key` → `GOOGLE_SHEETS_PRIVATE_KEY` (keep the `\n` escape sequences as-is; the app
  un-escapes them at runtime — see `src/lib/server/google-sheets.ts`)

Set both in `.env` (local) or as SST secrets (deployed — see step 6).

## 5. Share the target spreadsheet

1. Create (or open) the spreadsheet that should receive responses.
2. Add a header row matching `GIFT_RESPONSE_SHEET_HEADER` in
   `src/modules/gift-form/gift-form.sheets.ts` (Submitted at, Gift option, Delivery method,
   Pickup city, First name, Last name, Phone, Email, Contact info, Post office / parcel
   locker address, Gift card location, Gift card service, Donation charity link).
3. Rename the sheet/tab to `Responses` (or update `SHEETS_RANGE` in
   `gift-form.service.ts` to match).
4. Click **Share** → paste the service account's `client_email` → give it **Editor** access.
5. Copy the spreadsheet ID from its URL:
   `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit` → set as
   `GOOGLE_SHEETS_SPREADSHEET_ID`.

## 6. Set the secrets for deployment

```bash
npx sst secret set GoogleSheetsClientEmail "<client_email>"
npx sst secret set GoogleSheetsPrivateKey "<private_key>"
npx sst secret set GoogleSheetsSpreadsheetId "<spreadsheet_id>"
```

These are wired into the `Web` component's environment in `sst.config.ts`, following the same
pattern as `GoogleClientId`/`GoogleClientSecret` (Better Auth's OAuth credentials — a separate,
unrelated set of Google credentials from the ones used here).
