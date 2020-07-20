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
import { TextInput } from 'react-native-gesture-handler';
import Realm from 'realm'
import {parseRealmToObject} from '../../Models/actionModelCommon'
import moment from 'moment'
import {ImportGoodsSchema,ImportGoodsDetailSchema,} from '../../Models/createDBRealm'
import _ from './../../common/ActionCommon'

/* private func-start */
    const Item = ({param}) => {
        const {
            item={},
        } = param
        return(
            <TouchableOpacity 
                style={style.styleTouchableItem}
                onPress= { () => item.handleView(item.key)}
                >
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"45%"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text>{item.invoiceCode}</Text>
                      <Text>{item.suplierName}</Text>
                      <Text>{moment(item.createDate).format("YYYY/MM/DD")}</Text>
                    </View>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"45%",alignItems:"flex-end"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text >{_.formatNumberWithCommas(item.totalAmount)}</Text>
                      <Text >Thành công</Text>
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

export default class screenDonNhapHangCpn extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataImportGoods:[]
    }
  }
    
  funcThemSanPham = () => {
    const {navigation} = this.props
    const {setParams} = navigation
    setParams({ // props send compoennt themSanPham
        ductest:"test"
    })
    navigation.navigate("themSanPham")
  }
    componentDidMount(){
      Realm.open({
          schema:[ImportGoodsSchema,ImportGoodsDetailSchema]
        }).then(realm => {
          const dataImportGoods = realm.objects("ImportGoods").sorted('id',true).map(i => parseRealmToObject(i))
          this.setState({
            dataImportGoods:dataImportGoods.map(i => ({...i,icon:faListAlt,handleView:this.funcThemSanPham}))
          })
          realm.close()
        })
    }
    componentWillReceiveProps(){
      Realm.open({
        schema:[ImportGoodsSchema,ImportGoodsDetailSchema]
      }).then(realm => {
        const dataImportGoods = realm.objects("ImportGoods").sorted('id',true).map(i => parseRealmToObject(i))
        this.setState({
          dataImportGoods:dataImportGoods.map(i => ({...i,icon:faListAlt,handleView:this.funcThemSanPham}))
        })
        realm.close()
      })
    }
  render() {
    const {dataImportGoods=[]} = this.state
    return (
        <SafeAreaView style={style.container}>
          <TextInput
              placeholder={"tìm kiếm..."}
              style={style.styleTextInput}
              ></TextInput>
            <SafeAreaView style={style.styleSafeArea}>
                <FlatList
                    data={dataImportGoods}
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
    backgroundColor:"#ffffff",
    paddingLeft:30,
    paddingRight:20
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
