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
                      <Text style={{marginTop:10}}>{item.maPK}</Text>
                      <Text style={{marginTop:5}}>{item.ngay}</Text>
                    </View>
                </View>
                <View
                style={{color:"#A9A9A9",borderBottomColor:"#DCDCDC",borderBottomWidth:0.9,width:"45%",alignItems:"flex-end"}}>
                    <View style={{flexDirection:"column"}}>
                      <Text style={{marginTop:10}}>{item.trangThai}</Text>
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
    {key:"MAPK001",maPK:'MAPK001',ngay:"08/06",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"MAPK002",maPK:'MAPK002',ngay:"08/06",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"MAPK003",maPK:'MAPK003',ngay:"08/06",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"MAPK004",maPK:'MAPK004',ngay:"08/06",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"MAPK005",maPK:'MAPK005',ngay:"08/06",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
    {key:"MAPK006",maPK:'MAPK006',ngay:"08/06",trangThai:"Hoàn Thành",icon:faListAlt,handleView:this.funcThemSanPham},
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
