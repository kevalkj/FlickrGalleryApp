import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import YellowOutlineButton from "../components/YellowOutlineButton";
import { useNavigation } from "@react-navigation/native";
import MoneyHistoryCard from "../components/MoneyHistoryCard";

function Wallet() {
  const navigation = useNavigation();

  const history = [
    { id: 1, partner: "PhonePe", time: "02:30 PM", date: "06 JUN 2024", amount: 35 },
    { id: 2, partner: "Google Pay", time: "01:15 PM", date: "05 JUN 2024", amount: 50 },
    { id: 3, partner: "Paytm", time: "11:45 AM", date: "04 JUN 2024", amount: 100 },
    { id: 4, partner: "Paytm", time: "11:45 AM", date: "04 JUN 2024", amount: 100 },
    { id: 5, partner: "Google Pay", time: "11:45 AM", date: "04 JUN 2024", amount: 100 },
    { id: 6, partner: "Paytm", time: "11:45 AM", date: "04 JUN 2024", amount: 100 },
  ];

  function gotoAddMoney() {
    navigation.navigate('AddMoney');
  }

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Total Available Balance</Text>
        <Text style={styles.rupee}>₹350.5</Text>
        <Text style={styles.text1}>It's fast, safe, and secure</Text>
        <YellowOutlineButton title={'Add Money'} onPress={gotoAddMoney} />
      </View>
      <Text style={styles.heading}>Add Money History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MoneyHistoryCard
            Partner={item.partner}
            time={item.time}
            date={item.date}
            amount={item.amount}
          />
        )}
      />
    </View>
  );
}

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingHorizontal: 25,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomWidth: 0.5,
    borderColor: '#979797',
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#121323',
    marginBottom: 30,
  },
  rupee: {
    fontSize: 50,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#000',
  },
  text1: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#000000',
    marginBottom: 30,
  },
});