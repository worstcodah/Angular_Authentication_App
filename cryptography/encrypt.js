const crypto = require("crypto");

function encryptWithPublicKey(publicKey, msg) {
  const bufferMessage = Buffer.from(msg, "utf8");

  return crypto.publicEncrypt(publicKey, bufferMessage);
}
function encryptWithPrivateKey(publicKey, msg) {
  const bufferMessage = Buffer.from(msg, "utf8");

  return crypto.privateEncrypt(publicKey, bufferMessage);
}

module.exports.encryptWithPublicKey = encryptWithPublicKey;
module.exports.encryptWithPrivateKey = encryptWithPrivateKey;
