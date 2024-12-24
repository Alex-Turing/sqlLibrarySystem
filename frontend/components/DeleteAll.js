import React, {useState, useEffect} from 'react'; 
import  {View, TouchableOpacity, StyleSheet, Text, ImageBackground} from 'react-native';
import axios from 'axios';

const DeleteAll = () => {
    const handleDeleteAll = () => {
        axios.delete('http://localhost:3001/api/books')
        .then(() => {
            alert('All Items Deleted Successfully!');
        })
        .catch((error) => {
            alert('Failed to delete items, please try again later.');
            console.error(error);
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleDeleteAll}>
                <Text style={styles.actionTitle}>Delete All Books</Text>
            </TouchableOpacity>
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
    alignSelf: 'flex-end',
    width: 150,
    textDecorationLine: 'underline',
    width: 200,
},
});

export default DeleteAll;