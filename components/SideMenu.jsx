import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import { useRouter } from 'expo-router';


const SideMenu = ({ onClose }) => {
    const { user, isLogged } = useGlobalContext();
    const router = useRouter();
    
    const slideAnim = useRef(new Animated.Value(-300)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        // Параллельная анимация выезда бокового меню и появления затемненного слоя
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0, // Позиция, при которой меню полностью видимо
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1, // Полная непрозрачность слоя
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, [slideAnim, fadeAnim]);

    if (!isLogged) return null;

    const isAdmin = user?.roles.includes('admin');
    const isUser = user?.roles.includes('user');
    const isSuperAdmin = user?.roles.includes('superadmin');

    return (
        <View className="absolute left-0 top-0 h-full w-2/3 bg-white shadow-lg z-50 p-4 flex-row">
            
                {/* Полупрозрачный оверлей для закрытия меню */}
                <TouchableOpacity 
                    className="flex-1" 
                    onPress={onClose} 
                    activeOpacity={1}
                    style={{ flex: 1 }}
                >
                    <Animated.View style={{ flex: 1, backgroundColor: 'black', opacity: fadeAnim }} />
                </TouchableOpacity>

                {/* Анимированное боковое меню */}
                <Animated.View style={{ transform: [{ translateX: slideAnim }] }} className="w-2/3 bg-white shadow-lg p-4">
                    <SafeAreaView>
                    {isSuperAdmin && (
                        <TouchableOpacity onPress={() => { router.push('/(menu)/users'); onClose(); }}>
                        <Text className="mt-4 text-primary text-lg">Пользователи</Text>
                        </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity onPress={() => { router.push('/(menu)/polls'); onClose(); }}>
                        <Text className="mt-4 text-primary text-lg">Опросы</Text>
                    </TouchableOpacity>
                    </SafeAreaView>
                </Animated.View>
            
            
            
            
        </View>
    );
};

export default SideMenu;