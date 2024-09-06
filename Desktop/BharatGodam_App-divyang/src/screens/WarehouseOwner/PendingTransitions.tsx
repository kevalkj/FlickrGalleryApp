import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/Header';
import textStyles from '../../components/textStyles';
import ButtonWithAutoWidth from '../../components/ButtonWithAutoWidth';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {GradeAndDeposit} from '../../service/api';
import {GradingDetails} from '../../types/entities';
import Layout from '../../layouts/layout';

const PendingTransitions = () => {
  // wrong type used should change
  const [pendingTransition, setpendingTransition] = useState<GradingDetails[]>(
    [],
  );

  const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  useEffect(() => {
    const getData = async () => {
      const temp = await GradeAndDeposit.get_deposit();
      console.log(temp[1], 11);
      setpendingTransition(temp);
    };
    getData();
  }, []);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const formatDate = (datetimeString: string) => {
    const date = new Date(datetimeString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <View style={styles.container}>
      <Layout>
        <HeaderComponent title={'Pending transitions'} />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.instructionText}>
            The deposit is complete, proceed with the grading process.
          </Text>
          {pendingTransition.map((item, index) => (
            <View key={index} style={styles.transitionCard}>
              <View style={styles.cardContent}>
                {/* {Object.entries(item).map(([key, value]) => ( */}
                <View style={styles.row}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{'Deposit id'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={[styles.valueText, {fontSize: 9.25}]}>
                      {item._id}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{'Deposit date'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>
                      {formatDate(item.depositDate)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{'Warehouse name'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{item.warehouseName}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{'Commodity'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>
                      {item.bookingId.Commodity[0].name}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{'Total weight'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{item.totalWeight}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{'Total amount'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>
                      {item.bookingId.total_price}
                    </Text>
                  </View>
                </View>
                {/* ))} */}
              </View>
              <View style={styles.buttonContainer}>
                <ButtonWithAutoWidth
                  role="iButton"
                  text="Grading"
                  borderColor="#0C447D"
                  bgcolor="#0C447D"
                  txtcolor="#FFFFFF"
                  onPress={() => {
                    navigation.navigate('Grading', {id: item._id});
                  }}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  content: {
    paddingHorizontal: 14.5,
    paddingBottom: 16, // Extra padding at the bottom for better scrolling experience
  },
  instructionText: {
    ...textStyles.bodyB3,
    color: '#1C1C1C',
    textAlign: 'left',
    marginBottom: 16, // Add margin to create space below the text
  },
  transitionCard: {
    padding: 24,
    gap: 24,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardContent: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 24,
  },
  labelContainer: {
    width: 128,
    height: 24,
    paddingVertical: 4,
  },
  labelText: {
    ...textStyles.bodyTable,
    color: '#1C1C1C',
    textAlign: 'left',
  },
  valueContainer: {
    width: 128,
    height: 24,
    paddingVertical: 4,
  },
  valueText: {
    ...textStyles.headingH8,
    color: '#1C1C1C',
  },
  buttonContainer: {
    width: 152,
  },
});

export default PendingTransitions;
