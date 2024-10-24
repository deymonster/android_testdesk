import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserCard = ({ user, onPress, onLongPress }) => {
    return (
        <TouchableOpacity 
            onPress={() => onPress(user)}
            onLongPress={() => onLongPress(user)}
            className="flex-row p-4 bg-white rounded-lg mb-4 shadow-sm shadow-black"
        >
             <Image source={{ uri: user.avatar }} className="w-12 h-12 rounded-full mr-4" />
             <View className="flex-1 justify-center">
                <Text className="text-base font-bold text-gray-800">{user.fullName}</Text>
                <Text className="text-sm text-gray-500">{user.email}</Text>
                <Text className="text-sm text-gray-600">
                    Роль: {user.roles.join(', ')}
                </Text>
               
             </View>
        </TouchableOpacity>
    );
};


  
  export default UserCard;