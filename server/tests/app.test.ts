import{Express} from "express";
import { Server } from "socket.io";

const request = require("supertest");
const app = require("../src/app").default;

describe("Test the root path", () => {
    let server: Server
    beforeAll(async () => {
        const mod = await import('../src/app');
        server = (mod as any).default;
    });

    afterAll((done) => {
        if (server) {
            server.close(done);
        }
    });

    test("It should response the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});
