import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';

import Circles from '../../components/Circle';

const commoditiesData = [
  {name: 'Barley', weight: '1850 MT'},
  {name: 'Corn', weight: '2000 MT'},
  {name: 'Chickpea', weight: '1500 MT'},
  {name: 'Black pepper', weight: '1200 MT'},
  {name: 'Turmeric', weight: '1750 MT'},
  {name: 'Wheat', weight: '1900 MT'},
  {name: 'Rice', weight: '2100 MT'},
];

const statesData = [
  {name: 'Madurai', farmers: '2', fp: '5', Trader: '5'},
  {name: 'Chennai', farmers: '2', fp: '5', Trader: '5'},
  {name: 'Trichy', farmers: '2', fp: '5', Trader: '5'},
  {name: 'Coimbatore', farmers: '2', fp: '5', Trader: '5'},
  {name: 'Tirunelveli', farmers: '2', fp: '5', Trader: '5'},
  {name: 'Visakhapatn', farmers: '2', fp: '5', Trader: '5'},
  {name: 'Sattenapalle', farmers: '2', fp: '5', Trader: '5'},
  {name: 'Mirpur', farmers: '2', fp: '5', Trader: '5'},
  {name: 'Siliguri', farmers: '2', fp: '5', Trader: '5'},
  {name: 'Pararpar', farmers: '2', fp: '5', Trader: '5'},




];

export default function WarehouseOwner() {
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#F0F0F0'}}
      persistentScrollbar={true}>
      <View style={{margin: 20}}>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={require('../../assets/menu.png')}
          />
          <Image
            style={styles.headerImage1}
            source={require('../../assets/bharatGodam.png')}
          />
          <Image
            style={styles.headerImage}
            source={require('../../assets/bell.png')}
          />
        </View>

        <View style={styles.dashboard}>
          <Text style={styles.dashboardTitle}>Dashboard</Text>
          <Text style={styles.dashboardSubtitle}>Last 3 months</Text>
          <Image
            style={styles.inputImage}
            source={require('../../assets/drop-down.png')}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.overallPerformanceText}>
            Overall performance of all warehouses
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter warehouse number"
              style={styles.textInput}
            />
            <Pressable>
              <View
                style={{
                  backgroundColor: '#145DA0',
                  borderRadius: 40,
                  marginTop: 23,
                }}>
                <Image
                  source={require('../../assets/right-chevron.png')}
                  style={styles.rightArrow}
                />
              </View>
            </Pressable>
          </View>

          <ScrollView
            style={{marginTop: 25, backgroundColor: 'white', paddingRight: 10}}
            contentContainerStyle={styles.scrollViewContent}
            persistentScrollbar={true}>
            <Text style={styles.warehousesTitle}>Warehouses</Text>

            <View style={styles.warehouseContainer}>
              <Text style={styles.warehouseText1}>
                BHAT warehouse - 12345678
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.warehouseText}>
                  Total capacity - 1400 MT
                </Text>
                <Image
                  style={styles.inputImage}
                  source={require('../../assets/right-arrow-angle.png')}
                />
              </View>
              <Text style={styles.availableCapacityText}>
                Available capacity - 400 MT
              </Text>
              <View style={styles.separator} />
            </View>
            <View style={styles.warehouseContainer}>
              <Text style={styles.warehouseText2}>
                Phoenix mall kurla - 12345678
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.warehouseText}>
                  Total capacity - 1400 MT
                </Text>
                <Image
                  style={styles.inputImage}
                  source={require('../../assets/right-arrow-angle.png')}
                />
              </View>
              <Text style={styles.availableCapacityText}>
                Available capacity - 400 MT
              </Text>
              <View style={styles.separator} />
            </View>
            <View style={styles.warehouseContainer}>
              <Text style={styles.warehouseText2}>
                Janco warehouse - 89345555
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.warehouseText}>
                  Total capacity - 1400 MT
                </Text>
                <Image
                  style={styles.inputImage}
                  source={require('../../assets/right-arrow-angle.png')}
                />
              </View>
              <Text style={styles.availableCapacityText}>
                Available capacity - 400 MT
              </Text>
              <View style={styles.separator} />
            </View>
            <View style={styles.warehouseContainer}>
              <Text style={styles.warehouseText2}>
                Janco warehouse - 89345555
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.warehouseText}>
                  Total capacity - 1400 MT
                </Text>
                <Image
                  style={styles.inputImage}
                  source={require('../../assets/right-arrow-angle.png')}
                />
              </View>
              <Text style={styles.availableCapacityText}>
                Available capacity - 400 MT
              </Text>
              <View style={styles.separator} />
            </View>
            <View style={styles.warehouseContainer}>
              <Text style={styles.warehouseText2}>
                Janco warehouse - 89345555
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.warehouseText}>
                  Total capacity - 1400 MT
                </Text>
                <Image
                  style={styles.inputImage}
                  source={require('../../assets/right-arrow-angle.png')}
                />
              </View>
              <Text style={styles.availableCapacityText}>
                Available capacity - 400 MT
              </Text>
              <View style={styles.separator} />
            </View>
            <View style={styles.warehouseContainer}>
              <Text style={styles.warehouseText2}>
                Janco warehouse - 89345555
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.warehouseText}>
                  Total capacity - 1400 MT
                </Text>
                <Image
                  style={styles.inputImage}
                  source={require('../../assets/right-arrow-angle.png')}
                />
              </View>

              <Text style={styles.availableCapacityText}>
                Available capacity - 400 MT


              <View style={styles.separator} />
            </View>
            <View style={styles.warehouseContainer}>
              <Text style={styles.warehouseText2}>
                Janco warehouse - 89345555
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.warehouseText}>
                  Total capacity - 1400 MT
                </Text>
                <Image
                  style={styles.inputImage}
                  source={require('../../assets/right-arrow-angle.png')}
                />
              </View>
              <Text style={styles.availableCapacityText}>
                Available capacity - 400 MT
              </Text>
              <View style={styles.separator} />
            </View>
          </ScrollView>


            style={{backgroundColor: 'white', marginTop: 30, borderRadius: 10}}>
            <Text
              style={{
                fontSize: 19,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 40,
                paddingBottom: 35,
                marginLeft: 20,
              }}>
              Errors Detected
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#FADCD9',
                marginBottom: 20,
                padding: 25,
                borderRadius: 20,
                marginLeft: 20,
                marginRight: 20,
              }}>
              <View>
                <Text style={{color: 'black', fontSize: 19, fontWeight: '500'}}>
                  4 errors
                </Text>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                  during counting
                </Text>
              </View>

              <Pressable>
                <View style={{backgroundColor: '#145DA0', borderRadius: 40}}>
                  <Image
                    source={require('../../assets/right-chevron.png')}
                    style={styles.rightArrow}
                  />
                </View>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#FADCD9',
                marginBottom: 20,
                padding: 25,
                borderRadius: 20,
                marginLeft: 20,
                marginRight: 20,
              }}>
              <View>
                <Text style={{color: 'black', fontSize: 19, fontWeight: '500'}}>
                  7 errors
                </Text>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                  during weighing
                </Text>
              </View>

              <Pressable>
                <View style={{backgroundColor: '#145DA0', borderRadius: 40}}>
                  <Image
                    source={require('../../assets/right-chevron.png')}
                    style={styles.rightArrow}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Commodities</Text>
            <View style={styles.header}>
              <Text style={styles.headerText}>Commodity</Text>
              <Text style={styles.headerText}>Weight</Text>
            </View>

            {commoditiesData.map((commodity, index) => (
              <View key={index}>
                <View style={styles.row}>
                  <Text style={styles.rowText}>{commodity.name}</Text>
                  <Text style={styles.rowText}>{commodity.weight}</Text>
                </View>
                {index < commoditiesData.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            ))}
          </View>
          <View
            style={{
              backgroundColor: 'white',
              marginTop: 30,
              borderRadius: 10,
              padding: 20,
              paddingBottom: 40,
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 20,
                paddingBottom: 20,
              }}>
              Post harvest loan
            </Text>
            <View style={{marginHorizontal: -16}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 30,
                }}>
                <View
                  style={{
                    padding: 30,
                    backgroundColor: '#EFDCF9',
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    alignItems: 'center',
                    marginLeft: 20,
                  }}>
                  <Text
                    style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
                    25
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      color: 'black',
                      paddingTop: 10,
                    }}>
                    Pledges
                  </Text>
                </View>
                <View
                  style={{
                    padding: 30,
                    backgroundColor: '#EFDCF9',
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
                    25
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      color: 'black',
                      paddingTop: 10,
                    }}>
                    Warehouse
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <ScrollView
            style={{
              backgroundColor: 'white',
              padding: 15,
              marginTop: 30,
              borderRadius: 10,
            }}
            persistentScrollbar={true}>
            <Text style={{fontSize: 23, fontWeight: 'bold', color: 'black'}}>
              Total Farmers/FPOs/Traders
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 20,
              }}>
              <Text style={{paddingRight: 5, color: 'black'}}>State</Text>
              <View
                style={{
                  paddingLeft: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{paddingRight: 35}}>
                  <Text style={{paddingRight: 5, color: 'black'}}>
                    District
                  </Text>
                </View>

                <View style={{flexDirection: 'column', paddingLeft: 10}}>
                  <Text
                    style={{paddingRight: 5, color: 'black', paddingLeft: 6}}>
                    Total{' '}
                  </Text>
                  <Text style={{paddingRight: 5, color: 'black'}}>
                    Farmers{' '}
                  </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{paddingRight: 5, color: 'black'}}>Total </Text>
                  <Text style={{paddingRight: 5, color: 'black'}}> FPOs</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{paddingRight: 5, color: 'black', paddingLeft: 6}}>
                    Total{' '}
                  </Text>
                  <Text style={{paddingRight: 5, color: 'black'}}>
                    {' '}
                    Traders
                  </Text>
                </View>
              </View>
            </View>
            <View style={{padding: 1}}>
              <View style={{justifyContent: 'space-between'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,padding:10}}>
                  }}>
                  <Text
                    style={{paddingLeft: 50, fontSize: 16, fontWeight: '500'}}>
                    Madurai
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>2</Text>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    padding: 10,
                  }}>
                  <Text
                    style={{paddingLeft: 50, fontSize: 16, fontWeight: '500'}}>
                    Chennai
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>2</Text>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    padding: 10,
                  }}>
                  <Text
                    style={{paddingLeft: 50, fontSize: 16, fontWeight: '500'}}>
                    Manipur
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>2</Text>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                  padding: 10,
                }}>
                <Text
                  style={{paddingLeft: 50, fontSize: 16, fontWeight: '500'}}>
                  Jammu
                </Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>2</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                  padding: 10,
                }}>
                <Text
                  style={{paddingLeft: 50, fontSize: 16, fontWeight: '500'}}>
                  Chennai
                </Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>2</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                  padding: 10,
                }}>
                <Text
                  style={{paddingLeft: 50, fontSize: 16, fontWeight: '500'}}>
                  Manipur
                </Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>2</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                  padding: 10,
                }}>
                <Text
                  style={{paddingLeft: 50, fontSize: 16, fontWeight: '500'}}>
                  Chennai
                </Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>2</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                  padding: 10,
                }}>
                <Text
                  style={{paddingLeft: 50, fontSize: 16, fontWeight: '500'}}>
                  Madurai
                </Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>2</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>5</Text>
              </View>
            </View>



              marginTop: 30,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
            }}>
            <Text style={{fontSize: 23, fontWeight: 'bold', color: 'black'}}>
              Expired quantity
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                paddingTop: 15,
                fontWeight: 'bold',
              }}>
              Total expired quantity still inside warehouse
            </Text>
            <View
              style={{
                backgroundColor: '#FADCD9',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#FADCD9',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#FADCD9',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>

                    </View>
            </View>
            <View
              style={{
                backgroundColor: '#FADCD9',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#FADCD9',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>

          </View>
          <View
            style={{
              marginTop: 30,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
            }}>
            <Text style={{fontSize: 23, fontWeight: 'bold', color: 'black'}}>
              Future bookings
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                paddingTop: 15,
                fontWeight: 'bold',
              }}>
              Total future bookings to be deposited{' '}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                paddingTop: 7,
                fontWeight: 'bold',
              }}>
              1500 MT
            </Text>
            <View
              style={{
                backgroundColor: '#FFFFE0',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFE0',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFE0',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFE0',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFE0',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>

          </View>
          <View
            style={{
              marginTop: 30,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
            }}>
            <Text style={{fontSize: 23, fontWeight: 'bold', color: 'black'}}>
              Deposit & withdrawal
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                paddingTop: 15,
                fontWeight: 'bold',
              }}>
              Total future bookings to be deposited{' '}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                paddingTop: 7,
                fontWeight: 'bold',
              }}>
              1500 MT
            </Text>
            <View
              style={{
                backgroundColor: '#D3F4FB',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>

                    </View>
            </View>
            <View
              style={{
                backgroundColor: '#D3F4FB',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#D3F4FB',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#D3F4FB',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>

                    </View>
            </View>
            <View
              style={{
                backgroundColor: '#D3F4FB',
                borderRadius: 10,
                marginTop: 20,
                padding: 30,
              }}>
              <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>
                Booking ID
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  #7887
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    paddingRight: 30,
                  }}>
                  10 MT
                </Text>
              </View>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F0F0F0',
  },
  headerImage: {
    height: 30,
    width: 30,
    marginLeft: -8,
  },
  headerImage1: {
    height: 80,
    width: 80,
    marginLeft: -8,
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  dashboardSubtitle: {
    fontSize: 18,
    paddingTop: 10,
  },
  dashboardImage: {
    height: 20,
    width: 20,
  },
  overallPerformanceText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 15,
    padding: 15,
    width: 300,
    backgroundColor: 'white',
  },
  inputImage: {
    height: 20,
    width: 40,
    marginTop: 15,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  warehousesTitle: {
    fontSize: 26,
    fontWeight: '500',
    color: 'black',
    margin: 12,
  },
  warehouseContainer: {
    paddingLeft: 15,
    borderRadius: 10,
    paddingRight: 20,
  },
  warehouseText: {
    color: 'black',
    paddingTop: 10,
    paddingBottom: 10,
  },
  warehouseText1: {
    color: 'black',
    paddingTop: 14,
  },
  warehouseText2: {
    color: 'black',
    paddingTop: 10,
  },
  availableCapacityText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
    marginTop: 10,
  },
  rightArrow: {
    height: 40,
    width: 40,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 1,
    paddingRight: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  rowText: {
    fontSize: 19,
    color: 'black',
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: '500',
    paddingLeft: 10,
    paddingRight: 20,
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'white',

    marginTop: 30,
  },
});
