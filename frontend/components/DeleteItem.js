import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import axios from 'axios';

const DeleteItem = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [id, setId] = useState('');

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const handleDelete = () => {
        axios.delete(`http://localhost:3001/api/books/${id}`)
            .then(() => {
                setId('');
                alert('Item Deleted Successfully!');
            })
            .catch(error => console.error(error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.actionTitle}>Delete a Book</Text>
            <TouchableOpacity style={styles.deleteBook} onPress={toggleCollapse}>
                <ImageBackground
                    source={require('../assets/images/hamburguer.png')}
                    style={styles.buttonIcon}
                />
            </TouchableOpacity>
            {!isCollapsed && (
            <View>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(223, 246, 255, 0.5)" 
                    placeholder="ID"
                    value={id}
                    onChangeText={setId}
                />
                <TouchableOpacity style={styles.deleteBook} onPress={handleDelete}>
                    <ImageBackground 
                        source={require('../assets/images/delete-book.png')}
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        padding: 20 
    },
    actionTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Courier New',
        fontSize: 16,
        color: '#DFF6FF',
        alignSelf: 'center',
        width: 150,
    },
    deleteBook: {
        backgroundColor: '#DFF6FF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 40,
    },
    buttonIcon :{
        width: 30,
        height: 30,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    input: { 
        height: 40, 
        borderColor: '#DFF6FF',  
        borderWidth: 1, 
        marginBottom: 10, 
        padding: 10,
        color: '#DFF6FF', 
        backgroundColor: '#191717',
        borderRadius: 8,
        fontFamily: 'Courier New',
        fontSize: 14,
    }
});

export default DeleteItem;
