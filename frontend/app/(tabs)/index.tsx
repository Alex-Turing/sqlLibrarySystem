/*
* StAuth10244: We, Jackson Chagas and Alexander Hernandez, 000853046 and 000896328 
* certify that this material is my original work. 
* No other person's work has been used without due acknowledgement. 
* We have not made our work available to anyone else
*/

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import ListCollection from '../../components/ListCollection';
import AddItem from '../../components/AddItem';
import UpdateItem from '../../components/UpdateItem';
import DeleteItem from '../../components/DeleteItem';
import Summary from '../../components/Summary';

const App = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.column}>
                    <ListCollection />
                </View>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <View style={styles.column}>
                            <AddItem />
                        </View>
                        <View style={styles.column}>                        
                            <UpdateItem />                        
                        </View>
                        <View style={styles.column}>                        
                            <DeleteItem />
                        </View>
                    </View>
                </View>
                <View style={styles.summaryContainer}>
                    <Summary />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#06283D',
    },
    scrollView: {
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
        gap: 40,
    },
    column: {
        flex: 1,
        padding: 8,
    },
    summaryContainer: {
        flex: 1,
    },
});

export default App;