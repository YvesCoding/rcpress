module.exports = {
  rootDir: './',
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['**/*.{js,ts,tsx}', '!**/*/node_modules/**', '!**/docs/**', '!**/test/**'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '.*\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.(ts|js)?$',
  transform: {
    '^.+\\.jsx?$': 'babel7-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/node_modules/regenerator-runtime/runtime'],
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfig: {
        target: 'es6'
      },
      babelConfig: true
    }
  }
};
