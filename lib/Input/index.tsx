import React from 'react'

import { View , TextInput, Text , StyleSheet } from 'react-native' 

interface Iprops{
    title ?: string
    changeVals ?:(v:any) => void
}

class BaseInput extends React.Component<Iprops>{


    render(){
        return (
            <View style={styles.center_box}>
                <View style={styles.base_text}><Text style={styles.title}>{this.props.title}</Text></View>
                <View style={styles.base_ipt}><TextInput style={styles.ipt} onChangeText={this.changeVals}/></View>
            </View>    
        )
    }

    changeVals = (e) =>{
        this.props.changeVals(e)
    }
}

const styles = StyleSheet.create({
    center_box:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection:'row'
    },
    base_ipt:{
        borderColor:"#fef",
        height:30,
        marginLeft:10,
        marginRight:16,
        flex:1,
    },
    base_text:{
        height:30,
        marginLeft:16,
    },
    ipt:{
        borderColor:"#Fa0",
        borderBottomWidth:1,
        height:30,
        paddingLeft:10,
    },
    title:{
        lineHeight:30,
    }
})

export default BaseInput