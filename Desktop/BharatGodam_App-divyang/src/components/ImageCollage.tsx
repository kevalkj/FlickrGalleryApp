import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import LeftArrow from '../assets/LeftArrow';
import Arrow from '../assets/Arrow';
import Prev from '../assets/Prev';
import Next from '../assets/Next';

import Cross from '../assets/Cross';

interface ImageCollageProps {
  imageUris: string[];
}

const ImageCollage: React.FC<ImageCollageProps> = ({imageUris}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const handleImagePress = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
    setSelectedIndex(0);
  };

  const handleNext = () => {
    setSelectedIndex(prevIndex => (prevIndex + 1) % imageUris.length);
  };

  const handlePrevious = () => {
    setSelectedIndex(
      prevIndex => (prevIndex - 1 + imageUris.length) % imageUris.length,
    );
  };

  const renderImages = () => {
    const imagesToShow = imageUris.slice(0, 4); // Show up to 4 images
    const hasExtraImages = imageUris.length > 3;

    switch (imagesToShow.length) {
      case 1:
        return (
          <TouchableOpacity
            onPress={() => handleImagePress(0)}
            style={styles.fullImageWrapper}>
            <Image source={{uri: imageUris[0]}} style={styles.image} />
          </TouchableOpacity>
        );
      case 2:
        return (
          <View style={styles.imageGrid}>
            {imagesToShow.map((uri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index)}
                style={styles.halfImageWrapper}>
                <Image source={{uri: uri}} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
        );
      case 3:
      case 4:
        return (
          <View style={styles.imageGrid}>
            {imagesToShow.map((uri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index)}
                style={styles.imageWrapper}>
                <Image source={{uri: uri}} style={styles.image} />
                {index === 3 && hasExtraImages && (
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>
                      +{imageUris.length - 3}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderImages()}

      {modalVisible && (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={closeImageModal}>
          <View style={styles.modalContainer}>
            {selectedIndex > 0 && (
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={handlePrevious}>
                <Prev size={32} color="#fff" />
              </TouchableOpacity>
            )}
            <Image
              source={{uri: imageUris[selectedIndex]}}
              style={styles.enlargedImage}
            />
            {selectedIndex < imageUris.length - 1 && (
              <TouchableOpacity style={styles.iconWrapper} onPress={handleNext}>
                <Next height={30} color="#fff" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeImageModal}>
              <Cross color="#fff" height={32} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1, // Ensures the container is square-shaped
    backgroundColor: '#fff',
    padding: 2, // Space between the images and the container
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '48%',
    height: '25%',
    margin: 1, // Space between the images
  },
  fullImageWrapper: {
    width: '96%',
    height: '100%',
    margin: 1,
  },
  halfImageWrapper: {
    width: '48%',
    height: '100%',
    margin: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  overlayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enlargedImage: {
    width: '80%',
    height: '80%',
    borderRadius: 8,
  },
  iconWrapper: {
    paddingHorizontal: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 56,
    right: 26,
  },
});

export default ImageCollage;
