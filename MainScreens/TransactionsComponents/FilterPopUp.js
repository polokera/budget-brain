import {View,Text,StyleSheet,Modal, Pressable, ScrollView, TextInput} from "react-native"
import { AddComas } from "../../CustomModules/generalModules"
import { useForm,Controller } from "react-hook-form"
import externalStyles from '../../CustomModules/generalStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from "react"

export default function FilterPopUp({visible,setVisible}){
    const [showStartDatePicker,setShowStartDatePicker] = useState(false)
    const [showEndDatePicker,setShowEndDatePicker] = useState(false)
    const {handleSubmit,control,formState:{errors},watch} = useForm({
        defaultValues:{
            start:"",
            end:"",
            minPrice:"",
            maxPrice:"",
        }
    })
    const onSubmit = data=>console.log(data)
    const start = watch("start")
    const end = watch("end")
    const minPrice = watch("minPrice")
    const maxPrice = watch("maxPrice")
    const buttonClick=()=>{
        setVisible(false)
        handleSubmit(onSubmit)()
    }
    return(
        <Modal 
        visible={visible}
        transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.popup}>
                    <View style={styles.contentBox}>
                        <View style={styles.content}>
                            <View style={styles.dateRow}>
                                <View style={styles.dateField}>
                                    <Text style={styles.titles}>Start Date</Text>
                                    <Pressable onPress={()=>setShowStartDatePicker(true)}>
                                        {start?<Text style={[styles.dateInput]}>{start?.toDateString()}</Text>:<Text>Select a start Date</Text>}
                                    </Pressable>
                                    <Controller
                                        name="start"
                                        control={control}
                                        render={({field})=>{
                                            return(
                                                <>
                                                {showStartDatePicker && <DateTimePicker
                                                value={field.value || new Date()}
                                                mode="date"
                                                maximumDate={new Date()}
                                                display="default"
                                                onChange={(event,selectedDate)=>{
                                                    if(selectedDate){
                                                        setShowStartDatePicker(false)
                                                        field.onChange(selectedDate)
                                                    }
                                                }}
                                                />}
                                                </>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={styles.dateField}>
                                    <Text style={styles.titles}>End Date</Text>
                                    <Pressable onPress={()=>setShowEndDatePicker(true)}>
                                        {end?<Text style={styles.dateInput}>{end?.toDateString()}</Text>:<Text>Select a start Date</Text>}
                                        <Controller
                                            name="end"
                                            control={control}
                                            render={({field})=>{
                                                return(
                                                    <>
                                                        {showEndDatePicker && 
                                                        <DateTimePicker
                                                        value={field.value || new Date()}
                                                        mode="date"
                                                        minimumDate={start??null}
                                                        maximumDate={new Date()}
                                                        display="default"
                                                        onChange={(event,selectedDate)=>{
                                                            if(selectedDate){
                                                                setShowEndDatePicker(false)
                                                                field.onChange(selectedDate)
                                                            }
                                                        }}
                                                        />}
                                                    </>
                                                
                                                )
                                            }}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={styles.priceRangeRow}>
                                <View style={styles.priceField}>
                                    <Text style={styles.titles}>Minimum amount</Text>
                                    <Controller
                                    control={control}
                                    name="minPrice"
                                    render={({field})=>{
                                       return( 
                                       <TextInput
                                        style={[externalStyles.input,styles.priceInput]}
                                        keyboardType="number-pad"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        />
                                    )
                                    }}
                                    />
                                </View>
                                <View style={styles.priceField}>
                                    <Text style={styles.titles}>Maximum amount</Text>
                                    <Controller
                                    control={control}
                                    name="maxPrice"
                                    render={({field})=>{
                                       return( 
                                       <TextInput
                                        style={[externalStyles.input,styles.priceInput]}
                                        keyboardType="number-pad"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        />
                                    )
                                    }}
                                    />
                                </View>
                            </View>                                              
                            <View style={{alignItems:"center"}}>
                                <Pressable
                                onPress={buttonClick}
                                style={[externalStyles.button,styles.button]} >
                                    <Text style={externalStyles.buttonText}>Apply</Text>
                                </Pressable>   
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#00000042",
        flex:1,
        justifyContent:"flex-end",
    },
    popup:{
        height:600,
        width:"100%",
        alignItems:"center",
        backgroundColor:"#e0fbfb",
        borderTopEndRadius:30,
        borderTopStartRadius:30,
        paddingHorizontal:20,
    },
    contentBox:{
        margin:5,
        alignItems:"center",
        flex:1,
        width:"100%",
        paddingTop:30,
    },
    content:{
        backgroundColor:"#fff",
        width:"95%",
        flex:1,
        elevation:4,
        borderRadius:10,
        paddingHorizontal:10,
        paddingTop:10,
    },
    button:{
        width:140,
        height:55,
        justifyContent:"center",
    },
    titles:{
        fontSize:15,
        fontWeight:"bold",
        marginVertical:6,
    },
    dateRow:{
        flexDirection:"row",
        justifyContent:"center",
        borderBottomWidth:1.8,
        borderColor:"grey",
        borderBottomLeftRadius:3,
        borderBottomRightRadius:3,
        borderBottomEndRadius:3,
        borderBottomStartRadius:3,
    },
    dateField:{
        padding:10,
        marginHorizontal:5,
    },
    dateInput:{
        backgroundColor:"#fff",
        paddingVertical:5,
        paddingHorizontal:4,
        borderWidth:0.8,
        borderRadius:15,
        width:120,
    },
    priceRangeRow:{
        flexDirection:"row",
        justifyContent:"center",
        marginVertical:6,
        borderBottomWidth:1.8,
        borderColor:"grey",
        borderBottomLeftRadius:3,
        borderBottomRightRadius:3,
        borderBottomEndRadius:3,
        borderBottomStartRadius:3,
    },
    priceField:{
        marginHorizontal:6,
        padding:6,
    },
    priceInput:{ 
        backgroundColor:"#fff",
        paddingVertical:5,
        paddingHorizontal:4,
        width:120,
        height:28,
        marginBottom:10,
    }

})