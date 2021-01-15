import React, { Component }from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import AddVehicle from "../component/vehicleKeyBord/AddVehicle";

class CarNumKeyboard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      modelVisible: false
    }
  }

  _onPress = () => {
    this.setState({
      modelVisible: true
    })
  }

  _closeModel = () => {
    this.setState({
      modelVisible: false
    })
  }

  render() {
    return <View style={styls.container}>
      <TouchableOpacity onPress={this._onPress}>
        <Text>显示键盘</Text>
      </TouchableOpacity>

      <AddVehicle
        modalVisible={this.state.modelVisible}
        closeModal={this._closeModel}
      />
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
