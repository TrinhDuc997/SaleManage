import React, { Component } from 'react'
import { View, Animated, StyleSheet, TextInput } from 'react-native';

/* private func-start */

/* private func-end */

export default class FloatTextInputCpn extends Component{
    constructor(props){
        super(props)
        const { value } = this.props
        this.position = new Animated.Value(value ? 1 : 0)
        this.state = {
            isFieldActive:false
        }
    }
    
    handleFocus = () => {
        if(!this.state.isFieldActive){
            this.setState({isFieldActive:true})
            Animated.timing(this.position,{toValue:1,duration:150,useNativeDriver: false}).start()
        }
    }

    handleBlur = () => {
        if(this.state.isFieldActive && !this.props.value){
            this.setState({isFieldActive:false})
            Animated.timing(this.position,{toValue:0,duration:150,useNativeDriver: false}).start()
        }
    }
    returnAnimatedTitleStyles = () => {
        const { isFieldActive } = this.state;
        const {
          titleActiveColor='#0076ff', titleInactiveColor="dimgrey"/*, titleActiveSize=11.5, titleInActiveSize=15*/
        } = this.props;
      
        return {
          top: this.position.interpolate({
            inputRange: [0, 1],
            outputRange: [25, 0],
          }),
          color: isFieldActive ? titleActiveColor : titleInactiveColor,
        }
      }
    render(){
        return(
            <View style={this.props.viewStyle}>
                <Animated.Text
                    useNativeDriver={false}
                    style={[style.titleStyle,this.returnAnimatedTitleStyles()]}
                >
                    {this.props.title}
                </Animated.Text>
                <TextInput
                    value={this.props.value}
                    style={this.props.textInputStyles}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChangeText={this.props.onChangeText}
                    keyboardType={this.props.keyboardType}
                    {...this.props.otherTextInputProps}
                />
            </View>
        )
    }
}

/* private style-start */
const style = StyleSheet.create({
    titleStyle:{
        position:"absolute",
        marginLeft:10
    }
   })
 /* private style-end */