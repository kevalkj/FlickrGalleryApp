import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Image
} from "react-native";

//import { Ionicons } from "@expo/vector-icons";

export default function WeightVerification() {
  const [modalVisible, setModalVisible] = useState(false);
  const [Button, setButton] = useState(false);

  const handleBookingIdChange = (bookingId: string | any[]) => {
    if (bookingId.length >= 6) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };
  const handleLotNumChange = (LotNum: string | any[]) => {
    if (LotNum.length >= 1) {
      setButton(true);
    } else {
      setButton(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backArrow}
        onPress={() => Alert.alert("Back button pressed")}
      >
        {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
        <Image style={{height:30, width:30}} source={require('../../assets/left-arrow.png')}></Image>
      </Pressable>
      <Text style={styles.header}>Weight Verification</Text>
      <ScrollView style={{ width: "90%" }}>
        <TextInput
          style={styles.input}
          placeholder="Booking ID"
          keyboardType="default"
          onChangeText={handleBookingIdChange}
        />

        {modalVisible && (
          <View style={styles.modalOverlay}>
            <View style={{ flexDirection: "column", alignSelf: "flex-start" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Customer Name </Text>
                <Text style={styles.modalText}>Preshika Kumar</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Customer ID</Text>
                <Text style={styles.modalText}>ABCD123</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Commodity</Text>
                <Text style={styles.modalText}>Wheat</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Capacity</Text>
                <Text style={styles.modalText}>10 MT</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Bag Size</Text>
                <Text style={styles.modalText}>25 Kg Bag</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Warehouse name</Text>
                <Text style={styles.modalText}>BHAT</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Warehouse ID</Text>
                <Text style={styles.modalText}>WH-A2</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Warehouse location</Text>
                <Text style={styles.modalText}>Mumbai</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Entry date</Text>
                <Text style={styles.modalText}>28 Apr 2024</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Entry time</Text>
                <Text style={styles.modalText}>10:20 AM</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Gross weight</Text>
                <Text style={styles.modalText}>55 MT</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Tare weight</Text>
                <Text style={styles.modalText}>45 MT</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Net weight</Text>
                <Text style={styles.modalText}>10 MT</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Sack ID</Text>
                <Text style={styles.modalText}>WHEAT-SACK-0002</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Sack count</Text>
                <Text style={styles.modalText}>20 sacks</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Lot size</Text>
                <Text style={styles.modalText}>1000</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Block number</Text>
                <Text style={styles.modalText}>Block 3</Text>
              </View>
            </View>
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder="Lot number"
          keyboardType="default"
          onChangeText={handleLotNumChange}
        />
        <Pressable
          disabled={!Button}
          style={[
            styles.button,
            { backgroundColor: Button ? "#1e62ba" : "#b5b3b3" },
          ]}
          onPress={() => Alert.alert("Verify and send message pressed")}
        >
          <Text
            style={[
              styles.buttonText,
              { color: Button ? "#ffffff" : "#000000" },
            ]}
          >
            Verify and send message
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  backArrow: {
    position: "absolute",
    top: 70,
    left: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 1,
    marginTop: -66,
    paddingTop: 30,
    color: "black",
  },
  input: {
    height: 50,
    marginVertical: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#929292",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    height: 58,
    marginBottom:30
    
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    borderWidth: 0.3,
    borderColor: "black",
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#eaeaea",
  },
  modalText: {
    color: "#000000",
    fontSize: 16,
    width: "50%",
    marginTop: 10,
    marginBottom: 20,
  },
  modalTextHeading: {
    color: "#000000",
    marginTop: 10,
    fontSize: 18,
  },
});