// lib/login.ts
import puppeteer from "puppeteer";

export async function login({ username, password }) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // 1. Block unnecessary resources
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const type = req.resourceType();
      if (["image", "stylesheet", "font"].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // 2. Disable alert
    page.on("dialog", async (dialog) => {
      console.warn("Alert:", dialog.message());
      await dialog.dismiss();
    });

    // 3. Go to page
    await page.goto("https://dangkytinchi.ictu.edu.vn/kcntt/login.aspx", {
      waitUntil: "domcontentloaded",
    });

    await page.waitForSelector("#txtUserName", { timeout: 3000 });
    await page.type("#txtUserName", username);
    await page.type("#txtPassword", password);

    // 4. Submit form
    await Promise.all([
      page.click("#btnSubmit"),
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 5000 }),
    ]);

    // 5. Extract student name
    const studentElement = await page.$("#lblStudent");
    const studentName = studentElement
      ? await page.evaluate((el) => el?.innerText || "", studentElement)
      : null;

    return { studentName };
  } finally {
    await browser.close(); // Always clean up
  }
}
