import {View,StyleSheet,Text,StatusBar,Button, Pressable,FlatList} from 'react-native'

export default function WelcomeScreen({navigation,route}){
    const {wallets} = route.params
    return(
        <View style={styles.main}>
            <View style={styles.container}>
                <FlatList
                data={wallets}
                renderItem={({item})=>{
                    return(
                        <View key={item.id}>
                            <Text>{item.wName}</Text>
                        </View>
                    )
                }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:"#fff5e0",
        flex:1,
    },
    container:{
        marginTop:10,
        alignItems:"center",
        flex:1,
    },

})