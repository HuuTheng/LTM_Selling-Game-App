// src/footer/Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const Footer = () => {
  const openLink = (url) => {
    Linking.openURL(url).catch(() => alert('Không thể mở liên kết'));
  };

  return (
    <View style={styles.footer}>
      <View style={styles.container}>

        <View style={styles.grid}>
          {/* Cột Nguồn tài nguyên */}
          <View style={styles.column}>
            <Text style={styles.title}>Nguồn tài nguyên</Text>
            <TouchableOpacity onPress={() => openLink('https://github.com/TrungHieu163/LTWNC_Selling-Game-Website')}>
              <Text style={styles.link}>GitHub Repository</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://github.com/HuuTheng')}>
              <Text style={styles.link}>Nguyễn Hữu Thành</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://github.com/TrungHieu163')}>
              <Text style={styles.link}>Nguyễn Trung Hiếu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://github.com/phuc3015-bit')}>
              <Text style={styles.link}>Nguyễn Trọng Phúc</Text>
            </TouchableOpacity>
          </View>

          {/* Cột Liên kết */}
          <View style={styles.column}>
            <Text style={styles.title}>Liên kết</Text>
            
            <TouchableOpacity style={[styles.socialBtn, {backgroundColor: '#5865F2'}]} 
              onPress={() => openLink('https://discord.com/invite/mixigaming')}>
              <Text style={styles.socialIcon}>D</Text>
              <Text style={styles.socialText}>Discord</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialBtn, {backgroundColor: '#FF0000'}]} 
              onPress={() => openLink('https://www.youtube.com/@MixiGaming3con')}>
              <Text style={styles.socialIcon}>▶</Text>
              <Text style={styles.socialText}>YouTube</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialBtn, {backgroundColor: '#1877F2'}]} 
              onPress={() => openLink('https://web.facebook.com/MixiGaming')}>
              <Text style={styles.socialIcon}>f</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Phần dưới */}
        <View style={styles.bottom}>
          <Text style={styles.copyright}>© 2026 MIXIGAMING Shop. All rights reserved.</Text>
          
          <View style={styles.legal}>
            <Text style={styles.legalText}>Điều khoản</Text>
            <Text style={styles.legalText}>Quyền riêng tư</Text>
            <Text style={styles.legalText}>Bảo mật</Text>
          </View>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#0a0a0a',
    paddingTop: 40,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  container: { paddingHorizontal: 20 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  column: { flex: 1 },
  title: { color: '#fff', fontSize: 17, fontWeight: '600', marginBottom: 14 },
  link: { color: '#aaa', fontSize: 15, marginVertical: 6 },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  socialIcon: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  socialText: { color: '#fff', fontSize: 15, fontWeight: '500' },
  bottom: { borderTopWidth: 1, borderTopColor: '#222', paddingTop: 20, alignItems: 'center' },
  copyright: { color: '#666', fontSize: 13, textAlign: 'center' },
  legal: { flexDirection: 'row', gap: 20, marginTop: 12 },
  legalText: { color: '#888', fontSize: 13 },
});

export default Footer;