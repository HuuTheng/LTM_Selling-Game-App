import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../nav_bar/navigation_bar';

const Login = ({ navigation }) => {
    const { setIsLoggedIn } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Chào mừng trở lại</Text>
        <Text style={styles.subtitle}>Đăng nhập để tiếp tục khám phá thế giới game</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Email hoặc Tên đăng nhập" 
          placeholderTextColor="#777" 
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Mật khẩu" 
          secureTextEntry 
          placeholderTextColor="#777" 
        />

        <TouchableOpacity 
          style={styles.btnLogin}
          onPress={() => setIsLoggedIn(true)} // Bấm cái này để nhảy vào Home
        >
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
  btnLogin: { backgroundColor: '#FFD700', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  link: { color: '#FFD700', fontWeight: 'bold' }
});

export default Login;