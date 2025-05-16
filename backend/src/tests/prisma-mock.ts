import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import { prisma } from "@/storage/prisma";
import { PrismaClient } from "@prisma/client";

jest.mock("../prisma/prisma-client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

