module.exports = {
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/docs/**'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '.*\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.jsx?$': 'babel7-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['<rootDir>/node_modules/regenerator-runtime/runtime'],
  setupTestFrameworkScriptFile: '<rootDir>/setupTest.js',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
