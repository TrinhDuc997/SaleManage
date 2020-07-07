import React, {Component} from 'react';
import {Text, View,Button,TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import styles from '../../common/CommonStyleSheet/styles'
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {
    faCheck,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
// import TabTongQuan from '../TabTongQuan/TabTongQuan'
// import TabDonHang from '../TabDonHang/TabDonHang'
// import TabSanPhamCtn from '../TabSanPham/TabSanPhamCtn'
// import TabBaoCao from '../TabBaoCao/TabBaoCao'
// import TabThem from '../TabThem/TabThem'
import PageContainerTab from './PageContainerTab'
import TabThemSanPhamCpn from '../../components/TabSanPham/TabThemSanPhamCpn'
import DSSanPhamCpn from '../../components/TabSanPham/DSSanPhamCpn'
import screenDonNhapHangCpn from '../../components/TabSanPham/screenDonNhapHangCpn'
import screenKiemHangCpn from '../../components/TabSanPham/screenKiemHangCpn'
import screenThemDonHangCpn from '../../components/TabSanPham/screenThemDonHangCpn'
import screenThemKiemHangCpn from '../../components/TabSanPham/screenThemKiemHangCpn'
import screenThemDonDatHangCpn from '../../components/TabDonHang/screenThemDonDatHangCpn'
import {funcConectDB} from '../../Models/createDBRealm'
import {saveDataProduct} from '../../Models/saveData'
/* private func-start */
    // const Tab = createBottomTabNavigator();
    const RootStack = createStackNavigator();
/* private func-end */

export default class PageContainer extends Component {
  constructor(props) {
    super(props);
  }
  handleViewTab = (screen,navigation) => {
    console.log("PageContainer -> handleViewTab -> screen", screen)
    navigation.navigate(screen)
  }
  componentDidMount(){
    funcConectDB()
  }
  render() {
    return (
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
                options={({ navigation, route }) => {
                  return{
                  headerTitle:"Thêm Sản Phẩm",
                  headerTitleAlign:"center",
                  headerRight: () => {
                    return(
                      <TouchableOpacity
                        style={styles.cssButtonCommon}
                        onPress={() => {
                          const {params} = route
                          console.log("PageContainer -> render -> params", params)
                          const reqData = {
                            id:params.id,
                            productName:params.productName,
                            productCode:params.productCode,
                            description:params.description,
                            unit:params.unit,
                            weight:params.weight,
                            productType:params.productType,
                            brand:params.brand,
                            createDate:moment().format("YYYYMMDD"),
                            importDate:moment().format("YYYYMMDD"),
                            applyDate:moment().format("YYYYMMDD"),
                            status:params.isEnabled ? 1 : 0,
                            retailPrice:params.retailPrice,
                            wholeSalePrice:params.wholeSalePrice,
                            importPrice:params.importPrice,
                            customUnit:params.customUnit,
                            quantity:Number(params.quantity) || 0,
                            //data update
                            whId:params.whId,
                            detailId:params.detailId
                          }
                          saveDataProduct(reqData,navigation)
                        }}
                      >
                         <FontAwesomeIcon icon={faCheck} size={20} color="black"/>
                      </TouchableOpacity>
                    )
                  },
                }}}
              />
              <RootStack.Screen 
                name="danhSachSanPham"
                component={DSSanPhamCpn}
                options={{
                  headerTitle:"Danh Sách Sản Phẩm",
                  headerTitleAlign:"center",
                  // headerRight: () => {
                  //   return(
                  //     <TouchableOpacity
                  //       style={styles.cssButtonCommon}
                  //       onPress={() => {alert("aleart!")}}
                  //     >
                  //        <FontAwesomeIcon icon={faCheck} size={20} color="black"/>
                  //     </TouchableOpacity>
                  //   )
                  // },
                }}
              />
              <RootStack.Screen 
                name="donNhapHang"
                component={screenDonNhapHangCpn}
                options={({ navigation, route }) => ({
                  headerTitle:"Đơn Nhập Hàng",
                  headerTitleAlign:"center",
                  headerRight: () => {
                    return(
                      <TouchableOpacity
                        style={styles.cssButtonCommon}
                        onPress={() => {this.handleViewTab("themDonHang",navigation)}}
                      >
                         <FontAwesomeIcon icon={faPlus} size={20} color="black"/>
                      </TouchableOpacity>
                    )
                  },
                })}
              />
              <RootStack.Screen 
                name="kiemHang"
                component={screenKiemHangCpn}
                options={(({navigation,route}) => ({
                  headerTitle:"Kiểm Hàng",
                  headerTitleAlign:"center",
                  headerRight: () => {
                    return(
                      <TouchableOpacity
                        style={styles.cssButtonCommon}
                        onPress={() => {
                          this.handleViewTab("themKiemHang",navigation)
                        }}
                      >
                         <FontAwesomeIcon icon={faPlus} size={20} color="black"/>
                      </TouchableOpacity>
                    )
                  },
                }))}
              />
              <RootStack.Screen
                name="themDonHang"
                component={screenThemDonHangCpn}
                options={{
                  headerTitle:"Thêm Đơn Hàng",
                  headerTitleAlign:"center",
                  headerRight: () => {
                    return(
                      <TouchableOpacity
                        style={styles.cssButtonCommon}
                        onPress={() => {alert("aleart!")}}
                      >
                         <FontAwesomeIcon icon={faPlus} size={20} color="black"/>
                      </TouchableOpacity>
                    )
                  },
                }}
              />
              <RootStack.Screen
                name="themKiemHang"
                component={screenThemKiemHangCpn}
                options={{
                  headerTitle:"Thêm Phiếu Kiểm Hàng",
                  headerTitleAlign:"center",
                  headerRight: () => {
                    return(
                      <TouchableOpacity
                        style={styles.cssButtonCommon}
                        onPress={() => {alert("aleart!")}}
                      >
                         <FontAwesomeIcon icon={faPlus} size={20} color="black"/>
                      </TouchableOpacity>
                    )
                  },
                }}
              />
              <RootStack.Screen
                name="themDonDatHang"
                component={screenThemDonDatHangCpn}
                options={{
                  headerTitle:"Thêm Đơn Đặt Hàng",
                  headerTitleAlign:"center",
                  headerRight: () => {
                    return(
                      <TouchableOpacity
                        style={styles.cssButtonCommon}
                        onPress={() => {alert("aleart!")}}
                      >
                         <FontAwesomeIcon icon={faPlus} size={20} color="black"/>
                      </TouchableOpacity>
                    )
                  },
                }}
              />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
