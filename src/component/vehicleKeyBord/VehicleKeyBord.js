import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {commonStyle} from "./utils/commonStyle";
import {autoHeight, autoWidth, scaleSize} from "./utils/ScreenUtil";
import extraUtil from "./utils/extraUtils";

export default class VehicleKeyBord extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {};

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {

    };
  }

  _renderCell(index) {
    const {type, inputValues} = this.props

    // console.log('---tiem==', titles.length, index)
    const inputString = inputValues.slice(0, 7).join('')


    let cell;
    if (index == this.props.titles.length - 1) {
      cell = (
        <View style={[{backgroundColor:'#ffffff',borderRadius:5,borderWidth:0,
          height: autoHeight(70),
          width: autoWidth(100),
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: autoHeight(20)}, inputString.length >= 7 && {backgroundColor:'#FF4B3B'}]}
        >
          <Text style={[{color: '#333333', fontSize: scaleSize(36)}, inputString.length >= 7 && {color: '#ffffff'}]}>确定</Text>
        </View>
      );

    } else if(index == this.props.titles.length - 2){
      let img = require('./assets/images/button_delete.png')
      cell = (
        <Image source={img} resizeMode='stretch' style={{width:autoWidth(100),height:autoHeight(70),borderRadius:5}}/>
      );
    }else if(extraUtil.isNullStr(this.props.titles[index])){
      cell=(
        <View
          style={{ width:autoWidth(60),height:autoHeight(70),marginLeft:autoHeight(20),}}
        />
      );
    }else {
      let mLeft = autoWidth(15);
      if(this.props.titles.length > 37){
        mLeft = autoWidth(5)
      }
      cell = (
        <View
          style={[{marginLeft:mLeft},styles.itemBg]}>
          <Text style={[styles.itemText, ((type == 'letter' && index < 10) || (type === 'mix' && this.props.titles[index] == 'O')) && {color: '#A7A7A7'}]}>
            {this.props.titles[index]}
          </Text>
        </View>
      );
    }
    return cell;
  }

  // 渲染
  render() {
    const {type, inputValues} = this.props

    // console.log('---tiem==', titles.length, index)
    const inputString = inputValues.slice(0, 7).join('')

    const titleLength = this.props.titles.length

    return (
      <View style={styles.container}>
        {this.props.titles.map((title, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => this.props.onSelected(i)} disabled={(type == 'letter' && i < 10) || (type === 'mix' && title == 'O')}>
            {this._renderCell(i)}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    paddingLeft:autoWidth(10),
    paddingRight:autoWidth(20),
    paddingTop:autoHeight(30),
    paddingBottom:autoHeight(12),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: commonStyle.between,
    backgroundColor:'#cfcfcf'
  },
  itemBg:{
    borderWidth:0,
    // borderColor:commonStyle.themeColor,
    borderRadius:5,
    width:autoWidth(60),
    height:autoHeight(70),
    // flexDirection: commonStyle.row,
    // flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft:autoWidth(10),
    marginBottom:autoHeight(18),
    backgroundColor:commonStyle.white
  },
  itemText: {
    fontSize: 18,
    textAlignVertical: 'center',
    color: '#222222'
  }
});
