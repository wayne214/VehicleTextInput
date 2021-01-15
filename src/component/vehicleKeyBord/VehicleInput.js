import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {autoHeight, autoWidth, scaleSize} from "./utils/ScreenUtil";
import {commonStyle} from "./utils/commonStyle";
import {deviceWidth} from '../../utils/devicesInfo';

export default class VehicleInput extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {};

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  render() {
    const itemSpace = (deviceWidth - 80 - 40 - 24 * 8) / 7;
    return (
      <View style={styles.container}>
        {this.props.titles.map((title, i) => (
          <TouchableOpacity
            // style={[{
            //   borderColor:this.props.selectedIndex == i ? commonStyle.themeColor : '#d3d9dc'
            // },styles.itemBg]}
            key={i}
            onPress={() => this.props.onSelected(i)}
          >
            <View style={[{
              borderColor:this.props.selectedIndex == i ? '#FF4B3B' : '#d8d8d8',
              borderStyle: i === 7 ? 'dashed' : 'solid'
            },styles.itemBg]}>
              <Text style={{fontSize:title.length > 1 ? 7 : 18,textAlign: 'center',color: '#222222',}}>
                {this.props.titles[i]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{width: 4, height: 4, borderRadius: 2, backgroundColor: '#222222', position: 'absolute', left: itemSpace + (itemSpace - 4) / 2 + 48, top: 25}}/>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: commonStyle.between,
    backgroundColor:commonStyle.white,
    height:autoHeight(147),
    alignItems: 'center',
  },
  itemBg:{
    borderWidth:1,
    borderRadius:5,
    width:24,
    height:30,
    // flexDirection: commonStyle.row,
    // flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:autoHeight(20),
    backgroundColor:commonStyle.white
  }
});
