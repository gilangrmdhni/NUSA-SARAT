import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Button } from 'react-native';
// import { WebView } from 'react-native-webview';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const NewsList = () => {
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]);
  const [visibleNews, setVisibleNews] = useState(5);

  useEffect(() => {
    axios.get('https://api-nusa-sarat.nuncorp.id/api/v1/news/filter')
      .then((response) => {
        setNewsData(response.data.body);
      })
      .catch((error) => {
        console.error('Error fetching news data: ', error);
      });
  }, []);

  const loadMore = () => {
    setVisibleNews((prevVisibleNews) => prevVisibleNews + 5);
  };


  const renderItem = ({ item }) => {
    const createdAtDate = new Date(item.createdAt);

    const day = createdAtDate.getDate();
    const month = createdAtDate.toLocaleString('default', { month: 'long' }); // Mengambil nama bulan
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

export default NewsList;
