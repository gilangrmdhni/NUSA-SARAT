import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const NewsDetail = ({ route }) => {
  const { news } = route.params;

  return (
    <View style={styles.container}>
      <Image source={news.image} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.date}>{news.date}</Text>
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
