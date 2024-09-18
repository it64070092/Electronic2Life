var elastic = require("elastic-apm-node");

elastic.start({
  serviceName: 'Electronic2life-Elastic',

  secretToken: 'QH4b78xv6w9b8X5JJ6PpMN65',

  serverUrl: 'http://10.111.0.32:8200',

  environment: 'development'

});

module.exports = elastic;
