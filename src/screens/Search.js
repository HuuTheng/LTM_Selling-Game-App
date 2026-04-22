import React, { useState, memo } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import gamesData from "../data/games.json";

const formatPrice = (price) => {
  if (price === 0) return "Miễn phí";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};

// 1. TÁCH HEADER RA THÀNH COMPONENT RIÊNG (Nằm ngoài Search)
const ListHeader = memo(({ searchText, setSearchText, categories, selectedCategory, setSelectedCategory }) => {
  
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
      <Text style={styles.sectionTitle}>TÌM KIẾM THEO TÊN</Text>
      <TextInput 
        style={styles.searchInput} 
        placeholder="Nhập tên game..." 
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={handleSearchText}
        // Giữ bàn phím không bị ẩn
        autoFocus={searchText.length > 0} 
      />
      
      <Text style={styles.sectionTitle}>TÌM KIẾM THEO THỂ LOẠI</Text>
      <View style={styles.chipContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => handleSelectCategory(cat)}
            style={[styles.chip, selectedCategory === cat && styles.chipActive]}
          >
            <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
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
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

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
    <View style={styles.container}>
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id.toString()}
        // 2. SỬ DỤNG COMPONENT ĐÃ TÁCH
        ListHeaderComponent={
          <ListHeader 
            searchText={searchText}
            setSearchText={setSearchText}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        }
        contentContainerStyle={{ paddingBottom: 100 }} 
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.gameItem}
          onPress={() => navigation.navigate('GameDetail', { game: item })} // Gọi điều hướng và gửi dữ liệu game
        >
          <View>
            <Text style={styles.gameTitle}>{item.title}</Text>
            <Text style={{ color: '#888', fontSize: 12 }}>{item.studio}</Text>
          </View>
          <Text style={styles.gamePrice}>{formatPrice(item.price)}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { color: "#555", fontSize: 11, fontWeight: "bold", marginBottom: 10, letterSpacing: 1 },
  searchInput: { backgroundColor: "#1f1f1f", color: "#fff", padding: 15, borderRadius: 10, marginBottom: 25 },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20 },
  chip: { backgroundColor: "#333", paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10, marginBottom: 10 },
  chipActive: { backgroundColor: "#00f5ff" },
  chipText: { color: "#fff" },
  chipTextActive: { color: "#000", fontWeight: "bold" },
  resultTitle: { color: "#00f5ff", fontWeight: "bold", marginBottom: 15, fontSize: 14 },
  gameItem: { backgroundColor: "#1f1f1f", padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gameTitle: { color: "#fff", fontSize: 16, fontWeight: '500' },
  gamePrice: { color: "#00f5ff", fontWeight: 'bold' }
});