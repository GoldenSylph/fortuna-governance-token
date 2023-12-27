const { emptyStage } = require('../helpers');
module.exports = emptyStage('Production stage performed.');
module.exports.tags = ["production"];
module.exports.dependencies = [
  "airdrop",
  "tracer"
];
module.exports.runAtTheEnd = true;
