import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'

/* private func-start */
const Stack = createStackNavigator()

/* private func-end */

export default class TabBaoCao extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator>
            <Stack.Screen 
              name="Báo Cáo"
              component={View}
              options={{
                headerShown:false
              }}
              ></Stack.Screen>
        </Stack.Navigator>
    );
  }
}
