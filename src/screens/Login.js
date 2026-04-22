import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";
import { useAuth } from '../nav_bar/navigation_bar';

const Login = ({ navigation }) => {
  const { setIsLoggedIn, isDarkMode } = useAuth(); // Lấy trạng thái theme
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- CẤU HÌNH THEME ---
  const theme = {
    bg: isDarkMode ? '#121212' : '#ffffff',
    textMain: isDarkMode ? '#fff' : '#000',
    textSub: isDarkMode ? '#aaa' : '#666',
    inputBg: isDarkMode ? '#1E1E1E' : '#f5f5f5',
    inputBorder: isDarkMode ? 'transparent' : '#e0e0e0',
  };

  const handleLogin = async () => {
    try {
      const rawData = await AsyncStorage.getItem('user_list');
      const users = rawData ? JSON.parse(rawData) : [];

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        showMessage({
          message: "Đăng nhập thành công",
          description: `Chào mừng ${user.fullName} trở lại!`,
          type: "success",
          backgroundColor: "#00f5ff",
          color: "#000",
          borderRadius: 12,
        });
        setIsLoggedIn(true);
        setTimeout(() => {
          navigation.replace('MainStack'); 
        }, 1000); 
      } else {
        showMessage({
          message: "Thất bại",
          description: "Sai email hoặc mật khẩu, vui lòng thử lại!",
          type: "danger",
          borderRadius: 12,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.textMain }]}>Chào mừng trở lại</Text>
        <Text style={[styles.subtitle, { color: theme.textSub }]}>Đăng nhập để khám phá thế giới game</Text>

        <TextInput 
          style={[styles.input, { backgroundColor: theme.inputBg, color: theme.textMain, borderColor: theme.inputBorder, borderWidth: isDarkMode ? 0 : 1 }]} 
          placeholder="Email" 
          placeholderTextColor="#777" 
          onChangeText={setEmail} 
          autoCapitalize="none" 
        />
        <TextInput 
          style={[styles.input, { backgroundColor: theme.inputBg, color: theme.textMain, borderColor: theme.inputBorder, borderWidth: isDarkMode ? 0 : 1 }]} 
          placeholder="Mật khẩu" 
          secureTextEntry 
          placeholderTextColor="#777" 
          onChangeText={setPassword} 
        />

        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={{ color: theme.textSub }}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 25, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 40 },
  input: { padding: 18, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  btnLogin: { backgroundColor: '#00f5ff', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  link: { color: '#00f5ff', fontWeight: 'bold' }
});

export default Login;