import React, { Component }from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class CarNumKeyboard extends Component{

  _onPress = () => {

  }

  render() {
    return <View style={styls.container}>
      <TouchableOpacity onPress={this._onPress}>
        <Text>显示键盘</Text>
      </TouchableOpacity>
    </View>;
  }
}

const styls = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default CarNumKeyboard;
