// --- test/auth.test.js ---
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server";

describe("Auth Routes", () => {
  it("Should return error for missing credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Username and password required");
  });
});

describe("Medication Routes", () => {
    it("Should return 401 without auth token", async () => {
      const res = await request(app).get("/api/medications");
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe("Access denied. No token provided.");
    });
    it("Should return 404 if medication not found when deleting", async () => {
        const res = await request(app)
          .delete("/api/medications/9999")
          .set("Authorization", "Bearer VALID_TOKEN");
      
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Medication not found");
      });
      
  });