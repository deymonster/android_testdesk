import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getCompany, getUserById, updateUser, deleteUser } from '../../shared/api';
import BottomSheet from '@gorhom/bottom-sheet';

const UserDetailBottomSheet = ({ user, onSave, sheetRef }) => {
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.roles[0]);

    const snapPoints = useMemo(() => ['50%', '100%'], []);

    
    const [isLoading, setIsLoading] = useState(true);
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        const fetchUserCompany = async () => {
            try {
                setIsLoading(true);
                if (user.companyId) {
                    const userCompany = await getCompany(user.companyId);
                    if (userCompany) {
                        setCompanyName(userCompany.name || 'Неизвестная компания');
                    }
                }
                
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserCompany();
    }, [user.companyId]);


    
    return (
        <BottomSheet ref={sheetRef} index={-1} snapPoints={snapPoints}>
             <View className="p-4 bg-white rounded-t-lg">
             <Text className="text-xl font-bold mb-4">Редактирование Пользователя</Text>
             <Text className="mb-2">Имя:</Text>
             <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-4"
                value={fullName}
                onChangeText={setFullName}
                />

             <Text className="mb-2">Email:</Text>
             <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-4"
                value={email}
                onChangeText={setEmail}
            />

            <Text className="mb-2">Роль:</Text>
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-4"
                value={role}
                onChangeText={setRole}
                />

            {companyName && (
                <View className="mt-4">
                    <Text className="text-lg font-semibold">Компания:</Text>
                    <Text className="text-sm text-gray-700">{companyName}</Text>
                </View>
            )}
            <TouchableOpacity
                className="bg-blue-500 py-3 rounded-lg mt-6"
                onPress={() => {
                    const updatedUser ={
                        ...user,
                        fullName,
                        email,
                    };
                    onSave(updatedUser);
                    sheetRef.current.close();
                }}

                
            >   
                <Text className="text-center text-white font-bold">Сохранить</Text>

            </TouchableOpacity>

            </View>

        </BottomSheet>
    )
};

export default UserDetailBottomSheet;
