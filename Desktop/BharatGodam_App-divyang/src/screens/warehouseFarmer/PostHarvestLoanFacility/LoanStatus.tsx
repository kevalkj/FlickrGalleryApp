import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderComponent from '../../../components/Header';
import textStyles from '../../../components/textStyles';

const LoanStatus = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent title="Loan status" />
      <View style={styles.container}>
        <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
          Your loan has been approved
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoanStatus;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
