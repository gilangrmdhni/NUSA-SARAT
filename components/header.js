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

    const { width, height } = Dimensions.get('window');

    return (
        <View style={styles.headerContainer}>
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Assalamualaikum</Text>
                <Text style={styles.greetingTexts}>{greeting}</Text>
            </View>
            <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="bell" size={(24)} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '5%', 
        paddingTop: '10%',
        backgroundColor: '#C0142B',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    iconContainer: {
        paddingTop: '5%', 
        paddingRight: '10%',
        marginLeft: '5%',
    },
    greetingContainer: {
        paddingTop: '5%', 
        paddingRight: '35%', 
    },
    greetingText: {
        fontSize: 16, 
        fontWeight: 'bold',
        color: 'white',
    },
    greetingTexts: {
        fontSize: 10, 
        fontWeight: 'bold',
        color: 'white',
    },
});

export default AppHeader;
