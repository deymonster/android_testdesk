import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from 'expo-router/drawer';
import { Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';


const MenuLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1}}>

            <Drawer>
                <Drawer.Screen
                    name="polls"
                    options={{
                        drawerLabel: "Опросы",
                        drawerIcon: ()=> (
                            <FontAwesome name="tasks" size={24} color="#000" />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="users"
                    options={{
                        drawerLabel: "Пользователи",
                        drawerIcon: ()=> (
                            <FontAwesome name="users" size={24} color="#000" />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="results"
                    options={{
                        drawerLabel: "Результаты",
                        drawerIcon: ()=> (
                            <FontAwesome name="rocket" size={24} color="#000" />
                        ),
                    }}
                />
            </Drawer>

        </GestureHandlerRootView>
    )

}

export default MenuLayout