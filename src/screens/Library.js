import React from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";

export default function Search() {
  const categories = ["Hành động", "Phiêu lưu", "Nhập vai", "Chiến thuật", "Thể thao", "Kinh dị"];

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchInput} 
        placeholder="Tìm kiếm trò chơi..." 
        placeholderTextColor="#888"
      />
      <Text style={styles.title}>DUYỆT THEO THỂ LOẠI</Text>
      <View style={styles.chipContainer}>
        {categories.map((cat, index) => (
          <View key={index} style={styles.chip}>
            <Text style={styles.chipText}>{cat}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  searchInput: { backgroundColor: "#1f1f1f", color: "#fff", padding: 15, borderRadius: 10, marginBottom: 25 },
  title: { color: "#00f5ff", fontWeight: "bold", marginBottom: 15 },
  chipContainer: { flexDirection: "row", flexWrap: "wrap" },
  chip: { backgroundColor: "#333", padding: 10, borderRadius: 20, marginRight: 10, marginBottom: 10 },
  chipText: { color: "#fff", fontSize: 13 },
});