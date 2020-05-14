import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

/* private func-start */
const Stack = createStackNavigator()
/* private func-end */

export default class TabTongQuan extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tổng Quan" component={View}></Stack.Screen>
        </Stack.Navigator>
    );
  }
}
