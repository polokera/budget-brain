import { View, Text, StyleSheet, Image } from "react-native";

export default function Acknowledgements() {
  return (
    <View style={styles.container}>
      <Text>
        I'd like to thank God for guding me through this. I'd like to thank
        Trinity for encouraging me and letting me use her laptop for a good part
        of the development and for her presence in general. I'd like to thank
        all those who let me test this on their phones and stuff Chikopa, Wilma,
        ana anga Gabi ndi Dingi. I'd like to thank Tamanda also, who helped me
        to get started in this journey one of the hard
        parts of this process. I'd also like to thank all the people who allowed
        me to talk about this idea to them. The fact that you didn't tell me
        that my idea was bad helped keep going. Special shoutout to my older
        sister and Parents kwathu amandikonda, Sindingatchule nonse I love you
        all. osama
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    // borderWidth:1,
    width: 170,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 90,
  },
});
