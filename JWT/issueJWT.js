const base64url = require("base64url");
const crypto = require("crypto");
const signatureFunction = crypto.createSign("RSA-SHA256");
const verifyFunction = crypto.createVerify("RSA-SHA256");
const fs = require("fs");

const header = {
  alg: "HS256",
  typ: "JWT",
};

const payload = {
  sub: "1234",
  name: "name",
  admin: true,
  iat: "1234567054",
};

const headerString = JSON.stringify(header);
const payloadString = JSON.stringify(payload);

const base64UrlHeader = base64url(headerString);
const base64UrlPayload = base64url(payloadString);

// signatureFunction.write(base64UrlHeader + "." + base64UrlPayload);
// signatureFunction.end();

// const PRIV_KEY = fs.readFileSync(__dirname + "/pvt_key.pem", "utf8");
// const signatureBase64 = signatureFunction.sign(PRIV_KEY, "base64");

// const signatureBase64Url = base64url.fromBase64(signatureBase64);

// console.log(signatureBase64Url.toString());

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0IiwibmFtZSI6Im5hbWUiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoiMTIzNDU2NzA1NCJ9.2qVScahrJdRbLxWlj0nuVWR8ehzEnfY_qaXy9E_hWto";

const jwtParts = JWT.split(".");

const headerBase64UrlFormat = jwtParts[0];
const payloadBase64UrlFormat = jwtParts[1];
const signatureBase64UrlFormat = jwtParts[2];

verifyFunction.write(headerBase64UrlFormat + "." + payloadBase64UrlFormat);
verifyFunction.end();

const jwtSignatureBase64 = base64url.toBase64(signatureBase64UrlFormat);

const PUB_KEY = fs.readFileSync(__dirname + "/pub_key.pem", "utf8");

const signatureIsValid = verifyFunction.verify(
  PUB_KEY,
  jwtSignatureBase64,
  "base64"
);

console.log(signatureIsValid);
