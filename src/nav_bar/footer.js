// src/footer/Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native'; // Thêm Image

const Footer = () => {
  const openLink = (url) => {
    Linking.openURL(url).catch(() => alert('Không thể mở liên kết'));
  };

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
});

export default Footer;