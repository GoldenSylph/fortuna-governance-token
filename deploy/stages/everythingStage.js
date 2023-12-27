const { emptyStage } = require('../helpers');
module.exports = emptyStage('All stages are performed.');
module.exports.tags = ["everything"];
module.exports.dependencies = [
  "token",
  "airdrop"
];
module.exports.runAtTheEnd = true;
