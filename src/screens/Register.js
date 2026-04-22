import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const Register = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tạo tài khoản</Text>
        
        <TextInput style={styles.input} placeholder="Họ và tên" placeholderTextColor="#777" />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#777" />
        <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry placeholderTextColor="#777" />
        <TextInput style={styles.input} placeholder="Xác nhận mật khẩu" secureTextEntry placeholderTextColor="#777" />

        <TouchableOpacity 
          style={styles.btnRegister} 
          onPress={() => {
            alert("Đăng ký thành công!"); 
            navigation.goBack(); // Quay lại trang Login
          }}
        >
          <Text style={styles.btnText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 20, alignItems: 'center'}}>
          <Text style={{color: '#aaa'}}>Đã có tài khoản? <Text style={{color: '#FFD700'}}>Quay lại đăng nhập</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { flex: 1, padding: 25, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 40 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 18, borderRadius: 12, marginBottom: 15 },
  btnRegister: { backgroundColor: '#FFD700', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});

export default Register;