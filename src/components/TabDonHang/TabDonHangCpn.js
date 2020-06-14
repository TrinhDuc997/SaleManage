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
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"30%"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text>Mã Đơn Hàng</Text>
                      <Text>Khách Hàng</Text>
                    </View>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"30%"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text></Text>
                      <Text>Ngày Tạo</Text>
                    </View>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"30%",alignItems:"flex-end"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text >Giá Trị Hóa Đơn</Text>
                      <Text >Trạng Thái</Text>
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

export default class TabDonHangCpn extends Component {
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
    {key:"31",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.handleView},
    {key:"32",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.handleView},
    {key:"33",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.handleView},
    {key:"34",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.handleView},
    {key:"35",title:"Kiểm Hàng",icon:faCheckSquare,handleView:this.handleView},

    ]
  render() {
    return (
        <SafeAreaView style={style.container}>
            <TouchableOpacity
                style={style.styleTouchable}
                onPress = { () => {this.funcThemSanPham()}}
            >
                <Text style={{paddingBottom:15}}>
                    <FontAwesomeIcon icon={faPlusCircle} size={50} color={"#006abe"} />
                </Text>
                <Text style={{fontSize:24,fontWeight:"bold",paddingBottom:15}}>Thêm Đơn Hàng</Text>
            </TouchableOpacity>
            
            <SafeAreaView style={style.styleSafeArea}>
            <Text style={{fontSize:22,backgroundColor:"#ffffff",padding:15}}>Danh Sách Hóa Đơn</Text>
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
    borderWidth:1,
    maxHeight:300
  },
  styleTouchableItem:{
    flexDirection:"row",
    height:60,
    backgroundColor:"#ffffff",
    paddingLeft:30,
    paddingRight:20,
    paddingTop:10
  },
});
/* private style-end */
