import React, { Component } from "react";
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
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Dimensions } from "react-native";
import {
  faChevronDown,
  faCalendarAlt,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
    LineChart,
    StackedBarChart
  } from "react-native-chart-kit";
  import moment from "moment";
  import Realm from 'realm'
  import {
    CheckGoodsSchema,
    CheckGoodsDetailSchema,
    exportGoodsSchema,
    WarehouseSchema,
    ProductSchema,
    ProductDetailSchema,
    exportGoodsDetailSchema,
    ImportGoodsSchema, 
    ImportGoodsDetailSchema} from '../../Models/createDBRealm'
  import {parseRealmToObject} from '../../Models/actionModelCommon'
  import _ from './../../common/ActionCommon'
  import PureChart from 'react-native-pure-chart';
/* private func-start */
const converData = (dataFinel) => {
  if(dataFinel.length === 0){
    return []
  }else{
    return [
      {
        seriesName: 'DoanhThu',
        data: [
          {x: moment().subtract("6",'day').format("DD/MM"), y: dataFinel[0].moneyDT},
          {x: moment().subtract("5",'day').format("DD/MM"), y: dataFinel[1].moneyDT},
          {x: moment().subtract("4",'day').format("DD/MM"), y: dataFinel[2].moneyDT},
          {x: moment().subtract("3",'day').format("DD/MM"), y: dataFinel[3].moneyDT},
          {x: moment().subtract("2",'day').format("DD/MM"), y: dataFinel[4].moneyDT},
          {x: moment().subtract("1",'day').format("DD/MM"), y: dataFinel[5].moneyDT},
          {x: moment().format("DD/MM"), y: dataFinel[6].moneyDT},
        ],
        color: '#005191'
      },
      {
        seriesName: 'GiaVon',
        data: [
          {x: moment().subtract("6",'day').format("DD/MM"), y: dataFinel[0].moneyGV},
          {x: moment().subtract("5",'day').format("DD/MM"), y: dataFinel[1].moneyGV},
          {x: moment().subtract("4",'day').format("DD/MM"), y: dataFinel[2].moneyGV},
          {x: moment().subtract("3",'day').format("DD/MM"), y: dataFinel[3].moneyGV},
          {x: moment().subtract("2",'day').format("DD/MM"), y: dataFinel[4].moneyGV},
          {x: moment().subtract("1",'day').format("DD/MM"), y: dataFinel[5].moneyGV},
          {x: moment().format("DD/MM"), y: dataFinel[6].moneyGV},
        ],
        color: '#039508'
      },
      {
          seriesName: 'LoiNhuanGop',
          data: [
            {x: moment().subtract("6",'day').format("DD/MM"), y: dataFinel[0].moneyLNG},
            {x: moment().subtract("5",'day').format("DD/MM"), y: dataFinel[1].moneyLNG},
            {x: moment().subtract("4",'day').format("DD/MM"), y: dataFinel[2].moneyLNG},
            {x: moment().subtract("3",'day').format("DD/MM"), y: dataFinel[3].moneyLNG},
            {x: moment().subtract("2",'day').format("DD/MM"), y: dataFinel[4].moneyLNG},
            {x: moment().subtract("1",'day').format("DD/MM"), y: dataFinel[5].moneyLNG},
            {x: moment().format("DD/MM"), y: dataFinel[6].moneyLNG},
          ],
          color: '#ffc107'
        }
    ]
  }
  
}
/* private func-end */

export default class TabBaoCaoCpn extends Component {
  constructor(props) {
    super(props);
    this.state={
      fromDate:moment().subtract("6",'day').format("DD/MM/YYYY"),
      toDate:moment().format("DD/MM/YYYY"),
      moneyTotal:0,
      moneyImpTotal:0,
      dataFinel:[]
    }
  }
  handleDate = (fromDate=this.state.fromDate,toDate=this.state.toDate) => {
    this.setState({
      fromDate,
      toDate
    })
  }
  funcXemNgay = () => {
   const {fromDate,toDate} = this.state
    const {navigation} = this.props
    navigation.navigate("chonNgay",{
      fromDate,
      toDate,
      handleDate:this.handleDate
    })
  }
  funcXemKho = () => {
    const {fromDate,toDate} = this.state
     const {navigation} = this.props
     navigation.navigate("xemKho",{
       fromWarehouse:true
     })
   }
  componentDidMount(){
    Realm.open({
      schema:[CheckGoodsSchema,exportGoodsSchema,ImportGoodsSchema,ProductDetailSchema,WarehouseSchema]
    }).then(realm => {
      const dataCheckGoods = realm.objects("CheckGoods").map(i => parseRealmToObject(i))
      const dataExportGoods = realm.objects("exportGoods").map(i => parseRealmToObject(i))
      const dataImportGoods = realm.objects("ImportGoods").map(i => parseRealmToObject(i))
      const totalData = [...dataCheckGoods,...dataExportGoods]
      let moneyTotal = 0
      let moneyImpTotal = 0
      for(let i=0;i < 7;i++){
          let tempData = []
          let temDataImp = []
          totalData.forEach(item => {
          const checkDate = _.compareDate(moment().subtract(`${6-i}`,'day').format("YYYY/MM/DD"),moment(item.createDate,"YYYYMMDD").format("YYYY/MM/DD"))
          if(checkDate === 0){
            tempData.push(item)
          }
        })
        dataImportGoods.forEach(item => {
          const checkDate = _.compareDate(moment().subtract(`${6-i}`,'day').format("YYYY/MM/DD"),moment(item.createDate,"YYYYMMDD").format("YYYY/MM/DD"))
          if(checkDate === 0){
            temDataImp.push(item)
          }
        })
        let money = 0
        let impMoney = 0
        tempData.forEach(iTemp => {
          money += iTemp.totalAmount
        })
        temDataImp.forEach(iTemp => {
          impMoney += iTemp.totalAmount
        })
        moneyTotal += money
        moneyImpTotal += impMoney
      }
      this.setState({
        moneyTotal,
        moneyImpTotal
      })
      realm.close()
    })

    Realm.open({
      schema:[exportGoodsSchema,exportGoodsDetailSchema,CheckGoodsSchema,ProductDetailSchema,ProductSchema,CheckGoodsDetailSchema]
    }).then(realm => {
      const dataImportGoods = realm.objects("exportGoods").map(i => parseRealmToObject(i))
      const dataCheckGoods = realm.objects("CheckGoods").map(i => parseRealmToObject(i))
      const totalDataGoods = [...dataImportGoods,...dataCheckGoods]
      const dataImportGoodsDetail = realm.objects("exportGoodsDetail").map(i => parseRealmToObject(i))
      const dataCheckGoodsDetail = realm.objects("CheckGoodsDetail").map(i => parseRealmToObject(i))
      const totalDataGoodsDetail = [...dataImportGoodsDetail,...dataCheckGoodsDetail]
      const dataPrice = realm.objects("ProductDetail")
        const dataProducts = realm.objects('Product').map(item => {
          const obj = dataPrice.find(i => (i.productCode === item.productCode))
          return {
            ...parseRealmToObject(obj),
            detailId:obj.id,
            ...parseRealmToObject(item),
            // obj,
            key:item.id,
            key:item.productCode}
        })

        let data = []
        totalDataGoods.forEach(item => {
          let itemList = []
          totalDataGoodsDetail.forEach(subTitem => {
           let obj = dataProducts.find(i => (i.productCode === subTitem.productCode))
            if(!!item.invoiceCode && item.id === subTitem.id && typeof subTitem.checkGoodsId === 'undefined'){
              itemList.push({...subTitem,...obj})
            }else if(!!item.ballotCode && item.id === subTitem.id &&  typeof subTitem.exportGoodsId === 'undefined' ){
              itemList.push({...obj,...subTitem})
            }
          })
          data.push({...item,itemList})
        })
        let DT=[]
        for(let i=0;i < 7;i++){
          let tempData = []
          data.forEach(item => {
          const checkDate = _.compareDate(moment().subtract(`${6-i}`,'day').format("YYYY/MM/DD"),moment(item.createDate,"YYYYMMDD").format("YYYY/MM/DD"))
          if(checkDate === 0){
            tempData.push(item)
          }
        })
          DT.push(tempData)
        }
        let dataFinel = []
        DT.forEach(iDT => {
          let moneyGV=0,moneyDT=0,moneyLNG=0
          iDT.forEach(iL =>{
            const {itemList=[]} = iL
            itemList.map(subIL => {
              moneyGV += (parseFloat(subIL.quantity || 0) * parseFloat(subIL.importPrice || 0))
              moneyDT += (parseFloat(subIL.quantity || 0) * parseFloat(subIL.retailPrice || 0))
              moneyLNG += ((parseFloat(subIL.quantity || 0) * parseFloat(subIL.retailPrice || 0)) - (parseFloat(subIL.quantity || 0) * parseFloat(subIL.importPrice || 0)))
            })
          })
          dataFinel.push({moneyGV,moneyDT,moneyLNG})
        })
        this.setState({
          dataFinel
        })
      realm.close()
    })
  }
  render() {
    const {fromDate,toDate,moneyTotal,moneyImpTotal,dataFinel} = this.state
    const dataConver = converData(dataFinel)
    return (
      <ScrollView style={style.container}>
        <TouchableOpacity style={{padding:10,flexDirection:"row",alignItems:"center"}} onPress={() => {this.funcXemNgay()}}>
            <FontAwesomeIcon icon={faCalendarAlt} size={27} color="#9e9e9e"/>
            <Text style={{marginLeft:15,fontSize:16,marginRight:10}} color="#9e9e9e">{`${fromDate} - ${toDate}`}</Text>
            <FontAwesomeIcon icon={faChevronDown} size={20} color="#9e9e9e"/>
        </TouchableOpacity>
        <View
          style={{
            height: 130,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            marginLeft: 25,
            marginRight: 25,
            marginBottom:20,
            fontSize: 24,
          }}
        >
            <View 
            style={{
                flexDirection:"row",
                 fontSize: 18,
                 paddingLeft:25,
                 paddingRight:20,
                 }}>
                <Text style={{width:"60%",borderColor:"#9e9e9e",borderBottomWidth:1,paddingTop:15,paddingBottom:15,fontSize:18}}>Thực Thu</Text>
                <View style={{width:"40%",borderColor:"#9e9e9e",borderBottomWidth:1,paddingTop:15,paddingBottom:15,alignItems:"flex-end"}}>
                    <Text style={{fontSize:18,}}>{_.formatNumberWithCommas(moneyTotal - moneyImpTotal)}</Text>
                </View>
            </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%", paddingLeft: 25}}>
              <Text style={{ paddingTop: 10,color:"#a9a9a9"}}>
                Tổng Thu
              </Text>
              <Text style={{ paddingTop: 5, paddingBottom: 10 }}>
                {_.formatNumberWithCommas(moneyTotal)}
              </Text>
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "flex-end",
                paddingRight: 25,
                fontSize: 24,
              }}
            >
              <Text style={{ paddingTop: 10,color:"#a9a9a9"}}>Tổng Chi</Text>
              <Text style={{ paddingTop: 5, paddingBottom: 10 }}>
                {_.formatNumberWithCommas(moneyImpTotal)}
              </Text>
            </View>
          </View>
        </View>
        <PureChart 
            type='line' 
            data={dataConver}
            height={180}
        >
        </PureChart>
        <View
            style={{
                flexDirection:"row",
                // height:40,
                backgroundColor:"#ffffff",
                padding:10,
                alignItems:"center"
            }}
        >
            <FontAwesomeIcon style={{marginLeft:10,marginRight:5}} icon={faCircle} size={10} color="#005191"/>
            <Text>Doanh Thu</Text>
            <FontAwesomeIcon style={{marginLeft:10,marginRight:5}} icon={faCircle} size={10} color="#039508"/>
            <Text>Giá Vốn</Text>
            <FontAwesomeIcon style={{marginLeft:10,marginRight:5}} icon={faCircle} size={10} color="#ffc107"/>
            <Text>Lợi Nhuận Gộp</Text>
        </View>
        <TouchableOpacity
                style={style.styleTouchableCustomer}
                onPress = {() => {this.funcXemKho()}}
            >
                <Text style={{fontSize:20,fontWeight:"bold",paddingBottom:15}}>{`Xem tồn kho`}</Text>
            </TouchableOpacity>
      </ScrollView>
    );
  }
}
/* private style-start */
const style = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  styleTouchableCustomer: {
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
  //   styleTouchable: {
  //     alignItems: "center",
  //     backgroundColor: "#ffffff",
  //     paddingTop: 50,
  //     paddingRight: 50,
  //     paddingLeft: 50,
  //     marginTop: 40,
  //     marginLeft: 40,
  //     marginRight: 40,
  //     borderTopLeftRadius: 10,
  //     borderTopRightRadius: 10,
  //   },
  //   styleSafeArea: {
  //     borderTopColor: "#A9A9A9",
  //     borderBottomColor: "#A9A9A9",
  //     borderWidth: 1,
  //   },
  //   styleTouchableItem: {
  //     flexDirection: "row",
  //     height: 60,
  //     backgroundColor: "#ffffff",
  //   },
});
/* private style-end */
