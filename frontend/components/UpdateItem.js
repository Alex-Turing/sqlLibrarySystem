import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import axios from 'axios';

const UpdateItem = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [pages, setPages] = useState('');

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const handleUpdate = () => {
        if (!id.trim()) 
        {
            alert('Please enter the Book ID.');
            return;
        }
        const updateFields = {};
        if (title.trim()) updateFields.title = title;
        if (author.trim()) updateFields.author = author;
        if (genre.trim()) updateFields.genre = genre;
        if (year.trim() && !isNaN(year) && parseInt(year) > 0) updateFields.year = year;
        if (pages.trim() && !isNaN(pages) && parseInt(pages) > 0) updateFields.pages = pages;

        if (Object.keys(updateFields).length === 0) 
        {
            alert('Please fill in at least one field to update.');
            return;
        }

        axios.put(`http://localhost:3001/api/books/${id}`, { title, author, genre, year, pages})
        .then(() => {
            setId('');                
            setTitle('');
            setAuthor('');
            setGenre('');
            setYear('');
            setPages('');
            alert('Item Updated Successfully!');
        })
        .catch(error => {
            console.error(error);
            alert('Failed to update the book. Please try again later.');
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.actionTitle}>Update a Book</Text>
            <TouchableOpacity style={styles.updateBook} onPress={toggleCollapse}>
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(223, 246, 255, 0.5)" 
                    placeholder="New Title"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(223, 246, 255, 0.5)" 
                    placeholder="New Author"
                    value={author}
                    onChangeText={setAuthor}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(223, 246, 255, 0.5)" 
                    placeholder="New Genre"
                    value={genre}
                    onChangeText={setGenre}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(223, 246, 255, 0.5)" 
                    placeholder="New Year"
                    value={year}
                    onChangeText={setYear}
                />
                <TextInput      
                    style={styles.input}
                    placeholderTextColor="rgba(223, 246, 255, 0.5)" 
                    placeholder="New Pages"
                    value={pages}
                    onChangeText={setPages}
                />
                <TouchableOpacity style={styles.updateBook} onPress={handleUpdate}>
                    <ImageBackground 
                        source={require('../assets/images/update-book.png')}
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
        padding: 20, 
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
    updateBook: {
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

export default UpdateItem;
