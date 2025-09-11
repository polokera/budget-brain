import { StyleSheet,StatusBar } from "react-native";


export default StyleSheet.create({
    main: {
      backgroundColor: "#fff5e0",
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginTop: -10,
    },
    button: {
        backgroundColor: "#ee9e8e",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },
    buttonText: {
        fontSize: 20,
        verticalAlign: "middle",
      },
      list: {
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingVertical: 29,
        elevation: 3,
        borderRadius: 12,
        height: 450,
      },
      input:{
        borderRadius: 20,
        borderWidth: 0.4,
        //paddingHorizontal: 10,
        //marginVertical: 20,
        backgroundColor:"#fff"
      },
      screenHeader:{
        backgroundColor:"#fff",
        elevation:7,
        borderRadius:22.5,        
      },
})