import React, { Component } from "react";
import { Text, View,TouchableOpacity,ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import DatePicker from "react-native-datepicker";
import {
  LineChart,
} from "react-native-chart-kit";
import moment from "moment";
import Realm from 'realm'
import {CheckGoodsSchema,exportGoodsSchema,WarehouseSchema,ProductSchema,ProductDetailSchema} from '../../Models/createDBRealm'
import {parseRealmToObject} from '../../Models/actionModelCommon'
import _ from './../../common/ActionCommon'

/* private func-start */
/* private func-end */

export default class TabTongQuanCpn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:"2016-05-15",
      moneyData:[0,0,0,0,0,0,0],
      dataProducts:[],
      belowNorm:0,
      totalQty:0,
      totalAmount:0,
    }
  }
  componentDidMount(){
    Realm.open({
      schema:[CheckGoodsSchema,exportGoodsSchema,ProductSchema,ProductDetailSchema,WarehouseSchema]
    }).then(realm => {
      const dataCheckGoods = realm.objects("CheckGoods").map(i => parseRealmToObject(i))
      const dataExportGoods = realm.objects("exportGoods").map(i => parseRealmToObject(i))
      const totalData = [...dataCheckGoods,...dataExportGoods]
      let moneyData = []
      for(let i=0;i < 7;i++){
          let tempData = []
          totalData.forEach(item => {
          const checkDate = _.compareDate(moment().subtract(`${6-i}`,'day').format("YYYY/MM/DD"),moment(item.createDate,"YYYYMMDD").format("YYYY/MM/DD"))
          if(checkDate === 0){
            tempData.push(item)
          }
        })
        let money = 0
        tempData.forEach(iTemp => {
          money += iTemp.totalAmount
        })
        moneyData.push((money/1000000))
      }
      
      // handle warehouse 
      const dataPrice = realm.objects("ProductDetail").map(i => parseRealmToObject(i))
      const dataWH = realm.objects("warehouse").map(i => parseRealmToObject(i))
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
          key:item.id,
          key:item.productCode}
      })
      let belowNorm = 0,totalQty=0, totalAmount = 0
      dataProducts.forEach(i => {
        if(i.quantity < 15){
          belowNorm += 1
        }
        totalQty += i.quantity
        totalAmount += (i.quantity * i.retailPrice)
      })
      this.setState({
        belowNorm,
        totalQty,
        totalAmount,
        dataProducts,
        moneyData
      })
      realm.close()
    })
  }
  render() {
    const {
      moneyData,
      dataProducts,
      belowNorm,
      totalQty,
      totalAmount,
    } = this.state
    return (
      <ScrollView>
        <View style={{ backgroundColor: "#ffffff", height: 40, paddingTop: 3,flexDirection:"row" }}>
          <Text style={{ fontSize: 22, marginLeft: 10 }}>Doanh Thu</Text>
        </View>
        <LineChart
          data={{
            labels: [
                moment().subtract("6",'day').format("DD/MM"),                
                moment().subtract("5",'day').format("DD/MM"),
                moment().subtract("4",'day').format("DD/MM"),
                moment().subtract("3",'day').format("DD/MM"),
                moment().subtract("2",'day').format("DD/MM"),
                moment().subtract("1",'day').format("DD/MM"),
                moment().format("DD/MM"),
            ],
            datasets: [
              {
                data: moneyData,
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
        //   yAxisLabel="VND"
          yAxisSuffix="tr"
          yAxisInterval={1} // optional, defaults to 1
          segments={4}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            // decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0,100,180, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,
            style: {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "#004c89",
            },
          }}
          bezier
        />
        <TouchableOpacity
            style={{
                alignItems:"center",
                backgroundColor:"#ffffff",
                padding:5
            }}
        >
            <Text style={{fontSize:16,color:"#0060ac"}}>Xem Chi Tiết Doanh Thu</Text>
        </TouchableOpacity>
        <Text style={{marginTop:30,fontSize:22,marginLeft:15,marginBottom:10}}>Thông Tin Kho</Text>
        <View 
            style={{
                height:130,
                backgroundColor:"#ffffff",
                borderRadius:15,
                marginLeft:25,
                marginRight:25,
                flexDirection:"row",
                fontSize:14
            }}>
            <View style={{width:"60%",paddingLeft:25,}}>
                <Text style={{paddingTop:10,paddingBottom:10}}>Sản Phẩm Dưới Định Mức Tồn</Text>
                <Text style={{paddingTop:10,paddingBottom:10}}>Số Lượng Tồn Kho</Text>
                <Text style={{paddingTop:10,paddingBottom:10}}>Giá Trị Tồn Kho</Text>
            </View>
            <View style={{width:"40%",alignItems:"flex-end",paddingRight:25}}>
                <Text style={{paddingTop:10,paddingBottom:10}}>{belowNorm}</Text>
                <Text style={{paddingTop:10,paddingBottom:10}}>{totalQty}</Text>
                <Text style={{paddingTop:10,paddingBottom:10}}>{_.formatNumberWithCommas(totalAmount)}</Text>
            </View>
        </View>
      </ScrollView>
    );
  }
}
