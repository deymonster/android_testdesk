import { View, Text, RefreshControl, SafeAreaView, FlatList, Alert } from 'react-native'
import React, {useState, useRef} from 'react'
import useBackendHook from '../../hooks/useBackendHook'
import { getUsers, deleteUser } from '../../shared/api'
import UserCard from '../../components/user/UserCard'
import UserDetailBottomSheet from '../../components/user/UserDetailBottomSheet'
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';

const Users = () => {
  const { data: users, refetch } = useBackendHook(getUsers);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const sheetRef = useRef(null);
  

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  const handleUserPress = (user) =>{
    setSelectedUserForEdit(user);
    sheetRef.current?.expand();
  }

  const handleUserLongPress = (user) => {
    if (selectedUsers.includes(user.id))  {
      setSelectedUsers(selectedUsers.filter((id) => id !== user.id));

    } else {
      setSelectedUsers([...selectedUsers, user.id]);
    }
  }

  const handleDelete = async () => {
    Alert.alert('Удалить пользователя', 'Вы точно хотите удалить этого пользователя?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            await Promise.all(selectedUsers.map(id => deleteUser(id)));
            setSelectedUsers([]);
            refetch();
          } catch (error) {
            console.error('Ошибка при удалении пользователей:', error);
          }
        }
      }
    ]);
  };

  const handleSave = async (updatedUser) => {
    try {
      // update user in backend
      console.log('Сохранить пользователя:', updatedUser);
      refetch();
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
    }
  }

  

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <View className="flex-row justify-between items-center mb-4">
          {selectedUsers.length > 0 ? (
              <>
                <Ionicons name="close" size={28} color="#5363DF" onPress={() => setSelectedUsers([])} />
                <Text className="text-lg font-bold">{selectedUsers.length} выбрано</Text>
                <Ionicons name="trash-outline" size={28} color="red" onPress={handleDelete} />
              </>
            ) : (
              <Text className="text-2xl font-bold text-center mb-4">Список Пользователей</Text>
            )}
      </View>
      <FlatList 
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({item})=>(
          <UserCard 
            user={item}
            onPress={handleUserPress}
            onLongPress={handleUserLongPress}
             />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        ListEmptyComponent={<Text>Нет пользователей для отображения</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={['50%', '80%']}
      >
        {selectedUserForEdit && (
          <UserDetailBottomSheet
            user={selectedUserForEdit}
            onSave={handleSave}
            sheetRef={sheetRef}
          />
        )}
      </BottomSheet>

      
    </SafeAreaView>
    
  )
}

export default Users