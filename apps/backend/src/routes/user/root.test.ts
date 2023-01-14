import app, { callAPI, testUser } from "@test/jestHelper";
import { stubUser } from "@test/modelStubs";

import HttpStatus from "@lib/types/httpStatus";

const route = "/v1/user";

describe(`GET ${route}`, () => {
    test("returns Bad Request for unauthorized request", async () => {
        const res = await callAPI(app, route, { auth: false });

        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.statusMessage).toBe("Bad Request");
    });

    test("receves an OK request and returns OK response", async () => {
        const res = await callAPI(app, route);

        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.statusMessage).toBe("OK");
    });

    test("returns the associated user", async () => {
        const res = await callAPI(app, route);
        const data = await res.json();

        expect(data).toBeInstanceOf(Object);
        expect(data).toMatchObject(testUser);
    });
});

describe(`PUT ${route}`, () => {
    test("returns Bad Request for unauthorized request", async () => {
        const res = await callAPI(app, route, {
            auth: false,
            options: {
                method: "PUT"
            }
        });

        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.statusMessage).toBe("Bad Request");
    });

    test("returns Bad Request for missing body", async () => {
        const res = await callAPI(app, route, {
            options: { method: "PUT" }
        });

        expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(res.statusMessage).toBe("Bad Request");
    });

    test.skip("returns Bad Request for invalid body", async () => {
        let res = await callAPI(app, route, {
            options: {
                method: "POST",
                body: JSON.stringify({
                    name: "John Doe"
                })
            }
        });

        expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res.body).toBe("Missing email parameter");

        res = await callAPI(app, route, {
            options: {
                method: "POST",
                body: JSON.stringify({
                    email: "johndoe@"
                })
            }
        });

        expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res.body).toBe("Not a valid email");
    });

    test.skip("receives an OK request and returns OK response", async () => {
        const res = await callAPI(app, route, {
            options: {
                method: "POST",
                body: JSON.stringify({
                    email: "johndoe@email.com"
                })
            }
        });

        expect(res.statusCode).toBe(HttpStatus.CREATED);
        expect(res.statusMessage).toBe("Created");
    });

    test.skip("returns a created user", async () => {
        const res = await callAPI(app, route, {
            options: {
                method: "POST",
                body: JSON.stringify({
                    email: "johndoe@email.com"
                })
            }
        });
        const data = await res.json();

        expect(data).toBeInstanceOf(Object);
        expect(data).toMatchObject(stubUser);

        expect(data.id).toMatch(/^[a-f\d]{24}$/i);
        expect(data.email).toEqual("johndoe@email.com");
        expect(data.emailVerified).toEqual(data.createdAt);
        expect(data.emailVerified).toEqual(data.updatedAt);
    });
});
