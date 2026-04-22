import React, { useState } from 'react';
import { 
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Linking, Image, StatusBar 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconManager, { APP_ICONS } from '../constants/icons'; // Import APP_ICONS
import Footer from '../nav_bar/footer';
import { useAuth } from '../nav_bar/navigation_bar';

const MenuScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, setIsDarkMode, setIsLoggedIn } = useAuth();
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const theme = {
    bg: isDarkMode ? '#0a0a0a' : '#f5f5f5',
    card: isDarkMode ? '#161616' : '#ffffff',
    textMain: isDarkMode ? '#eee' : '#000',
    textSection: isDarkMode ? '#555' : '#888',
    subMenuBg: isDarkMode ? '#111' : '#fcfcfc',
    divider: isDarkMode ? '#222' : '#eee',
    accent: '#00f5ff',
    danger: '#ff4d4d' // Màu đỏ cho nút Đăng xuất
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(() => alert('Không thể mở liên kết'));
  };

  // Hàm render nút menu tối giản
  const MenuButton = ({ iconConfig, label, onPress, rightElement, isDanger = false, customRight }) => (
    <TouchableOpacity 
      style={[styles.menuItem, { backgroundColor: theme.card }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.menuLeft}>
        <IconManager 
          name={iconConfig.name} 
          type={iconConfig.type} 
          size={22} 
          color={isDanger ? theme.danger : theme.accent} 
        />
        <Text style={[styles.menuLabel, { color: isDanger ? theme.danger : theme.textMain }]}>
          {label}
        </Text>
      </View>
      {rightElement}
      {customRight}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 20 }}>
        {/* NHÓM KHÁM PHÁ */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSection }]}>Khám phá</Text>
          <MenuButton iconConfig={APP_ICONS.HOME} label="Trang chủ" onPress={() => navigation.navigate('HOME')} />
          <MenuButton iconConfig={APP_ICONS.SEARCH} label="Tìm kiếm" onPress={() => navigation.navigate('SEARCH')} />
          <MenuButton iconConfig={APP_ICONS.CART} label="Giỏ hàng của tôi" onPress={() => navigation.navigate('CART')} />
          <MenuButton iconConfig={APP_ICONS.LIBRARY} label="Thư viện game" onPress={() => navigation.navigate('LIBRARY')} />
          <MenuButton iconConfig={APP_ICONS.NEWS} label="Tin tức" onPress={() => navigation.navigate('NEWS')} />
        </View>

        {/* NHÓM TÙY CHỈNH & KẾT NỐI */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSection }]}>Tùy chỉnh & Kết nối</Text>
          
          <MenuButton 
            iconConfig={isDarkMode ? APP_ICONS.MOON : APP_ICONS.SUN} 
            label={isDarkMode ? "Chế độ tối: Bật" : "Chế độ tối: Tắt"} 
            rightElement={
              <Switch 
                value={isDarkMode} 
                onValueChange={(value) => setIsDarkMode(value)} 
                trackColor={{ false: "#ccc", true: theme.accent }} 
                thumbColor="#fff"
              />
            }
          />

          <MenuButton 
            iconConfig={APP_ICONS.COMMUNITY} 
            label="Cộng đồng" 
            onPress={() => setIsCommunityOpen(!isCommunityOpen)}
            customRight={
              <View style={{ transform: [{ rotate: isCommunityOpen ? '180deg' : '0deg' }] }}>
                <IconManager name="expand-more" type="material-icons" size={24} color={theme.accent} />
              </View>
            }
          />
          
          {isCommunityOpen && (
            <View style={[styles.subMenu, { backgroundColor: theme.subMenuBg }]}>
              <TouchableOpacity 
                style={[styles.subMenuItem, { borderBottomColor: theme.divider, backgroundColor: isDarkMode ? '#5865F220' : '#5865F210' }]} 
                onPress={() => openLink('https://discord.com/invite/mixigaming')}
              >
                <Image source={require('../../assets/anh/discord.png')} style={styles.subIcon} />
                <Text style={[styles.subMenuText, { color: '#5865F2', fontWeight: 'bold' }]}>Discord</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.subMenuItem, { borderBottomColor: theme.divider, backgroundColor: isDarkMode ? '#FF000020' : '#FF000010' }]} 
                onPress={() => openLink('https://www.youtube.com/@MixiGaming3con')}
              >
                <Image source={require('../../assets/anh/youtube.png')} style={styles.subIcon} />
                <Text style={[styles.subMenuText, { color: '#FF0000', fontWeight: 'bold' }]}>YouTube</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.subMenuItem, { borderBottomColor: theme.divider, backgroundColor: isDarkMode ? '#1877F220' : '#1877F210' }]} 
                onPress={() => openLink('https://web.facebook.com/MixiGaming')}
              >
                <Image source={require('../../assets/anh/facebook.png')} style={styles.subIcon} />
                <Text style={[styles.subMenuText, { color: '#1877F2', fontWeight: 'bold' }]}>Facebook</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ĐĂNG XUẤT */}
        <View style={styles.section}>
           <MenuButton 
             iconConfig={APP_ICONS.EXIT} 
             label="Đăng xuất tài khoản" 
             isDanger={true} 
             onPress={() => setIsLoggedIn(false)} 
           />
        </View>

        <Footer />
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginLeft: 20, marginBottom: 10, letterSpacing: 1.5 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 18, 
    paddingHorizontal: 20, 
    marginBottom: 1 
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuLabel: { fontSize: 15, marginLeft: 15, fontWeight: '600' },
  subMenu: { paddingHorizontal: 12, paddingVertical: 10 },
  subMenuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    paddingHorizontal: 15, 
    borderRadius: 12, 
    marginBottom: 8 
  },
  subIcon: { width: 22, height: 22, resizeMode: 'contain', marginRight: 15 },
  subMenuText: { fontSize: 14 },
});

export default MenuScreen;