import React from 'react'
import { View } from 'react-native'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{
        headerShown: false,  // Это уже скрывает header для всех экранов
        contentStyle: { backgroundColor: '#ECF0F1' },
      }}>
        <Stack.Screen 
          name="sign-in" 
          
        />
        {/* <Stack.Screen name="sign-up" />  */}
        
      </Stack>
    </View>
  )
}

export default AuthLayout
