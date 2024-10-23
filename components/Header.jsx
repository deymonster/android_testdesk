import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Header = ({ title, onMenuPress, onSearchPress }) => {
    return (
        <View className="flex-row items-center justify-between px-4 py-4 bg-background">

            <TouchableOpacity onPress={onMenuPress}>
                <FontAwesome name="bars" size={24} color="#000" />
            </TouchableOpacity>

            <Text className="text-lg font-bold text-primary">
                {title}
            </Text>

            <TouchableOpacity onPress={onSearchPress}>
                <FontAwesome name="search" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    )
}

export default Header;