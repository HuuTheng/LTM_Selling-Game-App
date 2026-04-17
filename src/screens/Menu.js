// src/screens/Menu.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Footer from '../nav_bar/footer';

const MenuScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cài Đặt & Menu</Text>
        <Text style={styles.subtitle}>Trang Menu của bạn</Text>
        
        {/* Thêm nội dung cài đặt ở đây sau này */}
        <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#666', fontSize: 16 }}>Nội dung cài đặt sẽ được thêm sau...</Text>
        </View>
      </View>

      {/* Footer */}
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 8 },
});

export default MenuScreen;