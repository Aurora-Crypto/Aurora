const { pathsToModuleNameMapper } = require("ts-jest");
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require("./tsconfig");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>"],
    displayName: {
        name: "API",
        color: "magentaBright"
    },
    coverageDirectory: "<rootDir>/reports/coverage",
    collectCoverageFrom: ["<rootDir>/src/**/*"],
    coveragePathIgnorePatterns: [
        "<rootDir>/src/lib/types/",
        "<rootDir>/src/plugins/",
        "<rootDir>/src/",
        "<rootDir>/src/lib/",
        "<rootDir>/src/test/"
    ],
    reporters: ["default", "jest-junit"],
    modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
    moduleNameMapper: pathsToModuleNameMapper(
        compilerOptions.paths /*, { prefix: '<rootDir>/' } */
    ),
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest"
    }
};
