import React, {ReactNode, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CheckMark from '../assets/CheckMark';
import Cross from '../assets/Cross';
import TakePhoto from '../assets/TakePhoto';
import Gallery from '../assets/Gallery';
import Delete from '../assets/Delete';
import * as Imagepicker from 'react-native-image-picker';
import {UpdateProfilePicture} from '../service/fileupload';
import Toast from 'react-native-toast-message';

type FileType = {
  uri: string;
  type: string;
  name: string;
  height: number;
  width: number;
};

type Camera = [string, string, ReactNode, () => void];

export const Verified = () => {
  return (
    <>
      <View style={styles.statusIconVerfiedContainer}>
        <CheckMark color={'white'} />
      </View>
      <Text style={styles.statusIconVerfiedText}>verified</Text>
    </>
  );
};
export const NotVerified = () => {
  return (
    <>
      <View style={styles.statusIconNotVerfiedContainer}>
        <Cross color={'white'} />
      </View>
      <Text style={styles.statusIconNotVerfiedText}>Not verified</Text>
    </>
  );
};

interface CameraModalProps {
  exitCallBack: () => void;
}

const CameraModal: React.FC<CameraModalProps> = props => {
  const [mainPhotos, setMainPhotos] = useState<FileType[]>([]);

  const pickImage = async (
    setImages: React.Dispatch<React.SetStateAction<FileType[]>>,
  ) => {
    let result = await Imagepicker.launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (!result.didCancel && result.assets) {
      const files = result.assets.map(asset => ({
        uri: asset.uri || '',
        type: asset.type || '',
        name: asset.fileName || '',
        height: 720,
        width: 720,
      }));
      setImages(files);
      handleUpload(files);
    }
  };

  // Function to take a photo
  const takePhoto = async (
    setImages: React.Dispatch<React.SetStateAction<FileType[]>>,
  ) => {
    let result = await Imagepicker.launchCamera({
      mediaType: 'photo',
    });

    if (!result.didCancel && result.assets) {
      const files = result.assets.map(asset => ({
        uri: asset.uri || '',
        type: asset.type || '',
        name: asset.fileName || '',
        height: 720,
        width: 720,
      }));
      setImages(files);
      handleUpload(files);
    }
  };

  // Function to delete photos
  const deletePhoto = () => {
    props.exitCallBack();
    Toast.show({
      type: 'info',
      text1: 'Image deleted',
    });
  };

  // Function to handle image upload
  const handleUpload = async (photos: FileType) => {
    const files = {
      profilePicture: photos,
    };
    await UpdateProfilePicture(files);
    props.exitCallBack();
  };

  // Camera options with corresponding actions
  const cameraOptions: Camera[] = [
    [
      'Gallery',
      'Choose an existing photo',
      <Gallery />,
      () => pickImage(setMainPhotos),
    ],
    ['Camera', 'Take a picture', <TakePhoto />, () => takePhoto(setMainPhotos)],
    ['Delete', 'Delete the existing photo', <Delete />, deletePhoto],
  ];

  return (
    <View style={styles.cameraContainer}>
      <View style={styles.cameraOptionContainer}>
        <TouchableOpacity
          style={styles.cameraHeader}
          onPress={props.exitCallBack}>
          <Cross />
        </TouchableOpacity>
        <Text style={styles.cameraHeaderText}>Select profile photo</Text>
        {cameraOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cameraOption}
            onPress={() => {
              item[3]();
            }}>
            {item[2]}
            <View>
              <Text style={styles.cameraOptionText}>{item[0]}</Text>
              <Text style={styles.cameraOptionDesc}>{item[1]}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusIconVerfiedContainer: {
    width: 24,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#00A241',
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIconVerfiedText: {
    color: '#00A241',
    fontFamily: 'Poppins-SemiBold',
  },
  statusIconNotVerfiedContainer: {
    width: 24,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#CC0000',
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIconNotVerfiedText: {
    color: '#CC0000',
    fontFamily: 'Poppins-SemiBold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraOptionContainer: {
    width: '90%',
    height: '45%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraHeader: {
    width: '100%',
    //marginTop:'8%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: '8%',
  },
  cameraHeaderText: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  cameraOption: {
    flexDirection: 'row',
    height: '23%',
    width: '65%',
    alignItems: 'center',
  },
  cameraOptionText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginLeft: '4%',
  },
  cameraOptionDesc: {
    color: '#545554',
    fontFamily: 'NotoSerif-Regular',
    marginLeft: '4%',
  },
});

export default CameraModal;
