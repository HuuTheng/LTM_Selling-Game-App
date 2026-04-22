import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from "react-native-flash-message"; 

// --- PHẦN IMPORT CÁC MÀN HÌNH (Quan trọng nhất) ---
import Home from './src/screens/Home';      // Đã thêm để sửa lỗi "Property Home doesn't exist"
import Login from './src/screens/Login';    // Đảm bảo có file này
import Register from './src/screens/Register'; 
import Rnews from "./src/screens/Rnews";
import GameDetail from './src/screens/GameDetail'; 

// Import NavigationBar và AuthProvider từ file nav_bar
// Lưu ý: Chỉ import một lần duy nhất để tránh lỗi "already been declared"
import NavigationBar, { AuthProvider } from "./src/nav_bar/navigation_bar";

const Stack = createNativeStackNavigator();

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000',   
    card: '#121212',         
    text: '#ffffff',
    border: '#333333',
    notification: '#00f5ff',
  },
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <AuthProvider>
        <NavigationContainer theme={CustomDarkTheme}>
          <Stack.Navigator 
            initialRouteName="HomeGuest"
            screenOptions={{ headerShown: false }} // Xóa chữ HOME to đùng
          >
            
            {/* Trang chủ cho khách - Không có thanh điều hướng dưới */}
            <Stack.Screen name="HomeGuest" component={Home} />
            
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Rnews" component={Rnews} />
            <Stack.Screen name="GameDetail" component={GameDetail} />
            
            {/* Khi đăng nhập xong mới nhảy vào đây để có TabBar */}
            <Stack.Screen name="MainStack" component={NavigationBar} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>

      <FlashMessage 
        position="top" 
        floating={true} 
        style={{ marginTop: 10, borderRadius: 12 }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});