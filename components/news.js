import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const NewsList = () => {
    const navigation = useNavigation();
    const data = [
        {
            id: 1,
            title: 'Belajar Adab Sebelum Ilmu | Karya Tulis Ananda Nabhan',
            date: '1 Januari 2023',
            description: 'Tulisan ini adalah karya tulis spontanitas salah satu murid SAIM Depok yang dikirimkan oleh orang tuanya dan diminta untuk dishare untuk menjadi motivasi bagi teman-teman Nabhan lainnya, pada khususnya. Mari kita simak apa saja isi tulisan beliau.',
            image: require('../assets/nabhan01.jpg'),
        },
        {
            id: 2,
            title: 'Daftar Murid Lulus Seleksi Masuk SAIM Lampung',
            date: '1 Januari 2023',
            description: 'Bismillah, Berikut ini daftar nama murid yang dinyatakan LULUS seleksi masuk Sekolah Adab Insan Mulia (SAIM) Cabang Bandar Lampung.',
            image: require('../assets/saim-lampung-02.png'),
        },
    ];

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('NewsDetail', { news: item })}
      >
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
        flexDirection: 'row', // Mengatur tampilan dalam satu baris
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
    },
    itemImage: {
        width: 100, // Lebar gambar
        height: 100, // Tinggi gambar
        resizeMode: 'cover',
        borderRadius: 8,
    },
    itemContent: {
        flex: 1, // Mengisi sisa ruang dengan teks
        marginLeft: 12, // Jarak antara gambar dan teks
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
