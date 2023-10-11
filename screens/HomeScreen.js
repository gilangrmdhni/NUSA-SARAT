import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Sliders from '../components/slider';
import News from '../components/news';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SaldoCard from '../components/Saldo';
import Header from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const data = [
    { id: '1', title: 'Submit Sarat', description: 'Silahkan isi pertanyaan dengan benar', image: require('../assets/undraw_Note_list_re_r4u9.png'),  screenName: 'Submit' },
    { id: '2', title: 'Riwayat Sarat', description: 'Lihat Riwayat Sarat Anda', image: require('../assets/undraw_Publish_article_re_3x8h.png'), screenName: 'Riwayat' },
  ];
  const navigation = useNavigation();

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(item.screenName)}
      >
        <View style={styles.cardImageContainer}>
          <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <SaldoCard />
      <View style={styles.slider}>
        <Sliders />
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
      <View>
        <Text style={styles.titles}>News</Text>
        <News />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
    elevation: 5,
  },
  cardImageContainer: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 15,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    color: '#555',
  },
  slider: {
    flex: 1,
  },
  titles: {
    fontWeight: 'bold',
    paddingLeft: 20,
    fontSize: 18,
    marginTop: 10,
  },
  flatListContainer: {
    paddingTop: 10,
  },
});

export default HomeScreen;
