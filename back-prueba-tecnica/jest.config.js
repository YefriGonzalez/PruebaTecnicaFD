require('dotenv').config({ path: './.env' });

module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@PrismaConfig/(.*)$': '<rootDir>/prisma/$1',
      '^@Config':'<rootDir>/config/index',
      '^@Modules/(.*)$':'<rootDir>/modules/$1'
    },
  };
  