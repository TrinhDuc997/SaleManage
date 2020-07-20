import React,{Component} from 'react'
import {View, Text,SafeAreaView,ScrollView,StyleSheet,Switch} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import FloatTextInputCpn from '../../common/FloatTextInputCpn'


/* private func-start */

/* private func-end */

export default class TabThemSanPhamCpn extends Component{
    constructor(props){
        super(props)
        const dataProduct = (this.props.route.params || {}).dataProduct || {}
        this.state = {
            ...dataProduct || {},
            isEnabled:!!dataProduct.status ? true : false
        }
    }
    handleChange = (param) => {
        const  { navigation } =  this.props
        const {setParams} = navigation
        setParams({
            ...param
        })
        this.setState({
            ...param
        })
    }
    componentDidMount(){
       const {dataProduct={},viewDetail} = this.props.route.params || {}
       const  { navigation } =  this.props
        const {setParams} = navigation
        if(!!viewDetail){
        setParams({
            ...dataProduct
            })
        }
    }
    render(){
        const { viewDetail=false,fromListProduct=false,dataProduct={}} = this.props.route.params || {}
        const { isEnabled} = this.state
        return(
            <SafeAreaView>
                <ScrollView>
                    <SafeAreaView style={style.container} >
                        <FloatTextInputCpn
                            title = 'Tên Sản Phẩm'
                            textInputStyles={style.inputStyle}
                            onChangeText={(e) => this.handleChange({productName:e})}
                            otherTextInputProps={{
                                defaultValue:dataProduct.productName
                            }}
                        ></FloatTextInputCpn>
                        <FloatTextInputCpn
                            title = 'Mã Sản Phẩm'
                            textInputStyles={style.inputStyle}
                            onChangeText={(e) => this.handleChange({productCode:e})}
                            otherTextInputProps={{
                                editable:!viewDetail,
                                defaultValue:dataProduct.productCode
                            }}
                        ></FloatTextInputCpn>
                        <FloatTextInputCpn
                            title = 'Mô Tả'
                            textInputStyles={style.inputStyle}
                            onChangeText={(e) => this.handleChange({description:e})}
                            otherTextInputProps={{
                                defaultValue:dataProduct.description
                            }}
                        ></FloatTextInputCpn>
                        <SafeAreaView style={{flexDirection:"row"}}>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    keyboardType="decimal-pad"
                                    title = 'Giá Bán Lẽ'
                                    textInputStyles={style.inputStyle}
                                    onChangeText={(e) => this.handleChange({retailPrice:e})}
                                    otherTextInputProps={{
                                        defaultValue:`${dataProduct.retailPrice || ''}`
                                    }}
                                ></FloatTextInputCpn>
                            </View>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    title = 'Giá Bán Buôn'
                                    keyboardType="decimal-pad"
                                    textInputStyles={style.inputStyle}
                                    onChangeText={(e) => this.handleChange({wholeSalePrice:e})}
                                    otherTextInputProps={{
                                        defaultValue:`${dataProduct.wholeSalePrice || ''}`
                                    }}
                                ></FloatTextInputCpn>
                            </View>
                        </SafeAreaView>
                        <FloatTextInputCpn
                            keyboardType="decimal-pad"
                            title = 'Giá Nhập'
                            textInputStyles={style.inputStyle}
                            onChangeText={(e) => this.handleChange({importPrice:e})}
                            otherTextInputProps={{
                                defaultValue:`${dataProduct.importPrice || ''}`
                            }}
                        ></FloatTextInputCpn>
                        <FloatTextInputCpn
                            title = 'Đơn Vị Tính'
                            textInputStyles={style.inputStyle}
                            onChangeText={(e) => this.handleChange({customUnit:e})}
                            otherTextInputProps={{
                                defaultValue:dataProduct.customUnit
                            }}
                        ></FloatTextInputCpn>
                        <SafeAreaView style={{flexDirection:"row"}}>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    keyboardType="decimal-pad"
                                    title = 'Khối Lượng'
                                    textInputStyles={style.inputStyle}
                                    onChangeText={(e) => this.handleChange({weight:e})}
                                    otherTextInputProps={{
                                        defaultValue:dataProduct.weight
                                    }}
                                ></FloatTextInputCpn>
                            </View>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    title = 'Đơn Vị'
                                    // keyboardType="decimal-pad"
                                    textInputStyles={style.inputStyle}
                                    onChangeText={(e) => this.handleChange({unit:e})}
                                    otherTextInputProps={{
                                        defaultValue:dataProduct.unit
                                    }}
                                ></FloatTextInputCpn>
                            </View>
                        </SafeAreaView>
                        <SafeAreaView style={{flexDirection:"row"}}>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    title = 'Loại Sản Phẩm'
                                    textInputStyles={style.inputStyle}
                                    onChangeText={(e) => this.handleChange({productType:e})}
                                    otherTextInputProps={{
                                        defaultValue:dataProduct.productType
                                    }}
                                ></FloatTextInputCpn>
                            </View>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    title = 'Nhãn Hiệu'
                                    textInputStyles={style.inputStyle}
                                    onChangeText={(e) => this.handleChange({brand:e})}
                                    otherTextInputProps={{
                                        defaultValue:dataProduct.brand
                                    }}
                                ></FloatTextInputCpn>
                            </View>
                        </SafeAreaView>
                        <FloatTextInputCpn
                            title = 'Tồn đầu'
                            keyboardType="decimal-pad"
                            textInputStyles={style.inputStyle}
                            onChangeText={(e) => this.handleChange({quantity:e})}
                            otherTextInputProps={{
                                defaultValue:`${dataProduct.quantity || '0'}`
                            }}
                            ></FloatTextInputCpn>
                            <View  style = {{...style.inputStyle,flexDirection:"row"}} >
                                <View  style={{width:"50%"}}>
                                    <Text>Giao Dịch:</Text>
                                </View>
                                <View style={{width:"50%"}}>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={(e) => this.handleChange({isEnabled:!isEnabled})}
                                        value={isEnabled}
                                    />
                                </View>
                            </View>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
/* private style-start */
const style = StyleSheet.create({
    container:{
        backgroundColor:"#ffffff",
      },
    inputStyle:{
         borderBottomColor:"#A9A9A9",
         borderBottomWidth:1,
         margin:10,
         paddingTop:10,
         paddingBottom:1
       }
    
   })
 /* private style-end */