import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  FlatList, Image, Modal, TouchableWithoutFeedback 
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import gamesData from "../data/games.json";
import { GAME_IMAGES } from "../constants/images";

export default function Library({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [filterVisible, setFilterVisible] = useState(false);

  const categories = ["Tất cả", ...new Set(gamesData.games.flatMap((g) => g.categories))];

  // Lọc game đã sở hữu và khớp điều kiện tìm kiếm/thể loại
  const myGames = gamesData.games.filter((game) => {
    const isOwned = game.isOwned === true; 
    const matchesSearch = game.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCat = selectedCategory === "Tất cả" || game.categories.includes(selectedCategory);
    return isOwned && matchesSearch && matchesCat;
  });

  return (
    <View style={styles.container}>
      {/* THANH TÌM KIẾM */}
      <View style={styles.searchSection}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Lọc theo tên game..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* NÚT LỌC VÀ TRẠNG THÁI */}
      <View style={styles.filterRow}>
        <TouchableOpacity 
          style={styles.filterBtn} 
          onPress={() => setFilterVisible(true)}
        >
          <Ionicons name="filter" size={18} color="#fff" />
          <Text style={styles.filterBtnText}>Lọc</Text>
        </TouchableOpacity>
        
        <Text style={styles.resultText}>
          Game: <Text style={{color: '#00f5ff'}}>{selectedCategory}</Text>
        </Text>
      </View>

      {/* POPUP CHỌN THỂ LOẠI */}
      <Modal visible={filterVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.popupMenu}>
              <Text style={styles.popupTitle}>Chọn thể loại</Text>
              {categories.map((cat, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.categoryOption}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setFilterVisible(false);
                  }}
                >
                  <Text style={[styles.catText, selectedCategory === cat && {color: '#00f5ff'}]}>
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
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.gameCard}
            onPress={() => navigation.navigate('GameDetail', { game: item })}
          >
            <Image source={GAME_IMAGES[item.image]} style={styles.gameImage} />
            <Text style={styles.gameTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.ownedTag}>Đã có sẵn</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 15 },
  searchSection: { marginTop: 20, marginBottom: 15 },
  searchInput: { backgroundColor: "#1f1f1f", color: "#fff", padding: 12, borderRadius: 8 },
  filterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  filterBtn: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', 
    paddingHorizontal: 15, paddingVertical: 8, borderRadius: 6, gap: 8, marginRight: 15
  },
  filterBtnText: { color: '#fff', fontWeight: 'bold' },
  resultText: { color: '#888', fontSize: 14, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  popupMenu: { backgroundColor: '#1e1e1e', width: '80%', borderRadius: 12, padding: 20 },
  popupTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  categoryOption: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#333' 
  },
  catText: { color: '#fff', fontSize: 15 },
  gameCard: { flex: 1, margin: 8, maxWidth: '47%' },
  gameImage: { width: '100%', height: 220, borderRadius: 8 },
  gameTitle: { color: '#fff', fontSize: 14, marginTop: 8, fontWeight: 'bold' },
  ownedTag: { color: '#888', fontSize: 12, marginTop: 2 }
});