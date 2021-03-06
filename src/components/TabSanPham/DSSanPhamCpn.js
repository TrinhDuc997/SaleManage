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
    faCheckSquare,
    faSquare,
    
} from '@fortawesome/free-solid-svg-icons'
import { TextInput } from 'react-native-gesture-handler';
import Realm from 'realm'
import {ProductSchema,ProductDetailSchema,WarehouseSchema} from '../../Models/createDBRealm'
import {parseRealmToObject} from '../../Models/actionModelCommon'
import _ from './../../common/ActionCommon'
/* private func-start */
    const Item = ({param}) => {
      
        const {
            item={},
            handleSelect,
            checkSelectProduct
        } = param
        return(
            <TouchableOpacity 
                style={style.styleTouchableItem}
                onPress= { () => (checkSelectProduct)?handleSelect(item):item.handleView(item)}
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
                      <Text >{_.formatNumberWithCommas(item.retailPrice)}</Text>
                      <Text >{item.quantity}</Text>
                    </View>
                </View>
                <View style={{width:"10%",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,}}>
                    <Text style={{textAlign:"center",paddingTop:15}}>
                        <FontAwesomeIcon icon={(!!checkSelectProduct)?(!!item.select)?faCheckSquare:faSquare:faAngleRight} size={20} color="#696969"/>
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
  handleSelect = (param) => {
    let {dataProducts} = this.state
    const  { navigation } =  this.props
    const {setParams} = navigation
    let convertData = []
    dataProducts.forEach(i => {
      if(i.productCode === param.productCode){
        convertData.push({...i,select:!i.select})
      }else{
        convertData.push(i)
      }
    })
    this.setState({
      dataProducts:convertData
    })
    setParams({
      dataProducts:convertData.filter(item => item.select === true)
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
            ...parseRealmToObject(obj),
            detailId:obj.id,
            ...parseRealmToObject(item),
            // obj,
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
        realm.close()
      })
    }
    componentWillReceiveProps(nextProps){
    const {fromImportProduct = false,fromCheckProduct = false,fromExportProduct=false} = this.props.route.params || {}
    if(!fromImportProduct && !fromCheckProduct && !fromExportProduct)
    { 
      Realm.open({
      schema:[ProductSchema,ProductDetailSchema,WarehouseSchema]
      }).then(realm => {
        const dataPrice = realm.objects("ProductDetail")
        const dataWH = realm.objects("warehouse")
        const dataProducts = realm.objects('Product').map(item => {
          const obj = dataPrice.find(i => (i.productCode === item.productCode))
          const objWH = dataWH.find(i => (i.productCode === item.productCode))
          return {
            ...parseRealmToObject(obj),
            detailId:obj.id,
            ...parseRealmToObject(item),
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
        realm.close()
      })
    }
    }
    handleFilter = (param) => {
      Realm.open(
        { schema:[ProductSchema,ProductDetailSchema,WarehouseSchema]}
      ).then(realm => {
        const dataPrice = realm.objects("ProductDetail")
        const dataWH = realm.objects("warehouse")
        let dataProducts = []
        if(param !== ''){
          dataProducts = realm.objects('Product').filtered(`productName CONTAINS[c] '${param}' or productCode CONTAINS[c] '${param}'`).map(item => {
            const obj = dataPrice.find(i => (i.productCode === item.productCode))
            const objWH = dataWH.find(i => (i.productCode === item.productCode))
            return {
              ...parseRealmToObject(obj),
              detailId:obj.id,
              ...parseRealmToObject(item),
              whId:objWH.id,
              quantity:objWH.quantity,
              icon:faImage,
              key:item.id,
              handleView:this.handleView,
              key:item.productCode}
          })
        }else{
          dataProducts = realm.objects('Product').map(item => {
            const obj = dataPrice.find(i => (i.productCode === item.productCode))
            const objWH = dataWH.find(i => (i.productCode === item.productCode))
            return {
              ...parseRealmToObject(obj),
              detailId:obj.id,
              ...parseRealmToObject(item),
              whId:objWH.id,
              quantity:objWH.quantity,
              icon:faImage,
              key:item.id,
              handleView:this.handleView,
              key:item.productCode}
          })
        }
        
        this.setState({
          dataProducts
        })
      })
    }
  render() {
    const {fromImportProduct = false,fromCheckProduct=false,fromExportProduct=false} = this.props.route.params || {}
    return (
        <ScrollView style={style.container}>
          <TextInput
              placeholder={"tìm kiếm..."}
              style={style.styleTextInput}
              onChangeText = {(text) => {this.handleFilter(text)}}
              ></TextInput>
            <SafeAreaView style={style.styleSafeArea}>
                <FlatList
                    data={this.state.dataProducts}
                    renderItem={(item) => <Item param={{...item,handleSelect:this.handleSelect,checkSelectProduct:(fromImportProduct || fromCheckProduct || fromExportProduct)}}></Item>}
                    keyExtractor={item => item.key}
                />
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
