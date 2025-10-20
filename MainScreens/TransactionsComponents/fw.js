import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import externalStyles from '../../CustomModules/generalStyles';
import TextField from "./TextField";
import DropdownField from './DropdownField';
import { fromWalletTransaction } from "./DBtransaction";
import { RefreshFunctionContext } from "../../CustomModules/Contexts";
import { useContext } from "react";

export default function Fw({ data, show, hide, setMessage, goBack }) {
  const { setRefreshKey } = useContext(RefreshFunctionContext);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      transType: "",
      amount: "",
      extraFees: "",
      from: "",
      description: "",
    }
  });

  const categories = [
    { id: 1, transType: "Food", emoji: "🍔" },
    { id: 2, transType: "Groceries", emoji: "🛒" },
    { id: 3, transType: "Bills & Membership", emoji: "💸" },
    { id: 4, transType: "Zinjoyi", emoji: "💃🏾" },
    { id: 5, transType: "Education", emoji: "📚" },
    { id: 6, transType: "Loans repayment", emoji: "💰" },
    { id: 7, transType: "Religious fees", emoji: "🛐" },
    { id: 8, transType: "others....", emoji: "🕳️" }
  ];

  const onError = errors => console.log("errors: ", errors);

  async function onSubmit(data) {
    const { amount, extraFees, from } = data;
    const totaltoDeduct = Number(amount) + Number(extraFees);
    if (totaltoDeduct < Number(from.balance)) {
      await fromWalletTransaction(data);
      setRefreshKey(r => r + 1);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS==='ios'?80:0} 
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 40 ,flexGrow:1}}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <DropdownField
            errors={errors}
            fieldName="transType"
            label="Transaction Type"
            isRequired
            property="transType"
            data={categories}
            ctrl={control}
            placeholder="Select transaction type"
          />
          <TextField
            fieldName="amount"
            label="Amount (MWK)"
            number
            placeholder="0"
            ctrl={control}
            isRequired
            errors={errors}
          />
          <TextField
            fieldName="extraFees"
            label="Extra fees"
            ctrl={control}
            number
            placeholder="0"
            errors={errors}
          />
          <DropdownField
            fieldName="from"
            label="From "
            property="wName"
            placeholder="Select a wallet"
            isRequired
            ctrl={control}
            errors={errors}
            data={data}
          />
          <TextField
            fieldName="description"
            label="Description"
            ctrl={control}
            placeholder="(optional)"
            numberOfLines={4}
            errors={errors}
          />
          <Pressable
            onPress={handleSubmit(onSubmit, onError)}
            style={[externalStyles.button, styles.button]}
          >
            <Text>Press me</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  button: {
    width: 100,
    height: 45,
  }
});
