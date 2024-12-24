import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const AddItem = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [pages, setPages] = useState('');
    const [open, setOpen] = useState(false);
    const [genres, setGenres] = useState([
        { label: 'Fiction', value: 'Fiction' },
        { label: 'Non-Fiction', value: 'Non-Fiction' },
        { label: 'Biography', value: 'Biography' },
        { label: 'History', value: 'History' },
        { label: 'Sci-Fi', value: 'Sci-Fi' },
        { label: 'Mystery', value: 'Mystery' },
        { label: 'Fantasy', value: 'Fantasy' },
        { label: 'Romance', value: 'Romance' },
        { label: 'Comedy', value: 'Comedy' },
        { label: 'Drama', value: 'Drama' },
    ]);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const handleAddBook = () => {
        const newBook = { title, author, genre, year: parseInt(year), pages: parseInt(pages) };

        axios.post('http://localhost:3001/api/books', newBook)
            .then(() => {
                alert('Book added successfully!');
                setTitle('');
                setAuthor('');
                setGenre('');
                setYear('');
                setPages('');
            })
            .catch((error) => {
                console.error('Error adding book:', error.response ? error.response.data : error.message);
                alert('Failed to add the book. Check console for details.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.actionTitle}>Add a Book</Text>
            <TouchableOpacity style={styles.addBook} onPress={toggleCollapse}>
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
                        placeholder="Title" 
                        value={title} 
                        onChangeText={setTitle} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholderTextColor="rgba(223, 246, 255, 0.5)" 
                        placeholder="Author" 
                        value={author} 
                        onChangeText={setAuthor} 
                    />
                    <DropDownPicker 
                        open={open}
                        value={genre}
                        items={genres}
                        setOpen={setOpen}
                        setValue={setGenre}
                        setItems={setGenres}
                        placeholder="Select Genre"
                        containerStyle={{ marginBottom: 10 }}
                        style={{ backgroundColor: '#191717', borderColor: '#DFF6FF' }}
                        dropDownContainerStyle={{ backgroundColor: '#191717', borderColor: '#DFF6FF' }}
                        textStyle={{ color: '#DFF6FF', fontFamily: 'Courier New' }}
                        listItemContainerStyle={{ backgroundColor: '#191717' }}
                        listItemLabelStyle={{ color: '#DFF6FF', fontFamily: 'Courier New' }}
                        placeholderStyle={{ color: 'rgba(223, 246, 255, 0.5)' }}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholderTextColor="rgba(223, 246, 255, 0.5)" 
                        placeholder="Year" 
                        value={year} 
                        keyboardType="numeric" 
                        onChangeText={setYear} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholderTextColor="rgba(223, 246, 255, 0.5)" 
                        placeholder="Pages" 
                        value={pages} 
                        keyboardType="numeric" 
                        onChangeText={setPages} 
                    />
                    <TouchableOpacity style={styles.addBook} onPress={handleAddBook}>
                        <ImageBackground 
                            source={require('../assets/images/add-book.png')}
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
    },
    addBook: {
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
    },
});

export default AddItem;
