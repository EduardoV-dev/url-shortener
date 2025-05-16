import { Url } from "@/generated/prisma";

import { Repository } from "../repository";
import { UrlShortenerService } from "../service";
import { CodeGenerator } from "../utils";

const mockRepository: Repository = {
  create: jest.fn(),
  updateByCode: jest.fn(),
  getByCode: jest.fn(),
}

const mockCodeGenerator: CodeGenerator = {
  generateByRange: jest.fn(),
}

describe("UrlShortenerService", () => {
  let service: UrlShortenerService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UrlShortenerService(mockRepository, mockCodeGenerator);
  });

  describe("createShortUrl", () => {
    it.only("Should generate a short code and create a URL via the repository", async () => {
      const paramUrl = "https://github.com/EduardoV-dev";

      const mockGeneratedCode = "my-code";

      const mockCreatedUrl: Url = {
        id: 1,
        shortCode: mockGeneratedCode,
        originalUrl: paramUrl,
        clickCount: 0, // Assuming clickCount is part of Url based on updateByCode usage
        createdAt: new Date(),
      };

      (mockCodeGenerator.generateByRange as jest.Mock).mockReturnValue(mockGeneratedCode);
      (mockRepository.create as jest.Mock).mockResolvedValue(mockCreatedUrl);

      const response = await service.createShortUrl(paramUrl);

      expect(mockCodeGenerator.generateByRange).toHaveBeenCalledTimes(1);
      expect(mockCodeGenerator.generateByRange).toHaveBeenCalledWith(6, 10);

      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledWith({ shortCode: mockGeneratedCode, originalUrl: paramUrl });

      expect(response).toEqual(mockCreatedUrl);
    })

  });
});
