import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'

/* private func-start */
const Stack = createStackNavigator()

/* private func-end */

export default class TabDonHang extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator>
            <Stack.Screen name="Đơn Hàng" component={View}></Stack.Screen>
        </Stack.Navigator>
    );
  }
}
