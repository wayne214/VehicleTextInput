import moment from "moment";

export const replaceRange = (s, start, end, substitute) => {
  return s.substring(0, start) + substitute + s.substring(end)
}

export const isEmptyString = (str) => {
  return str == 'undefined' || !str || !/[^\s]/.test(str);
}

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0
}

export const isPhoneNumber = (phoneNum) => {
  return (/^1{10}$/.test(phoneNum))
}

export const isIdCardNum = (idNo) => {
  const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
  return idcard_patter.test(idNo);
}

export const isToday = (str) => {
  if (new Date(str).toDateString() === new Date().toDateString()) {
    //今天
    // console.log("当天");

    return true
  } else if (new Date(str) < new Date()) {
    //之前
    // console.log("以前的日期");

    return false
  }
}

export const formatBytes = (bytes, decimals) => {
  if (bytes == 0) return '0 B';
  var k = 1000,
    dm = decimals || 2,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const diffTime = (startTime, endTime, diffType) => {
  startTime = moment(startTime).format('YYYY-MM-DD hh:mm:ss')
  endTime = moment(endTime).format('YYYY-MM-DD hh:mm:ss')

  startTime = startTime.replace(/\-/g, "/");
  endTime = endTime.replace(/\-/g, "/");
  // diffType = diffType.toLowerCase();
  var sTime = new Date(startTime);    //开始时间
  var eTime = new Date(endTime);  //结束时间</font>
  //作为除数的数字
  var divNum = 1;
  switch (diffType) {
    case "second":
      divNum = 1000;
      break;
    case "minute":
      divNum = 1000 * 60;
      break;
    case "hour":
      divNum = 1000 * 3600;
      break;
    case "day":
      divNum = 1000 * 3600 * 24;
      break;
    default:
      break;
  }

  const result = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum))
  // console.log('------------------------------ result is:', result)

  return result
}


export const orderButtonStatusText = (status, transferStatus) => {
  switch (status){
    case 10:
      if(transferStatus === 1) {
        return '已发起转单'
      }
      return '开始服务';
    case 20:
      return '收到钥匙';
    case 30:
      return '车辆数据采集';
    case 40:
      return '到达服务商';
    case 50:
      return '服务商完成服务';
    case 60:
      return '车辆送至停车点';
    case 70:
      return '钥匙归还，订单完成';
  }
}

export const refundButtonStatusText = (status) => {
  switch (status){
    case 400:
      return '订单已退款';
    case 410:
      return '用户发起退款';
    case 420:
      return '订单已退款失败';
  }
}

export const orderEvent = (status) => {
  switch (status) {
    case 10:
      return 'START_SERVICE';
    case 20:
      return 'RECEIVED_KEY';
    case 30:
      return 'COMPLETED_DATA_COLLECT';
    case 40:
      return 'ARRIVED_PROVIDER';
    case 50:
      return 'COMPLETED_SERVICE';
    case 60:
      return 'ARRIVED_PARK';
    case 70:
      return 'RETURN_KEY';
  }
}

export const driverAuthStatus = (status) => {
  switch (status) {
    case 10:
      return '请完善信息';
    case 20:
      return '审核中';
    case 30:
      return '已认证';
    case 40:
      return '审核失败';
    case 50:
      return '取消认证';
  }
}

export const authStatusText = (status) => {
  switch (status) {
    case 10:
      return '请完善信息';
    case 20:
      return '信息审核中，请耐心等待';
    case 30:
      return '信息已认证，如有修改请联系负责人';
    case 40:
      return '信息审核失败，请修改后重新提交';
    case 50:
      return '取消认证';
  }
}

export const sexText = (value) => {
  switch (value) {
    case 0:
      return '男';
    case 1:
      return '女'
  }
}

export const getCcrType = (value) => {
  switch (value) {
    case 1:
      return '轿车';
    case 2:
      return 'SUV';
    case 3:
      return 'MPV'
  }
}


export const getTargetId = (userId) => {
  return userId + '_1';
}
