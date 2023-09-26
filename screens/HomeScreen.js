import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Sliders from '../components/slider'
import News from '../components/news'
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SaldoCard from '../components/Saldo';
import Header from '../components/header'

const HomeScreen = () => {
  const data = [
    { id: '1', title: 'Submit Sarat', image: require('../assets/undraw_Note_list_re_r4u9.png'), screenName: 'Submit' },
    { id: '2', title: 'Riwayat Sarat', image: require('../assets/undraw_creative_experiment_8dk3.png'), screenName: 'Riwayat' },
    { id: '3', title: 'Hasil Sarat', image: require('../assets/undraw_Forms_re_pkrt.png'), screenName: 'Hasil' },
  ];
  const navigation = useNavigation();

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(item.screenName)}
      >
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View>
        <SaldoCard />
      </View>
      <View style={styles.slider}>
        <Sliders />
      </View>
      <View >
        <FlatList
          data={data}
          numColumns={3}
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
  card: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  slider: {
    marginTop:10
  },
  titles: {
    fontWeight: 'bold',
    paddingLeft: 20,
    fontSize: 18,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: '100%',
    height: 85,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 6, 
    color: '#F16877',
  },
});

export default HomeScreen;
