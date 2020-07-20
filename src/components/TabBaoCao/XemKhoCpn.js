import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Orientation  from 'react-native-orientation'
 import {listProduct} from '../../Models/actionModelCommon'
 import Realm from 'realm'
import {ProductSchema,ProductDetailSchema,WarehouseSchema} from '../../Models/createDBRealm'
export default class XemKhoCpn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['STT', 'Mã Sản Phẩm', 'Tên Sản Phẩm', 'Tồn Kho', 'Giá Trị Tồn Nhập', 'Giá Trị Tồn Theo Giá Hiện Tại',],
      widthArr: [40, 120, 120, 100, 150, 150],
      dataProducts:[]
    }
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
    Orientation.lockToLandscape();
    
 }
 componentWillUnmount(){
    Orientation.lockToPortrait();
 }

  render() {
    const state = this.state;
    console.log("XemKhoCpn -> render -> state", state)
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
    
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fafafa' },
  header: { height: 50, backgroundColor: '#6a6a6a' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});