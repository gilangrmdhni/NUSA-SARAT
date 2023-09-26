import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AppHeader = () => {
    const [greeting, setGreeting] = useState('');

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            setGreeting('Selamat Pagi');
        } else if (currentHour >= 12 && currentHour < 16) {
            setGreeting('Selamat Siang');
        } else {
            setGreeting('Selamat Sore');
        }
    };

    useEffect(() => {
        getGreeting();
    }, []);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Assalamualaikum</Text>
                <Text style={styles.greetingTexts}>{greeting}</Text>
            </View>
            <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="bell" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 30,
        backgroundColor: '#F16877',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    iconContainer: {
        paddingTop: 20,
        marginLeft: 50,
    },
    greetingContainer: {
        paddingTop: 20,
        paddingRight: 150,
    },
    greetingText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    greetingTexts: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    '@media (min-width: 768px)': {
        headerContainer: {
            paddingVertical: 20,
        },
        greetingText: {
            fontSize: 24,
        },
    },
});

export default AppHeader;
