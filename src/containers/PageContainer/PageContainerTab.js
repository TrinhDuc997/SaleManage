import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import TabSanPhamCpn from '../../components/TabSanPham/TabSanPhamCpn'
import TabBaoCao from '../TabBaoCao/TabBaoCao'
import TabThem from '../TabThem/TabThem'
/* private func-start */
    const Tab = createBottomTabNavigator();

    const getHeaderTitle = (route) => {
      const routeName = route.state
        ? route.state.routeNames[route.state.index]
        : route.name
      switch(routeName){
        case "DonHang":
          return "Đơn Hàng"
        case "SanPham":
          return "Sản Phẩm"
        case "BaoCao":
          return "Báo Cáo"
        case "Them":
          return "Thêm"
        default:
          return "Tổng Quan"
      }
    }
/* private func-end */

const PageContainerTab = (props) => {
    const {
      navigation,
      route
    } = props
    /* handle tital screen-start */
      React.useLayoutEffect(() => {
        navigation.setOptions({headerTitle:getHeaderTitle(route)});
      },[navigation,route])
    /* handle tital screen-start */

    return (
        <Tab.Navigator>
          <Tab.Screen 
            name="TongQuan" 
            component={TabTongQuan} 
            options={{
              // tabBarLabel:'Tổng Quan',
              tabBarIcon:({color,size}) => (
                <FontAwesomeIcon icon={faHome} size={size} color={color}/>
              )
            }}
            />
          <Tab.Screen 
            name="DonHang" 
            component={TabDonHang}
            options={{
              // tabBarLabel:'Đơn Hàng',
              tabBarIcon:({color,size}) => (
                <FontAwesomeIcon icon={faFileInvoice} size={size} color={color}/>
              )
            }}
            />
          <Tab.Screen 
            name="SanPham"
            component={TabSanPhamCtn}
            options={{
              // tabBarLabel:'Sản Phẩm',
              tabBarIcon:({color,size}) => (
                <FontAwesomeIcon icon={faBoxOpen} size={size} color={color}/>
              )
            }}
            />
          <Tab.Screen 
          name="BaoCao" 
          component={TabBaoCao} 
          options={{
            // tabBarLabel:'Báo Cáo',
            tabBarIcon:({color,size}) => (
              <FontAwesomeIcon icon={faClipboard} size={size} color={color}/>
            )
          }}
          />
          <Tab.Screen 
          name="Them" 
          component={TabThem} 
          options={{
            // tabBarLabel:'Thêm',
            tabBarIcon:({color,size}) => (
              <FontAwesomeIcon icon={faTh} size={size} color={color}/>
            )
          }}
          />
        </Tab.Navigator>
    );
  }

  export default PageContainerTab