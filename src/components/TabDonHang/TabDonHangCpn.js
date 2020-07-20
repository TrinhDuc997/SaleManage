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
import {exportGoodsSchema,exportGoodsDetailSchema,} from '../../Models/createDBRealm'
import Realm from 'realm'
import {parseRealmToObject} from '../../Models/actionModelCommon'


import moment from 'moment'
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
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"30%"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text>{item.invoiceCode}</Text>
                      <Text>{item.customerName}</Text>
                    </View>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"30%"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text></Text>
                      <Text>{moment(item.createDate,"YYYYMMDD").format("YYYY/MM/DD")}</Text>
                    </View>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"30%",alignItems:"flex-end"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text >{item.totalAmount}</Text>
                      <Text >{titleStatus[item.status].title}</Text>
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
    const titleStatus = {
      1:{status:1,title:"Đã thanh toán"},
      0:{status:1,title:"Chưa thanh toán"}
    }
/* private func-end */

export default class TabDonHangCpn extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataExportGoods:[]
    }
  }
    
  funcThemDonHang = () => {
    const {navigation} = this.props
    const {setParams} = navigation
    setParams({ // props send compoennt themSanPham
        ductest:"test"
    })
    navigation.navigate("themDonDatHang")
  }

  handleView = (typeView) => {
    const {navigation} = this.props
    const {setParams} = navigation
    switch(typeView){
        case "1":
            navigation.navigate("danhSachSanPham")
            break;
        case "2":
            navigation.navigate("donNhapHang")
            break;
        case "3":
            navigation.navigate("kiemHang")
            break;
    }
  }
  componentDidMount(){
    Realm.open({
        schema:[exportGoodsSchema,exportGoodsDetailSchema]
      }).then(realm => {
        const dataExportGoods = realm.objects("exportGoods").sorted('id',true).map(i => parseRealmToObject(i))
        this.setState({
          dataExportGoods:dataExportGoods.map(i => ({...i,icon:faListAlt,handleView:this.funcThemSanPham}))
        })
        realm.close()
      })
  }
  componentWillReceiveProps(nextProp){
    console.log(`check will props`,nextProp)
    Realm.open({
      schema:[exportGoodsSchema,exportGoodsDetailSchema]
    }).then(realm => {
      const dataExportGoods = realm.objects("exportGoods").sorted('id',true).map(i => parseRealmToObject(i))
      this.setState({
        dataExportGoods:dataExportGoods.map(i => ({...i,icon:faListAlt,handleView:this.funcThemSanPham}))
      })
      realm.close()
    })
  }
  render() {
    console.log(`check render:`)
    const {dataExportGoods=[]} = this.state
    return (
        <SafeAreaView style={style.container}>
            <TouchableOpacity
                style={style.styleTouchable}
                onPress = { () => {this.funcThemDonHang()}}
            >
                <Text style={{paddingBottom:15}}>
                    <FontAwesomeIcon icon={faPlusCircle} size={50} color={"#006abe"} />
                </Text>
                <Text style={{fontSize:24,fontWeight:"bold",paddingBottom:15}}>Thêm Đơn Hàng</Text>
            </TouchableOpacity>
            
            <SafeAreaView style={style.styleSafeArea}>
            <Text style={{fontSize:22,backgroundColor:"#ffffff",padding:15}}>Danh Sách Hóa Đơn</Text>
                <FlatList
                    data={dataExportGoods}
                    renderItem={(item) => <Item param={item}></Item>}
                    keyExtractor={item => item.invoiceCode}
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
    borderWidth:1,
    maxHeight:340
  },
  styleTouchableItem:{
    flexDirection:"row",
    height:60,
    backgroundColor:"#ffffff",
    paddingLeft:30,
    paddingRight:20,
    paddingTop:10
  },
});
/* private style-end */
