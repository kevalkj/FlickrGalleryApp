import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Dropdown from '../assets/Dropdown';
import {useNavigation, NavigationProp} from '@react-navigation/native';

const width = Dimensions.get('window').width;

interface TableProps {
  height: number;
  heading: string[];
  data: (string | boolean | undefined)[][];
  commodity?: number;
  weight?: number;
  action?: boolean;
  expiry?: number;
  grading?: number;
}
export default function Table(props: TableProps) {
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const data = props.data;
  const heading = props.heading;
  const height = data.length === 0 ? props.height*.1 :props.height * ((data.length+1) * 0.1)
  const proportion = data.length === 0 ? 100 : 100 / (data.length+1)
  const handleAction = (data:(string | boolean | undefined)[]) => {
    navigation.navigate("Action",{"data":data})
  }
  return (
    <ScrollView
      style={[styles.container, {height: height}]}
      contentContainerStyle={{flexDirection: 'column'}}
      horizontal={true}
      showsVerticalScrollIndicator={true}>
      <View style={[styles.headingContainer,{height:`${proportion}%`}]}>
        {heading.map((item, index) => {
          return (
            <View style={styles.heading}>
              <Text style={index === 7 && props.action ? styles.heading2 : styles.heading1}>
                {item}
              </Text>
            </View>
          );
        })}
      </View>
      {data.map(item => {
        return (
          <View style={[styles.rowContainer,{height:`${proportion}%`}]}>
            {item.map((items, index) => {
              if (index === item.length-1){
                return
              }
              return (
                <View style={styles.row}>
                  {index === 7 && props.action ? (
                    <TouchableOpacity
                      style={
                        items === 'Accepted'
                          ? styles.accept
                          : items === 'Rejected'
                          ? styles.reject
                          : styles.action
                      }
                      onPress={() => handleAction(item)}
                      disabled={items !== 'Action' && true}>
                      <Text
                        style={
                          items === 'Action' ? styles.text2 : styles.text3
                        }>
                        {items}
                      </Text>
                      {items === 'Action' && <Dropdown color={'white'} />}
                    </TouchableOpacity>
                  ) : (
                    <Text
                      style={
                        index === props.commodity
                          ? styles.commodity
                          : index === props.weight
                          ? styles.weight
                          : index === props.expiry 
                          ? styles.expiry
                          : index === props.grading
                          ? styles.grading
                          : styles.text1
                      }>
                      {items}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'flex-end',
    zIndex: -20,
  },
  headingContainer: {
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
  },
  heading: {
    width: width * 0.33,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading1: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  heading2: {
    fontFamily: 'Poppins-Regular',
    color: '#0C447D',
    fontSize: 14,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderColor: '#E0E1E1',
  },
  row: {
    width: width * 0.33,
    height: '100%',
    borderBottomWidth: 1,
    borderColor: '#E0E1E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  commodity: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#FFE4F2',
    padding: 4,
    borderRadius: 10,
  },
  weight: {
    fontFamily: 'NotoSerif-Regular',
    color: '#0038FF',
    fontSize: 14,
    textAlign: 'center',
  },
  text2: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginRight: '5%',
  },
  text3: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16.5,
  },
  action: {
    width: width * 0.25,
    height: '60%',
    backgroundColor: '#0C447D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  accept: {
    width: width * 0.25,
    height: '60%',
    backgroundColor: '#00A241',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  reject: {
    width: width * 0.25,
    height: '60%',
    backgroundColor: '#FF5858',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  expiry:{
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#FFE3AC',
    padding: 4,
    borderRadius: 10,
  },
  grading:{
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#C8FFF5',
    padding: 4,
    borderRadius: 6,
  }

});
