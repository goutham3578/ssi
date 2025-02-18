import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


const Dropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(true);
    const screenHeight = Math.round(Dimensions.get('window').height);

    const activities = [
        { name: 'High club, Koramangala', date: '14/10/2023' },
        { name: 'Srishti Institute of Art, design', date: '03/10/2023' },
        { name: 'Issues as VC', date: '12/09/2023' },
    ];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const renderItem = () => (
        <View style={{display:'flex',flexDirection:'row',paddingHorizontal:screenHeight<600?3:5,paddingVertical:screenHeight<600?2:4,width:'100%',justifyContent:'space-between',marginHorizontal:'auto'}}>
            <Text style={{ fontSize: getFontSizel(), color: 'black' }}>mefjdnf</Text>
            <Text style={{ fontSize: getFontSizel(), color: 'black' }}>edfnjnfkj</Text>
        </View>
    );
    const getFontSizem = () => {
        return screenHeight < 600 ? screenHeight * 0.015 : screenHeight * 0.021;
    };
    const getFontSizel = () => {
        return screenHeight < 600 ? screenHeight * 0.016 : screenHeight * 0.018;
    }

    return (
        <View style={{width:'90%',margin:20}} >
            <TouchableOpacity onPress={toggleDropdown} style={styles.bordercase}  >
                <View style={{display:'flex',width:'100%',flexDirection:'row',justifyContent:'space-between',padding:screenHeight<600?10:15}} >
                    <Text style={{ fontSize: getFontSizem(), color: 'black',fontWeight:'bold' }}>Activities</Text>
                    <Feather name={dropdownOpen ? 'chevron-up' : 'chevron-down'} size={30} color="black" />
                </View>
            </TouchableOpacity>
            {dropdownOpen && (
                <FlatList
                    data={activities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

export default Dropdown;

const styles = StyleSheet.create({
    bordercase: {
        borderWidth: 1,
        borderColor: '#CBCBCC',
        borderRadius:10
    },
});
