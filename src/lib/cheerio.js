import * as cheerio from "cheerio";

export async function loginWithCheerio({ username, password }) {
  try {
    // Get initial page và follow redirect
    const response = await fetch(
      "https://dangkytinchi.ictu.edu.vn/kcntt/login.aspx",
      {
        redirect: "follow",
      }
    );

    const finalUrl = response.url; // URL có session ID
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract form data
    const viewState = $('input[name="__VIEWSTATE"]').val();
    const viewStateGenerator = $('input[name="__VIEWSTATEGENERATOR"]').val();
    const eventValidation = $('input[name="__EVENTVALIDATION"]').val();

    if (!viewState || !eventValidation) {
      throw new Error("Could not find required form fields");
    }

    const formData = new URLSearchParams({
      __VIEWSTATE: viewState,
      __VIEWSTATEGENERATOR: viewStateGenerator || "",
      __EVENTVALIDATION: eventValidation,
      txtUserName: username,
      txtPassword: password,
      btnSubmit: "Đăng nhập",
    });

    const cookies = response.headers.get("set-cookie") || "";

    // Submit đến URL có session ID
    const loginResponse = await fetch(finalUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookies,
        Referer: finalUrl,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      redirect: "follow",
    });

    const resultHtml = await loginResponse.text();
    const $result = cheerio.load(resultHtml);

    const studentName = $result("#lblStudent").text().trim();
    const errorMessage = $result('[id*="error"], .error, [class*="error"]')
      .text()
      .trim();

    if (studentName) {
      return {
        success: true,
        studentName,
        cookies: loginResponse.headers.get("set-cookie") || cookies,
        sessionUrl: loginResponse.url,
      };
    } else {
      return {
        success: false,
        error: errorMessage || "Login failed - invalid credentials",
      };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}
