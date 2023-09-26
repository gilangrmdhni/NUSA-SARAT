import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const RiwayatSarat = () => {
    const [formHistory, setFormHistory] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const apiData = await fetchFormDataFromAPI();
                setFormHistory(apiData);
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        }

        fetchData();
    }, []);

    const fetchFormDataFromAPI = async () => {
        try {
            const response = await axios.get('https://api-nusa-sarat.nuncorp.id/api/v1/session/resume/history/1');
            return response.data.body;
        } catch (error) {
            console.error('Error fetching data from API:', error);
            throw error;
        }
    };

    const handleDeleteHistory = async () => {
        try {
            // belum ada 
        } catch (error) {
            console.error('Error deleting form history:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.riwayatSaratItem}>
            <Text style={styles.title}>{item.student_name}</Text>
            <Text style={styles.date}>Tanggal: {new Date(item.createdAt).toDateString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {formHistory.length > 0 ? (
                <FlatList
                    data={formHistory}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.flatListContent}
                />
            ) : (
                <Text style={styles.emptyText}>Tidak ada riwayat.</Text>
            )}
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteHistory}>
                <Text style={styles.deleteButtonText}>Hapus Riwayat</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    riwayatSaratItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
    flatListContent: {
        paddingTop: 12,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: '#F16877',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RiwayatSarat;
