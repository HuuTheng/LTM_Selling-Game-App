// src/nav_bar/navigation_bar.js
import React, { createContext, useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import IconManager, { APP_ICONS } from "../constants/icons";
import Footer from "./footer";           // Import Footer

// Import các màn hình thật
import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import LibraryScreen from "../screens/Library";
import NewsScreen from "../screens/News";
import MenuScreen from "../screens/Menu";        // ← Đây là file Menu.js thật
import LoginScreen from "../screens/Login"; 
import RegisterScreen from "../screens/Register";

// Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="HOME"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#1f1f1f",
          borderBottomWidth: 1,
          borderBottomColor: "#333",
        },
        headerTitleStyle: {
          color: "#00f5ff",
          fontSize: 18,
          fontWeight: "bold",
        },

        tabBarIcon: ({ focused }) => {
          const iconConfig = APP_ICONS[route.name] || APP_ICONS.HOME;
          return (
            <View style={{ alignItems: "center", width: 60 }}>
              {focused && <View style={styles.activeIndicator} />}
              <IconManager 
                name={iconConfig.name} 
                type={iconConfig.type} 
                size={focused ? 38 : 34} 
                color={focused ? "#00f5ff" : "#888"} 
              />
            </View>
          );
        },

        tabBarActiveTintColor: "#00f5ff",
        tabBarInactiveTintColor: "#888",

        tabBarStyle: {
          height: 82 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 12,
          backgroundColor: "#1f1f1f",
          borderTopWidth: 1,
          borderTopColor: "#333",
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
              color: focused ? "#00f5ff" : "#888", 
              fontSize: 11.5,
              fontWeight: focused ? "700" : "500",
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

const NavigationBar = () => {
  const { isLoggedIn } = useAuth(); // Lấy trạng thái đăng nhập từ Context

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        // Nếu chưa đăng nhập, chỉ cho phép vào cụm Auth
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // Nếu đã đăng nhập, cho phép vào các tab chính
        <Stack.Screen name="Main" component={MainTabs} />
      )}
    </Stack.Navigator>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  activeIndicator: {
    position: "absolute",
    top: -10,
    width: 48,
    height: 4,
    backgroundColor: "#00f5ff",
    borderRadius: 10,
  },
});