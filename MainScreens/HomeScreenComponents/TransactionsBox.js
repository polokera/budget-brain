import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import * as Datefns from "date-fns";
import { AddComas,fixTimes,fixDates } from "../../CustomModules/generalModules";

export default function TransactionBox({ item,onPress }) {
  const [dateToShow, setDateToShow] = useState(null);
  const [timeToShow, setTimeToShow] = useState(null);
  const [amountToShow, setAmountToShow] = useState(null);
  
  const fixAmounts = () => {
    const cleanAmount = AddComas(item.amount);
    setAmountToShow(cleanAmount);
  };
  useEffect(() => {
    const newDate = fixDates(item.transDate);
    setDateToShow(newDate)
    const newTime = fixTimes(item.transTime,item.transDate);
    setTimeToShow(newTime)
    fixAmounts();
  }, []);
  return (
    <Pressable onPress={onPress}>
      <View style={styles.transaction}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.transTitle}>
            <Text style={{ color: item.themeColor, fontSize: 15 }}>● </Text>
            {item.transType}
          </Text>
          <Text style={styles.transDate}>{dateToShow}</Text>
        </View>
        <View style={styles.transactionBottom}>
          {amountToShow ? (
            <Text
              style={[
                styles.transactionAmount,
                { color: item.transSign == -1 ? "red" : "green" },
              ]}
            >
              {item.transSign == -1 && "-"} MWK {amountToShow}
            </Text>
          ) : (
            <Text style={[styles.transactionAmount]}>No cost</Text>
          )}
          <Text style={styles.transactionTime}>{timeToShow}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  transaction: {
    flexDirection: "column",
    backgroundColor: "#bdffff",
    paddingVertical: 8,
    paddingHorizontal: 7,
    width: 250,
    marginHorizontal: 7,
    marginVertical: 5,
    borderRadius: 10,
    height: 83,
    elevation: 4,
  },
  transactionBottom: {
    flexDirection: "row",
    marginTop: 15,
    // borderWidth:1,
  },
  transactionAmount: {
    marginHorizontal: 5,
    width: 100,
    fontSize: 14,
    // borderWidth: 1,
  },
  transactionTime: {
    marginHorizontal: 5,
    width: 120,
    textAlign: "right",
    fontStyle: "italic",
    fontSize: 12,
    //borderWidth:1,
  },
  transDate: {
    textAlign: "right",
    verticalAlign: "middle",
    // borderWidth:1,
    width: 100,
    fontStyle: "italic",
    fontSize: 11,
    color: "#838282",
  },
  transTitle: {
    fontWeight: "bold",
    fontSize: 16,
    // borderWidth: 1,
    width: 130,
  },
});
