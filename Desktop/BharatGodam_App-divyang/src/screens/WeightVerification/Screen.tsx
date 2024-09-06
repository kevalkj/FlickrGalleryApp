import React, { useEffect, useState } from "react";

import { encode } from 'base-64';

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
import axios from "axios";

interface DataType {
  Commodity: any;
  data: any;
  State: any;
  warehouse: any;
  
  noOfBags: any;
  // Add other properties as needed
}

export default function WeightVerification() {

  const [modalVisible, setModalVisible] = useState(false);
  const [Button, setButton] = useState(false);
  const [Data, setData] = useState<DataType >('');
  const [sackcount, setSackCount] = useState(Number);
  const [bagCount, setBagCount] = useState(Number);


  const data1 = () => {
    const username = 'admin1';
    const password = 'pass1';
    const credentials = encode(`${username}:${password}`);

    const apiUrl = 'https://0i40xn1b3i.execute-api.ap-south-1.amazonaws.com/dev/SacksCountingAPI';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        
        const sacksCounting = data['Sacks Counting'];
        console.log('Sacks Counting:', sacksCounting);
        setSackCount(sacksCounting);
       
      })
      .catch(error => {
        
        console.error('There was a problem with your fetch operation:', error);
      });

  }

  useEffect(() => {
    data1()

  }, [])



  const fetchData = async () => {
    try {
      const response = await axios.get("https://backend.bharatgodam.com/api/booking/booking/6668212822b41f3764f37031");
      console.log(response.data.data.warehouse);
      setData(response.data);
      setModalVisible(true);
      

      
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  

  const handleBookingIdChange = (bookingId: string | any[]) => {
    if (bookingId.length >= 6) {
      fetchData();
      

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


  function check() {
    if (sackcount != bagCount) {
      return (Alert.alert('not equal'))
    }
    else {
      setModalVisible(true);

    }

  }


  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backArrow}
        onPress={() => Alert.alert("Back button pressed")}
      >
        
        <Image style={{ height: 30, width: 30 }} source={require('../../assets/left-arrow.png')}></Image>
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
                <Text style={styles.modalText}>{Data.data.user.firstName}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Customer ID</Text>
                <Text style={styles.modalText}>{Data.data.user._id}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Commodity</Text>
                <Text style={styles.modalText}>{Data.data.Commodity[0].name}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Capacity</Text>
                <Text style={styles.modalText}>{Data.data.warehouse.total_capacity}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Bag Size</Text>
                <Text style={styles.modalText}>{Data.data.noOfBags}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Warehouse name</Text>
                <Text style={styles.modalText}>{Data.data.warehouse.warehouse_name}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Warehouse ID</Text>
                <Text style={styles.modalText}>{Data.data.warehouse.warehouse_id}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Warehouse location</Text>
                <Text style={styles.modalText}>{Data.data.warehouse.State}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Entry date</Text>
                <Text style={styles.modalText}>{Data.data.fromDate}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Entry time</Text>
                <Text style={styles.modalText}>{Data.data.fromTime}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Gross weight</Text>
                <Text style={styles.modalText}>{Data.data.totalWeight}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Tare weight</Text>
                <Text style={styles.modalText}>{Data.data.totalWeight}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Net weight</Text>
                <Text style={styles.modalText}>{Data.data.totalWeight}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Sack ID</Text>
                <Text style={styles.modalText}>WHEAT-SACK-0002</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalText}>Sack count</Text>
                <Text style={styles.modalText}>{Data.data.noOfBags}</Text>
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
          onPress={() => {
            check()




          }
          }
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
    marginBottom: 30

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