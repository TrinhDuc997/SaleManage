import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import TabThemCpn from '../../components/TabThem/TabThemCpn'

/* private func-start */
const Stack = createStackNavigator()

/* private func-end */

export default class TabThem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator>
            <Stack.Screen
             name="Thêm"
            component={TabThemCpn}
            options={{
              headerShown:false
            }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
  }
}
