import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@constants';

export default function Welcome() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-between bg-background p-8">
      <View className="flex-1 items-center justify-center">
        <Image 
          source={images.p2}
          className="w-64 h-64 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-pbold text-primary text-center mb-4">
          TestDesk App
        </Text>
        <Text className="text-lg font-pregular text-primary text-center">
          Готовы пройти опросы и поделиться своим мнением?
        </Text>
      </View>
      
      <TouchableOpacity 
        className="w-full bg-secondary py-4 rounded-full"
        onPress={() => router.push('/(auth)/sign-in')}
      >
        <Text className="text-white text-center font-pbold text-lg">
          Начать
        </Text>
      </TouchableOpacity>
    </View>
  );
}
