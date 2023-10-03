import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const RiwayatInfaq = () => {
    const [donationHistory, setDonationHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://api-nusa-sarat.nuncorp.id/api/v1/donation/fetch/5')
            .then((response) => {
                const history = response.data.body.donation_history;
                const sortedHistory = history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setDonationHistory(sortedHistory);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching donation history: ', error);
                setError('Error fetching donation history');
                setLoading(false);
            });
    }, []);

    const renderHistoryItem = ({ item }) => (
        <View style={styles.historyItem}>
            <View>
                <Text style={styles.dateDay}>{getDayOfWeek(item.createdAt)}</Text>
                <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
            </View>
            <Text style={styles.amountText}>Rp {item.total.toLocaleString()}</Text>
        </View>
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
    };

    const getDayOfWeek = (dateString) => {
        const daysInIndonesian = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        return daysInIndonesian[dayIndex];
    };

    const getMonthName = (month) => {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return months[month];
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Riwayat Infaq</Text>
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : error ? (
                <Text style={[styles.loadingText, styles.errorText]}>{error}</Text>
            ) : (
                <FlatList
                    data={donationHistory}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderHistoryItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 20,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    dateDay: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F16877',
    },
    dateText: {
        fontSize: 14,
        color: '#666666',
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F16877',
    },
    loadingText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    errorText: {
        color: '#FF0000',
    },
});

export default RiwayatInfaq;
