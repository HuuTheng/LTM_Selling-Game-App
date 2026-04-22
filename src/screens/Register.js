import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Kiểm tra định dạng Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      showMessage({
        message: "Lỗi Email",
        description: "Email phải có đuôi @gmail.com và không có dấu cách!",
        type: "danger",
        borderRadius: 12,
      });
      return;
    }

    // Kiểm tra Mật khẩu (Ít nhất 8 ký tự, có chữ và số)
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passRegex.test(password)) {
      showMessage({
        message: "Mật khẩu yếu",
        description: "Mật khẩu phải từ 8 ký tự trở lên, bao gồm cả chữ và số!",
        type: "warning",
        borderRadius: 12,
      });
      return;
    }

    if (password !== confirmPassword) {
      showMessage({ message: "Lỗi", description: "Mật khẩu xác nhận không khớp!", type: "danger", borderRadius: 12 });
      return;
    }

    try {
      const rawData = await AsyncStorage.getItem('user_list');
      const users = rawData ? JSON.parse(rawData) : [];

      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showMessage({ message: "Lỗi", description: "Email này đã được đăng ký trên máy này!", type: "danger", borderRadius: 12 });
        return;
      }

      users.push({ fullName, email, password });
      await AsyncStorage.setItem('user_list', JSON.stringify(users));

      showMessage({
        message: "Thành công",
        description: "Tài khoản của bạn đã được lưu!",
        type: "success",
        backgroundColor: "#00f5ff",
        color: "#000",
        borderRadius: 12,
      });
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tạo tài khoản</Text>
        <TextInput style={styles.input} placeholder="Họ và tên" placeholderTextColor="#777" onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Email (@gmail.com)" placeholderTextColor="#777" onChangeText={setEmail} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Mật khẩu (>= 8 ký tự)" secureTextEntry placeholderTextColor="#777" onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Xác nhận mật khẩu" secureTextEntry placeholderTextColor="#777" onChangeText={setConfirmPassword} />

        <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
          <Text style={styles.btnText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.footerLink}>
          <Text style={{color: '#aaa'}}>Đã có tài khoản? <Text style={{color: '#00f5ff'}}>Quay lại</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { flex: 1, padding: 25, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 40 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 18, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  btnRegister: { backgroundColor: '#00f5ff', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  footerLink: { marginTop: 25, alignItems: 'center' }
});

export default Register;