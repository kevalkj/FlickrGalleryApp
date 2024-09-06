import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import {Verified, NotVerified} from '../../components/ProfileComponents';
import CameraModal from '../../components/ProfileComponents';
import Camera from '../../assets/Camera';
import Edit from '../../assets/Edit';
import Aadhar from '../../assets/Aadhar';
import PAN from '../../assets/PAN';
import GST from '../../assets/GST';
import Profiles from '../../assets/Profile';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {authApi} from '../../service/api';
import {User} from '../../types/entities';

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

type Documents = [string, string, ReactNode];
const Profile: React.FC<ProfileProps> = ({navigation}) => {
  const [user, setUser] = useState<Partial<User>>({});
  const token = useSelector((state: RootState) => state.user.token);
  const variant = useSelector((state: RootState) => state.user.role);
  const status = true;
  const [camera, setCamera] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await authApi.getUserProfile();
      setUser(response);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  //console.log("Token : ", token);

  const handleUploadComplete = () => {
    handleCamera();
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
    console.log('User : ', user);
  }, []);

  const handleCamera = () => {
    setCamera(!camera);
  };
  const documents: Documents[] = [
    ['Aadhar Card', '2 MB', <Aadhar />],
    ['PAN Card', '2 MB', <PAN />],
    ['Goods and Service task (GST)', '4 MB', <GST />],
  ];
  const renderDocuments = (item: Documents, user: Partial<User>) => {
    return (
      <View style={styles.documentOptionContainer}>
        <View style={styles.documentOptionPhotoContainer}>{item[2]}</View>
        <View style={styles.documentOptionDetailsContainer}>
          <Text style={styles.addressHeaderText}>{item[0]}</Text>
          <Text style={styles.documentSize}>{item[1]}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <View style={styles.basicInfoContainer}>
          <View style={styles.photoContainer}>
            {user.profilePicture ? (
              <Image source={{uri: user.profilePicture}} style={styles.photo} />
            ) : (
              <Profiles filled={true} fill={true} color={'#545554'} />
            )}
            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={handleCamera}>
              <Camera />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.headerText}>{user.firstName}</Text>
            <Text style={styles.detailsMail}>{user.email}</Text>
            <Text style={styles.detailsNumber}>+91 {user.phone}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit />
            <Text style={styles.editText}>Edit profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.addressHeaderContiner}>
            <Text style={styles.addressHeaderText}>Address</Text>
            <View style={styles.statusContainer}>
              {status ? <Verified /> : <NotVerified />}
            </View>
          </View>
          <Text style={styles.addressText}>{user.Address?.buildingName}</Text>
          <Text style={styles.addressText}>{user.Address?.street}</Text>
          <Text style={styles.addressText}>Near{user.Address?.landmark}</Text>
          <Text style={styles.addressText}>
            {user.Address?.city} - {user.Address?.pincode}
          </Text>
          <Text style={styles.addressText}>{user.Address?.state}</Text>
        </View>
        <View style={styles.documentsContainer}>
          <View style={styles.addressHeaderContiner}>
            <Text style={styles.addressHeaderText}>Documents</Text>
            <View style={styles.statusContainer}>
              {status ? <Verified /> : <NotVerified />}
            </View>
          </View>
          {documents.map(item => renderDocuments(item, user))}
        </View>
      </SafeAreaView>
      <NavBar current="Profile" />
      <Modal visible={camera} transparent={true}>
        <CameraModal exitCallBack={handleUploadComplete} />
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '8%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  basicInfoContainer: {
    width: '100%',
    height: '15%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%',
    flexDirection: 'row',
  },
  photoContainer: {
    width: '25%',
    aspectRatio: 1,
    backgroundColor: 'rgba(0,0,0,.2)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(0,0,0,.2)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIconContainer: {
    width: '25%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 100,
    zIndex: 1,
    position: 'absolute',
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsNumber: {
    color: 'black',
    fontFamily: 'NotoSeriff-Regular',
  },
  detailsMail: {
    color: '#545554',
    fontFamily: 'NotoSeriff-Regular',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    color: '#545554',
    fontFamily: 'NotoSeriff-Regular',
    marginLeft: '2%',
  },
  addressContainer: {
    backgroundColor: 'white',
    width: '95%',
    height: '27%',
    alignSelf: 'center',
    marginTop: '3%',
    borderRadius: 8,
    padding: '2%',
  },
  addressHeaderContiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusContainer: {
    flexDirection: 'row',
  },
  addressHeaderText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#1C1C1C',
    marginBottom: '2.5%',
  },
  addressText: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    marginBottom: '2.2%',
  },
  documentsContainer: {
    backgroundColor: 'white',
    width: '95%',
    height: '35%',
    alignSelf: 'center',
    marginVertical: '4%',
    borderRadius: 8,
    padding: '2%',
  },
  documentOptionContainer: {
    width: '100%',
    height: '28%',
    marginBottom: '2%',
    flexDirection: 'row',
  },
  documentOptionPhotoContainer: {
    width: '25%',
    height: '100%',
    borderRadius: 10,
  },
  documentOptionDetailsContainer: {
    marginLeft: '5%',
    justifyContent: 'center',
  },
  documentSize: {
    fontFamily: 'Noto-Serif-Regular',
    color: '#707371',
  },
});
