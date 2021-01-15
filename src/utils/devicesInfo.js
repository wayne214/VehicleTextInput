import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

export const deviceWidth = width;

export const deviceHeight = height;

export const appVersion = DeviceInfo.getVersion();

export const devicePlatform = Platform.OS;

export const IS_IOS = devicePlatform === 'ios';
export const IS_ANDROID = devicePlatform === 'android';

export const version = DeviceInfo.getVersion();

export const deviceID = DeviceInfo.getDeviceId();
