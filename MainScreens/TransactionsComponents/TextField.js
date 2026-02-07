import {View,Text,StyleSheet, TextInput, Pressable} from "react-native"
import { useForm,Controller } from "react-hook-form"
import externalStyles from '../../CustomModules/generalStyles'
import { AddComas, removeCommas } from "../../CustomModules/generalModules";

export default function TextField({fieldName,placeholder,ctrl,numberOfLines,number,isRequired,maxLength,label,errors}){
    const numberRegex = ``;
    const getRules = ()=>{
        let rules = {};
        if(isRequired){
            rules ={...rules,required:`${fieldName} is required`}
        }
        if(maxLength){
            rules={...rules,maxLength:{value:maxLength,message:`${fieldName} should be less than ${maxLength+1} characters`}}
        }
        if(number){
            rules={...rules,
                validate:(value)=>{
                    if(!value) return true;

                    const cleanValue = removeCommas(value)

                    const isValid = /^\d+(\.\d+)?$/.test(cleanValue)
                    return isValid || `${label} must be a valid number`
                }
            }
            
                // pattern:{value:/^\d+(\.\d+)?$/,message:`${label} must be a number`}}
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
                        <TextInput 
                        value={number?AddComas(field.value)??"":field.value}
                        keyboardType={number?"number-pad":"default"}
                        onChangeText={field.onChange}               
                        placeholder={placeholder}
                        multiline={numberOfLines?true:false}
                        numberOfLines={numberOfLines?numberOfLines:1}
                        style={[externalStyles.input,styles.input,{height:numberOfLines&&100,textAlignVertical:"top"}]}
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
        // height:40,
        paddingHorizontal:10,
    },
    errorMessage:{
        color:"red",
        fontStyle:"italic",
        width:"100%",
        // borderWidth:1,
        textAlign:"center",
    },
})