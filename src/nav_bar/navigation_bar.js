// src/nav_bar/navigation_bar.js
import React, { createContext, useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, StyleSheet, Image } from "react-native"; // Thêm Image
import { useSafeAreaInsets } from "react-native-safe-area-context";

import IconManager, { APP_ICONS } from "../constants/icons";
// import Footer from "./footer"; // Không dùng đến trong file này

// Import các màn hình thật
import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import LibraryScreen from "../screens/Library";
import NewsScreen from "../screens/News";
import MenuScreen from "../screens/Menu";
import GameDetail from "../screens/GameDetail";
import Rnews from "../screens/Rnews"; // Đảm bảo bạn đã import màn hình tin tức chi tiết

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

// --- Component Logo cho Header ---
const HeaderLogo = () => (
  <Image
    source={require("../../assets/anh/realdeal.png")}
    style={{ width: 120, height: 40, resizeMode: "contain" }}
  />
);

const MainTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="HOME"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        // THAY ĐỔI TẠI ĐÂY: Dùng component HeaderLogo thay vì Text
        headerTitle: (props) => <HeaderLogo {...props} />, 
        headerStyle: {
          backgroundColor: "#1f1f1f",
          borderBottomWidth: 1,
          borderBottomColor: "#333",
          height: 60 + insets.top, // Tăng nhẹ chiều cao header cho đẹp
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
                color={focused ? "#00f5ff" : "#888"} 
              />
            </View>
          );
        },

        tabBarActiveTintColor: "#00f5ff",
        tabBarInactiveTintColor: "#888",

        tabBarStyle: {
          height: 70 + insets.bottom, // Chỉnh lại height cho cân đối
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

const NavigationBar = () => {
  return (
    <AuthProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />

        <Stack.Screen 
          name="GameDetail" 
          component={GameDetail} 
          options={{ 
            headerShown: true,
            headerTitle: "Chi tiết game",
            headerStyle: { backgroundColor: '#1f1f1f' },
            headerTintColor: '#00f5ff'
          }} 
        />

        {/* THÊM MÀN HÌNH CHI TIẾT TIN TỨC NẾU CHƯA CÓ */}
        <Stack.Screen 
          name="Rnews" 
          component={Rnews} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </AuthProvider>
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