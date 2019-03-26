if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  //if in dev, bring back dev keys
  module.exports = require('./dev');
}
