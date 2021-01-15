import React, {Component} from 'react';
import {View, StyleSheet, Text,Image, TouchableOpacity} from 'react-native';
import VehicleKeyBord from "./VehicleKeyBord";
import VehicleInput from "./VehicleInput";
import {autoHeight, autoWidth, scaleSize} from "./utils/ScreenUtil";
import {commonStyle} from "./utils/commonStyle";
import deviceInfo from "./utils/deviceInfo";
import {deviceWidth} from '../../utils/devicesInfo'

import IconClose from '../../images/icon_close.png'
import Toast from "../../utils/toast";


import Modal from 'react-native-modal';

let titles = ['京', '津', '沪', '渝', '苏', '浙', '豫', '粤', '川'
  , '陕', '冀', '辽', '吉', '皖', '闽', '鄂', '湘', '鲁'
  , '晋', '黑', '赣', '贵', '甘', '琼', '云', '青', '蒙'
  , '藏', '宁', '桂', '新','','','', '']
let vehicleNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9' , '0'
  , 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J','K','L'
  , 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U','V'
  , 'W', 'X', 'Y','Z','','', '']
let inputNum = ['冀','A','A','A','A','A','H','新能源']

export default class AddVehicle extends Component {
  // 默认属性
  static defaultProps = {};
  // 属性类型
  static propTypes = {};
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    // console.log('---this.props.inputDefault', this.props.inputDefault)

    this.state = {
      bordIndex: 0, // 键盘位置
      inputIndex: 6, // 输入框位置
      colorIndex:0, // 车牌颜色选择位置
      inputs: inputNum,
      vehicleProvince : vehicleNum,
      showKeyBord: true, // 是否显示键盘
      keyboardType: 'mix'
    };
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any) {
    // console.log('---5555555---', this.props.inputDefault, nextProps.inputDefault)
    if(this.props.inputDefault !== nextProps.inputDefault) {
      // console.log('---didojfoijf---', this.props.inputDefault, nextProps.inputDefault)
      this.setState({
        inputs: nextProps.inputDefault,
        inputIndex: 6,
      })
    }
  }

  navigationBarProps =()=>  {
    return {
      title: '添加车辆',
    }
  }

  _renderKeyBord(){
    if(!this.state.showKeyBord){
      return ;
    }
    return(
      <View style={{position: 'absolute', bottom: 0}}>
        <VehicleKeyBord
          inputValues={this.state.inputs}
          type={this.state.keyboardType}
          titles={this.state.vehicleProvince}
          selectedIndex={this.state.bordIndex}
          onSelected={(index) => {
            // console.log('--Kye-indx-',index, this.state.inputIndex, this.state.inputs.length)
            if(index === this.state.vehicleProvince.length - 1){
              const values = this.state.inputs;
              // console.log('--inpuusss-', values)
              // console.log('inpuusss--string', values.join(''))
              const inputString = values.slice(0, 7).join('')
              if(inputString.length >= 7) {
                this.setState({showKeyBord: false})
              }
              return
            }

            this.setState({bordIndex: index})
            // 车牌输入框
            if(this.state.inputIndex < this.state.inputs.length){
              let k = this.state.inputIndex
              // console.log('--Kye--',k, this.state.inputs)
              // 写入当前输入框文字
              this.state.inputs[k] = this.state.vehicleProvince[index]
              if(this.state.inputs[7] === '') {
                this.state.inputs[7] = '新能源'
              }
              // if(k === 7) {
              //   this.state.inputs[k] = '新能源'
              // }
              this.setState({inputs: this.state.inputs})

              // 写入后 输入框位置后移一位
              if(index == this.state.vehicleProvince.length-2){
                k = k-1
                this.setState({inputIndex: k})
              } else {
                k = k+1;
                if(this.state.inputIndex != this.state.inputs.length-1){
                  this.setState({inputIndex: k})
                }
              }
              // 输入框第二个位置开始切换键盘
              if(k > 0){
                if(k === 1) {
                  this.setState({vehicleProvince: vehicleNum, keyboardType: 'letter'})
                } else {
                  this.setState({vehicleProvince: vehicleNum, keyboardType: 'mix'})
                }
              } else {
                this.setState({vehicleProvince: titles, keyboardType: 'province'})
              }
            }
          }}
        />
      </View>
    );
  }

  _renderInput(){
    return(
      <VehicleInput
        titles={this.state.inputs}
        selectedIndex={this.state.inputIndex}
        onSelected={(index) => {
          // console.log('----inputindex--',index)
          this.setState({inputIndex: index})
          this.setState({showKeyBord: true})
          if(index > 0){
            this.setState({vehicleProvince: vehicleNum})
          }else {
            this.setState({vehicleProvince: titles})
          }
        }}
      />
    );
  }

  _onSurePress = () => {
    const {inputs} = this.state;
    const inputString = inputs.slice(0, 7).join('')
    if(inputString.length < 7) {
      this.setState({
        showKeyBord: false,
      })
      return Toast.show('车牌号格式错误')
    }

    this.props.onSurePress && this.props.onSurePress(inputs)
  }

  _renderHead(){
    const {closeModal, onSurePress} = this.props;
    return(
      <View style={{marginBottom: 120, width: deviceWidth - 80, marginHorizontal: 40, paddingHorizontal: 20, borderRadius: 16, backgroundColor: '#ffffff'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 10,}}>
          <TouchableOpacity onPress={closeModal}>
            <Image source={IconClose} style={{width: 24, height: 24}}/>
          </TouchableOpacity>
          <Text style={{fontSize:18,color:'#222222',marginLeft:80,height:autoHeight(80),textAlignVertical: 'center',}}>车牌号</Text>
        </View>
        {this._renderInput()}

        <TouchableOpacity onPress={this._onSurePress}>
          <View style={{height: 44, width: deviceWidth - 80 - 70, backgroundColor: '#FF4B3B', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 20, borderRadius: 22}}>
            <Text style={{color: '#FFFFFF', fontSize: 16}}>确定</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  // 渲染
  render() {
    const {modalVisible, closeModal} = this.props;
    return (
      <Modal
        style={{flex: 1, justifyContent: 'center', margin: 0}}
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
      >
        {this._renderHead()}
        {this._renderKeyBord()}
      </Modal>
    );
  }
}

export const styles = StyleSheet.create({
  keyFinish:{
    fontSize:scaleSize(30),
    textAlignVertical:commonStyle.center,
    textAlign:'right',
    height:autoHeight(70),
    width:deviceInfo.deviceWidth,
    paddingLeft:autoWidth(30),
    paddingRight:autoWidth(18),
    backgroundColor:commonStyle.white
  }
});
