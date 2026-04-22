import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
// 1. IMPORT THƯ VIỆN THÔNG BÁO
import FlashMessage from "react-native-flash-message"; 

// Import từ navigation_bar
import NavigationBar, { AuthProvider } from "./src/nav_bar/navigation_bar";

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    card: '#1f1f1f',
    text: '#ffffff',
    border: '#333333',
    notification: '#00f5ff',
  },
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <AuthProvider>
        <NavigationContainer theme={CustomDarkTheme}>
          <NavigationBar />
        </NavigationContainer>
      </AuthProvider>

      {/* 2. ĐẶT THÀNH PHẦN THÔNG BÁO Ở ĐÂY */}
      {/* Cấu hình floating để thông báo nổi lên và bo góc đẹp */}
      <FlashMessage 
        position="top" 
        floating={true} 
        hideStatusBar={false} 
        style={{ marginTop: 10, borderRadius: 12 }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});