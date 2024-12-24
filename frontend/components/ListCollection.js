import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import DeleteAll from './DeleteAll';

const ListCollection = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const [genre, setGenre] = useState('');
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

    useEffect(() => {
        axios.get('http://localhost:3001/api/books')
            .then((response) => {
                setBooks(response.data);
                setFilteredBooks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    }, []);

    useEffect(() => {
        if(genre)
        {
            const filteredBooks = books.filter((book) => book.genre === genre);
            setFilteredBooks(filteredBooks);
        }
        else
        {
            setFilteredBooks(books);
        }
    }, [genre, books]);

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>MY PERSONAL LIBRARY</Text>
                <Text style={styles.genreList}>Filter by Genre</Text>
                <View style={styles.dropDownContainer}>
                    <View style={[styles.dropDown, open ? { height: 250 } : { height: 0 }]}>
                        <DropDownPicker
                            open={open}
                            value={genre}
                            items={genres}
                            setOpen={setOpen}
                            setValue={setGenre}
                            setItems={setGenres}
                            placeholder="Select Genre"
                            style={{ backgroundColor: '#191717', borderColor: '#DFF6FF', marginBottom: 10 }}
                            dropDownContainerStyle={{ backgroundColor: '#191717', borderColor: '#DFF6FF' }}
                            textStyle={{ color: '#DFF6FF', fontFamily: 'Courier New' }}
                            placeholderStyle={{ color: 'rgba(223, 246, 255, 0.5)' }}
                        />
                    </View>
                    <DeleteAll/>
                </View>
                <View style={styles.tableHeader}>
                    <Text style={[styles.cell, styles.headerCell]}>ID</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Title</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Author</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Genre</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Release Year</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Number of Pages</Text>
                </View>
                <FlatList
                    data={filteredBooks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.cell}>{item.id}</Text>
                            <Text style={styles.cell}>{item.title}</Text>
                            <Text style={styles.cell}>{item.author}</Text>
                            <Text style={styles.cell}>{item.genre}</Text>
                            <Text style={styles.cell}>{item.year}</Text>
                            <Text style={styles.cell}>{item.pages}</Text>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        height: 800,
    },
    container: { 
        padding: 20, 
        flex: 1,
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 30,
        alignSelf: 'center', 
        color: '#47B5FF',
        fontFamily: 'Courier New',
    },
    genreList: {
        fontSize: 16,
        color: '#47B5FF',
        fontFamily: 'Courier New',
    },
    dropDownContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 50,
        alignItems: 'center',
    },
    dropDown: {
        width: '15%',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#DFF6FF',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: '#DFF6FF',
        fontFamily: 'Courier New',
    },

    headerCell: {
        fontWeight: 'bold',
        color: '#06283D',
        fontFamily: 'Courier New',
        fontSize: 16,
    },
});

export default ListCollection;
