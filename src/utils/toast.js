import React from 'react';
import {ToastAndroid} from 'react-native';
import {IS_ANDROID} from './devicesInfo'
class Toast {
  static show(message) {
    if(IS_ANDROID) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {

    }
  }
}

export default Toast;
