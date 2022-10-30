const Base64 = require('crypto-js/enc-base64');
const hmacSHA256 = require('crypto-js/hmac-sha256');

export const getSign = () => {
  const timestamp = +new Date();
  const string_to_sign = `${timestamp}\n${process.env.BOT_SECRET}`;
  const sign = Base64.stringify(hmacSHA256(string_to_sign, process.env.BOT_SECRET));
  return {
    sign,
    timestamp,
  };
};
