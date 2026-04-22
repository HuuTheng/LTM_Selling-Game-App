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
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const allGames = data?.games || [];

  // Logic Auto-slide Banner
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideData = allGames.slice(0, 5);

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

  // Hàm bổ trợ để hiển thị giá tiền thông minh
  const renderPrice = (price) => {
    if (price === 0) {
      return <Text style={[styles.priceText, { color: '#00f5ff' }]}>Miễn phí</Text>;
    }
    return <Text style={styles.priceText}>{price.toLocaleString('vi-VN')} đ</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={GAME_IMAGES["../../assets/anh/Mixigaming-Logo.jpg"]} style={styles.logoCircle} />
          <Text style={styles.storeText}>STORE</Text>
        </View>

        <View style={styles.headerRight}>
          {isLoggedIn ? (
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="person-circle-outline" size={38} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={styles.authButtons}>
              <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.authText}>Đăng nhập</Text>
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
            <View style={styles.popupMenu}>
              <View style={styles.userInfoMini}>
                <Ionicons name="person-circle" size={40} color="#fff" />
                <Text style={styles.userNameMini}>Tài khoản</Text>
              </View>
              <View style={styles.line} />
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
              {/* Hiển thị giá cho Banner */}
              <Text style={styles.heroPrice}>
                {currentGame.price === 0 ? "Miễn phí" : currentGame.price.toLocaleString('vi-VN') + " đ"}
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

        {/* SECTION: Game Phổ Biến */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Game Phổ Biến</Text>
          <FlatList 
            data={allGames.slice(5, 12)}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.card} onPress={() => handleGamePress(item)}>
                <Image source={GAME_IMAGES[item.image]} style={styles.cardImage} />
                <Text style={styles.gameTitle} numberOfLines={1}>{item.title}</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5 },
  logoutText: { color: '#ff4d4d', fontWeight: 'bold' },
  
  heroContainer: { margin: 20, borderRadius: 12, overflow: 'hidden', height: 400 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', bottom: 0, padding: 20, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)' },
  heroTag: { color: '#00f5ff', fontSize: 11, fontWeight: 'bold' },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  heroPrice: { color: '#00f5ff', fontSize: 16, fontWeight: 'bold' },

  sectionContainer: { marginTop: 25, paddingLeft: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  card: { width: 150, marginRight: 15 },
  cardImage: { width: 150, height: 200, borderRadius: 8 },
  gameTitle: { color: '#fff', fontSize: 14, marginTop: 8 },
  priceText: { color: '#aaa', fontSize: 13, fontWeight: '500' }, // Mặc định màu xám cho giá tiền

  listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingRight: 20 },
  listImage: { width: 60, height: 80, borderRadius: 6 },
  listTitle: { color: '#fff', fontSize: 15 },
});

export default Home;