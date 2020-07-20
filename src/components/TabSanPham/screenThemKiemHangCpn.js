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
        data={},
        handleChangeItem
    } = param
    const {
        item={}
    } = data
    return(
        <SafeAreaView
            style={style.styleSafeAreaItem}
            // onPress= { () => item.handleView(item.key)}
            >
            <View style={{width:"5%"}}>
            </View>
            <View 
            style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"30%",justifyContent:"center"}}>
                <Text style={{paddingLeft:20,fontSize:18}}>{item.productName}</Text>
                <Text style={{paddingLeft:20,fontSize:18}}>{item.productCode}</Text>
            </View>
            <View
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"30%",paddingTop:10}}
            >
                <Text style={{paddingLeft:10,fontSize:18}}>{item.quantity}</Text>
                <Text style={{paddingLeft:10,fontSize:18}}>{(!!item.differentQty) && item.differentQty|| 0}</Text>
            </View>
            <View style={{width:"30%",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,}}>
                <TextInput style={style.styleTextInputItem}
                keyboardType="decimal-pad"
                onChangeText={(e) => {
                    handleChangeItem({
                        importQty:e,
                        productCode:item.productCode
                    })
                }}  
                ></TextInput>
            </View>
            <View style={{width:"5%"}}>
            </View>
        </SafeAreaView>
    )
}
    
/* private func-end */

export default class screenThemKiemHangCpn extends Component {
  constructor(props) {
    super(props);
    this.state={
        check:1
    }
  }
    
  funcChomSanPham = () => {
    const {navigation} = this.props
    navigation.navigate("danhSachSanPham",{
        fromCheckProduct:true
    })
  }
  handleChangeItem = (item) => {
    let {dataProducts=[]} = this.props.route.params || {}
    dataProducts.forEach((i,index) => {
        if(i.productCode === item.productCode){
            dataProducts[index] = {...i,importQty:item.importQty,differentQty:((!!item.importQty) && (item.importQty - i.quantity) || 0)}
        }
    })
    const {navigation} = this.props
    const {setParams} = navigation
    setParams({
        dataProducts,
        ...this.state
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
    handleChange = (param) => {
        const {navigation} = this.props
        const {setParams} = navigation
        const newState = {...this.state,...param}
        setParams({
            ...newState
        })
        this.setState({
            ...param
        })
      }
  render() {    
      
    const {dataProducts=[],fromImportProduct=false} = this.props.route.params || {}
    const {check = 1} = this.state
    let totalQty = 0,currentTotal = 0,total=0
    dataProducts.forEach(item => {
      totalQty += (parseFloat(item.quantity || 0))
      currentTotal += (parseFloat(item.importQty || 0))
      total += (item.differentQty || 0)
    })
    return (
        <ScrollView style={style.container}>
            {(dataProducts.length === 0)
            &&<TouchableOpacity
                style={style.styleTouchable}
                onPress = {() => {this.funcChomSanPham()}}
            >
                <Text style={{paddingBottom:15}}>
                    <FontAwesomeIcon icon={faPlusCircle} size={40} color={"#006abe"} />
                </Text>
                <Text style={{fontSize:20,fontWeight:"bold",paddingBottom:15}}>Chọn Sản Phẩm</Text>
            </TouchableOpacity>
            ||<TouchableOpacity
                style={style.styleTouchable}
                onPress = {() => {this.funcChomSanPham()}}
                >
                <Text style={{fontSize:24,fontWeight:"bold",paddingBottom:15}}>Chọn Lại Sản Phẩm</Text>
                </TouchableOpacity>
            }
            {(dataProducts.length>0)&&<SafeAreaView style={style.styleSafeArea}>
                <FlatList
                    data={dataProducts}
                    renderItem={(data) => <Item param={{data,handleChangeItem:this.handleChangeItem}}></Item>}
                    keyExtractor={item => item.key}
                />
            </SafeAreaView>}
            <SafeAreaView style={style.styleSafeAreaTotal}>
                <View style={{width:"60%"}}>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:15,fontSize:15}}>
                        Số lượng thực tế:
                    </Text>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:10,fontSize:15}}>
                        Số lượng tồn kho:
                    </Text>
                    <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:15,fontSize:15}}>
                        Số lượng chênh lệch:
                    </Text>
                    {/* <Text style={{alignItems:"flex-start",paddingLeft:15,marginTop:15,fontSize:15}}>
                        Chi Phí Tiền Hàng:
                    </Text> */}
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"40%",alignItems:"flex-end"}}>
                    <Text style={{paddingRight:20,fontSize:15,marginTop:10}}>{currentTotal}</Text>
                    <Text style={{paddingRight:20,fontSize:15,marginTop:10}}>{totalQty}</Text>
                    <Text style={{paddingRight:20,fontSize:15,marginTop:10}}>{total}</Text>
                    {/* <TextInput style={style.styleTextInputTotal}></TextInput> */}
                    
                </View>
                
            </SafeAreaView>
            <SafeAreaView style={{backgroundColor:"#ffffff"}} >
                <CheckBox
                    style={{alignItems:"flex-start",paddingLeft:15,marginTop:25,fontSize:15,width:"40%"}}
                    checkedIcon={<FontAwesomeIcon icon={faCheckCircle} size={18} />}
                    uncheckedIcon={<FontAwesomeIcon icon={faCircle} size={18}/>}
                    title='Kiểm hàng đã bán lẽ'
                    checked={check === 1}
                    onPress = { () => {
                        this.handleChange({check:1})
                    }}
                />
                <CheckBox
                        style={{paddingRight:20,fontSize:15,marginTop:10,width:"40%"}}
                        checkedIcon={<FontAwesomeIcon icon={faCheckCircle} size={18} />}
                        uncheckedIcon={<FontAwesomeIcon icon={faCircle} size={18}/>}
                        title='cập nhật tồn thực tế'
                        checked={check === 0}
                        onPress = { () => {
                            this.handleChange({check:0})
                        }}
                />
                <FloatTextInputCpn
                    title = 'Ghi chú'
                    textInputStyles={style.inputStyle}
                    onChangeText={(e) => this.handleChange({note:e})}
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
    height:120
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
