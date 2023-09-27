import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const NewsList = () => {
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios.get('https://api-nusa-sarat.nuncorp.id/api/v1/news/filter')
      .then((response) => {
        setNewsData(response.data.body);
      })
      .catch((error) => {
        console.error('Error fetching news data: ', error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('NewsDetail', { news: item })}
    >
      <WebView
        style={styles.itemVideo}
        source={{ uri: item.video_url }}
      />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.description}</Text>
        <Text style={styles.itemDate}>{item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={newsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'column', // Mengatur tata letak vertikal
  },
  itemVideo: {
    width: '100%',
    aspectRatio: 16 / 9, // Rasio aspek video
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemContent: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDate: {
    marginTop: 8,
    color: 'gray',
  },
});

export default NewsList;
