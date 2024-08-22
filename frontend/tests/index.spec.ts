import { test, expect } from "@playwright/test";

test("socket server is open?", async ({ page }) => {
  const response = await page.goto("http://localhost:3002");
  await page.waitForURL("http://localhost:3002");

  expect(response!.status()).toBe(404);
});

test("can send message?", async ({ page }) => {
  await page.goto("http://localhost:3001");
  await page.waitForURL("http://localhost:3001");
  await setTimeout(() => {}, 5000);
  await page.locator("input").fill("test message");
  await page.locator("input").press("Enter");

  await expect(page.locator("span").last()).toContainText("test message");
});
