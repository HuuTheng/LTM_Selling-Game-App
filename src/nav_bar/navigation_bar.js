import React, { createContext, useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { 
  Text, View, StyleSheet, Image, TouchableOpacity, 
  Modal, TouchableWithoutFeedback 
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

// CHỈNH SỬA: Import useNavigation để sửa lỗi ReferenceError
import { useNavigation } from '@react-navigation/native'; 

import IconManager, { APP_ICONS } from "../constants/icons";

// Import các màn hình
import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import LibraryScreen from "../screens/Library";
import NewsScreen from "../screens/News";
import MenuScreen from "../screens/Menu";
import GameDetail from "../screens/GameDetail";
import LoginScreen from "../screens/Login"; 
import RegisterScreen from "../screens/Register";
import Cart from '../screens/Cart'; 

// --- 1. AUTH CONTEXT ---
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const [userEmail, setUserEmail] = useState(""); 

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, setIsLoggedIn, 
      isDarkMode, setIsDarkMode,
      userEmail, setUserEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// --- 2. COMPONENTS CHO HEADER ---

const CustomHeaderLeft = () => (
  <View style={styles.headerLeft}>
    <Image
      source={require("../../assets/anh/Mixigaming-Logo.jpg")}
      style={styles.logoCircle}
    />
    <Text style={styles.storeText}>STORE</Text>
  </View>
);

const CustomHeaderRight = () => {
  // CHỈNH SỬA: Khởi tạo navigation ở đây
  const navigation = useNavigation(); 
  const { isLoggedIn, isDarkMode, userEmail, setIsLoggedIn } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const iconColor = isDarkMode ? "#fff" : "#000";

  if (!isLoggedIn) {
    return (
      <View style={styles.authGroup}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.authText, { color: iconColor }]}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={{ color: iconColor, marginHorizontal: 5 }}>|</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.authText, { color: iconColor }]}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.headerRight}>
      <TouchableOpacity onPress={() => setShowPopup(true)}>
        <Ionicons name="person-circle-outline" size={32} color={iconColor} />
      </TouchableOpacity>

      <Modal visible={showPopup} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.popupMenu, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
              <Text style={{ color: iconColor, fontWeight: 'bold' }}>{userEmail || "Người dùng"}</Text>
              <View style={styles.separator} />
              <TouchableOpacity 
                style={styles.logoutBtn} 
                onPress={() => {
                  setIsLoggedIn(false);
                  setShowPopup(false);
                  // Khi setIsLoggedIn(false), Stack bên dưới tự render lại nhánh HomeGuest (không menu)
                }}
              >
                <Ionicons name="log-out-outline" size={20} color="#ff4d4d" />
                <Text style={styles.logoutText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

// --- 3. MAIN TAB NAVIGATOR (Luồng đã đăng nhập) ---
const MainTabs = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation(); // Thêm navigation cho MainTabs
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
        headerTitle: "", 
        headerLeft: () => <CustomHeaderLeft />,
        headerRight: () => <CustomHeaderRight />,
        headerStyle: {
          backgroundColor: themeColors.bg,
          borderBottomWidth: 1,
          borderBottomColor: themeColors.border,
          height: 60 + insets.top,
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
        tabBarStyle: {
          height: 60 + insets.bottom,
          backgroundColor: themeColors.bg,
          borderTopColor: themeColors.border,
        },
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="HOME" component={HomeScreen} />
      <Tab.Screen name="SEARCH" component={SearchScreen} />
      <Tab.Screen name="LIBRARY" component={LibraryScreen} />
      <Tab.Screen name="NEWS" component={NewsScreen} />
      <Tab.Screen name="MENU" component={MenuScreen} /> 
    </Tab.Navigator>
  );
};

// --- 4. ROOT NAVIGATION (Quản lý luồng hiển thị thanh Menu) ---
const NavigationBar = () => {
  const { isLoggedIn, isDarkMode } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        // LUỒNG CHƯA ĐĂNG NHẬP (Home Guest không nằm trong Tab nên không có menu)
        <>
          <Stack.Screen 
            name="HomeGuest" 
            component={HomeScreen} 
            options={{
              headerShown: true,
              headerTitle: "",
              headerLeft: () => <CustomHeaderLeft />,
              headerRight: () => <CustomHeaderRight />, 
              headerStyle: { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // LUỒNG ĐÃ ĐĂNG NHẬP (Sử dụng MainTabs chứa thanh menu dưới)
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen 
            name="GameDetail" 
            component={GameDetail} 
            options={{ 
              headerShown: true, 
              headerTitle: "Chi tiết",
              headerTintColor: '#00f5ff',
              headerStyle: { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }
            }} 
          />
          <Stack.Screen name="CART" component={Cart} options={{ headerShown: true, headerTitle: "Giỏ hàng" }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default NavigationBar;

// --- STYLES ---
const styles = StyleSheet.create({
  headerLeft: { flexDirection: 'row', alignItems: 'center', marginLeft: 15 },
  logoCircle: { width: 35, height: 35, borderRadius: 17.5, borderWidth: 1, borderColor: '#00f5ff' },
  storeText: { color: '#00f5ff', fontSize: 18, fontWeight: 'bold', marginLeft: 10, letterSpacing: 1 },
  headerRight: { marginRight: 15 },
  authGroup: { flexDirection: 'row', alignItems: 'center' },
  authText: { fontSize: 13, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-start', alignItems: 'flex-end' },
  popupMenu: {
    marginTop: 65, 
    marginRight: 15,
    padding: 15,
    borderRadius: 12,
    width: 210,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  separator: { height: 1, backgroundColor: '#444', marginVertical: 10, opacity: 0.2 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center' },
  logoutText: { color: '#ff4d4d', marginLeft: 10, fontWeight: 'bold' },
  activeIndicator: { position: "absolute", top: -12, width: 40, height: 3, backgroundColor: "#00f5ff", borderRadius: 10 }
});