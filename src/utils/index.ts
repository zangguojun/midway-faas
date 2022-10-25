import { botSecret } from './const';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

const urlencode = str => {
  str = (str + '').toString();
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');
};

export const getSign = () => {
  const timestamp = +new Date();
  const string_to_sign = `${timestamp}\n${botSecret}`;
  const sign = urlencode(Base64.stringify(hmacSHA256(string_to_sign)));
  return {
    sign,
    timestamp,
  };
};
