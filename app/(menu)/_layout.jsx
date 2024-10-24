import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import { TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import CustomDrawerContent from "../../components/drawer/CustomDrawerContent";



const MenuLayout = () => {
    return (
       
       <GestureHandlerRootView style={{ flex: 1}}>
            <Drawer drawerContent={CustomDrawerContent} screenOptions={{
                drawerHideStatusBarOnOpen: false,
                drawerActiveBackgroundColor: "#5363DF",
                drawerActiveTintColor: "#fff",
                drawerLabelStyle: { marginLeft: -20 },
            }}>
                <Drawer.Screen name="polls" options={
                    {
                        drawerLabel: "Опросы",
                        headerTitle: "Мои опросы",
                        drawerIcon: ({ size, color }) => (
                            <Ionicons name="help-circle-outline" size={size} color={color} />
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                            style={{ marginRight: 15 }}
                            onPress={() => console.log("Поиск нажато")}
                            >
                                 <Ionicons name="search-outline" size={24} color="#000" />
                            </TouchableOpacity>
                        ),
                    
                    }
                }/>

                <Drawer.Screen name="results" options={
                    {
                        drawerLabel: "Результаты",
                        headerTitle: "Результаты",
                        drawerIcon: ({ size, color }) => (
                            <Ionicons name="stats-chart-outline" size={size} color={color} />
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                            style={{ marginRight: 15 }}
                            onPress={() => console.log("Поиск нажато")}
                            >
                                 <Ionicons name="search-outline" size={24} color="#000" />
                            </TouchableOpacity>
                        ),
                    
                    }
                }/>

                <Drawer.Screen name="users" options={
                    {
                        drawerLabel: "Пользователи",
                        headerTitle: "Пользователи",
                        drawerIcon: ({ size, color }) => (
                            <Ionicons name="person-circle-outline" size={size} color={color} />
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                            style={{ marginRight: 15 }}
                            onPress={() => console.log("Поиск нажато")}
                            >
                                 <Ionicons name="search-outline" size={24} color="#000" />
                            </TouchableOpacity>
                        ),
                    
                    }
                }/>

               
            </Drawer>
        </GestureHandlerRootView>
    )

}

export default MenuLayout