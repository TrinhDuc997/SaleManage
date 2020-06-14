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
                      <Text>{item.maHD}</Text>
                      <Text>{item.dvCungCap}</Text>
                      <Text>{item.ngay}</Text>
                    </View>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"45%",alignItems:"flex-end"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text >{item.soTien}</Text>
                      <Text >{item.trangThai}</Text>
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
  }
    
  funcThemSanPham = () => {
    const {navigation} = this.props
    const {setParams} = navigation
    setParams({ // props send compoennt themSanPham
        ductest:"test"
    })
    navigation.navigate("themSanPham")
  }
  data = [
    {key:"MAHD001",maHD:"MAHD001",dvCungCap:"Tông Đại Lý Gạo Tiền Giang",ngay:'08/06',soTien:"15,450,000",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"MAHD002",maHD:"MAHD002",dvCungCap:"Vựa Gạo Long An",ngay:'01/05',soTien:"17,240,000",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"MAHD003",maHD:"MAHD003",dvCungCap:"Vựa Gạo Long An",ngay:'09/04',soTien:"22,350,000",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"MAHD004",maHD:"MAHD004",dvCungCap:"Vựa Gạo Long An",ngay:'05/03',soTien:"26,125,000",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"MAHD005",maHD:"MAHD005",dvCungCap:"Tông Đại Lý Gạo Tiền Giang",ngay:'07/02',soTien:"18,650,000",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"MAHD006",maHD:"MAHD006",dvCungCap:"Vựa Gạo Long An",ngay:'010/01',soTien:"23,248,000",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    
    ]
  render() {
    return (
        <SafeAreaView style={style.container}>
          <TextInput
              placeholder={"tìm kiếm..."}
              style={style.styleTextInput}
              ></TextInput>
            <SafeAreaView style={style.styleSafeArea}>
                <FlatList
                    data={this.data}
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
