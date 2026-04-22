import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  FlatList, Image, Modal, TouchableWithoutFeedback, StatusBar 
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import gamesData from "../data/games.json";
import { GAME_IMAGES } from "../constants/images";
import { useAuth } from "../nav_bar/navigation_bar"; // Import Theme context

export default function Library({ navigation }) {
  const { isDarkMode } = useAuth(); // Lấy trạng thái theme
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [filterVisible, setFilterVisible] = useState(false);

  // --- CẤU HÌNH THEME ---
  const theme = {
    bg: isDarkMode ? "#121212" : "#f5f5f5",
    card: isDarkMode ? "#1f1f1f" : "#ffffff",
    textMain: isDarkMode ? "#fff" : "#000",
    textSub: isDarkMode ? "#888" : "#666",
    inputBg: isDarkMode ? "#1f1f1f" : "#e8e8e8",
    modalBg: isDarkMode ? "#1e1e1e" : "#ffffff",
    border: isDarkMode ? "#333" : "#eee",
  };

  const categories = ["Tất cả", ...new Set(gamesData.games.flatMap((g) => g.categories))];

  const myGames = gamesData.games.filter((game) => {
    const isOwned = game.isOwned === true; 
    const matchesSearch = game.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCat = selectedCategory === "Tất cả" || game.categories.includes(selectedCategory);
    return isOwned && matchesSearch && matchesCat;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* THANH TÌM KIẾM */}
      <View style={styles.searchSection}>
        <TextInput 
          style={[styles.searchInput, { backgroundColor: theme.inputBg, color: theme.textMain }]}
          placeholder="Lọc theo tên game..."
          placeholderTextColor={theme.textSub}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* NÚT LỌC VÀ TRẠNG THÁI */}
      <View style={styles.filterRow}>
        <TouchableOpacity 
          style={[styles.filterBtn, { backgroundColor: isDarkMode ? '#333' : '#ddd' }]} 
          onPress={() => setFilterVisible(true)}
        >
          <Ionicons name="filter" size={18} color={theme.textMain} />
          <Text style={[styles.filterBtnText, { color: theme.textMain }]}>Lọc</Text>
        </TouchableOpacity>
        
        <Text style={[styles.resultText, { color: theme.textSub }]}>
          Thể loại: <Text style={{color: '#00f5ff', fontWeight: 'bold'}}>{selectedCategory}</Text>
        </Text>
      </View>

      {/* POPUP CHỌN THỂ LOẠI */}
      <Modal visible={filterVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.popupMenu, { backgroundColor: theme.modalBg }]}>
              <Text style={[styles.popupTitle, { color: theme.textMain }]}>Chọn thể loại</Text>
              {categories.map((cat, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.categoryOption, { borderBottomColor: theme.border }]}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setFilterVisible(false);
                  }}
                >
                  <Text style={[
                    styles.catText, 
                    { color: theme.textMain },
                    selectedCategory === cat && {color: '#00f5ff', fontWeight: 'bold'}
                  ]}>
                    {cat}
                  </Text>
                  {selectedCategory === cat && <Ionicons name="checkmark" size={18} color="#00f5ff" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* DANH SÁCH GRID 2 CỘT */}
      <FlatList
        data={myGames}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.gameCard, { backgroundColor: theme.card, elevation: isDarkMode ? 0 : 3 }]}
            onPress={() => navigation.navigate('GameDetail', { game: item })}
          >
            <Image source={GAME_IMAGES[item.image]} style={styles.gameImage} />
            <View style={styles.cardContent}>
                <Text style={[styles.gameTitle, { color: theme.textMain }]} numberOfLines={1}>
                    {item.title}
                </Text>
                <View style={styles.ownedRow}>
                    <Ionicons name="checkmark-circle" size={14} color="#00f5ff" />
                    <Text style={[styles.ownedTag, { color: theme.textSub }]}> Đã sở hữu</Text>
                </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15 },
  searchSection: { marginTop: 20, marginBottom: 15 },
  searchInput: { padding: 12, borderRadius: 10, fontSize: 15 },
  filterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  filterBtn: { 
    flexDirection: 'row', alignItems: 'center', 
    paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, gap: 8, marginRight: 15
  },
  filterBtnText: { fontWeight: 'bold' },
  resultText: { fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  popupMenu: { width: '80%', borderRadius: 16, padding: 20, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  popupTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  categoryOption: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    paddingVertical: 15, borderBottomWidth: 0.5
  },
  catText: { fontSize: 16 },
  gameCard: { 
    flex: 1, 
    margin: 8, 
    borderRadius: 12, 
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gameImage: { width: '100%', height: 200, resizeMode: 'cover' },
  cardContent: { padding: 10 },
  gameTitle: { fontSize: 14, fontWeight: 'bold' },
  ownedRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ownedTag: { fontSize: 12 }
});