import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme } from "@react-navigation/native";

// Import từ navigation_bar
import NavigationBar, { AuthProvider } from "./src/nav_bar/navigation_bar";

// Theme tối tùy chỉnh (giảm flash trắng rất nhiều)
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',   // Nền chính
    card: '#1f1f1f',         // Nền của các screen và header
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});