import React,{Component} from 'react'
import {View, Text,SafeAreaView,ScrollView,StyleSheet} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import FloatTextInputCpn from '../../common/FloatTextInputCpn'


/* private func-start */

/* private func-end */

export default class TabThemSanPhamCpn extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <SafeAreaView>
                <ScrollView>
                    <SafeAreaView style={style.container} >
                        <FloatTextInputCpn
                            title = 'Tên Sản Phẩm'
                            textInputStyles={style.inputStyle}
                        ></FloatTextInputCpn>
                        <FloatTextInputCpn
                            title = 'Mã Sản Phẩm'
                            textInputStyles={style.inputStyle}
                        ></FloatTextInputCpn>
                        <FloatTextInputCpn
                            title = 'Mô Tả'
                            textInputStyles={style.inputStyle}
                        ></FloatTextInputCpn>
                        <SafeAreaView style={{flexDirection:"row"}}>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    keyboardType="decimal-pad"
                                    title = 'Giá Bán Lẽ'
                                    textInputStyles={style.inputStyle}
                                ></FloatTextInputCpn>
                            </View>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    title = 'Giá Bán Buôn'
                                    keyboardType="decimal-pad"
                                    textInputStyles={style.inputStyle}
                                ></FloatTextInputCpn>
                            </View>
                        </SafeAreaView>
                        <FloatTextInputCpn
                            keyboardType="decimal-pad"
                            title = 'Giá Nhập'
                            textInputStyles={style.inputStyle}
                        ></FloatTextInputCpn>
                        <FloatTextInputCpn
                            title = 'Đơn Vị Tính'
                            textInputStyles={style.inputStyle}
                        ></FloatTextInputCpn>
                        <SafeAreaView style={{flexDirection:"row"}}>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    keyboardType="decimal-pad"
                                    title = 'Khối Lượng'
                                    textInputStyles={style.inputStyle}
                                ></FloatTextInputCpn>
                            </View>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    title = 'Đơn Vị'
                                    keyboardType="decimal-pad"
                                    textInputStyles={style.inputStyle}
                                ></FloatTextInputCpn>
                            </View>
                        </SafeAreaView>
                        <SafeAreaView style={{flexDirection:"row"}}>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    title = 'Loại Sản Phẩm'
                                    textInputStyles={style.inputStyle}
                                ></FloatTextInputCpn>
                            </View>
                            <View style={{width:"50%"}}>
                                <FloatTextInputCpn
                                    title = 'Nhãn Hiệu'
                                    textInputStyles={style.inputStyle}
                                ></FloatTextInputCpn>
                            </View>
                        </SafeAreaView>
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