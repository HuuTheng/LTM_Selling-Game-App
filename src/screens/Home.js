import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";

export default function Home() {
  const games = [
    { id: 1, name: "Cyberpunk 2077", price: "1.200.000đ", color: "#f1c40f" },
    { id: 2, name: "Elden Ring", price: "900.000đ", color: "#e67e22" },
    { id: 3, name: "Counter-Strike 2", price: "Free to Play", color: "#3498db" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>NỔI BẬT & ĐANG BÁN CHẠY</Text>
      {games.map(game => (
        <TouchableOpacity key={game.id} style={styles.gameCard}>
          <View style={[styles.imagePlaceholder, { backgroundColor: game.color }]} />
          <View style={styles.info}>
            <Text style={styles.gameName}>{game.name}</Text>
            <Text style={styles.gamePrice}>{game.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 15 },
  sectionTitle: { color: "#555", fontWeight: "bold", marginBottom: 15, fontSize: 13 },
  gameCard: { backgroundColor: "#1f1f1f", borderRadius: 8, marginBottom: 15, overflow: "hidden" },
  imagePlaceholder: { height: 150, width: "100%" },
  info: { padding: 12 },
  gameName: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  gamePrice: { color: "#00f5ff", marginTop: 4 },
});