import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  FlatList, Image, Modal, TouchableWithoutFeedback, StatusBar ,ScrollView
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import gamesData from "../data/games.json";
import { GAME_IMAGES } from "../constants/images";
import { useAuth } from "../nav_bar/navigation_bar";

export default function Library({ navigation }) {
  const { isDarkMode } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [filterVisible, setFilterVisible] = useState(false);
  const [ownedGameIds, setOwnedGameIds] = useState([]); // Lưu danh sách ID đã mua thực tế

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

  // 1. Tải danh sách ID game đã mua từ AsyncStorage mỗi khi màn hình được focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadLibraryData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadLibraryData = async () => {
    try {
      const savedLib = await AsyncStorage.getItem('library');
      const libIds = savedLib ? JSON.parse(savedLib) : [];
      setOwnedGameIds(libIds);
    } catch (error) {
      console.error("Lỗi khi tải thư viện:", error);
    }
  };

  // 2. Tạo danh sách thể loại động từ file JSON
  const categories = ["Tất cả", ...new Set(gamesData.games.flatMap((g) => g.categories))];

  // 3. Logic Lọc Game: Chỉ hiện game có ID nằm trong ownedGameIds
  const myGames = gamesData.games.filter((game) => {
    const isOwned = ownedGameIds.includes(game.id); 
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
          placeholder="Tìm game trong thư viện..."
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
              <ScrollView style={{ maxHeight: 400 }}>
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
              </ScrollView>
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
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="library-outline" size={80} color={theme.textSub} />
            <Text style={[styles.emptyText, { color: theme.textSub }]}>
              {ownedGameIds.length === 0 ? "Bạn chưa sở hữu game nào" : "Không tìm thấy game phù hợp"}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.gameCard, { backgroundColor: theme.card, elevation: isDarkMode ? 0 : 3 }]}
            onPress={() => navigation.navigate('GameDetail', { game: { ...item, isOwned: true } })}
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
  gameImage: { width: '100%', height: 180, resizeMode: 'cover' },
  cardContent: { padding: 10 },
  gameTitle: { fontSize: 14, fontWeight: 'bold' },
  ownedRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ownedTag: { fontSize: 12 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: 20, fontSize: 16, textAlign: 'center' },
  columnWrapper: {
    justifyContent: 'flex-start', // Căn về bên trái thay vì giãn đều
  },
  gameCard: { 
    // flex: 1 sẽ giúp nó chiếm đúng 1/2 chiều ngang trừ đi margin
    flex: 0.5, 
    margin: 8, 
    borderRadius: 12, 
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxWidth: '46%', // Đảm bảo không chiếm quá nửa màn hình
  },
});