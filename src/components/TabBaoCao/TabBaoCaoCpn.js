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
  import PureChart from 'react-native-pure-chart';
/* private func-start */
const data = [
    {
      seriesName: 'DoanhThu',
      data: [
        {x: moment().subtract("6",'day').format("DD/MM"), y: 25},
        {x: moment().subtract("5",'day').format("DD/MM"), y: 30},
        {x: moment().subtract("4",'day').format("DD/MM"), y: 29},
        {x: moment().subtract("3",'day').format("DD/MM"), y: 34},
        {x: moment().subtract("2",'day').format("DD/MM"), y: 28},
        {x: moment().subtract("1",'day').format("DD/MM"), y: 30},
        {x: moment().format("DD/MM"), y: 29},
      ],
      color: '#005191'
    },
    {
      seriesName: 'GiaVon',
      data: [
        {x: moment().subtract("6",'day').format("DD/MM"), y: 20},
        {x: moment().subtract("5",'day').format("DD/MM"), y: 22},
        {x: moment().subtract("4",'day').format("DD/MM"), y: 20},
        {x: moment().subtract("3",'day').format("DD/MM"), y: 24},
        {x: moment().subtract("2",'day').format("DD/MM"), y: 23},
        {x: moment().subtract("1",'day').format("DD/MM"), y: 21},
        {x: moment().format("DD/MM"), y: 21},
      ],
      color: '#039508'
    },
    {
        seriesName: 'LoiNhuanGop',
        data: [
          {x: moment().subtract("6",'day').format("DD/MM"), y: 5},
          {x: moment().subtract("5",'day').format("DD/MM"), y: 8},
          {x: moment().subtract("4",'day').format("DD/MM"), y: 9},
          {x: moment().subtract("3",'day').format("DD/MM"), y: 10},
          {x: moment().subtract("2",'day').format("DD/MM"), y: 5},
          {x: moment().subtract("1",'day').format("DD/MM"), y: 9},
          {x: moment().format("DD/MM"), y: 8},
        ],
        color: '#ffc107'
      }
  ]
/* private func-end */

export default class TabBaoCaoCpn extends Component {
  constructor(props) {
    super(props);
  }

  funcThemSanPham = () => {
    const { navigation } = this.props;
    const { setParams } = navigation;
    setParams({
      // props send compoennt themSanPham
      ductest: "test",
    });
    navigation.navigate("themSanPham");
  };

  render() {
    return (
      <ScrollView style={style.container}>
        <TouchableOpacity style={{padding:10,flexDirection:"row",alignItems:"center"}} onPress={() => {alert("on click")}}>
            <FontAwesomeIcon icon={faCalendarAlt} size={27} color="#9e9e9e"/>
            <Text style={{marginLeft:15,fontSize:16,marginRight:10}} color="#9e9e9e">02/06/2020 - 08/06/2020</Text>
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
                    <Text style={{fontSize:18,}}>5,200,000</Text>
                </View>
            </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%", paddingLeft: 25}}>
              <Text style={{ paddingTop: 10,color:"#a9a9a9"}}>
                Tổng Thu
              </Text>
              <Text style={{ paddingTop: 5, paddingBottom: 10 }}>
                5,720,000
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
                520,000
              </Text>
            </View>
          </View>
        </View>
        {/* <StackedBarChart
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
            legend: ["L1", "L2", "L3"],
            data: [[5,7,13], [8,10,12], [8,9,12], [10,11,13], [8,10,10], [6,12,18],[9,10,10]],
            barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
        //   yAxisLabel="VND"
          yAxisSuffix="tr"
        //   yAxisInterval={1} // optional, defaults to 1
        //   segments={4}
        // hasLegend={true}
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
              marginLeft:10
            },
            // propsForLabels
          }}
        /> */}
        <PureChart 
            type='line' 
            data={data}
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
      </ScrollView>
    );
  }
}
/* private style-start */
const style = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
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
