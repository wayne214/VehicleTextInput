import store from '../store';
import Toast from './toast';
import { version, IS_IOS, deviceID } from './devicesInfo';
import moment  from "moment";
import Urls from '../constants/urls';

/* ———————————————  后台接口调试 ——————————————— */

// Test
export const API_HOST = '';


const timeoutSeconds = 20

const cid = 100;
const uid = '';
const ver = '1.5.0';
const t = moment().unix();
const dvid = deviceID;


export default class BaseRequest {
  /// POST方法s
  static postData(url, params) {
    console.log('---params', params)

    const realParams = {
      param: params
    }

    console.log('---params', params, realParams);
    let p1 = new Promise((resolve, reject) => {
      console.log('-------------------------- API_HOST url is:', API_HOST + url)
      fetch(API_HOST + url, {
        method: 'POST',
        ///请求头参数
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          cid,
          uid,
          ver,
          t,
          dvid,
          ...this.getJwtToken()
        },
        /// 请求参数
        body: JSON.stringify(realParams),
      })
        .then(response => {
            // console.log('--原始数据----',response)
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([{ status: statusCode }, data]);
        })
        .then((responseJson) => {
          /// 拿到数据可以在此同意处理服务器返回的信息
          if (responseJson[1].status == '10002') {
            Toast.show(responseJson[1].message)
            store.dispatch(kickout())
          }
          resolve({ ...responseJson[0], ...responseJson[1] });
        })
        .catch((error) => {
          reject(error);
        })
    })

    let p2 = this.requestTimeout();
    /// 因为fetch网络请求没有超时时间设置，所以使用Promise实现请求超时
    return Promise.race([p1, p2])
  }

  /// Get方法
  static getData(url, params) {
      console.log('---params', params)
    //判断有木有参数
    if (params) {

      // url = url + "?param=" + JSON.stringify(params)

      // 定一个空数组
      let paramsArray = [];
      //  拆分对象
      Object.keys(params).forEach(key =>
        paramsArray.push(key + "=" + encodeURIComponent(JSON.stringify(params[key])))
      );
      // 判断是否地址拼接的有没有 ？,当没有的时候，使用 ？拼接第一个参数，如果有参数拼接，则用&符号拼接后边的参数
      if (url.search(/\?/) === -1) {
        url = url + "?" + paramsArray.join("&");
      } else {
        url = url + "&" + paramsArray.join("&");
      }
    }

    let p1 = new Promise((resolve, reject) => {
      console.log('-------------------------- API_HOST url is:', API_HOST + url)

      fetch(API_HOST + url, {
        method: 'GET',
        ///请求头参数
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          cid,
          uid,
          ver,
          t,
          dvid,
          ...this.getJwtToken()
        },
      })
        .then(response => {
          // console.log('--接口初始数据', response)
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([{ status: statusCode }, data]);
        })
        .then((responseJson) => {
          /// 拿到数据可以在此同意处理服务器返回的信息
          console.log('--responseJson--', responseJson)
          if (responseJson[1].status == '10002') {
            Toast.show(responseJson[1].message)
            store.dispatch(kickout())
          }

          resolve({ ...responseJson[0], ...responseJson[1] });
        })
        .catch((error) => {
          reject(error);
        })
    })
    let p2 = this.requestTimeout();
    return Promise.race([p1, p2]);
  }

  /// PUT方法
  static putData(url, params) {
    //判断有木有参数
    // if (params) {
    //     // 定一个空数组
    //     let paramsArray = [];
    //     //  拆分对象
    //     Object.keys(params).forEach(key =>
    //         paramsArray.push(key + "=" + params[key])
    //     );
    //     // 判断是否地址拼接的有没有 ？,当没有的时候，使用 ？拼接第一个参数，如果有参数拼接，则用&符号拼接后边的参数
    //     if (url.search(/\?/) === -1) {
    //         url = url + "?" + paramsArray.join("&");
    //     } else {
    //         url = url + "&" + paramsArray.join("&");
    //     }
    // }
    console.log('---params', params)
    let p1 = new Promise((resolve, reject) => {
      console.log('-------------------------- API_HOST url is:', API_HOST + url)
      fetch(API_HOST + url, {
        method: 'PUT',
        ///请求头参数
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          cid,
          uid,
          ver,
          t,
          dvid,
        },
        /// 请求参数
        body: JSON.stringify(params)
      })
        .then(response => {
          const statusCode = response.status;
          // if (statusCode == 403) {
          //   this.tokenExpired()
          // }
          // if (statusCode == 401) {
          //   Toast.show('您的账号在其他设备登录')
          //   // store.dispatch(kickout())
          // }
          const data = response.json();
          return Promise.all([{ status: statusCode }, data]);
        })
        .then((responseJson) => {
          /// 拿到数据可以在此同意处理服务器返回的信息
          resolve({ ...responseJson[0], ...responseJson[1] });
        })
        .catch((error) => {
          reject(error);
        })
    })
    let p2 = this.requestTimeout();
    return Promise.race([p1, p2]);
  }

  /// DELETE方法
  static deleteData(url, params) {
    console.log('---parame', params)
    const realParams = {
      param: params
    }
    let p1 = new Promise((resolve, reject) => {
      console.log('-------------------------- API_HOST url is:', API_HOST + url)
      fetch(API_HOST + url, {
        method: 'DELETE',
        ///请求头参数
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          cid,
          uid,
          ver,
          t,
          dvid,
        },
        /// 请求参数
        body: JSON.stringify(realParams)
      })
        .then(response => {
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([{ status: statusCode }, data]);
        })
        .then((responseJson) => {
          /// 拿到数据可以在此同意处理服务器返回的信息
          resolve({ ...responseJson[0], ...responseJson[1] });
        })
        .catch((error) => {
          reject(error);
        })
    })

    let p2 = this.requestTimeout();
    /// 因为fetch网络请求没有超时时间设置，所以使用Promise实现请求超时
    return Promise.race([p1, p2])
  }

  static getJwtToken = () => {
    const { authData } = store.getState().auth
    console.log('-------------------------- authData is:', authData);

    return {
      ...(authData ? { 'cookie': 'yccarservicedriver='+ authData.ticket } : {}),
    }
  }

  /// 设置超时的方法
  static requestTimeout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('链接超时');
      }, timeoutSeconds * 1000)
    })
  }

  /// jwt-token过期
  static tokenExpired() {
    console.log('-------------------------- jwt_token expired')
    // store.dispatch(kickout())
  }


  static upLoadFile(filepath,fileName){
    let formData = new FormData;
    const file = { uri: filepath, type: 'multipart/form-data', name: fileName };
    formData.append('file', file)
    let p1 = new Promise((resolve,reject)=> {
      fetch(API_HOST + Urls.URL_UPLOAD_PICTURE,{
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          cid,
          uid,
          ver,
          t,
          dvid,
          ...this.getJwtToken()
        },
        body: formData,
      })
        .then((response) => {
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([{ status: statusCode }, data]);
        })
        .then((responseJson) => {
          console.log('文件上传', responseJson);
          resolve({ ...responseJson[0], ...responseJson[1] });
          // return responseData
        })
        .catch((error)=>{
          reject(error)
        });
    })

    let p2 = BaseRequest.requestTimeout();
    /// 因为fetch网络请求没有超时时间设置，所以使用Promise实现请求超时
    return Promise.race([p1, p2])
  }

}
