import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { useEffect, useState, useCallback, useContext } from "react";
import openMyDatabase from "../../CustomModules/DbModule";
import AsyncStorage from "@react-native-async-storage/async-storage";
import generalStyles from "../../CustomModules/generalStyles";
import HomeScreenStyles from "./HomeScreenStyles";
import ProgressBox from "./ProgressBox";
import CashTotalBox from "./CashTotalBox";
import TransactionBox from "./TransactionsBox";
import Fab from "./FAB";
import {
  getCashTotal,
  getHomeScreenDetails,
  getSpentinWeek,
  getWallets,
  getWeeklyTarget,
  Test,
} from "../../CustomModules/HomeScreenDbModules";
import { RefreshFunctionContext } from "../../CustomModules/Contexts";
import TransPopUp from "./TransPopUp";

export default function HomeScreen({ navigation }) {
  const { refreshKey } = useContext(RefreshFunctionContext);
  const [transes, setTranses] = useState(null);
  const [wallets, setWallets] = useState(null);
  const [userName, setUserName] = useState(null);
  const [cashTotal, setCashTotal] = useState(null);
  const [weeklyGoal, setWeeklyGoal] = useState(null);
  const [spentThisWeek, setSpentThisWeek] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transPopUpVisible, setTransPopUpVisible] = useState(false);
  const [selectedTrans,setSelectedTrans] = useState(null)
  const openPopUp = (item) => {
    setSelectedTrans(item);
    setTransPopUpVisible(true);
  };

  const getUserName = async () => {
    try {
      const UserName = await AsyncStorage.getItem("userName");
      setUserName(UserName);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteDb = async () => {
    const dbx = await openMyDatabase();
    // const result = await dbx.runAsync(`DELETE from weeks`);
    // const result1 = await dbx.runAsync(`DELETE from wallets`);
    const result2 = await dbx.runAsync(`DELETE from transactions`);
    if (result2.changes > 0) {
      console.log("all 3 tables deleted");
    } else {
      console.log("gaza");
    }
  };
  const getHomeScreenDeets = async () => {
    await getUserName();
    const total = await getCashTotal();
    setCashTotal(total);
    let maTrans = await getHomeScreenDetails();
    setTranses(maTrans);
    const trgt = await getWeeklyTarget();
    setWeeklyGoal(trgt);
    const spent = await getSpentinWeek();
    setSpentThisWeek(spent);
    const wallets = await getWallets();
    setWallets(wallets);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getHomeScreenDeets();
      setIsLoading(false);
    };
    fetchData();
  }, [refreshKey]);
  useEffect(() => {
    return () => {
      // deleteDb();
    };
  }, []);

  const getWidth = () => {
    return Dimensions.get("window").width * 0.83;
  };
  if (isLoading) {
    return (
      <View style={generalStyles.main}>
        <Text>Loading loading</Text>
      </View>
    );
  }
  const goToTransactionPage = () => {
    navigation.navigate("Transaction", {
      wallets,
    });
  };
  const goToTroubleShootingPage=()=>{
     navigation.navigate("Troubleshooting");
  }
  return (
    <View style={[generalStyles.main, {  alignItems: "center" }]}>
      <Fab goToNext={goToTransactionPage} />
      <TransPopUp
        visible={transPopUpVisible}
        setVisible={setTransPopUpVisible}
        data={selectedTrans}
      />
      <View style={styles.container}>
        <View style={styles.welcomeMsg}>
          <Text style={styles.welcomeMsgText}>Hello, {userName}</Text>
        </View>
        <FlatList
          ListFooterComponent={() => {
            return (
              <View
                style={[
                  styles.transactionBox,
                  HomeScreenStyles.boxes,
                  { width: getWidth() },
                ]}
              >
                <Text style={HomeScreenStyles.boxTitle}>
                  Recent Transactionss
                </Text>
                {transes == null || transes.length == 0 ? (
                  <Text style={{ color: "grey" }}>
                    No transactions to show!
                  </Text>
                ) : (
                  transes.map((item) => {
                    return (
                      <TransactionBox
                        key={item.transId}
                        item={item}
                        onPress={() => openPopUp(item)}
                      />
                    );
                  })
                )}
                {transes.length == 3 && (
                  <Pressable
                    style={styles.viewHistoryButton}
                    onPress={() => navigation.navigate("TransHistory",{
                      wallets
                    })}
                  >
                    <Text style={styles.viewHistoryButton}>
                      ...View full History
                    </Text>
                  </Pressable>
                )}
              </View>
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View>
                <Pressable onLongPress={goToTroubleShootingPage}>
                  <CashTotalBox cashTtl={cashTotal} />
                </Pressable>
                
                <ProgressBox goal={weeklyGoal} spent={spentThisWeek} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    width: "98%",
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeMsg: {
    minWidth: 100,
    height: 60,
    marginTop: -13,
    justifyContent: "center",
    alignItems: "flex-start",
    //borderWidth:1,
  },
  welcomeMsgText: {
    fontSize: 24,
  },
  progressBox: {
    backgroundColor: "#bdffff",
    height: 170,
    width: 320,
  },
  transactionBox: {
    backgroundColor: "#fEEEEE",
    minHeight: 250,
    alignItems: "center",
    // width:320,
    paddingBottom: 20,
  },
  viewHistoryButton: {
    width: "91%",
    textAlign: "right",
    marginVertical: 6,
  },
  viewHistoryText: {
    color: "#034949",
    textAlign: "right",
  },
});
