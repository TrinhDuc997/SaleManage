import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import TabSanPhamCpn from '../../components/TabSanPham/TabSanPhamCpn'

/* private func-start */
const Stack = createStackNavigator()

/* private func-end */

export default class TabSanPhamCtn extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator>
            <Stack.Screen 
              name="sanPham"
              component={TabSanPhamCpn}
              options={{
                headerTitle:"Sản Phẩm",
                headerTitleAlign:"center",
                headerShown:false
              }}
            />
        </Stack.Navigator>
    );
  }
}
/* private style-start */
  const style = StyleSheet.create({
   headerStyle:{
        textAlign:"center",
      }
  })
/* private style-end */
