const express = require("express"),
app = express(),
router = require("../routes/studentServiceRoutes"),
request = require("supertest");

app.use("/", router);
app.use("/students", router);

describe("Test: Getting information of the first student in database with student/:id", () => {
    let firstStudent;

    test("Test: GET /", async () => {
        const res = await request(app).get("/");
        expect(res.body).toEqual({ error:true, message: "hello"});
    });

    test("Test: GET http://localhost:3000/students", async () => {
    const res = await request(app).get("/students");
    await expect(res.body).toEqual(
            {
                error: false,
                data: [
                    { 
                        STU_ID: 1, 
                        STU_FNAME: 'Andrew', 
                        STU_LNAME: 'Black', 
                        STU_AGE: 25 
                    },                                                                                                                               
                    {
                        STU_ID:2,                                                                                                                                                                               STU_FNAME: 'Alexandra',
                        STU_LNAME: 'Brown',
                        STU_AGE: 25
                    },
                    {
                        STU_ID: 3,
                        STU_FNAME: 'Amanda',
                        STU_LNAME: 'Davidson',
                        STU_AGE: 25
                    },
                    {
                        STU_ID: 4,
                        STU_FNAME: 'Benjamin',
                        STU_LNAME: 'Duncan',
                        STU_AGE: 25
                    },
                    {
                        STU_ID: 5,
                        STU_FNAME: 'Christopher',
                        STU_LNAME: 'Ellison',
                        STU_AGE: 25
                    }
                ],
                message: "Student list."
            }
        );
        firstStudent = res.body.data[0];
    });
    test("Test: Get the information of the first student via /student/:id", async () => {
        const res = await request(app).get(`/student/${firstStudent.STU_ID}`);
        expect(res.body.data).toEqual(firstStudent);
    })
});