#!/usr/bin/env node
const puppeteer = require("puppeteer");
const p = require("./secret");
require("shelljs/global");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    fullPage: true,
    ignoreHTTPSErrors: true
    // devtools: true,
    // slowMo: 250
  });
  const page = await browser.newPage();
  await page.goto(p.cas + p.mioffice, {
    waitUntil: "networkidle2"
  });

  // page.once("request", req => {
  //   console.log("Page request!");
  //   console.log(req);
  //   // >表示重新写入,>>表示继续写入
  //   exec(`echo ${JSON.stringify(req._postData)} > req.js`);
  // });
  // page.once("response", resp => {
  //   console.log("Page response!");
  //   console.log(resp);
  //   // >表示重新写入,>>表示继续写入
  //   exec(`echo ${JSON.stringify(resp._url)} > resp.js`);
  // });

  //   await page.waitFor(2000);

  await page.type("#username", p.username);
  await page.type("#password", p.password);
  await page.keyboard.press("Enter");

  await console.log("over");
  //   await browser.close();
})();
