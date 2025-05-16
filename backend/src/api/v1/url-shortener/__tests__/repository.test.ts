import { Url } from "@/generated/prisma";
import { UrlShortenerRepository } from "../repository";
import { prismaMock } from "@/test/prisma-mock";
import { HttpError } from "@/utils/http-error";

describe("UrlShortenerRepository", () => {
  let repo: UrlShortenerRepository;

  beforeEach(() => {
    repo = new UrlShortenerRepository();
  })

  describe("create", () => {
    const createParams = {
      originalUrl: "https://github.com/EduardoV-dev",
      shortCode: "hello-world",
    }

    it("Should create a new url", async () => {
      const createdUrl: Url = {
        ...createParams,
        clickCount: 0,
        createdAt: new Date(),
        id: 1,
      };

      prismaMock.url.create.mockResolvedValue(createdUrl);
      const response = await repo.create(createParams);

      expect(prismaMock.url.create).toHaveBeenCalledWith({ data: createParams });
      expect(prismaMock.url.create).toHaveBeenCalledTimes(1);
      expect(response).toEqual(createdUrl);
    });

    it("Should throw an 500 error if url could not be created", () => {
      const dbError = new Error("Database connection failed");
      prismaMock.url.create.mockRejectedValue(dbError);

      const response = repo.create(createParams);

      expect(response).rejects.toThrow(HttpError);
      expect(response).rejects.toHaveProperty("statusCode", 500);
      expect(prismaMock.url.create).toHaveBeenCalledTimes(1);
    });
  })

  describe("getByCode", () => {
    const shortCode = "hello-world";

    const existingUrl: Url = {
      clickCount: 2,
      createdAt: new Date(),
      id: 2,
      shortCode,
      originalUrl: "https://github.com/EduardoV-dev",
    }

    it("Should retrieve a existing url register", async () => {
      prismaMock.url.findFirst.mockResolvedValue(existingUrl);

      expect(await repo.getByCode(shortCode)).toEqual(existingUrl);
      expect(prismaMock.url.findFirst).toHaveBeenCalledWith({ where: { shortCode } })
      expect(prismaMock.url.findFirst).toHaveBeenCalledTimes(1);
    });

    it("Should retrieve null as user is unexistent", async () => {
      const notExistingShortCode = "not-existing";

      prismaMock.url.findFirst.mockResolvedValue(null);

      expect(await repo.getByCode(notExistingShortCode)).toEqual(null);
      expect(prismaMock.url.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.url.findFirst).toHaveBeenCalledWith({ where: { shortCode: notExistingShortCode } });
    });

    it("Should return 500 error when trying to retrieve the user", async () => {
      prismaMock.url.findFirst.mockRejectedValue(new Error("User not found"));

      const response = repo.getByCode(shortCode);

      expect(response).rejects.toThrow(HttpError);
      expect(response).rejects.toHaveProperty("statusCode", 500);
      expect(prismaMock.url.findFirst).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateByCode", () => {
    it("Should update the url information", async () => {
      const dataToUpdate: Partial<Url> = {
        clickCount: 2,
        originalUrl: "https://new-url.com",
      };

      const shortCode = "code";

      const originalData: Url = {
        id: 3,
        shortCode,
        originalUrl: "https://oldurl.com",
        clickCount: 5,
        createdAt: new Date()
      }

      const updatedData: Url = {
        ...originalData,
        ...dataToUpdate,
      }

      prismaMock.url.update.mockResolvedValue(updatedData);

      const response = await repo.updateByCode(shortCode, dataToUpdate);

      expect(response).toEqual(updatedData);
      expect(prismaMock.url.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.url.update).toHaveBeenCalledWith({
        where: {
          shortCode: shortCode,
        },
        data: dataToUpdate,
      });
    });

    it("Should return a 500 status code on error", () => {
      prismaMock.url.update.mockRejectedValue(new Error("Could not update"));
    
      const response = repo.updateByCode("any-code", {});

      expect(response).rejects.toThrow(HttpError);
      expect(response).rejects.toHaveProperty("statusCode", 500); 
      expect(prismaMock.url.update).toHaveBeenCalledTimes(1);
    })
  });
});
