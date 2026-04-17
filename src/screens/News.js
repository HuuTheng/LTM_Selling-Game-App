import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function News() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.newsItem}>
        <Text style={styles.date}>17 THÁNG 4, 2024</Text>
        <Text style={styles.headline}>Bản cập nhật 7.35d của Dota 2 chính thức ra mắt</Text>
        <Text style={styles.summary}>Thay đổi lớn về meta và điều chỉnh sức mạnh các tướng...</Text>
      </View>
      <View style={styles.newsDivider} />
      <View style={styles.newsItem}>
        <Text style={styles.date}>16 THÁNG 4, 2024</Text>
        <Text style={styles.headline}>Steam Spring Sale đã kết thúc, bạn đã mua gì?</Text>
        <Text style={styles.summary}>Tổng kết những tựa game bán chạy nhất trong tuần lễ giảm giá vừa qua.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  newsItem: { marginBottom: 20 },
  date: { color: "#00f5ff", fontSize: 11, fontWeight: "bold" },
  headline: { color: "#fff", fontSize: 18, fontWeight: "bold", marginVertical: 5 },
  summary: { color: "#aaa", fontSize: 14, lineHeight: 20 },
  newsDivider: { height: 1, backgroundColor: "#333", marginBottom: 20 },
});