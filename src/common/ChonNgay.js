import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Datepicker from 'react-native-datepicker'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Orientation  from 'react-native-orientation'
//  import {listProduct} from '../../Models/actionModelCommon'
 import Realm from 'realm'
 import moment from 'moment'
// import {ProductSchema,ProductDetailSchema,WarehouseSchema} from '../../Models/createDBRealm'
export default class ChonNgay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate:moment().subtract("6",'day').format("DD/MM/YYYY"),
      toDate:moment().format("DD/MM/YYYY"),
    }
  }

  render() {
    const { navigation,route } = this.props;
    const { setParams } = navigation;
    const {handleDate} = route.params

    return (
      <View style={styles.container}>
        <TouchableOpacity style={{padding:10,backgroundColor:"#ffffff"}} onPress={() => {}}>
            <Text>Ngày bắt đầu:</Text>
            <Datepicker
              style={{width: 200}}
              date={this.state.fromDate}
              mode="date"
              placeholder="select date"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                handleDate(date,this.state.toDate);
                this.setState({fromDate: date})
              }}
            />
        </TouchableOpacity>
        <TouchableOpacity style={{padding:10,backgroundColor:"#ffffff"}} onPress={() => {}}>
          <Text>Ngày kết thúc:</Text>
          <Datepicker
            style={{width: 200}}
            date={this.state.toDate}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              handleDate(this.state.fromDate,date);
              this.setState({toDate: date})
            }}
          />
        </TouchableOpacity>
        
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 10, backgroundColor: '#fafafa' },
  header: { height: 50, backgroundColor: '#6a6a6a' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});