import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {
    faImage,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import { TextInput } from 'react-native-gesture-handler';
import Realm from 'realm'
import {ProductSchema,ProductDetailSchema,WarehouseSchema} from '../../Models/createDBRealm'
/* private func-start */
    const Item = ({param}) => {
    console.log("Item -> param", param)
      
        const {
            item={},
        } = param
        return(
            <TouchableOpacity 
                style={style.styleTouchableItem}
                onPress= { () => item.handleView(item)}
                >
                <View style={{width:"20%"}}>
                    <Text style={{textAlign:"center",paddingTop:15}}>
                        <FontAwesomeIcon icon={item.icon} size={35} color="#696969"/>
                    </Text>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"35%",justifyContent:"center"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text>{item.productName}</Text>
                      <Text>{item.productCode}</Text>
                    </View>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"35%",justifyContent:"center"}}>
                    
                    <View style={{flexDirection:"column"}}>
                      <Text >{item.retailPrice}</Text>
                      <Text >{item.quantity}</Text>
                    </View>
                </View>
                <View style={{width:"10%",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,}}>
                    <Text style={{textAlign:"center",paddingTop:15}}>
                        <FontAwesomeIcon icon={faAngleRight} size={20} color="#696969"/>
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    
/* private func-end */

export default class DSSanPhamCpn extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataProducts:[]
    }
  }
    
  handleView = (param) => {
    const {navigation} = this.props
    const {setParams} = navigation
    console.log("DSSanPhamCpn -> handleView -> navigation", navigation)
    setParams({ // props send compoennt themSanPham
        viewDetail:true,
        fromListProduct:true
    })
    navigation.navigate("themSanPham",{
      viewDetail:true,
      fromListProduct:true,
      dataProduct:param
    })
  }
  
    componentDidMount(){
      Realm.open({
        schema:[ProductSchema,ProductDetailSchema,WarehouseSchema]
      }).then(realm => {
        const dataPrice = realm.objects("ProductDetail")
        const dataWH = realm.objects("warehouse")
        const dataProducts = realm.objects('Product').map(item => {
          const obj = dataPrice.find(i => (i.productCode === item.productCode))
          const objWH = dataWH.find(i => (i.productCode === item.productCode))
          return {
            ...obj,
            detailId:obj.id,
            ...item,
            whId:objWH.id,
            quantity:objWH.quantity,
            icon:faImage,
            key:item.id,
            handleView:this.handleView,
            key:item.productCode}
        })
        this.setState({
          dataProducts
        })
      })
    }
  render() {
    console.log("this.state:",this.state)
    return (
        <SafeAreaView style={style.container}>
          <TextInput
              placeholder={"tìm kiếm..."}
              style={style.styleTextInput}
              ></TextInput>
            <SafeAreaView style={style.styleSafeArea}>
                <FlatList
                    data={this.state.dataProducts}
                    renderItem={(item) => <Item param={item}></Item>}
                    keyExtractor={item => item.key}
                />
            </SafeAreaView>
        </SafeAreaView>
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
    paddingTop:50,
    paddingRight:50,
    paddingLeft:50,
    marginTop:40,
    marginLeft:40,
    marginRight:40,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  styleSafeArea:{
    borderTopColor:"#A9A9A9",
    borderBottomColor:"#A9A9A9",
    borderWidth:1
  },
  styleTouchableItem:{
    flexDirection:"row",
    height:60,
    backgroundColor:"#ffffff"
  },
  styleTextInput:{
    backgroundColor:"#ffffff",
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    marginTop:10,
    // marginBottom:20,
    marginLeft:10,
    marginRight:10,
    paddingLeft:20
  }
});
/* private style-end */
