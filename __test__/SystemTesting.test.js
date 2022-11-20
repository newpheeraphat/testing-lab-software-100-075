const puppeteer = require('puppeteer');

describe("Test: System Testing with Jest and Puppeteer", () => {
    test("Test: Getting the information of student through the user interface.", async () => {
        // Create browser using puppeteer
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 80,
            args: ["--window-size=1920,1080"],
            executablePath:
            "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        });

        // Create a new page
        const page = await browser.newPage();
        // Set the page to the web location
        await page.goto("http://localhost:3100/");
        // Click and type value "2" into the textbox STU_ID""
        await page.click("input#STU_ID");
        await page.type("input#STU_ID", "2");
        page.on("dialog", async (dialog) => {
        await dialog.accept();
        });
        // Click on "Select" button to search for the student
        await page.click("input#select");

        const studentObject = await page.evaluate(() => {
        return {
            firstName: document.getElementById("STU_FNAME").value,
            lastName: document.getElementById("STU_LNAME").value,
            age: document.getElementById("STU_AGE").value,
        };
        });

        await expect(studentObject).toEqual({
            firstName: "Alexandra",
            lastName: "Brown",
            age: "25",
        });
    }, 20000);
});

