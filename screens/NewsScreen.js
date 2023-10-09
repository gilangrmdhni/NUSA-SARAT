import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const NewsDetail = ({ route }) => {
  const { news } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Swiper
        style={styles.slider}
        showsButtons={true} 
      >
        {news.images.map((images, index) => (
          <View key={index}>
            <Image source={{ uri: `https://api-nusa-sarat.nuncorp.id/storage/${images.image_url}` }} style={styles.image} />
          </View>
        ))}
      </Swiper>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.date}>{news.date}</Text>
        <Text style={styles.description}>{news.description}</Text>
      </View>
    </ScrollView>
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
