import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import externalStyles from "../../CustomModules/generalStyles";
import TextField from "./TextField";
import DropdownField from "./DropdownField";
import * as DateFns from "date-fns";
import { useState, useEffect, useContext } from "react";
import { WalletToWalletTrans } from "./DBtransaction";
import { RefreshFunctionContext } from "../../CustomModules/Contexts";
import { removeCommas } from "../../CustomModules/generalModules";

export default function Fw({ data, show, hide, setMessage }) {
  const { setRefreshKey } = useContext(RefreshFunctionContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
      extraFees: "",
      from: "",
      to: "",
    },
  });
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [filteredWallets, setFilteredWallets] = useState([]);

  useEffect(() => {
    const newW = selectedWallet
      ? data.filter((wallet) => wallet.walletId !== selectedWallet.walletId)
      : data;
    setFilteredWallets(newW);
  }, [selectedWallet]);

  const onError = (errors) => console.log("errors: ", errors);
  async function onSubmit(data) {
    const { amount, extraFees, from } = data;
    const totaltoDeduct = Number(removeCommas(amount)) + Number(removeCommas(extraFees));
    console.log(totaltoDeduct," is the total we want to deduct")
    if (totaltoDeduct < Number(from.balance)) {
      await WalletToWalletTrans(data);
      console.log(setRefreshKey);
      setRefreshKey((r) => r + 1);
      show("Success", "Transaction successfully logged!", true);
    } else {
      show(
        "Failed to log",
        `Amount to transact is greater than the balance available in ${from.wName} (MWK${from.balance}). Please cross-check your values.`,
        false
      );
    }
  }
  return (
    <View style={styles.container}>
      <TextField
        fieldName="amount"
        label="Amount (MWK)"
        number
        placeholder="the amount to transfer"
        ctrl={control}
        isRequired
        errors={errors}
      />
      <TextField
        fieldName="extraFees"
        label="Transaction Fees"
        ctrl={control}
        number
        placeholder="0"
        errors={errors}
      />
      <DropdownField
        fieldName="from"
        label="From"
        placeholder="Select a wallet"
        isRequired
        ctrl={control}
        errors={errors}
        data={filteredWallets}
        property="wName"
        setSelectedWallet={setSelectedWallet}
      />
      <DropdownField
        fieldName="to"
        label="To"
        placeholder="Select a wallet"
        isRequired
        property="wName"
        ctrl={control}
        errors={errors}
        data={filteredWallets}
        setSelectedWallet={setSelectedWallet}
      />
      <Pressable
        onPress={handleSubmit(onSubmit, onError)}
        style={[externalStyles.button, styles.button]}
      >
        <Text>Press me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#eefbfb",
    marginTop: 20,
    width: 310,
    paddingVertical: 20,
    borderWidth: 0.5,
    borderRadius: 20,
  },
  field: {
    width: 300,
    flexDirection: "row",
    //borderWidth:1,
    // backgroundColor:"yellow",
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  fieldName: {
    verticalAlign: "middle",
    textAlign: "right",
    width: "25%",
    paddingRight: 8,
  },
  input: {
    width: "75%",
    height: 40,
    paddingHorizontal: 5,
  },
  button: {
    width: 100,
    height: 45,
  },
  errorMessage: {
    color: "red",
    fontStyle: "italic",
    width: "100%",
    // borderWidth:1,
    textAlign: "center",
  },
  selectedItem: {
    backgroundColor: "yellow",
    width: 100,
  },
});
