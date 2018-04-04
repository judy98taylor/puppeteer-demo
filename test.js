const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    devtools: true,
    slowMo: 250
  });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com", {
    waitUntil: "networkidle2"
  });

  page.once("load", () => console.log("Page loaded!"));
  //   page.on("request", () => console.log("Page request!"));
  //   page.on("response", () => console.log("Page response!"));
  page.once("domcontentloaded", () => {
    console.log("domcontentloaded ok");
  });

  //   await page.waitFor(2000);
  //   Page.$$eval(selector, pageFunction[, …args]), 获取单个元素的属性

  await page.type("#kw", "Hello World!", { delay: 100 });
  await page.keyboard.press("Enter");

  //   await page.waitForSelector("#kw");
  //   await page.click("#kw");

  //   await page.keyboard.type("Hello World!", { delay: 100 });
  //   await page.keyboard.press("Enter");

  //   await page.screenshot({
  //     path: "screenshot.png",
  //     type: "png",
  //     fullPage: true
  //   });

  let inputElement = await page.$(".t.c-gap-bottom-small a");
  inputElement.click();
  console.log("over");
  //   await browser.close();
})();
