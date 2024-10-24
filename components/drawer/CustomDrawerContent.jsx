import { DrawerContentScrollView, DrawerGestureContext, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { images } from '../../constants/images';
import { useGlobalContext } from '../../context/GlobalProvider';
import { removeTokens } from '../../shared/api/auth';
import { FontAwesome, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';



export default function CustomDrawerContent(props) {
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();
    const { user, setIsLogged, setUser } = useGlobalContext();

    const handleLogout = async () => {
        await removeTokens();
        setIsLogged(false);
        setUser(null);
        router.push('/(auth)/sign-in');
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView 
                {...props} 
                scrollEnabled={false}
                contentContainerStyle={{
                    backgroundColor: "#DDE3FE",
                    paddingTop: top,
                }}
                >
                    <View style={{padding: 20}}>
                        <Image 
                            source={{uri: user?.avatar}}
                            style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center" }}
                        />
                        <Text
                            style={{
                                alignSelf: "center",
                                fontWeight: "500",
                                fontSize: 18,
                                paddingTop: 10,
                                color: "#5363f",
                            }}>
                            {user?.fullName}
                        </Text>

                    </View>
                    <View style={{backgroundColor: "#fff", paddingTop: 10}}>
                        <DrawerItemList {...props} />
                        <DrawerItem 
                            label={"Настройки"} 
                            onPress={() => { console.log('Настройки нажаты'); }} 
                            icon={({ size, color }) => (
                                <Ionicons name="settings-outline" size={size} color={color}/>
                            )}
                            labelStyle={{ marginLeft: -20 }}
                        />

                    </View>
                
            </DrawerContentScrollView>

            <View
                style={{
                    borderTopColor: "#DDE3FE",
                    borderTopWidth: 1,
                    padding: 20,
                    paddingBottom: 20 + bottom
                }}>
                    <TouchableOpacity onPress={handleLogout} style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="log-out-outline" size={24} color="#000" />
                        <Text style={{ marginLeft: 10, fontSize: 16, color: "#000" }}>Выход</Text>
                    </TouchableOpacity>
                
            </View>
        </View>
    );
}