import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import TabDonHangCpn from '../../components/TabDonHang/TabDonHangCpn'

/* private func-start */
const Stack = createStackNavigator()

/* private func-end */

export default class TabDonHang extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(){
    console.log(`check render in tab:`)
    this.setState({
      render:true
    })
  }
  render() {
    console.log(`check render in render:`)
    return (
      <Stack.Navigator>
            {(true)&&<Stack.Screen 
            name="Đơn Hàng"
            component={TabDonHangCpn}
            options={{
              headerShown:false
            }}
            ></Stack.Screen>}
        </Stack.Navigator>
    );
  }
}
