import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const SaldoCard = () => {
    const [totalInfaq, setTotalInfaq] = useState(0);
    const [sessionDetail, setSessionDetail] = useState(null);
    const navigation = useNavigation();


    useEffect(() => {
        axios.get('https://api-nusa-sarat.nuncorp.id/api/v1/donation/ongoing')
            .then((response) => {
                const totalDonation = response.data.body.total;
                const sessionDetail = response.data.body.session_detail;

                setTotalInfaq(totalDonation);
                setSessionDetail(sessionDetail);
            })
            .catch((error) => {
                console.error('Error fetching donation data: ', error);
            });
    }, []);

    return (
        <Card style={styles.card}>
            <ImageBackground
                source={require('../assets/masjid.png')}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <Image source={require('../assets/logoSAIM.png')} style={styles.logo} />
                    </View>
                    <Text style={styles.balanceText}>Total Infaq</Text>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceValue}>Rp {totalInfaq.toLocaleString()}</Text>
                        {sessionDetail && (
                            <View style={styles.sessionInfo}>
                                <Text style={styles.sessionTitle}>{sessionDetail.title}</Text>
                            </View>
                        )}
                    </View>
                    {/* <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Infaq pressed')}>
                            <FontAwesome5 name="qrcode" size={20} color="#C0142B" />
                            <Text style={[styles.buttonText, { color: '#C0142B' }]}>Infaq</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('RiwayatInfaq')}>
                            <FontAwesome5 name="history" size={20} color="#C0142B" />
                            <Text style={[styles.buttonText, { color: '#C0142B' }]}>Riwayat</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </ImageBackground>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        margin: 12,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        borderRadius: 16,
        overflow: 'hidden',
    },
    backgroundImage: {
        opacity: 0.4,
    },
    overlay: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    balanceContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#C0142B',
        paddingBottom: 10,
    },
    balanceText: {
        color: '#C0142B',
        fontSize: 14,
    },
    balanceValue: {
        color: '#C0142B',
        fontSize: 24,
        fontWeight: 'bold',
    },
    sessionInfo: {
        backgroundColor: '#C0142B',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    sessionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        marginLeft: 8,
        fontWeight: 'bold',
    },
});

export default SaldoCard;
