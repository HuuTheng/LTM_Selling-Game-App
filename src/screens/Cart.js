import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, 
  TouchableOpacity, SafeAreaView, StatusBar 
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../nav_bar/navigation_bar';
import { GAME_IMAGES } from '../constants/images';
import gamesData from "../data/games.json";

const Cart = ({ navigation }) => {
  const { isDarkMode } = useAuth();
  
  // Giả sử lấy danh sách game chưa sở hữu để cho vào giỏ hàng
  const [cartItems, setCartItems] = useState(
    gamesData.games.slice(0, 5).map(game => ({ ...game, selected: false }))
  );

  const theme = {
    bg: isDarkMode ? '#121212' : '#f5f5f5',
    card: isDarkMode ? '#1e1e1e' : '#ffffff',
    textMain: isDarkMode ? '#fff' : '#000',
    textSub: isDarkMode ? '#aaa' : '#666',
    border: isDarkMode ? '#333' : '#eee',
    bottomBar: isDarkMode ? '#1a1a1a' : '#ffffff',
  };

  // Hàm xử lý tích chọn từng game
  const toggleSelect = (id) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  // Tính tổng tiền các game được tích
  const totalPrice = cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price, 0);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.cartItem, { backgroundColor: theme.card, borderBottomColor: theme.border }]}
      onPress={() => toggleSelect(item.id)}
    >
      <Checkbox
        style={styles.checkbox}
        value={item.selected}
        onValueChange={() => toggleSelect(item.id)}
        color={item.selected ? '#00f5ff' : theme.textSub}
      />
      
      <Image source={GAME_IMAGES[item.image]} style={styles.gameImage} />
      
      <View style={styles.infoContainer}>
        <Text style={[styles.gameTitle, { color: theme.textMain }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.gamePrice, { color: '#00f5ff' }]}>
          {item.price === 0 ? "Miễn phí" : item.price.toLocaleString('vi-VN') + " đ"}
        </Text>
      </View>

      <TouchableOpacity onPress={() => {/* Logic xóa khỏi giỏ */}}>
        <Ionicons name="trash-outline" size={20} color="#ff4d4d" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textMain }]}>Giỏ hàng của tôi</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.textSub }]}>Giỏ hàng trống</Text>
        }
      />

      {/* THANH TỔNG TIỀN & THANH TOÁN (Sát Bottom Nav) */}
      <View style={[styles.bottomBar, { backgroundColor: theme.bottomBar, borderTopColor: theme.border }]}>
        <View style={styles.bottomContent}>
          {/* Góc Trái: Nút Thanh toán */}
          <TouchableOpacity 
            style={[styles.checkoutBtn, { opacity: totalPrice > 0 ? 1 : 0.6 }]}
            disabled={totalPrice === 0}
            onPress={() => alert("Chuyển đến trang thanh toán")}
          >
            <Text style={styles.checkoutText}>THANH TOÁN</Text>
          </TouchableOpacity>

          {/* Góc Phải: Tổng số tiền */}
          <View style={styles.totalContainer}>
            <Text style={[styles.totalLabel, { color: theme.textSub }]}>Tổng cộng:</Text>
            <Text style={styles.totalAmount}>{totalPrice.toLocaleString('vi-VN')} đ</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  cartItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    marginHorizontal: 15, 
    marginBottom: 10, 
    borderRadius: 12,
    borderBottomWidth: 1,
  },
  checkbox: { marginRight: 15, borderRadius: 4 },
  gameImage: { width: 50, height: 70, borderRadius: 6 },
  infoContainer: { flex: 1, marginLeft: 15 },
  gameTitle: { fontSize: 16, fontWeight: 'bold' },
  gamePrice: { fontSize: 14, marginTop: 4, fontWeight: '600' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 },

  // Thanh Bottom Bar
  bottomBar: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    paddingHorizontal: 20, 
    paddingVertical: 20, 
    borderTopWidth: 1,
    paddingBottom: 35, // Để không bị đè bởi vạch home của iPhone
  },
  bottomContent: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  checkoutBtn: { 
    backgroundColor: '#00f5ff', 
    paddingHorizontal: 25, 
    paddingVertical: 12, 
    borderRadius: 10 
  },
  checkoutText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  totalContainer: { alignItems: 'flex-end' },
  totalLabel: { fontSize: 12, marginBottom: 2 },
  totalAmount: { color: '#00f5ff', fontSize: 20, fontWeight: 'bold' },
});

export default Cart;