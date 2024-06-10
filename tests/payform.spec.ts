import path from "path";
import { fileURLToPath } from "url";
import { test, Route } from "@playwright/test";
import { TDSModal } from "../components/modals/tds.modal";
import { FORM_ERRORS } from "../data/form-errors";
import { TEST_CARDS } from "../data/test-cards";
import { PayForm } from "../pages/payform.page";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAYFORM_HTML_PAGE = path.join(__dirname, "..", "static", "payform.html");

test.describe("PayForm tests", () => {
  let payForm: PayForm;
  let tdsModal: TDSModal;

  test.beforeEach(async ({ page }) => {
    payForm = new PayForm(page);
    tdsModal = new TDSModal(page);

    await page.goto(PAYFORM_HTML_PAGE);
  });

  test("Successful payment", async () => {
    await payForm.fillCardDetails(TEST_CARDS.assignmentCard);
    await payForm.completePayment();
    await tdsModal.triggerSuccessfulAuthentication();
    await payForm.verifyCtnHashExists();
  });

  test("Failed payment", async ({ page }) => {
    const error = FORM_ERRORS.assignmentError;

    await page.route("**/verifyCardDetails", async (route: Route) =>
      route.fulfill({
        json: { error: error.apiResponse },
      }),
    );

    await payForm.fillCardDetails(TEST_CARDS.assignmentCard);
    await payForm.completePayment();
    await payForm.expectErrorMessage(error.shownText);
  });
});
