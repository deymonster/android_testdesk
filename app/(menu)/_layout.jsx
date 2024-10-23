import { View, Text, SafeAreaView } from 'react-native';
import React,  { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';

const MenuLayout = () => {

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 mt-10">

      {/* Заголовок с гамбургером, заголовком и поиском */}
      <Header
        title="Опросы"
        onMenuPress={() => setIsMenuVisible(true)} 
        onSearchPress={() => console.log('Поиск')}
      />

      {/* Боковое меню */}
      {isMenuVisible && (
        <SideMenu onClose={() => setIsMenuVisible(false)} />
      )}

      {/* Содержимое страниц */}
      <Stack>
        <Stack.Screen name="polls" options={{ headerShown: false }} />
        <Stack.Screen name="users" options={{ headerShown: false }} />
        <Stack.Screen name="results" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  )
}

export default MenuLayout