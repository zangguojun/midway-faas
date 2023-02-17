import Base64 from 'crypto-js/enc-base64'
import hmacSHA256 from 'crypto-js/hmac-sha256'

export const getSign = () => {
  const timestamp = +new Date();
  const secret = process.env.BOT_SECRET;
  const string_to_sign = `${timestamp}\n${secret}`;
  const hmac_code = hmacSHA256(string_to_sign, secret);
  const sign = encodeURIComponent(Base64.stringify(hmac_code));
  return {
    sign,
    timestamp,
  };
};
