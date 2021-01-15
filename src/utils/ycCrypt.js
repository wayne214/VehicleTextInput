import CryptoES from 'crypto-es';
//
class YcCrypt {
  static md5Crypt(data){
    let hash = CryptoES.MD5(data).toString();
    return hash;
  }
}

export default YcCrypt;
