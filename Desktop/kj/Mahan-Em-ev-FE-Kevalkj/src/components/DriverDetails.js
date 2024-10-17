import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList,  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const DriverDetails = ({ navigation }) => {
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Paras Joshi', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diamnonummy nibh euismod tincidunt ut laoreet lore magna aliquam erat volutpat. Ut wisi enim ad minim niam, quis nostrud exerci.' },
    { id: 2, name: 'Paras Joshi', rating: 4, review: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diamnonummy nibh euismod tincidunt ut laoreet lore magna aliquam erat volutpat. Ut wisi enim ad minim niam, quis nostrud exerci.' },
    { id: 3, name: 'Paras Joshi', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diamnonummy nibh euismod tincidunt ut laoreet lore magna aliquam erat volutpat. Ut wisi enim ad minim niam, quis nostrud exerci.' },
  ]);

   const rideDetails = {
    driver: {
      name: 'Samay Raina',
      location: 'Pune, Maharashtra',
    },
    vehicle: {
      licensePlate: 'MH 49 K 6601',
      model: 'Bajaj K10',
      color: 'black',
    },
    
  };

  const { driver, vehicle } = rideDetails;

  const toggleReview = (id) => {
    setIsReviewExpanded(!isReviewExpanded);
  };

   const gotoChat = () => {
    navigation.navigate('ChatScreen'); 
  };

  const gotoCall = () => {
    navigation.navigate('CallScreen'); 
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => toggleReview(item.id)} style={styles.review}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewAvatar} />
          <Text style={styles.reviewName}>{item.name}</Text>
          <View style={styles.reviewRating}>
            {[...Array(item.rating)].map((_, i) => (
              <Image key={i} source={{ uri: 'https://example.com/star-icon.png' }} style={styles.starIcon} />
            ))}
          </View>
          <Text style={styles.reviewDate}>1 week ago</Text>
        </View>
        {isReviewExpanded && (
          <Text style={styles.reviewContent}>{item.review}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header and driver info */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          {/* <Icon name="arrow-back" size={24} color="#333" style={styles.backArrow} /> */}
          <Image source={require('../assets/ArrowBack.png')}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Driver Details</Text>
      </View>
      <View style={styles.driverInfo}>
        <Image source={require('../assets/Ellipse.png')} style={styles.profilePic} />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <View style={styles.location}>
            {/* <Icon name="location-on" size={16} color="#666" style={styles.locationIcon} /> */}
            <Image source={require('../assets/location.png')} style={styles.locationIcon}/>
            <Text style={styles.locationText}>{driver.location}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton} onPress={gotoCall}>
            {/* <Icon name="phone" size={24} color="#fff"/> */}
            <Image source={require('../assets/Vector.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton} onPress={gotoChat}>
            {/* <Icon name="chat" size={24} color="#fff" /> */}
            <Image source={require('../assets/mector.png')}/>
          </TouchableOpacity>
        </View>
      </View>

      {/* Vehical details */}
      <View style={styles.vehicalDetails}>
        <Text style={styles.vehicalDetailsTitle}>Vehical Details</Text>
        <View style={styles.vehicalDetail}>
          <Text style={styles.vehicalDetailLabel}>Vehical Model</Text>
          <Text style={styles.vehicalDetailValue}>{vehicle.model}</Text>
        </View>
        <View style={styles.vehicalDetail}>
          <Text style={styles.vehicalDetailLabel}>Vehical Number</Text>
          <Text style={styles.vehicalDetailValue}>{vehicle.licensePlate}</Text>
        </View>
        <View style={styles.vehicalDetail}>
          <Text style={styles.vehicalDetailLabel}>Vehical Colour</Text>
          <Text style={styles.vehicalDetailValue}>{vehicle.color}</Text>
        </View>
      </View>

      {/* Stats */}
     <View style={styles.stats}>
        <TouchableOpacity style={styles.stat}>
          {/* <Icon name="people" size={32} color="#333" style={styles.statIcon} /> */}
          <View style={styles.iconContainer}>
            <Image source={require('../assets/persons.png')} style={styles.statIcon} resizeMode='contain'/>
          </View>
          <Text style={styles.statValue}>150+</Text>
          <Text style={styles.statLabel}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stat}>
          {/* <Icon name="star" size={32} color="#333" style={styles.statIcon} /> */}
          <View style={styles.iconContainer}>
            <Image source={require('../assets/Star.png')} style={styles.statIcon} resizeMode='contain'/>
          </View>
          <Text style={styles.statValue}>4.5</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stat}>
          {/* <Icon name="chat" size={32} color="#333" style={styles.statIcon} /> */}
          <View style={styles.iconContainer}>
            <Image source={require('../assets/mector.png')} style={styles.statIcon} resizeMode='contain'/>
          </View>
          <Text style={styles.statValue}>75</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews */}
      <View style={styles.reviews}>
        <Text style={styles.reviewsTitle}>Reviews</Text>
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // margon:33,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backArrow: {
    width: 24,
    height: 24,
    // marginRight: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign:'center',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profilePic: {
    width: 76,
    height: 76.5,
    borderRadius: 32,
    marginRight: 16,
  },
  driverDetails: {
    flex: 1,
    
  },
  driverName: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily:'Inter',
    color: '#333',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  locationIcon: {
    // width: 9,
    // height: 9,
    marginRight: 3,
  },
  locationText: {
    fontSize: 12,
    color: '#808080',
    fontFamily:'Inter',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  callButton: {
    width: 33,
    height: 33,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  chatButton: {
    width: 33,
    height: 33,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicalDetails: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    
  },
  vehicalDetailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    marginBottom: 8,
    fontFamily:'Inter',
  },
  vehicalDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    
  },
  vehicalDetailLabel: {
    fontSize: 12,
    color: '#808080',
    fontFamily:'Inter',
  },
  vehicalDetailValue: {
    fontSize: 12,
    color: 'black',
    fontFamily:'Inter',
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stat: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 46.82,
    height: 46.82,
    borderRadius: 45,
    backgroundColor: '#0F6DDC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  statIcon: {
    width: 23,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#0F6DDC',
    // overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    // color: 'white',
    // marginBottom: 4,/
    // textAlign: 'center',
    // lineHeight: 48, 
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    fontFamily:'Inter',
  },
  statLabel: {
    fontSize: 12,
    color: '#808080',
    // fontWeight: 200,
    fontFamily:'Inter',
  },
  reviews: {
    padding: 16,
    backgroundColor: '#fff',
  },
  reviewsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily:'Inter',
    color: '#333',
    marginBottom: 8,
  },
  review: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 16,
  },
  reviewName: {
    fontSize: 12.5,
    fontWeight: '400',
    fontFamily:'Inter',
    color: '#333',
    marginRight: 16,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  reviewDate: {
    fontSize: 10,
    color: '#666',
     fontFamily:'Inter',
  },
  reviewContent: {
    fontSize: 10,
    color: '#878787',
    fontFamily:'Inter',
  },
});

export default DriverDetails;
