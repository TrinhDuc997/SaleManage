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

/* private func-start */
/* private func-end */

export default class TabTongQuanCpn extends Component {
  constructor(props) {
    super(props);
    this.state = {date:"2016-05-15"}
  }
  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: "#ffffff", height: 40, paddingTop: 3,flexDirection:"row" }}>
          <Text style={{ fontSize: 22, marginLeft: 10 }}>Doanh Thu</Text>
          {/* <DatePicker
            style={{
                width: 150,
                // height:35
            }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
          /> */}
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
                data: [25, 30, 29, 34, 28, 30,29],
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
                <Text style={{paddingTop:10,paddingBottom:10}}>1</Text>
                <Text style={{paddingTop:10,paddingBottom:10}}>58</Text>
                <Text style={{paddingTop:10,paddingBottom:10}}>14,56 Triệu</Text>
            </View>
        </View>
      </ScrollView>
    );
  }
}
