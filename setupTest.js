const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const createMatcherFor = require('./test/create-warn-matcher');

Enzyme.configure({ adapter: new Adapter() });

expect.extend({
  toWarnDev: createMatcherFor('warn'),
  toErrorDev: createMatcherFor('error')
});
