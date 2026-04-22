import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import từ các file của bạn
import NavigationBar, { AuthProvider } from "./src/nav_bar/navigation_bar";
import Rnews from "./src/screens/Rnews";// Đảm bảo đường dẫn này đúng với vị trí file Rnews.js

// Khởi tạo Stack
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
      {/* Để StatusBar màu đen đồng bộ với nền App */}
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <AuthProvider>
        <NavigationContainer theme={CustomDarkTheme}>
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: false, // Ẩn cái thanh tiêu đề trắng/xám mặc định đi
              animation: 'slide_from_right' // Hiệu ứng lướt sang trang đọc báo
            }}
          >
            {/* 1. Màn hình chính là cái thanh NavigationBar của bạn */}
            <Stack.Screen name="MainStack" component={NavigationBar} />

            {/* 2. Màn hình Rnews nằm "chờ" ở đây, khi nào nhấn tin tức mới gọi nó */}
            <Stack.Screen name="Rnews" component={Rnews} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});