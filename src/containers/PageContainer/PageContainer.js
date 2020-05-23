import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {
    faHome,
    faFileInvoice,
    faBoxOpen,
    faClipboard,
    faTh,
} from '@fortawesome/free-solid-svg-icons'
import TabTongQuan from '../TabTongQuan/TabTongQuan'
import TabDonHang from '../TabDonHang/TabDonHang'
import TabSanPhamCtn from '../TabSanPham/TabSanPhamCtn'
import TabBaoCao from '../TabBaoCao/TabBaoCao'
import TabThem from '../TabThem/TabThem'
import PageContainerTab from './PageContainerTab'
import TabThemSanPhamCpn from '../../components/TabSanPham/TabThemSanPhamCpn'
/* private func-start */
    const Tab = createBottomTabNavigator();
    const RootStack = createStackNavigator();
/* private func-end */

export default class PageContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      // <NavigationContainer>
      //   <Tab.Navigator>
      //     <Tab.Screen 
      //       name="TongQuan" 
      //       component={TabTongQuan} 
      //       options={{
      //         tabBarLabel:'Tổng Quan',
      //         tabBarIcon:({color,size}) => (
      //           <FontAwesomeIcon icon={faHome} size={size} color={color}/>
      //         )
      //       }}
      //       />
      //     <Tab.Screen 
      //       name="DonHang" 
      //       component={TabDonHang}
      //       options={{
      //         tabBarLabel:'Đơn Hàng',
      //         tabBarIcon:({color,size}) => (
      //           <FontAwesomeIcon icon={faFileInvoice} size={size} color={color}/>
      //         )
      //       }}
      //       />
      //     <Tab.Screen 
      //       name="SanPham"
      //       component={TabSanPhamCtn}
      //       options={{
      //         tabBarLabel:'Sản Phẩm',
      //         tabBarIcon:({color,size}) => (
      //           <FontAwesomeIcon icon={faBoxOpen} size={size} color={color}/>
      //         )
      //       }}
      //       />
      //     <Tab.Screen 
      //     name="BaoCao" 
      //     component={TabBaoCao} 
      //     options={{
      //       tabBarLabel:'Báo Cáo',
      //       tabBarIcon:({color,size}) => (
      //         <FontAwesomeIcon icon={faClipboard} size={size} color={color}/>
      //       )
      //     }}
      //     />
      //     <Tab.Screen 
      //     name="Them" 
      //     component={TabThem} 
      //     options={{
      //       tabBarLabel:'Thêm',
      //       tabBarIcon:({color,size}) => (
      //         <FontAwesomeIcon icon={faTh} size={size} color={color}/>
      //       )
      //     }}
      //     />
      //   </Tab.Navigator>
      // </NavigationContainer>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen 
                name="trangChu"
                component={PageContainerTab}
                options={{
                  headerTitleAlign:"center"
                }}
              />
              <RootStack.Screen 
                name="themSanPham"
                component={TabThemSanPhamCpn}
                options={{
                  headerTitle:"Thêm Sản Phẩm",
                  headerTitleAlign:"center"
                }}
              />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
