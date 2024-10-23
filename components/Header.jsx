import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Header = ({ title, onMenuPress, onSearchPress }) => {
    return (
        <View className="flex-row items-center mt-10 justify-between px-4 py-4 bg-background">

            <TouchableOpacity onPress={onMenuPress}>
                <Ionicons name="menu" size={24} color="#000" />
            </TouchableOpacity>

            <Text className="text-lg font-bold text-primary">
                {title}
            </Text>

            <TouchableOpacity onPress={onSearchPress}>
                <Ionicons name="search" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    )
}

export default Header;