import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Image, 
  TouchableOpacity, FlatList, Dimensions, SafeAreaView, Animated, StatusBar, Modal, TouchableWithoutFeedback 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import data from '../data/games'; 
import { GAME_IMAGES } from '../constants/images';
import { useAuth } from '../nav_bar/navigation_bar';

const Home = ({ navigation }) => {
<<<<<<< HEAD
  const { isLoggedIn, setIsLoggedIn } = useAuth();
=======
  const { isLoggedIn, setIsLoggedIn, isDarkMode } = useAuth(); // Lấy isDarkMode từ Context
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
  const [menuVisible, setMenuVisible] = useState(false);
  const allGames = data?.games || [];

  // Logic Auto-slide Banner
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideData = allGames.slice(0, 5);

<<<<<<< HEAD
=======
  // --- CẤU HÌNH THEME ---
  const theme = {
    bg: isDarkMode ? '#121212' : '#f8f9fa',
    cardBg: isDarkMode ? '#1e1e1e' : '#ffffff',
    textMain: isDarkMode ? '#fff' : '#000',
    textSub: isDarkMode ? '#aaa' : '#666',
    border: isDarkMode ? '#333' : '#e0e0e0',
    modalBg: isDarkMode ? '#1e1e1e' : '#ffffff',
    shadow: isDarkMode ? 'transparent' : '#000',
  };

>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 800, useNativeDriver: true }).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slideData.length);
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentGame = slideData[currentIndex] || {};

  const handleGamePress = (item) => {
    if (!isLoggedIn) navigation.navigate('Login');
    else navigation.navigate('GameDetail', { game: item });
  };

  const handleLogout = () => {
    setMenuVisible(false);
    setIsLoggedIn(false);
    navigation.replace('HomeGuest');
  };

<<<<<<< HEAD
  // Hàm hiển thị giá tiền
=======
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
  const renderPrice = (price) => {
    if (price === 0) {
      return <Text style={[styles.priceText, { color: '#00f5ff' }]}>Miễn phí</Text>;
    }
<<<<<<< HEAD
    return <Text style={styles.priceText}>{price.toLocaleString('vi-VN')} đ</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
=======
    return <Text style={[styles.priceText, { color: theme.textSub }]}>{price.toLocaleString('vi-VN')} đ</Text>;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
<<<<<<< HEAD
          <Image source={GAME_IMAGES["../../assets/anh/Mixigaming-Logo.jpg"]} style={styles.logoCircle} />
          <Text style={styles.storeText}>STORE</Text>
=======
          <Image source={GAME_IMAGES["../../assets/anh/Mixigaming-Logo.jpg"]} style={[styles.logoCircle, { borderColor: theme.border }]} />
          <Text style={[styles.storeText, { color: theme.textMain }]}>STORE</Text>
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
        </View>

        <View style={styles.headerRight}>
          {isLoggedIn ? (
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
<<<<<<< HEAD
              <Ionicons name="person-circle-outline" size={38} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={styles.authButtons}>
              <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.authText}>Đăng nhập</Text>
=======
              <Ionicons name="person-circle-outline" size={38} color={theme.textMain} />
            </TouchableOpacity>
          ) : (
            <View style={styles.authButtons}>
              <TouchableOpacity style={[styles.btnOutline, { borderColor: theme.border }]} onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.authText, { color: theme.textMain }]}>Đăng nhập</Text>
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSolid} onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.authText, { color: '#000' }]}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* POPUP MODAL */}
      <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
<<<<<<< HEAD
            <View style={styles.popupMenu}>
              <View style={styles.userInfoMini}>
                <Ionicons name="person-circle" size={40} color="#fff" />
                <Text style={styles.userNameMini}>Tài khoản</Text>
              </View>
              <View style={styles.line} />
=======
            <View style={[styles.popupMenu, { backgroundColor: theme.modalBg, elevation: 5, shadowColor: theme.shadow }]}>
              <View style={styles.userInfoMini}>
                <Ionicons name="person-circle" size={40} color={isDarkMode ? "#fff" : "#00f5ff"} />
                <Text style={[styles.userNameMini, { color: theme.textMain }]}>Tài khoản</Text>
              </View>
              <View style={[styles.line, { backgroundColor: theme.border }]} />
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#ff4d4d" />
                <Text style={styles.logoutText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* BANNER */}
        <TouchableOpacity style={styles.heroContainer} onPress={() => handleGamePress(currentGame)}>
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Image source={GAME_IMAGES[currentGame.image]} style={styles.heroImage} />
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTag}>NỔI BẬT</Text>
              <Text style={styles.heroTitle}>{currentGame.title}</Text>
<<<<<<< HEAD
              {/* Hiển thị giá cho Banner */}
=======
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
              <Text style={styles.heroPrice}>
                {currentGame.price === 0 ? "Miễn phí" : currentGame.price.toLocaleString('vi-VN') + " đ"}
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

        {/* SECTION: Game Phổ Biến */}
        <View style={styles.sectionContainer}>
<<<<<<< HEAD
          <Text style={styles.sectionTitle}>Game Phổ Biến</Text>
=======
          <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Game Phổ Biến</Text>
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
          <FlatList 
            data={allGames.slice(5, 12)}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.card} onPress={() => handleGamePress(item)}>
                <Image source={GAME_IMAGES[item.image]} style={styles.cardImage} />
<<<<<<< HEAD
                <Text style={styles.gameTitle} numberOfLines={1}>{item.title}</Text>
=======
                <Text style={[styles.gameTitle, { color: theme.textMain }]} numberOfLines={1}>{item.title}</Text>
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
                {renderPrice(item.price)}
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        {/* SECTION: Gợi ý cho bạn */}
        <View style={styles.sectionContainer}>
<<<<<<< HEAD
          <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
          {allGames.slice(12, 17).map((item) => (
            <TouchableOpacity key={item.id} style={styles.listItem} onPress={() => handleGamePress(item)}>
              <Image source={GAME_IMAGES[item.image]} style={styles.listImage} />
              <View style={{flex: 1, marginLeft: 15}}>
                 <Text style={styles.listTitle}>{item.title}</Text>
                 {renderPrice(item.price)}
              </View>
            </TouchableOpacity>
          ))}
        </View>
=======
          <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Gợi ý cho bạn</Text>
          {allGames.slice(12, 17).map((item) => (
            <TouchableOpacity 
                key={item.id} 
                style={[styles.listItem, { backgroundColor: theme.cardBg, borderRadius: 12, padding: 10, marginRight: 20 }]} 
                onPress={() => handleGamePress(item)}
            >
              <Image source={GAME_IMAGES[item.image]} style={styles.listImage} />
              <View style={{flex: 1, marginLeft: 15}}>
                 <Text style={[styles.listTitle, { color: theme.textMain }]}>{item.title}</Text>
                 {renderPrice(item.price)}
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.textSub} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 100 }} />
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 70, marginTop: 10 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoCircle: { width: 45, height: 45, borderRadius: 22.5, borderWidth: 1, borderColor: '#333' },
  storeText: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 2 },
  authButtons: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  btnOutline: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#444' },
  btnSolid: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#00f5ff' },
  authText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-start', alignItems: 'flex-end' },
  popupMenu: { marginTop: 80, marginRight: 20, backgroundColor: '#1e1e1e', width: 180, borderRadius: 12, padding: 12 },
  userInfoMini: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  userNameMini: { color: '#fff', fontSize: 13, fontWeight: '600' },
  line: { height: 1, backgroundColor: '#333', marginVertical: 8 },
=======
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 70 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoCircle: { width: 45, height: 45, borderRadius: 22.5, borderWidth: 1 },
  storeText: { fontSize: 20, fontWeight: '900', letterSpacing: 2 },
  authButtons: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  btnOutline: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1 },
  btnSolid: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#00f5ff' },
  authText: { fontSize: 12, fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-start', alignItems: 'flex-end' },
  popupMenu: { 
    marginTop: 80, 
    marginRight: 20, 
    width: 180, 
    borderRadius: 12, 
    padding: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  userInfoMini: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  userNameMini: { fontSize: 13, fontWeight: '600' },
  line: { height: 1, marginVertical: 8 },
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
  logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5 },
  logoutText: { color: '#ff4d4d', fontWeight: 'bold' },
  
  heroContainer: { margin: 20, borderRadius: 12, overflow: 'hidden', height: 400 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', bottom: 0, padding: 20, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)' },
  heroTag: { color: '#00f5ff', fontSize: 11, fontWeight: 'bold' },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  heroPrice: { color: '#00f5ff', fontSize: 16, fontWeight: 'bold' },

  sectionContainer: { marginTop: 25, paddingLeft: 20 },
<<<<<<< HEAD
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  card: { width: 150, marginRight: 15 },
  cardImage: { width: 150, height: 200, borderRadius: 8 },
  gameTitle: { color: '#fff', fontSize: 14, marginTop: 8 },
  priceText: { color: '#aaa', fontSize: 13, fontWeight: '500' }, // Mặc định màu xám cho giá tiền

  listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingRight: 20 },
  listImage: { width: 60, height: 80, borderRadius: 6 },
  listTitle: { color: '#fff', fontSize: 15 },
=======
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  card: { width: 150, marginRight: 15 },
  cardImage: { width: 150, height: 200, borderRadius: 8 },
  gameTitle: { fontSize: 14, marginTop: 8, fontWeight: '600' },
  priceText: { fontSize: 13, fontWeight: '500' },

  listItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12, 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listImage: { width: 60, height: 80, borderRadius: 6 },
  listTitle: { fontSize: 15, fontWeight: '600' },
>>>>>>> f9d773eeb3ee508abdac92e41271aad4d2a99571
});

export default Home;