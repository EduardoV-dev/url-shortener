import type { Config } from "jest";

const jestConfig: Config = {
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/tests/",
    "/src/__tests__/",
  ],
  moduleFileExtensions: ["ts", "js", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/src/test/prisma-mock.ts"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    '^.+\\.js$': 'babel-jest',
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!.*?nanoid)/",
  ],
  verbose: true,
};

export default jestConfig;
