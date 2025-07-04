import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import externalStyles from "../../CustomModules/generalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MultiSelect } from "react-native-element-dropdown";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

export default function FilterPopUp({ visible, setVisible, data,wallets }) {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const categories = [
    { id: 1, transType: "Food", emoji: "🍔" },
    { id: 2, transType: "Groceries", emoji: "🛒" },
    { id: 3, transType: "Bills & Membership", emoji: "💸" },
    { id: 4, transType: "Zinjoyi", emoji: "💃🏾" },
    { id: 5, transType: "Education", emoji: "📚" },
    { id: 6, transType: "Loans repayment", emoji: "💰" },
    { id: 7, transType: "Religious fees", emoji: "🛐" },
    { id: 8, transType: "others....", emoji: "🕳️" },
  ];
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      start: "",
      end: "",
      minPrice: "",
      maxPrice: "",
      selectedWallets: [],
      selectedCategories: [],
    },
  });
  const onSubmit = (data) => console.log(data);
  const start = watch("start");
  const end = watch("end");
  const applyFilter = () => {
    setVisible(false);
    handleSubmit(onSubmit)();
  };
  const cancelFilters = () => {
    reset();
    setVisible(false);
  };
  return (
    <Modal visible={visible} transparent={true}>
      <KeyboardAvoidingView
      keyboardVerticalOffset={-1000}
      behavior="padding" style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.popup}>
            <View style={styles.contentBox}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{paddingBottom:-100}}
                style={styles.content}
              >
                <View style={styles.bottomRow}>
                  <View style={styles.selectField}>
                    <Text style={styles.titles}>Wallets:</Text>
                    <Controller
                      control={control}
                      name="selectedWallets"
                      render={({ field }) => {
                        return (
                          <MultiSelect
                            selectedStyle={{ color: "gainsboro" }}
                            selectedTextStyle={{ color: "teal" }}
                            style={styles.dropdown}
                            data={wallets}
                            labelField="wName"
                            valueField="wName"
                            value={field.value}
                            onChange={(selected) => {
                              field.onChange(selected);
                            }}
                            renderItem={(item, selected) => {
                              return (
                                <View style={styles.dropdownItem}>
                                  <Text
                                    style={{
                                      backgroundColor: "#fff",
                                      width: "60%",
                                    }}
                                  >
                                    {item.wName}
                                  </Text>
                                  <Entypo
                                    style={{
                                      backgroundColor: "#fff",
                                      width: "40%",
                                    }}
                                    name={selected ? "check" : "cross"}
                                    size={15}
                                    color={selected ? "green" : "red"}
                                  />
                                </View>
                              );
                            }}
                          />
                        );
                      }}
                    />
                  </View>
                  <View style={styles.selectField}>
                    <Text style={styles.titles}>Categories:</Text>
                    <Controller
                      control={control}
                      name="selectedCategories"
                      render={({ field }) => {
                        return (
                          <MultiSelect
                            style={styles.dropdown}
                            data={categories}
                            labelField="transType"
                            valueField="transType"
                            value={field.value}
                            onChange={(selected) => {
                              field.onChange(selected);
                            }}
                            renderItem={(item, selected) => {
                              return (
                                <View style={styles.dropdownItem}>
                                  <Text
                                    style={{
                                      backgroundColor: "#fff",
                                      width: "60%",
                                    }}
                                  >
                                    {item.transType}
                                  </Text>
                                  <Entypo
                                    style={{
                                      backgroundColor: "#fff",
                                      width: "40%",
                                    }}
                                    name={selected ? "check" : "cross"}
                                    size={15}
                                    color={selected ? "green" : "red"}
                                  />
                                </View>
                              );
                            }}
                          />
                        );
                      }}
                    />
                  </View>
                </View>
                <View style={styles.dateRow}>
                  <View style={styles.dateField}>
                    <Text style={styles.titles}>Start Date</Text>
                    <Pressable onPress={() => setShowStartDatePicker(true)}>
                      {start ? (
                        <Text style={[styles.dateInput]}>
                          {start?.toDateString()}
                        </Text>
                      ) : (
                        <Text style={[styles.dateInput,{fontSize:12,color:"grey"}]}>Select a start Date</Text>
                      )}
                    </Pressable>
                    <Controller
                      name="start"
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            {showStartDatePicker && (
                              <DateTimePicker
                                value={field.value || new Date()}
                                mode="date"
                                maximumDate={end?end:new Date()}
                                display="default"
                                onChange={(event, selectedDate) => {
                                  if (selectedDate) {
                                    setShowStartDatePicker(false);
                                    field.onChange(selectedDate);
                                  }
                                }}
                              />
                            )}
                          </>
                        );
                      }}
                    />
                  </View>
                  <View style={styles.dateField}>
                    <Text style={styles.titles}>End Date</Text>
                    <Pressable onPress={() => setShowEndDatePicker(true)}>
                      {end ? (
                        <Text style={styles.dateInput}>
                          {end?.toDateString()}
                        </Text>
                      ) : (
                        <Text style={[styles.dateInput,{fontSize:12,color:"grey"}]}>Select an end Date</Text>
                      )}
                      <Controller
                        name="end"
                        control={control}
                        render={({ field }) => {
                          return (
                            <>
                              {showEndDatePicker && (
                                <DateTimePicker
                                  value={field.value || new Date()}
                                  mode="date"
                                  minimumDate={start ? start : null}
                                  maximumDate={new Date()}
                                  display="default"
                                  onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                      setShowEndDatePicker(false);
                                      field.onChange(selectedDate);
                                    }
                                  }}
                                />
                              )}
                            </>
                          );
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
                      render={({ field }) => {
                        return (
                          <TextInput
                            style={[externalStyles.input, styles.priceInput]}
                            keyboardType="number-pad"
                            value={field.value}
                             placeholder="0"
                            onChangeText={field.onChange}
                          />
                        );
                      }}
                    />
                  </View>
                  <View style={styles.priceField}>
                    <Text style={styles.titles}>Maximum amount</Text>
                    <Controller
                      control={control}
                      name="maxPrice"
                      render={({ field }) => {
                        return (
                          <TextInput
                            style={[externalStyles.input, styles.priceInput]}
                            keyboardType="number-pad"
                            value={field.value}
                            placeholder="0"
                            onChangeText={field.onChange}
                          />
                        );
                      }}
                    />
                  </View>
                </View>
                
                <View style={styles.buttonrow}>
                  <Pressable
                    onPress={cancelFilters}
                    style={[externalStyles.button, styles.button]}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    onPress={applyFilter}
                    style={[externalStyles.button, styles.button]}
                  >
                    <Text style={styles.buttonText}>Apply</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000042",
    flex: 1,
    justifyContent: "flex-end",
  },
  popup: {
    height: 650,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#e0fbfb",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 20,
  },
  contentBox: {
    margin: 5,
    alignItems: "center",
    flex: 1,
    width: "100%",
    paddingTop: 30,
    paddingBottom: 20,
  },
  content: {
    backgroundColor: "#fff",
    width: "95%",
    flex: 1,
    elevation: 4,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  button: {
    width: 110,
    height: 35,
    justifyContent: "center",
    marginBottom: 40,
    marginHorizontal: 10,
  },
  buttonrow: {
    justifyContent: "center",
    flexDirection: "row",
  },
  titles: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 6,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1.8,
    borderColor: "grey",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderBottomEndRadius: 3,
    borderBottomStartRadius: 3,
  },
  dateField: {
    padding: 10,
    marginHorizontal: 5,
  },
  dateInput: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderWidth: 0.8,
    borderRadius: 15,
    width: 120,
    height:31,
  },
  priceRangeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 6,
    
  },
  priceField: {
    marginHorizontal: 6,
    padding: 6,
  },
  priceInput: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 4,
    width: 120,
    height: 28,
    marginBottom: 10,
  },
  dropdown: {
    width: 200,
    borderWidth: 1,
    padding: 4,
    margin: 10,
  },
  bottomRow: {
    paddingVertical: 10,
    borderBottomWidth: 1.8,
    borderColor: "grey",
  },
  ddownField: {},
  dropdownItem: {
    paddingHorizontal: 5,
    paddingVertical: 4,
    flexDirection: "row",
    minHeight: 30,
    elevation: 2,
  },
});
