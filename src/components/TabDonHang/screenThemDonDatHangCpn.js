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
    faCheckCircle,
    faCircle
} from '@fortawesome/free-solid-svg-icons'
import { TextInput } from 'react-native-gesture-handler';
import FloatTextInputCpn from '../../common/FloatTextInputCpn'
import { CheckBox } from 'react-native-elements'

/* private func-start */
    const Item = ({param}) => {
        const {
            item={},
        } = param
        return(
            <SafeAreaView
                style={style.styleSafeAreaItem}
                onPress= { () => item.handleView(item.key)}
                >
                <View style={{width:"10%"}}>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"50%",justifyContent:"center"}}>
                    <Text style={{paddingLeft:20,fontSize:18}}>Tên Sản Phẩm</Text>
                    <Text style={{paddingLeft:20,fontSize:18}}>Mã Sản Phẩm</Text>
                    <Text style={{paddingLeft:20,fontSize:18}}>Đơn Giá</Text>
                </View>
                <View style={{width:"30%",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,}}>
                    <TextInput style={style.styleTextInputItem}></TextInput>
                </View>
                <View style={{width:"10%"}}>
                </View>
            </SafeAreaView>
        )
    }
    
/* private func-end */

export default class screenThemDonDatHangCpn extends Component {
  constructor(props) {
    super(props);
  }
    
  funcChomSanPham = () => {
    const {navigation} = this.props
    navigation.navigate("danhSachSanPham",{
        fromImportProduct:true
    })
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
  data = [
    {key:"1",title:"Danh Sách Sản Phẩm",icon:faListAlt,handleView:this.handleView},
    {key:"2",title:"Nhập Hàng",icon:faDollyFlatbed,handleView:this.handleView},
    {key:"3",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.handleView},
    ]
  render() {
    return (
        <ScrollView style={style.container}>
            <TouchableOpacity
                style={style.styleTouchable}
                onPress = {() => {this.funcChomSanPham()}}
            >
                <Text style={{paddingBottom:15}}>
                    <FontAwesomeIcon icon={faPlusCircle} size={50} color={"#006abe"} />
                </Text>
                <Text style={{fontSize:24,fontWeight:"bold",paddingBottom:15}}>Chọn Sản Phẩm</Text>
            </TouchableOpacity>
            {(true)&&<SafeAreaView style={style.styleSafeArea}>
                <FlatList
                    data={this.data}
                    renderItem={(item) => <Item param={item}></Item>}
                    keyExtractor={item => item.key}
                />
            </SafeAreaView>}
            <SafeAreaView style={style.styleSafeAreaTotal}>
                <View style={{width:"60%"}}>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:15,fontSize:15}}>
                        Số lượng:
                    </Text>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:10,fontSize:15}}>
                        Tổng tiền:
                    </Text>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:15,fontSize:15}}>
                        Chiết khấu:
                    </Text>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:15,fontSize:15}}>
                        Chi phí giao hàng:
                    </Text>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"40%",alignItems:"flex-end"}}>
                    <Text style={{paddingRight:20,fontSize:15,marginTop:10}}>10</Text>
                    <Text style={{paddingRight:20,fontSize:15,marginTop:10}}>100</Text>
                    <TextInput style={style.styleTextInputTotal}></TextInput>
                    <TextInput style={style.styleTextInputTotal}></TextInput>
                    
                </View>
                
            </SafeAreaView>
            <SafeAreaView style={{backgroundColor:"#ffffff"}} >
                {/* <CheckBox
                    style={{alignItems:"flex-start",paddingLeft:15,marginTop:25,fontSize:15,width:"40%"}}
                    checkedIcon={<FontAwesomeIcon icon={faCheckCircle} size={18} />}
                    uncheckedIcon={<FontAwesomeIcon icon={faCircle} size={18}/>}
                    title='Kiểm hàng đã bán lẽ'
                    checked={true}
                />
                <CheckBox
                        style={{paddingRight:20,fontSize:15,marginTop:10,width:"40%"}}
                        checkedIcon={<FontAwesomeIcon icon={faCheckCircle} size={18} />}
                        uncheckedIcon={<FontAwesomeIcon icon={faCircle} size={18}/>}
                        title='cập nhật tồn thực tế'
                        checked={false}
                /> */}
                <FloatTextInputCpn
                    title = 'Ghi chú'
                    textInputStyles={style.inputStyle}
                    onChangeText={(e) => this.handleChange({brand:e})}
                ></FloatTextInputCpn>   
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
    paddingTop:10,
    paddingRight:50,
    paddingLeft:50,
    marginTop:20,
    marginLeft:30,
    marginRight:30,
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  styleSafeArea:{
    borderTopColor:"#A9A9A9",
    borderBottomColor:"#A9A9A9",
    borderWidth:1,
  },
  styleSafeAreaTotal:{
    flexDirection:"row",
    marginTop:10,
    borderTopColor:"#A9A9A9",
    borderBottomColor:"#A9A9A9",
    borderWidth:1,
    backgroundColor:"#ffffff",
    height:160
  },
  styleSafeAreaItem:{
    flexDirection:"row",
    backgroundColor:"#ffffff"
  },
  styleTextInputItem:{
      borderColor:"#A9A9A9",
      borderWidth:1,
      borderRadius:5,
      alignItems:"center",
      marginTop:12.5
  },
  styleTextInputTotal:{
    borderColor:"#A9A9A9",
    borderWidth:1,
    borderRadius:5,
    alignItems:"center",
    width:"80%",
    height:35,
    marginTop:10,
    marginRight:10,
    alignContent:"flex-end",
  },
  inputStyle:{
    borderBottomColor:"#A9A9A9",
    borderBottomWidth:1,
    margin:10,
    paddingTop:10,
    paddingBottom:1
  }
});
/* private style-end */
