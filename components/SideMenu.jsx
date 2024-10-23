import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Animated, Dimensions } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import { useRouter } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.75;


const SideMenu = ({ isVisible, onClose }) => {
    const { user, isLogged } = useGlobalContext();
    const router = useRouter();
    
    const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        // Параллельная анимация выезда бокового меню и появления затемненного слоя
        if (isVisible) {
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
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -MENU_WIDTH,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        
      }, [isVisible]);

    if (!isLogged) return null;

    const isAdmin = user?.roles.includes('admin');
    const isUser = user?.roles.includes('user');
    const isSuperAdmin = user?.roles.includes('superadmin');

    return (
        <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, zIndex: 1000 }}>
            <Animated.View 
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'black',
                    opacity: fadeAnim,
                }}
            >
                <TouchableOpacity 
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={onClose}
                />
            </Animated.View>
            
            <Animated.View 
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: MENU_WIDTH,
                    backgroundColor: 'white',
                    transform: [{ translateX: slideAnim }],
                }}
            >
                <SafeAreaView style={{ flex: 1, padding: 20 }}>
                    <Text className="text-2xl font-pbold mb-4">Menu</Text>
                    {/* Add your menu items here */}
                </SafeAreaView>
            </Animated.View>
        </View>
    );
};

export default SideMenu;