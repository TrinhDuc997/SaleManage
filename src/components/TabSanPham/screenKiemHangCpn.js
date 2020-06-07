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
                      <Text style={{marginTop:10}}>Mã Phiếu Kiểm</Text>
                      <Text style={{marginTop:5}}>Ngày Tháng</Text>
                    </View>
                </View>
                <View
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"45%",alignItems:"flex-end"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text style={{marginTop:10}}>Trạng Thái</Text>
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

export default class screenKiemHangCpn extends Component {
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
    {key:"11",title:"Danh Sách Sản Phẩm",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"22",title:"Nhập Hàng",icon:faDollyFlatbed,handleView:this.funcThemSanPham},
    {key:"33",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.funcThemSanPham},
    {key:"14",title:"Danh Sách Sản Phẩm",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"25",title:"Nhập Hàng",icon:faDollyFlatbed,handleView:this.funcThemSanPham},
    {key:"36",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.funcThemSanPham},
    {key:"17",title:"Danh Sách Sản Phẩm",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"28",title:"Nhập Hàng",icon:faDollyFlatbed,handleView:this.funcThemSanPham},
    {key:"39",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.funcThemSanPham},
    {key:"12",title:"Danh Sách Sản Phẩm",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"21",title:"Nhập Hàng",icon:faDollyFlatbed,handleView:this.funcThemSanPham},
    {key:"32",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.funcThemSanPham},
    {key:"13",title:"Danh Sách Sản Phẩm",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"24",title:"Nhập Hàng",icon:faDollyFlatbed,handleView:this.funcThemSanPham},
    {key:"35",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.funcThemSanPham},
    {key:"16",title:"Danh Sách Sản Phẩm",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"27",title:"Nhập Hàng",icon:faDollyFlatbed,handleView:this.funcThemSanPham},
    {key:"38",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.funcThemSanPham},
    {key:"19",title:"Danh Sách Sản Phẩm",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"210",title:"Nhập Hàng",icon:faDollyFlatbed,handleView:this.funcThemSanPham},
    {key:"311",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.funcThemSanPham},
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
