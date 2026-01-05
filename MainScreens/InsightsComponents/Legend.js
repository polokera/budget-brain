import {View,StyleSheet,Text} from 'react-native'


export default function Legend({categories}){
    return(
        <View style={styles.container}>
            {
                categories.map((category)=>{
                    return(
                        <View style={[styles.legend]} key={category.transId}>
                            <Text style={styles.walletName}>{category.text}</Text>
                            <View style={[{backgroundColor:category.color,},styles.legendColorBox]}/>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        flexWrap:"wrap",
        borderWidth:0.4,
        width:"95%",
        marginTop:15,
        backgroundColor:"#fff",
        elevation:3,
        borderRadius:4,
        padding:10,
        justifyContent:"center"
    },
    legend:{
        flexDirection:"row",
        margin:4,
    },
    legendColorBox:{
        width:25,
        height:25,
        marginHorizontal:6,
        elevation:5,
    },
    walletName:{
        fontWeight:"bold",
    }
})