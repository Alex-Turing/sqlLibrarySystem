import React, { useState } from 'react';
import axios from 'axios';
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const Summary = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false); // Start with loading as false
    const [error, setError] = useState(null);

    const handleSummary = () => {
        setLoading(true);
        axios
            .get('http://localhost:3001/api/books/summary')
            .then(response => {
                setSummary(response.data);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) 
    {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (error) 
    {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <TouchableOpacity style={styles.button} onPress={handleSummary}>
                    <Text style={styles.buttonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!summary) 
    {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleSummary}>
                    <Text style={styles.buttonText}>Summary Of Books</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Summary</Text>
            <Text style={styles.totalBooks}>Total Books: {summary.totalBooks}</Text>
            <FlatList
                data={summary.booksByGenre}
                keyExtractor={(item, index) => `${item.genre || 'Unknown'}-${index}`}
                renderItem={({ item }) => (
                    <Text style={styles.genre}>
                        {item.genre || 'Unknown'}: {item.count}
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#DFF6FF',
    },
    totalBooks: {
        fontSize: 18,
        marginBottom: 12,
        color: '#DFF6FF',
    },
    genre: {
        fontSize: 16,
        marginVertical: 4,
        color: '#DFF6FF',
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: '#2c3e50',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        padding: 12,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Courier New',
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
    },
});

export default Summary;