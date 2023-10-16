// components/News.js

import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const fetchData = async () => {
  try {
    const response = await axios.get('https://api-nusa-sarat.nuncorp.id/api/v1/news/filter');
    return response.data.body;
  } catch (error) {
    console.error('Error fetching news data: ', error);
    throw error;
  }
};

const News = forwardRef(({ onRefresh, refreshing }, ref) => {
  const navigation = useNavigation();
  const [newsData, setNewsData] = React.useState([]);
  const [visibleNews, setVisibleNews] = React.useState(5);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api-nusa-sarat.nuncorp.id/api/v1/news/filter');
      console.log('Response from API:', response.data); // Add this log
      setNewsData(response.data.body);
    } catch (error) {
      console.error('Error fetching news data: ', error);
    }
  };

  const loadMore = () => {
    setVisibleNews((prevVisibleNews) => prevVisibleNews + 5);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Call the refresh function passed from HomeScreen
      onRefresh(fetchData);
    });

    return unsubscribe;
  }, [navigation, onRefresh]);

  // Expose fetchData function through the ref
  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  const renderItem = ({ item }) => {
    const createdAtDate = new Date(item.createdAt);

    const day = createdAtDate.getDate();
    const month = createdAtDate.toLocaleString('default', { month: 'long' });
    const year = createdAtDate.getFullYear();

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('NewsDetail', { news: item })}
      >
        <Image
          style={styles.itemVideo}
          source={{ uri: `https://api-nusa-sarat.nuncorp.id/storage/${item.thumbnail}` }}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{`${item.description.substring(0, 48)} ...`}</Text>
          <Text style={styles.itemDate}>{`${day} ${month} ${year}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={newsData.slice(0, visibleNews)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {visibleNews < newsData.length && (
        <Button title="Load More" onPress={loadMore} />
      )}
    </View>
  );
});

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
    flexDirection: 'column',
  },
  itemVideo: {
    width: '100%',
    aspectRatio: 16 / 9,
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

export default News;
