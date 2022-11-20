const express = require("express"),
app = express(),
router = require("../routes/studentServiceRoutes"),
request = require("supertest");

app.use("/", router);
app.use("/students", router); 

let firstStudent;
test("Test: Check is it contain in the array?", async () => {
    const res = await request(app).get("/students");
    checkArray = {
        "STU_ID":4,
        "STU_FNAME":"Benjamin",
        "STU_LNAME":"Duncan",
        "STU_AGE":25
    };

    await expect(res.body.data).toContainEqual(checkArray);
    firstStudent = res.body.data[0].STU_FNAME;
});

test("Test: Check Matching", async () => {
    expect(firstStudent).toMatch("A");
})