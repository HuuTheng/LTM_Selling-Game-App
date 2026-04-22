// src/nav_bar/navigation_bar.js
import React, { createContext, useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import IconManager, { APP_ICONS } from "../constants/icons";

// Import các màn hình
import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import LibraryScreen from "../screens/Library";
import NewsScreen from "../screens/News";
import MenuScreen from "../screens/Menu";
import GameDetail from "../screens/GameDetail";
import Rnews from "../screens/Rnews";
import Cart from '../screens/Cart'; // Đã import trang Cart

// --- 1. AUTH & THEME CONTEXT ---
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); 

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isDarkMode, setIsDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// --- 2. LOGO COMPONENT ---
const HeaderLogo = () => (
  <Image
    source={require("../../assets/anh/realdeal.png")}
    style={{ width: 120, height: 40, resizeMode: "contain" }}
  />
);

// --- 3. MAIN TAB NAVIGATOR ---
const MainTabs = () => {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useAuth();

  const themeColors = {
    bg: isDarkMode ? "#1f1f1f" : "#ffffff",
    border: isDarkMode ? "#333" : "#e0e0e0",
    textInactive: isDarkMode ? "#888" : "#999",
    active: "#00f5ff",
  };

  return (
    <Tab.Navigator
      initialRouteName="HOME"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        headerTitle: (props) => <HeaderLogo {...props} />, 
        headerStyle: {
          backgroundColor: themeColors.bg,
          borderBottomWidth: 1,
          borderBottomColor: themeColors.border,
          height: 60 + insets.top,
          elevation: 0,
          shadowOpacity: 0,
        },

        tabBarIcon: ({ focused }) => {
          const iconConfig = APP_ICONS[route.name] || APP_ICONS.HOME;
          return (
            <View style={{ alignItems: "center", width: 60 }}>
              {focused && <View style={styles.activeIndicator} />}
              <IconManager 
                name={iconConfig.name} 
                type={iconConfig.type} 
                size={focused ? 28 : 20} 
                color={focused ? themeColors.active : themeColors.textInactive} 
              />
            </View>
          );
        },

        tabBarActiveTintColor: themeColors.active,
        tabBarInactiveTintColor: themeColors.textInactive,

        tabBarStyle: {
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 12,
          backgroundColor: themeColors.bg,
          borderTopWidth: 1,
          borderTopColor: themeColors.border,
          elevation: 0,
        },

        tabBarLabel: ({ focused }) => {
          let label = "";
          switch (route.name) {
            case "HOME":   label = "Trang chủ"; break;
            case "SEARCH": label = "Tìm kiếm"; break;
            case "LIBRARY": label = "Thư viện"; break;
            case "NEWS":   label = "Tin tức"; break;
            case "MENU":   label = "Menu"; break;
          }
          return (
            <Text style={{ 
              color: focused ? themeColors.active : themeColors.textInactive, 
              fontSize: 11,
              fontWeight: focused ? "700" : "500",
              marginTop: 4
            }}>
              {label}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="HOME"   component={HomeScreen} />
      <Tab.Screen name="SEARCH" component={SearchScreen} />
      <Tab.Screen name="LIBRARY" component={LibraryScreen} />
      <Tab.Screen name="NEWS"   component={NewsScreen} />
      <Tab.Screen name="MENU"   component={MenuScreen} /> 
    </Tab.Navigator>
  );
};

// --- 4. EXPORT NAVIGATION BAR ---
const NavigationBar = () => {
  const { isDarkMode } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabs} />

      {/* MÀN HÌNH GIỎ HÀNG (MỚI) */}
      <Stack.Screen 
        name="CART" 
        component={Cart} 
        options={{ 
          headerShown: true,
          headerTitle: "Giỏ hàng",
          headerStyle: { 
            backgroundColor: isDarkMode ? '#1f1f1f' : '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#333' : '#eee'
          },
          headerTintColor: '#00f5ff',
          headerTitleStyle: { color: isDarkMode ? '#fff' : '#000', fontWeight: 'bold' }
        }} 
      />

      <Stack.Screen 
        name="GameDetail" 
        component={GameDetail} 
        options={{ 
          headerShown: true,
          headerTitle: "Chi tiết game",
          headerStyle: { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' },
          headerTintColor: '#00f5ff',
          headerTitleStyle: { color: isDarkMode ? '#fff' : '#000' }
        }} 
      />

      <Stack.Screen 
        name="Rnews" 
        component={Rnews} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  activeIndicator: {
    position: "absolute",
    top: -12,
    width: 40,
    height: 3,
    backgroundColor: "#00f5ff",
    borderRadius: 10,
  }
});