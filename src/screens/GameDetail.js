import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View, Text, StyleSheet, ScrollView, Image, 
  TouchableOpacity, Dimensions, StatusBar, FlatList, Alert 
} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { useIsFocused } from '@react-navigation/native'; // Thêm để theo dõi khi màn hình hiển thị
import { GAME_IMAGES } from '../constants/images';
import { useAuth } from '../nav_bar/navigation_bar'; 

const { width } = Dimensions.get('window');

// Logic format giá tiền
const formatPrice = (price, isAlreadyOwned) => {
  if (isAlreadyOwned) return "Đã sở hữu";
  if (price === 0) return "Miễn phí";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};

export default function GameDetail({ route, navigation }) {
  const { game } = route.params;
  const { isDarkMode } = useAuth(); 
  const isFocused = useIsFocused(); // Hook kiểm tra màn hình đang hiển thị
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAlreadyOwned, setIsAlreadyOwned] = useState(false); // State quản lý sở hữu thực tế
  const flatListRef = useRef(null);

  // Kiểm tra quyền sở hữu mỗi khi màn hình được Focus
  useEffect(() => {
    if (isFocused) {
      checkOwnership();
    }
  }, [isFocused]);

  const checkOwnership = async () => {
    try {
      const savedLib = await AsyncStorage.getItem('library');
      const libIds = savedLib ? JSON.parse(savedLib) : [];
      // Kiểm tra xem ID game có trong mảng library của AsyncStorage không
      setIsAlreadyOwned(libIds.includes(game.id));
    } catch (error) {
      console.error("Lỗi kiểm tra thư viện:", error);
    }
  };

  const mediaData = [
    ...(game.youtube_id ? [{ id: 'trailer', type: 'video', youtube_id: game.youtube_id }] : []),
    { id: 'main_img', type: 'image', uri: game.image }
  ];

  const theme = {
    bg: isDarkMode ? '#121212' : '#f5f5f5',
    card: isDarkMode ? '#1a1a1a' : '#ffffff',
    textMain: isDarkMode ? '#ffffff' : '#000000',
    textSub: isDarkMode ? '#888' : '#666',
    textDesc: isDarkMode ? '#ccc' : '#444',
    badgeBg: isDarkMode ? '#333' : '#e0e0e0',
    border: isDarkMode ? '#444' : '#ddd',
  };

  const addToCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      let cartIds = savedCart ? JSON.parse(savedCart) : [];
      
      if (!cartIds.includes(game.id)) {
        cartIds.push(game.id);
        await AsyncStorage.setItem('cart', JSON.stringify(cartIds));
        Alert.alert("Thành công", "Đã thêm game vào giỏ hàng!");
      } else {
        Alert.alert("Thông báo", "Game này đã có trong giỏ hàng rồi.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error);
    }
  };

  const handleBuyNow = () => {
    navigation.navigate('Payment', { 
      gamesToBuy: [game], 
      fromCart: false 
    });
  };

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    if (index !== activeIndex && index >= 0 && index < mediaData.length) {
      setActiveIndex(index);
    }
  };

  const renderMainMedia = ({ item }) => (
    <View style={styles.mainMediaContainer}>
      {item.type === 'video' ? (
        <YoutubePlayer height={width * 9 / 16} play={false} videoId={item.youtube_id} />
      ) : (
        <Image source={GAME_IMAGES[item.uri]} style={styles.mainImage} resizeMode="cover" />
      )}
    </View>
  );

  const renderThumbnail = ({ item, index }) => {
    const isActive = index === activeIndex;
    return (
      <TouchableOpacity
        onPress={() => {
          setActiveIndex(index);
          flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
        }}
        style={[
          styles.thumbnailBtn, 
          { backgroundColor: theme.card, borderColor: theme.border },
          isActive && styles.activeThumb
        ]}
      >
        {item.type === 'video' ? (
          <View style={[styles.thumbPlaceholder, { backgroundColor: theme.badgeBg }]}>
            <Text style={[styles.thumbText, { color: theme.textMain }]}>TRAILER</Text>
          </View>
        ) : (
          <Image source={GAME_IMAGES[item.uri]} style={styles.thumbImage} resizeMode="cover" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.mediaContainer}>
          <FlatList
            ref={flatListRef}
            data={mediaData}
            renderItem={renderMainMedia}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          />
          <View style={styles.thumbnailContainer}>
            <FlatList
              data={mediaData}
              renderItem={renderThumbnail}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailList}
            />
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.gameName, { color: theme.textMain }]}>{game.title}</Text>
          <Text style={[styles.studioText, { color: theme.textSub }]}>{game.studio}</Text>
          
          <Text style={[styles.priceText, isAlreadyOwned && { color: theme.textSub }]}>
            {formatPrice(game.price, isAlreadyOwned)}
          </Text>

          {/* NÚT MUA NGAY / ĐÃ SỞ HỮU */}
          <TouchableOpacity 
            style={[
              styles.buyNowBtn, 
              isAlreadyOwned && { backgroundColor: isDarkMode ? '#333' : '#ccc' } 
            ]}
            disabled={isAlreadyOwned}
            onPress={handleBuyNow}
          >
            <Text style={[styles.buyNowText, isAlreadyOwned && { color: '#888' }]}>
              {isAlreadyOwned ? "ĐÃ CÓ SẴN" : "MUA NGAY"}
            </Text>
          </TouchableOpacity>

          {/* NÚT THÊM VÀO GIỎ HÀNG (Chỉ hiện nếu chưa sở hữu) */}
          {!isAlreadyOwned && (
            <TouchableOpacity style={styles.addToCartBtn} onPress={addToCart}>
              <Text style={styles.addToCartText}>THÊM VÀO GIỎ HÀNG</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textMain }]}>GIỚI THIỆU TRÒ CHƠI</Text>
          <Text style={[styles.descriptionText, { color: theme.textDesc }]}>{game.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textMain }]}>THỂ LOẠI</Text>
          <View style={styles.categoryContainer}>
            {game.categories?.map((cat, index) => (
              <View key={index} style={[styles.categoryBadge, { backgroundColor: theme.badgeBg }]}>
                <Text style={styles.categoryText}>{cat}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 50 },
  mediaContainer: { marginBottom: 20 },
  mainMediaContainer: { width: width, height: width * 9 / 16, backgroundColor: '#000' },
  mainImage: { width: '100%', height: '100%' },
  thumbnailContainer: { alignItems: 'center', marginTop: 15 },
  thumbnailList: { paddingHorizontal: 20, gap: 12 },
  thumbnailBtn: { width: 80, height: 45, borderRadius: 4, borderWidth: 1, overflow: 'hidden' },
  activeThumb: { borderColor: '#00f5ff', borderWidth: 2 },
  thumbPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  thumbText: { fontSize: 10, fontWeight: 'bold' },
  thumbImage: { width: '100%', height: '100%' },
  infoSection: { paddingHorizontal: 20, marginBottom: 20 },
  gameName: { fontSize: 26, fontWeight: 'bold' },
  studioText: { fontSize: 14, marginBottom: 10 },
  priceText: { color: '#00f5ff', fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  buyNowBtn: { backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buyNowText: { color: '#fff', fontWeight: 'bold' },
  addToCartBtn: { paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#00f5ff' },
  addToCartText: { color: '#00f5ff', fontWeight: 'bold', fontSize: 11 },
  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, borderLeftWidth: 3, borderLeftColor: '#00f5ff', paddingLeft: 10 },
  descriptionText: { lineHeight: 22 },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  categoryText: { color: '#00f5ff', fontSize: 12 },
});