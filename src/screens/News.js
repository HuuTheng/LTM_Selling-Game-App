import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  FlatList, 
  Image, 
  Dimensions, 
  Animated,
  TouchableOpacity,
  StatusBar
} from "react-native";

import newsData from "../data/news.json";
import { NEWS_IMAGES } from "../constants/images";
import { useAuth } from "../nav_bar/navigation_bar"; // Import useAuth để dùng Theme

const { width } = Dimensions.get("window");
const BANNER_H = width * 1.7; 
const BANNER_W = width;

export default function News({ navigation }) {
  const { isDarkMode } = useAuth(); // Lấy trạng thái theme
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // --- MÀU SẮC THEO THEME ---
  const theme = {
    bg: isDarkMode ? "#000" : "#f5f5f5",
    card: isDarkMode ? "#111" : "#ffffff",
    textMain: isDarkMode ? "#fff" : "#000",
    textSub: isDarkMode ? "#ccc" : "#444",
    textFooter: isDarkMode ? "#777" : "#888",
    border: isDarkMode ? "#00f5ff" : "#00b4cc", // Chỉnh xanh đậm hơn chút ở mode sáng cho dễ nhìn
  };

  // --- LOGIC DỮ LIỆU (Giữ nguyên của bạn) ---
  const bannerArticles = newsData.slice(0, 5);
  const bannerIds = bannerArticles.map(item => item.id);
  const remainingData = newsData.filter(item => !bannerIds.includes(item.id));
  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
  const randomNews = shuffle(remainingData).slice(0, 5);
  const randomNewsIds = randomNews.map(item => item.id);
  const availableForCats = remainingData.filter(item => !randomNewsIds.includes(item.id));
  const tinGameArticles = availableForCats.filter(item => item.tags.includes("tin-game")).slice(0, 4);
  const pcConsoleArticles = availableForCats.filter(item => item.tags.includes("pc-console") && !tinGameArticles.map(i => i.id).includes(item.id)).slice(0, 4);

  const handlePress = (article) => {
    navigation.navigate('Rnews', { article: article });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex === bannerArticles.length - 1 ? 0 : activeIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 8000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const onMomentumScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / BANNER_W);
    setActiveIndex(currentIndex);
  };

  const renderBannerItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={styles.bannerItem}
      onPress={() => handlePress(item)}
    >
      <Image source={NEWS_IMAGES[item.thumbnail]} style={styles.bannerImage} />
      <View style={[styles.bannerOverlay, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)' }]}>
        <View style={[styles.tagContainer, { backgroundColor: theme.border }]}>
          <Text style={[styles.tagText, { color: isDarkMode ? '#000' : '#fff' }]}>{item.tags[0]?.toUpperCase()}</Text>
        </View>
        <Text style={[styles.bannerTitle, { color: theme.textMain }]} numberOfLines={2}>{item.title}</Text>
        <Text style={[styles.bannerSummary, { color: theme.textSub }]} numberOfLines={2}>{item.summary}</Text>
      </View>
    </TouchableOpacity>
  );

  const RenderSection = (title, data) => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: theme.textMain, borderLeftColor: theme.border }]}>{title}</Text>
      {data.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={[styles.newsCard, { backgroundColor: theme.card, elevation: isDarkMode ? 0 : 4 }]} 
          activeOpacity={0.8}
          onPress={() => handlePress(item)}
        >
          <Image source={NEWS_IMAGES[item.thumbnail]} style={styles.newsThumbnail} />
          <View style={styles.newsContent}>
            <Text style={[styles.newsTag, { color: theme.border }]}>{item.tags[0]}</Text>
            <Text style={[styles.newsHeadline, { color: theme.textMain }]}>{item.title}</Text>
            <View style={styles.newsFooter}>
              <Text style={[styles.newsAuthor, { color: theme.textFooter }]}>{item.author}</Text>
              <Text style={[styles.newsDate, { color: theme.textFooter }]}> • 2026</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* BANNER SECTION */}
      <View style={styles.bannerContainer}>
        <FlatList
          ref={flatListRef}
          data={bannerArticles}
          renderItem={renderBannerItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
        
        <View style={styles.pagination}>
          {bannerArticles.map((_, index) => {
            const inputRange = [(index - 1) * BANNER_W, index * BANNER_W, (index + 1) * BANNER_W];
            const dotWidth = scrollX.interpolate({ inputRange, outputRange: [8, 30, 8], extrapolate: "clamp" });
            const dotColor = scrollX.interpolate({ inputRange, outputRange: [isDarkMode ? "#fff" : "#ccc", theme.border, isDarkMode ? "#fff" : "#ccc"], extrapolate: "clamp" });
            return (
              <Animated.View key={index} style={[styles.dot, { width: dotWidth, backgroundColor: dotColor }]} />
            );
          })}
        </View>
      </View>

      <View style={styles.contentPadding}>
        {RenderSection("TIN TỨC MỚI NHẤT", randomNews)}
        {tinGameArticles.length > 0 && RenderSection("THỂ LOẠI: TIN GAME", tinGameArticles)}
        {pcConsoleArticles.length > 0 && RenderSection("THỂ LOẠI: PC & CONSOLE", pcConsoleArticles)}
      </View>
      
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bannerContainer: { height: BANNER_H, position: 'relative' },
  bannerItem: { width: BANNER_W, height: BANNER_H },
  bannerImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  bannerOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 25, height: '38%', justifyContent: 'center'
  },
  tagContainer: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 4, marginBottom: 12 },
  tagText: { fontSize: 11, fontWeight: '900' },
  bannerTitle: { fontSize: 24, fontWeight: 'bold', lineHeight: 30 },
  bannerSummary: { fontSize: 14, marginTop: 8, lineHeight: 18 },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: 15, alignSelf: 'center' },
  dot: { height: 4, borderRadius: 2, marginHorizontal: 3 },
  contentPadding: { paddingHorizontal: 20 },
  sectionContainer: { marginTop: 30 },
  sectionTitle: { 
    fontSize: 16, fontWeight: 'bold', letterSpacing: 1.2, 
    marginBottom: 20, borderLeftWidth: 4, paddingLeft: 12,
    textTransform: 'uppercase'
  },
  newsCard: { 
    borderRadius: 20, marginBottom: 25, overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  newsThumbnail: { width: '100%', height: 220, resizeMode: 'cover' },
  newsContent: { padding: 18 },
  newsTag: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 },
  newsHeadline: { fontSize: 18, fontWeight: "bold", lineHeight: 26 },
  newsFooter: { flexDirection: 'row', marginTop: 12 },
  newsAuthor: { fontSize: 12, fontWeight: 'bold' },
  newsDate: { fontSize: 12 },
});