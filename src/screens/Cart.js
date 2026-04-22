import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View, Text, StyleSheet, FlatList, Image, 
  TouchableOpacity, SafeAreaView, StatusBar, Alert 
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../nav_bar/navigation_bar';
import { GAME_IMAGES } from '../constants/images';
import gamesData from "../data/games.json";

const Cart = ({ navigation }) => {
  const { isDarkMode } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // --- CẤU HÌNH THEME ---
  const theme = {
    bg: isDarkMode ? '#121212' : '#f5f5f5',
    card: isDarkMode ? '#1e1e1e' : '#ffffff',
    textMain: isDarkMode ? '#fff' : '#000',
    textSub: isDarkMode ? '#aaa' : '#666',
    border: isDarkMode ? '#333' : '#eee',
    bottomBar: isDarkMode ? '#1a1a1a' : '#ffffff',
  };

  // 1. Tự động cập nhật danh sách mỗi khi người dùng quay lại màn hình Giỏ hàng
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCartData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadCartData = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      const cartIds = savedCart ? JSON.parse(savedCart) : [];
      
      // Lọc dữ liệu từ file games.json dựa trên những ID có trong AsyncStorage
      const items = gamesData.games
        .filter(game => cartIds.includes(game.id))
        .map(game => ({ ...game, selected: false }));
      
      setCartItems(items);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu giỏ hàng:", error);
    }
  };

  // 2. Hàm xóa game khỏi giỏ hàng
  const removeFromCart = async (id) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn muốn bỏ game này khỏi giỏ hàng?",
      [
        { text: "Hủy", style: "cancel" },
        { 
          text: "Xóa", 
          style: "destructive",
          onPress: async () => {
            const updatedItems = cartItems.filter(item => item.id !== id);
            setCartItems(updatedItems);
            
            // Cập nhật lại AsyncStorage
            const updatedIds = updatedItems.map(item => item.id);
            await AsyncStorage.setItem('cart', JSON.stringify(updatedIds));
          }
        }
      ]
    );
  };

  // 3. Hàm chọn/bỏ chọn từng game
  const toggleSelect = (id) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  // 4. Tính tổng tiền cho những game ĐƯỢC CHỌN
  const totalPrice = cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price, 0);

  // 5. Chuyển sang trang Thanh toán
  const handleCheckout = () => {
    const selectedGames = cartItems.filter(item => item.selected);
    if (selectedGames.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn ít nhất một game để thanh toán.");
      return;
    }
    // Truyền danh sách game đã chọn sang màn hình Payment
    navigation.navigate('Payment', { 
      gamesToBuy: selectedGames, 
      fromCart: true 
    });
  };

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

      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteBtn}>
        <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
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
        contentContainerStyle={{ paddingBottom: 150 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color={theme.textSub} />
            <Text style={[styles.emptyText, { color: theme.textSub }]}>Giỏ hàng của bạn đang trống</Text>
          </View>
        }
      />

      {/* THANH TỔNG TIỀN & THANH TOÁN (Cố định ở dưới màn hình) */}
      <View style={[styles.bottomBar, { backgroundColor: theme.bottomBar, borderTopColor: theme.border }]}>
        <View style={styles.bottomContent}>
          <TouchableOpacity 
            style={[styles.checkoutBtn, { opacity: totalPrice > 0 ? 1 : 0.6 }]}
            disabled={totalPrice === 0}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutText}>
              THANH TOÁN ({cartItems.filter(i => i.selected).length})
            </Text>
          </TouchableOpacity>

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
  gameImage: { width: 55, height: 75, borderRadius: 6 },
  infoContainer: { flex: 1, marginLeft: 15 },
  gameTitle: { fontSize: 16, fontWeight: 'bold' },
  gamePrice: { fontSize: 14, marginTop: 4, fontWeight: '600' },
  deleteBtn: { padding: 5 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: 20, fontSize: 16 },
  bottomBar: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    paddingHorizontal: 20, 
    paddingVertical: 20, 
    borderTopWidth: 1,
    paddingBottom: 35,
  },
  bottomContent: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  checkoutBtn: { 
    backgroundColor: '#00f5ff', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 10 
  },
  checkoutText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  totalContainer: { alignItems: 'flex-end' },
  totalLabel: { fontSize: 12, marginBottom: 2 },
  totalAmount: { color: '#00f5ff', fontSize: 18, fontWeight: 'bold' },
});

export default Cart;