import {View,Text,StyleSheet,Image} from 'react-native'


export default function Theapp(){
    return(
        <View style={styles.container}>
            <Text>
                Budget brain was an idea I thought of  in mid 2024. 
                By then I didn't even know the first thing about mobile development. 
                I learnt mobile development just so I could come up with this app. 
                Down the line I found out that my idea was not so original and 
                quite frankly entry level and there were already market ready 
                solutions out there but I continued - for the plot. I also tried to 
                make it tailored to Malawian uni students as much as possible.
                    This project is my first and it has taken me over a year to complete. 
                    That sounds like alot of time. I do not have the best discipline 
                    or best time management . But also that was affected by the way 
                    I used AI to develop this. I can say 97% of the code of this app was written 
                    letter by letter space by space by me. While I could get stuck and ask 
                    AI what the problem was constantly, very rarely, if at all,
                    did I ever copy and paste blocks of code from AI. This would have 
                    been faster but ah not as fun lol. If you were to take a look at the 
                    code for this app you can confirm that this was indeed not written by
                    AI funny code, but it works and that's all that matters. The app has
                    a lot of features that are designed to make you, the user, manage your
                    money better or in the very least make you knowledgeable about your spending habits.
                    It's important to note that this is an app that makes use of the data given to it. 
                    The more data you give it the better insights it's going to give you and the 
                    more effective it is. If you don't use it enough you probably won't get the best
                    out of it. So try as much as possible to feed it the data it requires. 
                    For the tech stack I used react-native expo as the UI framework. For the 
                    database, I used expo-SQLite. This app is fully local and no backend was used.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

        padding:10,
    },
    text:{
        // borderWidth:1,
        width:170,
    },
    image:{
        width:100,
        height:100,
        marginRight:10,
        borderRadius:90,
    }
})