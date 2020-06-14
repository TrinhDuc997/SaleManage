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
                <View style={{width:"20%"}}>
                    <Text style={{textAlign:"center",paddingTop:15}}>
                        <FontAwesomeIcon icon={item.icon} size={35} color="#696969"/>
                    </Text>
                </View>
                <View 
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"70%",justifyContent:"center"}}>
                    <Text style={{paddingLeft:20,fontSize:18}}>{item.title}</Text>
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

export default class TabSanPhamCpn extends Component {
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
                <Text style={{fontSize:24,fontWeight:"bold",paddingBottom:15}}>Thêm Sản Phẩm</Text>
            </TouchableOpacity>
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
    backgroundColor:"#ffffff"
  }
});
/* private style-end */
