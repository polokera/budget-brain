import {View,Text,StyleSheet} from "react-native"
import { useForm,Controller } from "react-hook-form"
import externalStyles from '../../CustomModules/generalStyles'
import SelectDropdown from "react-native-select-dropdown";

export default function DropdownField({fieldName,placeholder,ctrl,isRequired,maxLength,label,errors,data,setSelectedWallet,property}){
    const getRules = ()=>{
        let rules = {};
        if(isRequired){
            rules ={...rules,required:`${fieldName} is required`}
        }
        if(maxLength){
            rules={...rules,maxLength:{value:maxLength,message:`${fieldName} should be less than ${maxLength+1} characters`}}
        }
        return rules;
    }
    return(
        <View style={{width:305}}>
            <View style={styles.field}>
                <Text style={styles.fieldName}>{label}: </Text>
                <Controller
                control={ctrl}
                name={fieldName}
                rules={getRules()}
                render={({field})=>{
                    return(
                        <SelectDropdown
                        data={data}
                        onSelect={(selected)=>{
                            field.onChange(selected)
                            setSelectedWallet&&setSelectedWallet(selected)
                        }}
                        renderButton={(selectedItem,isOpened)=>{
                            return(
                                <View style={[styles.input,externalStyles.input]}>
                                    <Text style={{verticalAlign:"middle",height:"100%"}}>{field.value?field.value[property]:placeholder}</Text>
                                </View>
                            )
                        }}
                        dropdownStyle={{marginTop:-30,borderRadius:9}}
                        renderItem={(item,_,isSelected)=>{
                            return(
                                <View style={styles.dropdownContainer}>
                                    <Text style={{color:isSelected?"teal":"black"}}>{item[property]}</Text>
                                </View>
                            )
                        }}
                        />
                    )
                }}
                />
            </View>
        {errors[fieldName]&&<Text style={styles.errorMessage}>{errors[fieldName].message}</Text>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    field:{
        width:300,
        flexDirection:"row",
        //borderWidth:1,
        // backgroundColor:"yesllow",
        paddingVertical:5,
        paddingHorizontal:6,
    },
    fieldName:{
        verticalAlign:"middle",
        textAlign:"right",
        width:"25%",
        paddingRight:8,
    },
    input:{
        width:"75%",
        height:40,
        paddingHorizontal:5,
    },
    errorMessage:{
        color:"red",
        fontStyle:"italic",
        width:"100%",
        // borderWidth:1,
        textAlign:"center",
    },
    dropdownContainer:{
        // marginTop:-30,
        paddingVertical:9,
        borderRadius:8,
        height:35,
        paddingHorizontal:10,
    }
})