export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)_(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}