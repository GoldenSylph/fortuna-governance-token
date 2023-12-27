const { emptyStage } = require('../helpers');
module.exports = emptyStage('Debug stage performed.');
module.exports.tags = ["debug"];
module.exports.dependencies = [
  "airdrop",
  "tracer"
];
module.exports.runAtTheEnd = true;
