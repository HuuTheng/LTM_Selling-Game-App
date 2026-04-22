<<<<<<< HEAD
// src/footer/Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native'; // Thêm Image

const Footer = () => {
=======
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
// Import useAuth để lấy trạng thái theme
import { useAuth } from '../nav_bar/navigation_bar'; 

const Footer = () => {
  const { isDarkMode } = useAuth(); // Lấy trạng thái sáng/tối

>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
  const openLink = (url) => {
    Linking.openURL(url).catch(() => alert('Không thể mở liên kết'));
  };

<<<<<<< HEAD
  return (
    <View style={styles.footer}>
      <View style={styles.container}>

        <View style={styles.grid}>
          <View style={styles.column}>
            <Text style={styles.title}>Nguồn tài nguyên</Text>
            <TouchableOpacity onPress={() => openLink('https://github.com/HuuTheng/LTM_Selling-Game-App.git')}>
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
            <TouchableOpacity onPress={() => openLink('https://youtu.be/dQw4w9WgXcQ?si=CzfzkQCUm8JTdqPd')}>
              <Text style={styles.link}>About Us</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.column}>
            <Text style={styles.title}>Liên kết</Text>
            
            <TouchableOpacity style={[styles.socialBtn, {backgroundColor: '#18119ef7'}]} 
              onPress={() => openLink('https://discord.com/invite/mixigaming')}>
              <Image 
                source={require('../../assets/anh/discord.png')} 
                style={styles.socialIconImage} 
              />
              <Text style={styles.socialText}>Discord</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialBtn, {backgroundColor: '#bc1717'}]} 
              onPress={() => openLink('https://www.youtube.com/@MixiGaming3con')}>
              <Image 
                source={require('../../assets/anh/youtube.png')} 
                style={styles.socialIconImage} 
              />
              <Text style={styles.socialText}>YouTube</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialBtn, {backgroundColor: '#0052be'}]} 
              onPress={() => openLink('https://web.facebook.com/MixiGaming')}>
              <Image 
                source={require('../../assets/anh/facebook.png')} 
                style={styles.socialIconImage} 
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.bigLogo}>
         <Image 
           source={require('../../assets/anh/realdeal.png')} 
           style={styles.bigLogo} 
         />

</View>
        <View style={styles.bottom}>         
          <Text style={styles.copyright}>© 2026 MIXIGAMING Shop. All rights reserved.</Text>
          
          <View style={styles.legal}>
            <Text style={styles.legalText}>Điều khoản</Text>
            <Text style={styles.legalText}>Quyền riêng tư</Text>
            <Text style={styles.legalText}>Bảo mật</Text>
          </View>
        </View>

=======
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
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
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
  bigLogo: {
    width: 200,
    height:100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },

  socialIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  socialText: { color: '#fff', fontSize: 15, fontWeight: '500' },
  bottom: { borderTopWidth: 1, borderTopColor: '#222', paddingTop: 20, alignItems: 'center' },
  copyright: { color: '#666', fontSize: 13, textAlign: 'center' },
  legal: { flexDirection: 'row', gap: 20, marginTop: 12 },
  legalText: { color: '#888', fontSize: 13 },
=======
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
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
});

export default Footer;