import React,{Component} from 'react'
import {View, Text,SafeAreaView,ScrollView,StyleSheet,Switch} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import FloatTextInputCpn from '../../common/FloatTextInputCpn'


/* private func-start */

/* private func-end */

export default class ThemNhaCungCapCpn extends Component{
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
                            title = 'Tên nhà cung cấp'
                            textInputStyles={style.inputStyle}
                            onChangeText={(e) => this.handleChange({productName:e})}
                            otherTextInputProps={{
                                defaultValue:dataProduct.productName
                            }}
                        ></FloatTextInputCpn>
                        <FloatTextInputCpn
                            title = 'Mã nhà cung cấp'
                            textInputStyles={style.inputStyle}
                            onChangeText={(e) => this.handleChange({productCode:e})}
                            otherTextInputProps={{
                                editable:!viewDetail,
                                defaultValue:dataProduct.productCode
                            }}
                        ></FloatTextInputCpn>
                        <FloatTextInputCpn
                            title = 'Địa chỉ'
                            textInputStyles={style.inputStyle}
                            onChangeText={(e) => this.handleChange({description:e})}
                            otherTextInputProps={{
                                defaultValue:dataProduct.description
                            }}
                        ></FloatTextInputCpn>
                        <FloatTextInputCpn
                            title = 'Số điện thoại'
                            keyboardType="decimal-pad"
                            textInputStyles={style.inputStyle}
                            onChangeText={(e) => this.handleChange({wholeSalePrice:e})}
                            otherTextInputProps={{
                                defaultValue:`${dataProduct.wholeSalePrice || ''}`
                            }}
                        ></FloatTextInputCpn> 
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