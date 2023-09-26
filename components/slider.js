
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';


const PhotoSlider = () => {
  const data = [
    { id: '1', image: require('../assets/foto1.png') },
    { id: '2', image: require('../assets/foto2.png') },
    { id: '3', image: require('../assets/foto3.png') },
    // Tambahkan foto lainnya sesuai kebutuhan
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
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
        autoplayInterval={3000} // Waktu perpindahan slide (dalam milidetik)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
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
});

export default PhotoSlider;
