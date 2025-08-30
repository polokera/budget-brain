import externalStyles from '../../CustomModules/generalStyles'
import {View,StyleSheet, Button} from 'react-native'
import ToggleBar from './ToggleBar'
import { useState,useEffect } from 'react'
import WtW from './WtW.js'
import Fw from './fw.js'
import Popup from '../../CustomModules/Popup.js'
export default function Transaction({route,navigation}){
    const {wallets} = route.params
    const [isVisible,setIsVisible] = useState(false)
    const [popUpMessage,setPopUpMessage] = useState(null);
    const [title,setTitle] = useState(null)
    const [success,setSuccess] = useState(false);

    const show =(title,message,success)=> {
        setPopUpMessage(message)
        setTitle(title)
        setSuccess(success)
        setIsVisible(true)
    }
    const hide =()=> {
        setPopUpMessage("")
        setIsVisible(false);
    }
    const goBackToHome=()=>{
       navigation.goBack()
    }
    useEffect(()=>{
        setIsVisible(false)
    },[])
    const [selectedScreen,setSelectedScreen] = useState("fWallet")
    return(
        
        <View style={externalStyles.main}>
            <Popup 
            visible={isVisible}
            hide={hide}
            message={popUpMessage}
            title={title}
            success={success}
            goBack={goBackToHome}
            />
            <View style={styles.container}>
                <ToggleBar selected={selectedScreen} toggleFn={setSelectedScreen} />
                {selectedScreen=="wtw"?
                <WtW 
                show={show} 
                data={wallets} 
                setMessage={setPopUpMessage} 
                />:
                <Fw 
                data={wallets} 
                show={show} 
                setMessage={setPopUpMessage} 
                />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        flex:1,
    }
})