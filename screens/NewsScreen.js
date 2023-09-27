import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const NewsDetail = ({ route }) => {
  const { news } = route.params;

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.slider}
        showsButtons={true}
      >
        {/* Tampilkan gambar dari donation_history dalam slider */}
        {news.donation_history.map((donation, index) => (
          <View key={index}>
            <Image source={{ uri: donation.image_url }} style={styles.image} />
          </View>
        ))}
      </Swiper>
      <View style={styles.contentContainer}>
        <Text style={styles.date}>{news.createdAt}</Text>
        <Text style={styles.description}>{news.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: 200,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
  },
});

export default NewsDetail;
