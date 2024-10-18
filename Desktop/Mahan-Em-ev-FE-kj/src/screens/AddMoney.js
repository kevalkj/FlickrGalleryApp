import { Pressable, StyleSheet, Text, TextInput, View, Alert, ToastAndroid } from "react-native";
import CustomHeader from "../components/CustomHeader";
import CustomButton from "../components/CustomButton";
import PaymentModeCard from "../components/PaymentModeCard";
import { useState } from "react";
import axios from "axios";

function AddMoney() {
  const [amount, setAmount] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("PhonePe"); // State to track selected method

  async function addingMoney() {

    console.log(amount)
    console.log(selectedPaymentMethod)

    const token = 'token';

    try {
      const response = await axios.post('http://52.66.11.28/api/transac/wallet-top-up-s1', {
        amount
      }, {
        headers: {
          'token': `${token}`,
          'Content-Type': 'application/json'
        }
      });

      ToastAndroid.show('Money added successfully!', ToastAndroid.LONG);
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
      console.error("Error adding money:", error);
    }
  }

  return (
    <>
      <View style={styles.conatiner}>
        <CustomHeader />
        <View style={styles.topConatiner}>
          <Text style={styles.heading}>Add Money</Text>
          <View style={styles.AddMoney}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={(Number) => setAmount(Number)}
            />
          </View>
          <Text style={styles.text1}>It's fast, safe and secure</Text>
          <View style={styles.boxConatiner}>
            <Pressable style={styles.box} onPress={() => { setAmount("100") }}>
              <Text style={styles.price}>₹100</Text>
            </Pressable>
            <Pressable style={styles.box} onPress={() => { setAmount("200") }}>
              <Text style={styles.price}>₹200</Text>
            </Pressable>
            <Pressable style={styles.box} onPress={() => { setAmount("500") }}>
              <Text style={styles.price}>₹500</Text>
            </Pressable>
          </View>
          <View style={styles.Balancebox}>
            <Text style={styles.balText}>Balance: </Text>
            <Text style={styles.balPrice}>₹350.5</Text>
          </View>
        </View>
        <Text style={styles.heading}>Choose Payment Method</Text>

        {/* PaymentModeCard Components with dynamic selection */}
        <Pressable onPress={() => setSelectedPaymentMethod("PhonePe")}>
          <PaymentModeCard
            image={require('../assets/phonepe.png')}
            label={'PhonePe'}
            isSelected={selectedPaymentMethod === "PhonePe"}
          />
        </Pressable>
        <Pressable onPress={() => setSelectedPaymentMethod("Google Pay")}>
          <PaymentModeCard
            image={require('../assets/gpay.png')}
            label={'Google Pay'}
            isSelected={selectedPaymentMethod === "Google Pay"}
          />
        </Pressable>
        <Pressable onPress={() => setSelectedPaymentMethod("Paytm")}>
          <PaymentModeCard
            image={require('../assets/paytm.png')}
            label={'Paytm'}
            isSelected={selectedPaymentMethod === "Paytm"}
          />
        </Pressable>
      </View>
      <CustomButton title={'Confirm'} onPress={addingMoney} />
    </>
  );
}
export default AddMoney;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingHorizontal: 25,
  },
  topConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomWidth: 0.5,
    borderColor: '#979797',
    marginBottom: 15

  },
  heading: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#121323',
    marginBottom: 25,
  },
  AddMoney: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: 215,
    marginBottom: 15,
  },
  rupee: {
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#BFBFBF',
  },
  input: {
    fontSize: 50,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#BFBFBF',
    padding: 0,
    lineHeight: 68
  },
  text1: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#000000',
  },
  boxConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
    width: "100%",
  },
  box: {
    width: 100,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#9F9F9F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#000000',
  },
  Balancebox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balText: {
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#808080',
  },
  balPrice: {
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#0F6DDC',
  },
  options: {

  }
})
