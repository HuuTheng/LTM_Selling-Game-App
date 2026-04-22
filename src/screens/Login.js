import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";
import { useAuth } from '../nav_bar/navigation_bar';

const Login = ({ navigation }) => {
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Chào mừng trở lại</Text>
        <Text style={styles.subtitle}>Đăng nhập để khám phá thế giới game</Text>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#777" onChangeText={setEmail} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry placeholderTextColor="#777" onChangeText={setPassword} />

        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={{color: '#777'}}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { flex: 1, padding: 25, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 40 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 18, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  btnLogin: { backgroundColor: '#00f5ff', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  link: { color: '#00f5ff', fontWeight: 'bold' }
});

export default Login;