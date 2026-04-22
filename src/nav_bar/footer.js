import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
// Import useAuth để lấy trạng thái theme
import { useAuth } from '../nav_bar/navigation_bar'; 

const Footer = () => {
  const { isDarkMode } = useAuth(); // Lấy trạng thái sáng/tối

  const openLink = (url) => {
    Linking.openURL(url).catch(() => alert('Không thể mở liên kết'));
  };

  // Định nghĩa màu sắc theo theme
  const theme = {
    footerBg: isDarkMode ? '#0a0a0a' : '#f0f0f0',
    borderColor: isDarkMode ? '#222' : '#ddd',
    titleColor: isDarkMode ? '#fff' : '#000',
    linkColor: isDarkMode ? '#888' : '#666',
    copyrightColor: isDarkMode ? '#555' : '#888',
    legalColor: isDarkMode ? '#666' : '#999',
  };

  return (
    <View style={[styles.footer, { backgroundColor: theme.footerBg, borderTopColor: theme.borderColor }]}>
      <View style={styles.container}>
        
        <Text style={[styles.title, { color: theme.titleColor }]}>Nguồn tài nguyên</Text>
        
        <View style={styles.resourceGrid}>
          {/* Cột 1 */}
          <View style={styles.resourceColumn}>
            <TouchableOpacity onPress={() => openLink('https://github.com/HuuTheng/LTM_Selling-Game-App.git')}>
              <Text style={[styles.link, { color: theme.linkColor }]}>GitHub Repo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://github.com/HuuTheng')}>
              <Text style={[styles.link, { color: theme.linkColor }]}>Hữu Thành</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://youtu.be/dQw4w9WgXcQ?si=CzfzkQCUm8JTdqPd')}>
               <Text style={[styles.link, { color: theme.linkColor }]}>About Us</Text>
            </TouchableOpacity>
          </View>
          
          {/* Cột 2 */}
          <View style={styles.resourceColumn}>
            <TouchableOpacity onPress={() => openLink('https://github.com/TrungHieu163')}>
              <Text style={[styles.link, { color: theme.linkColor }]}>Trung Hiếu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://github.com/phuc3015-bit')}>
              <Text style={[styles.link, { color: theme.linkColor }]}>Trọng Phúc</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/anh/realdeal.png')} 
            style={[styles.bigLogo, { tintColor: isDarkMode ? null : '#000' }]} // Làm logo đen lại nếu ở mode sáng (nếu cần)
          />
        </View>

        <View style={[styles.bottom, { borderTopColor: theme.borderColor }]}>        
          <Text style={[styles.copyright, { color: theme.copyrightColor }]}>© 2026 MIXIGAMING Shop. All rights reserved.</Text>
          <View style={styles.legal}>
            <Text style={[styles.legalText, { color: theme.legalColor }]}>Điều khoản</Text>
            <Text style={[styles.legalText, { color: theme.legalColor }]}>Bảo mật</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: { 
    paddingTop: 30, 
    paddingBottom: 30, 
    borderTopWidth: 1 
  },
  container: { paddingHorizontal: 20 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 15, textAlign: 'center' },
  resourceGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  resourceColumn: { flex: 1, alignItems: 'center' },
  link: { fontSize: 14, marginVertical: 5 },
  logoContainer: { alignItems: 'center', marginVertical: 10 },
  bigLogo: { width: 150, height: 60, resizeMode: 'contain' },
  bottom: { borderTopWidth: 1, paddingTop: 20, alignItems: 'center' },
  copyright: { fontSize: 12, textAlign: 'center' },
  legal: { flexDirection: 'row', gap: 15, marginTop: 10 },
  legalText: { fontSize: 12 },
});

export default Footer;