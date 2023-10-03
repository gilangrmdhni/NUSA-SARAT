import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Modal, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const PhotoSlider = () => {
  const data = [
    { id: '1', image: require('../assets/foto1.png') },
    { id: '2', image: require('../assets/foto2.png') },
    { id: '3', image: require('../assets/foto3.png') },
    { id: '4', image: require('../assets/foto4.png') },
    // Tambahkan foto lainnya sesuai kebutuhan
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => openModal(item.image)}>
        <View style={styles.slide}>
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        </View>
      </TouchableOpacity>
    );
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8}
        loop
        autoplay
        autoplayInterval={3000}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={[styles.modalContainer, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
          {/* 
      Isi modal, seperti gambar dan tombol close.
      Perhatikan bahwa backgroundColor pada style diatur untuk memberikan efek transparansi.
    */}
          <Image source={selectedImage} style={styles.modalImage} resizeMode="contain" />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: Dimensions.get('window').width * 0.8,
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#C0142B',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
  },
});

export default PhotoSlider;
