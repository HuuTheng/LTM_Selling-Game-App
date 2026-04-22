import React, { useState, memo } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, StatusBar } from "react-native";
import gamesData from "../data/games.json";
import { LinearGradient } from 'expo-linear-gradient'; 
import { ImageBackground } from 'react-native';
import { GAME_IMAGES } from '../constants/images';
import { useAuth } from "../nav_bar/navigation_bar"; // Import context theme

const formatPrice = (price) => {
  if (price === 0) return "Miễn phí";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};

// 1. COMPONENT HEADER (Nằm trong cùng file hoặc tách riêng)
const ListHeader = memo(({ searchText, setSearchText, categories, selectedCategory, setSelectedCategory, theme }) => {
  
  const handleSearchText = (text) => {
    setSearchText(text);
    if (text.length > 0) setSelectedCategory("Tất cả");
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSearchText(""); 
  };

  return (
    <View>
      <Text style={[styles.sectionTitle, { color: theme.sectionLabel }]}>TÌM KIẾM THEO TÊN</Text>
      <TextInput 
        style={[styles.searchInput, { backgroundColor: theme.card, color: theme.textMain }]} 
        placeholder="Nhập tên game..." 
        placeholderTextColor={theme.placeholder}
        value={searchText}
        onChangeText={handleSearchText}
        autoFocus={searchText.length > 0} 
      />
      
      <Text style={[styles.sectionTitle, { color: theme.sectionLabel }]}>TÌM KIẾM THEO THỂ LOẠI</Text>
      <View style={styles.chipContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => handleSelectCategory(cat)}
            style={[
              styles.chip, 
              { backgroundColor: theme.chipBg },
              selectedCategory === cat && styles.chipActive
            ]}
          >
            <Text style={[
              styles.chipText, 
              { color: theme.textMain },
              selectedCategory === cat && styles.chipTextActive
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.resultTitle}>
        {searchText ? `Kết quả: "${searchText}"` : `Thể loại: ${selectedCategory}`}
      </Text>
    </View>
  );
});

export default function Search({ navigation }) {
  const { isDarkMode } = useAuth(); // Lấy trạng thái theme
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Định nghĩa bảng màu theme
  const theme = {
    bg: isDarkMode ? "#121212" : "#f5f5f5",
    card: isDarkMode ? "#1f1f1f" : "#ffffff",
    textMain: isDarkMode ? "#fff" : "#000",
    sectionLabel: isDarkMode ? "#555" : "#888",
    placeholder: isDarkMode ? "#888" : "#bbb",
    chipBg: isDarkMode ? "#333" : "#e0e0e0",
    gradientColors: isDarkMode 
      ? ['rgba(31, 31, 31, 1)', 'rgba(31, 31, 31, 0.6)', 'transparent'] 
      : ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.7)', 'transparent']
  };

  const categories = [
    "Tất cả",
    ...new Set(gamesData.games.flatMap((game) => game.categories)),
  ];

  const filteredGames = gamesData.games.filter((game) => {
    if (searchText.length > 0) {
      return game.title.toLowerCase().includes(searchText.toLowerCase());
    }
    if (selectedCategory !== "Tất cả") {
      return game.categories.includes(selectedCategory);
    }
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <ListHeader 
            searchText={searchText}
            setSearchText={setSearchText}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            theme={theme}
          />
        }
        contentContainerStyle={{ paddingBottom: 100 }} 
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.gameItem}
            onPress={() => navigation.navigate('GameDetail', { game: item })}
          >
            <ImageBackground 
              source={GAME_IMAGES[item.image]} 
              style={styles.itemImageBackground}
              resizeMode="cover"
              imageStyle={{ opacity: isDarkMode ? 0.5 : 0.8 }} 
            >
              <LinearGradient
                colors={theme.gradientColors}
                start={{ x: 0, y: 0.5 }} 
                end={{ x: 1, y: 0.5 }} 
                style={styles.gradientOverlay}
              >
                <View style={styles.textContainer}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={[styles.gameTitle, { color: theme.textMain }]} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={[styles.studioText, { color: isDarkMode ? '#bbb' : '#666' }]}>
                      {item.studio}
                    </Text>
                  </View>
                  <Text style={[styles.gamePrice, { color: isDarkMode ? '#fff' : '#000' }]}>
                    {formatPrice(item.price)}
                  </Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { fontSize: 11, fontWeight: "bold", marginBottom: 10, letterSpacing: 1 },
  searchInput: { padding: 15, borderRadius: 10, marginBottom: 25, fontSize: 16 },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20 },
  chip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10, marginBottom: 10 },
  chipActive: { backgroundColor: "#00f5ff" },
  chipText: { fontSize: 13 },
  chipTextActive: { color: "#000", fontWeight: "bold" },
  resultTitle: { color: "#00f5ff", fontWeight: "bold", marginBottom: 15, fontSize: 14 },
  gameItem: { borderRadius: 10, marginBottom: 12, overflow: 'hidden' },
  gameTitle: { fontSize: 17, fontWeight: 'bold' },
  gamePrice: { fontWeight: '900', fontSize: 14 },
  itemImageBackground: { width: '100%', height: 100 },
  gradientOverlay: { flex: 1, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' },
  textContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  studioText: { fontSize: 12, marginTop: 2 }
});