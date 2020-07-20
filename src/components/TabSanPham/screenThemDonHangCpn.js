import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity,
    SafeAreaView,
    VirtualizedList,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {
    faPlusCircle,
    faListAlt,
    faCheckSquare,
    faDollyFlatbed,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import {ProductSchema,ProductDetailSchema,WarehouseSchema,ImportGoodsSchema,ImportGoodsDetailSchema,} from '../../Models/createDBRealm'

import { TextInput } from 'react-native-gesture-handler';

/* private func-start */
    const Item = ({param}) => {
        const {
            data={},
            handleChangeItem
        } = param
        const {
            item={}
        } = data
        return(
            <SafeAreaView
                style={style.styleSafeAreaItem}
                // onPress= { () => item.handleView(item.key)}
                >
                <View style={{width:"5%"}}>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"30%",justifyContent:"center"}}>
                    <Text style={{paddingLeft:20,fontSize:18}}>{item.productName}</Text>
                    <Text style={{paddingLeft:20,fontSize:18}}>{item.productCode}</Text>
                </View>
                <View
                    style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"30%",paddingTop:10}}
                >
                    <Text style={{paddingLeft:10,fontSize:18}}>{item.importPrice}</Text>
                </View>
                <View style={{width:"30%",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,}}>
                    <TextInput style={style.styleTextInputItem}
                        keyboardType="decimal-pad"
                    onChangeText={(e) => {
                        handleChangeItem({
                            importQty:e,
                            productCode:item.productCode
                        })
                    }}
                    ></TextInput>
                </View>
                <View style={{width:"5%"}}>
                </View>
            </SafeAreaView>
        )
    }
    
/* private func-end */

export default class screenThemDonHangCpn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
    
  funcChomSanPham = () => {
    const {navigation} = this.props
    navigation.navigate("danhSachSanPham",{
        fromImportProduct:true
    })
  }
  funcChomNhaCungCap = () => {
    const {navigation} = this.props
    navigation.navigate("chonNhaCungCap",{
        fromImportProduct:true
    })
  }

  handleChange = (param) => {
    const {navigation} = this.props
    const {setParams} = navigation
    const newState = {...this.state,...param}
    setParams({
        ...newState
    })
    this.setState({
        ...param
    })
  }
  handleChangeItem = (item) => {
    let {dataProducts=[]} = this.props.route.params || {}
    dataProducts.forEach((i,index) => {
        if(i.productCode === item.productCode){
            dataProducts[index] = {...i,importQty:item.importQty}
        }
    })
    const {navigation} = this.props
    const {setParams} = navigation
    setParams({
        dataProducts
    })
  }
  render() {
      const {dataProducts=[],fromImportProduct=false,supplier={}} = this.props.route.params || {}
      const {supplierName = ""} = supplier
      const {chietKhau=0,phiGiaoHang=0} = this.state
      let totalQty = 0,totalAmount = 0,total=0
      dataProducts.forEach(item => {
        totalQty += (parseFloat(item.importQty) || 0)
        totalAmount += (parseFloat(item.importQty || 0) * parseFloat(item.retailPrice || 0))
      })
      total = (totalAmount - (totalAmount * parseFloat(chietKhau))/100 ) - phiGiaoHang
    return (
        <ScrollView style={style.container}>
            <TouchableOpacity
                style={style.styleTouchableSuplier}
                onPress = {() => {this.funcChomNhaCungCap()}}
            >
                <Text style={{fontSize:20,fontWeight:"bold",paddingBottom:15}}>{supplierName||`Chọn Nhà cung cấp`}</Text>
            </TouchableOpacity>
            {(dataProducts.length === 0)
            &&<TouchableOpacity
                style={style.styleTouchable}
                onPress = {() => {this.funcChomSanPham()}}
            >
                <Text style={{paddingBottom:15}}>
                    <FontAwesomeIcon icon={faPlusCircle} size={40} color={"#006abe"} />
                </Text>
                <Text style={{fontSize:20,fontWeight:"bold",paddingBottom:15}}>Chọn Sản Phẩm</Text>
            </TouchableOpacity>
            ||<TouchableOpacity
                style={style.styleTouchable}
                onPress = {() => {this.funcChomSanPham()}}
                >
                <Text style={{fontSize:24,fontWeight:"bold",paddingBottom:15}}>Chọn Lại Sản Phẩm</Text>
                </TouchableOpacity>
            }
            {(dataProducts.length>0)&&<SafeAreaView style={style.styleSafeArea}>
                <FlatList
                    data={dataProducts}
                    scrollEnabled={false}
                    renderItem={(data) => <Item param={{data,handleChangeItem:this.handleChangeItem}}></Item>}
                    keyExtractor={item => item.key}
                />
            </SafeAreaView>}
            <SafeAreaView    aView style={style.styleSafeAreaTotal}>
                <View style={{width:"60%"}}>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:15,fontSize:15}}>
                        Tổng Số Lượng:
                    </Text>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:10,fontSize:15}}>
                        Tổng Tiền Hàng:
                    </Text>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:15,fontSize:15}}>
                        Chiết Khấu(%):
                    </Text>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:15,fontSize:15}}>
                        Chi Phí Tiền Hàng:
                    </Text>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:25,fontSize:15}}>
                        Tổng Tiền Tạm Tính:
                    </Text>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"40%",alignItems:"flex-end"}}>
                    <Text style={{paddingRight:20,fontSize:15,marginTop:10}}>{totalQty}</Text>
                    <Text style={{paddingRight:20,fontSize:15,marginTop:10}}>{totalAmount}</Text>
                    <TextInput style={style.styleTextInputTotal}
                        keyboardType="decimal-pad"
                        onChangeText={(e) => {
                            this.handleChange({
                                chietKhau:e
                            })
                        }}></TextInput>
                    <TextInput style={style.styleTextInputTotal}
                        keyboardType="decimal-pad"
                        onChangeText={(e) => {
                            this.handleChange({
                                phiGiaoHang:e
                            })
                        }}></TextInput>
                    <Text style={{paddingRight:20,fontSize:15,marginTop:10}}>{total}</Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
  }
}
/* private style-start */
const style = StyleSheet.create({
  container:{
    backgroundColor:"#f5f5f5",
  },
  styleTouchable: {
    alignItems:"center",
    backgroundColor:"#ffffff",
    paddingTop:10,
    paddingRight:50,
    paddingLeft:50,
    marginTop:10,
    marginLeft:30,
    marginRight:30,
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  styleTouchableSuplier: {
    alignItems:"center",
    backgroundColor:"#ffffff",
    paddingTop:10,
    marginTop:10,
    paddingRight:50,
    paddingLeft:50,
    marginLeft:30,
    marginRight:30,
    borderRadius:15

  },
  styleSafeArea:{
    borderTopColor:"#A9A9A9",
    borderBottomColor:"#A9A9A9",
    borderWidth:1,
    // maxHeight:250
  },
  styleSafeAreaTotal:{
    flexDirection:"row",
    marginTop:10,
    borderTopColor:"#A9A9A9",
    borderBottomColor:"#A9A9A9",
    borderWidth:1,
    backgroundColor:"#ffffff",
    height:190
  },
  styleSafeAreaItem:{
    flexDirection:"row",
    backgroundColor:"#ffffff"
  },
  styleTextInputItem:{
      borderColor:"#A9A9A9",
      borderWidth:1,
      borderRadius:5,
      alignItems:"center",
      marginTop:12.5
  },
  styleTextInputTotal:{
    borderColor:"#A9A9A9",
    borderWidth:1,
    borderRadius:5,
    alignItems:"center",
    width:"80%",
    height:35,
    marginTop:10,
    marginRight:10,
    alignContent:"flex-end",
  }
});
/* private style-end */
