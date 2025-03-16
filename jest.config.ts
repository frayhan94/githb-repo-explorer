import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  // Simulate browser environment
  testEnvironment: "jest-environment-jsdom",

  // Run setup file before tests
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Path alias mapping (same as in tsconfig.json)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // TypeScript transformations for Jest
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default createJestConfig(customJestConfig);
