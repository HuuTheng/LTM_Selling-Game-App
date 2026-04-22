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
  TouchableOpacity 
} from "react-native";

import newsData from "../data/news.json";
import { NEWS_IMAGES } from "../constants/images";

const { width } = Dimensions.get("window");
const BANNER_H = width * 1.7; 
const BANNER_W = width;

export default function News({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // --- LOGIC DỮ LIỆU ---
  // Lấy 5 bài đầu làm Banner
  const bannerArticles = newsData.slice(0, 5);
  const bannerIds = bannerArticles.map(item => item.id);
  const remainingData = newsData.filter(item => !bannerIds.includes(item.id));

  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  // Lấy 5 bài ngẫu nhiên cho mục Tin Mới Nhất
  const randomNews = shuffle(remainingData).slice(0, 5);
  const randomNewsIds = randomNews.map(item => item.id);

  const availableForCats = remainingData.filter(item => !randomNewsIds.includes(item.id));

  // Lọc theo Tags từ dữ liệu JSON
  const tinGameArticles = availableForCats
    .filter(item => item.tags.includes("tin-game"))
    .slice(0, 4);

  const pcConsoleArticles = availableForCats
    .filter(item => item.tags.includes("pc-console") && !tinGameArticles.map(i => i.id).includes(item.id))
    .slice(0, 4);

  // --- HÀM CHUYỂN TRANG ---
  const handlePress = (article) => {
    navigation.navigate('Rnews', { article: article });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex === bannerArticles.length - 1 ? 0 : activeIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const onMomentumScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / BANNER_W);
    setActiveIndex(currentIndex);
  };

  // --- RENDER BANNER ---
  const renderBannerItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={styles.bannerItem}
      onPress={() => handlePress(item)}
    >
      <Image 
        source={NEWS_IMAGES[item.thumbnail]} 
        style={styles.bannerImage} 
      />
      <View style={styles.bannerOverlay}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{item.tags[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.bannerTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.bannerSummary} numberOfLines={2}>{item.summary}</Text>
      </View>
    </TouchableOpacity>
  );

  // --- RENDER DANH SÁCH TIN TỨC ---
  const RenderSection = (title, data) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.newsCard} 
          activeOpacity={0.8}
          onPress={() => handlePress(item)}
        >
          <Image 
            source={NEWS_IMAGES[item.thumbnail]} 
            style={styles.newsThumbnail} 
          />
          <View style={styles.newsContent}>
            <Text style={styles.newsTag}>{item.tags[0]}</Text>
            <Text style={styles.newsHeadline}>{item.title}</Text>
            <View style={styles.newsFooter}>
              <Text style={styles.newsAuthor}>{item.author}</Text>
              <Text style={styles.newsDate}> • 2026</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
        
        {/* PAGINATION DOTS */}
        <View style={styles.pagination}>
          {bannerArticles.map((_, index) => {
            const inputRange = [(index - 1) * BANNER_W, index * BANNER_W, (index + 1) * BANNER_W];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 30, 8],
              extrapolate: "clamp",
            });
            const dotColor = scrollX.interpolate({
              inputRange,
              outputRange: ["#ffffff", "#00f5ff", "#ffffff"],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: "clamp",
            });

            return (
              <Animated.View 
                key={index} 
                style={[
                  styles.dot, 
                  { width: dotWidth, backgroundColor: dotColor, opacity: opacity }
                ]} 
              />
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
  container: { flex: 1, backgroundColor: "#000" },
  bannerContainer: { height: BANNER_H, position: 'relative' },
  bannerItem: { width: BANNER_W, height: BANNER_H },
  bannerImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  bannerOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 25, height: '35%', justifyContent: 'center'
  },
  tagContainer: { backgroundColor: '#00f5ff', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 4, marginBottom: 12 },
  tagText: { color: '#000', fontSize: 11, fontWeight: '900' },
  bannerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', lineHeight: 30 },
  bannerSummary: { color: '#ccc', fontSize: 14, marginTop: 8, lineHeight: 18 },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: 15, alignSelf: 'center' },
  dot: { height: 4, borderRadius: 2, marginHorizontal: 3 },
  contentPadding: { paddingHorizontal: 20 },
  sectionContainer: { marginTop: 30 },
  sectionTitle: { 
    color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1.2, 
    marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#00f5ff', paddingLeft: 12,
    textTransform: 'uppercase'
  },
  newsCard: { backgroundColor: '#111', borderRadius: 20, marginBottom: 25, overflow: 'hidden' },
  newsThumbnail: { width: '100%', height: 220, resizeMode: 'cover' },
  newsContent: { padding: 18 },
  newsTag: { color: '#00f5ff', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 },
  newsHeadline: { color: "#fff", fontSize: 18, fontWeight: "bold", lineHeight: 26 },
  newsFooter: { flexDirection: 'row', marginTop: 12 },
  newsAuthor: { color: '#777', fontSize: 12, fontWeight: 'bold' },
  newsDate: { color: '#555', fontSize: 12 },
});