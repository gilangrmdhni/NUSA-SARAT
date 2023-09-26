import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const SaldoCard = () => {
    return (
        <ImageBackground
            source={require('../assets/masjid.png')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.row}>
                    <FontAwesome5 name="wallet" size={24} color="#F16877" />
                    <View style={styles.item}>
                        <Text style={styles.itemText}>Total Infaq</Text>
                        <Text style={styles.itemValue}>Rp 500.000.000</Text>
                    </View>
                    <View style={styles.labels}>
                    <Text style={styles.sesiText}>Sesi 1</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: 90,
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 30,
        borderRadius: 8,
        maxWidth: windowWidth / 0.5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    item: {
        flex: 1,
        marginLeft: 20,
    },
    itemText: {
        fontSize: 14,
        color: 'black',
        marginTop: 4,
    },
    itemValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F16877',
        marginTop: 4,
    },
    sesiText: {
        fontSize: 16,
        color: 'white',
        padding : 3,
        borderRadius: '10',
    },
    labels: {
        backgroundColor: '#F16877',
        padding: 2,
        borderRadius: 8,
    }
});

export default SaldoCard;
