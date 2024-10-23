import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { images, icons } from '@constants';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-8 pt-12">
        <View className="items-center mb-12">
          <Image 
            source={images.p2}
            className="w-48 h-48"
            resizeMode="contain"
          />
        </View>

        <Text className="text-2xl font-pbold text-primary text-center mb-8">
          Вход в систему
        </Text>

        <View className="mb-4">
          <TextInput
            className="bg-white p-4 rounded-lg text-primary"
            placeholder="Email или имя пользователя"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="mb-4 relative">
          <TextInput
            className="bg-white p-4 rounded-lg text-primary"
            placeholder="Пароль"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            className="absolute right-4 top-4"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image 
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className="bg-secondary py-4 rounded-full mb-4"
          onPress={() => {/* Здесь логика входа */}}
        >
          <Text className="text-white text-center font-pbold text-lg">
            Войти
          </Text>
        </TouchableOpacity>
        

        <View className="flex-row pt-6 items-center mb-8">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">или</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <TouchableOpacity className="mb-8">
          <Text className="text-accent text-center">Забыли пароль?</Text>
        </TouchableOpacity>

        
      </View>
    </SafeAreaView>
  );
}
