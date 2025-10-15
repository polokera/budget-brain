import {View,StyleSheet,Text, FlatList} from 'react-native'
import {useState} from 'react'

export default function TargetHistory(){
    const [history,setHistory] = useState([
        {weekStart:"21-05-2025",target:20000,spent:18000}
    ])
    return(
        <View style={styles.container}>
           <View style={styles.header}>
            <Text style={[{width:"22%"},styles.headerText]}>Week{'\n'}starting</Text>
            <Text style={[{width:"22%"},styles.headerText]}>Target {'\n'}(MWK)</Text>
            <Text style={[{width:"22%"},styles.headerText]}>Spent {'\n'}(MWK)</Text>
            <Text style={[{width:"22%"},styles.headerText]}>Saved during week</Text>
           </View>
           <FlatList
            data={history}
            renderItem={({item})=>{
                return(
                    <View key={item.weekStart} style={styles.record}>
                        <Text style={[{width:"22%"},styles.item]}>{item.weekStart}</Text>
                        <Text style={[{width:"22%"},styles.item]}>{item.target}</Text>
                        <Text style={[{width:"22%"},styles.item]}>{item.spent}</Text>
                        <Text>{item.target}</Text>
                        <Text style={[styles.item,{width:"22%",borderRightWidth:0}]}>{(item.target)-(item.spent)}</Text>
                    </View>
                )
            }}
           />
        </View>
    )
}

const styles= StyleSheet.create({
    header:{
        flexDirection:"row",
        justifyContent:"center",
        borderBottomWidth:0.7,
    },
    container:{
        padding:6,
    },
    headerText:{
        textAlign:"center",
        fontWeight:"bold",
    },
    record:{
        flexDirection:"row",
        backgroundColor:"#fdf5f4",
        height:40,
        marginVertical:10,
        justifyContent:"center",
        borderRadius:14,
        elevation:6,
        paddingVertical:6,
    },
    item:{
        textAlign:"center",
        verticalAlign:"middle",
        borderRightWidth:0.6,
        borderRightColor:"grey"
    }
})
