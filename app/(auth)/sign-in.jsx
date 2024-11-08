import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { images, icons } from '@constants';
import { FontAwesome } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider';
import { login, } from '../../shared/api/auth';
import { getCurrentUser } from '../../shared/api/user';

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({email: '', password: ''});
  
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setIsLogged} = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleInputChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Введите email и пароль");
    };
    setIsSubmitting(true);
    try {
      console.log('Email', form.email, 'Password', form.password);
      const response = await login(form.email, form.password);
      const user = await getCurrentUser();
      setUser(user);
      setIsLogged(true);
      router.push('/(menu)/polls');
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert("Ошибка при входе");
    } finally {
      setIsSubmitting(false); 
    }

  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-6 pt-12">
        <View className="items-center mb-2">
          <Image 
            source={images.p2}
            className="w-48 h-48"
            resizeMode="contain"
          />
        </View>

        <View className="flex-row pt-1 items-center mb-8">
          <View className="flex-1 h-px bg-gray-300" />
            <FontAwesome name="star" size={24} color="#6b7280" style={{ marginHorizontal: 16 }} />
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <Text className="text-2xl font-pbold text-primary text-center mb-8">
          Вход в систему
        </Text>

        <View className="mb-4">
          <TextInput
            className="bg-white p-4 rounded-lg text-primary"
            placeholder="Email или имя пользователя"
            value={form.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
        </View>

        <View className="mb-4 relative">
          <TextInput
            className="bg-white p-4 rounded-lg text-primary"
            placeholder="Пароль"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={(value) => handleInputChange('password', value)}
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
          onPress={submit}
          disabled={isSubmitting}
        >
          <Text className="text-white text-center font-pbold text-lg">
            {isSubmitting ? 'Загрузка...' : 'Войти'}
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
