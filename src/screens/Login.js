import React, { useState } from 'react';
<<<<<<< HEAD
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
=======
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";
import { useAuth } from '../nav_bar/navigation_bar';

const Login = ({ navigation }) => {
<<<<<<< HEAD
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

=======
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

>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
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
<<<<<<< HEAD
        navigation.replace('MainStack'); 
        }, 1000);
=======
          navigation.replace('MainStack'); 
        }, 1000); 
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
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
<<<<<<< HEAD
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Chào mừng trở lại</Text>
        <Text style={styles.subtitle}>Đăng nhập để khám phá thế giới game</Text>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#777" onChangeText={setEmail} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry placeholderTextColor="#777" onChangeText={setPassword} />
=======
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
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571

        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
<<<<<<< HEAD
          <Text style={{color: '#777'}}>Chưa có tài khoản? </Text>
=======
          <Text style={{ color: theme.textSub }}>Chưa có tài khoản? </Text>
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: '#121212' },
  content: { flex: 1, padding: 25, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 40 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 18, borderRadius: 12, marginBottom: 15, fontSize: 16 },
=======
  container: { flex: 1 },
  content: { flex: 1, padding: 25, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 40 },
  input: { padding: 18, borderRadius: 12, marginBottom: 15, fontSize: 16 },
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
  btnLogin: { backgroundColor: '#00f5ff', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  link: { color: '#00f5ff', fontWeight: 'bold' }
});

export default Login;