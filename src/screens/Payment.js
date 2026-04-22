import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Dimensions,
  Alert,
  FlatList
} from 'react-native';
import { GAME_IMAGES } from '../constants/images';

const { width } = Dimensions.get('window');

export default function Payment({ route, navigation }) {
  // Nhận mảng gamesToBuy và cờ hiệu fromCart từ route.params
  const { gamesToBuy, fromCart } = route.params;
  const [selectedMethod, setSelectedMethod] = useState('momo');

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };

  // Tính tổng tiền của tất cả các game trong danh sách mua
  const totalAmount = gamesToBuy.reduce((sum, game) => sum + game.price, 0);

  // Hàm xử lý thanh toán thực tế
  const handleConfirmPayment = async () => {
    try {
      // 1. Lấy danh sách ID game trong Thư viện hiện tại
      const savedLib = await AsyncStorage.getItem('library');
      let libIds = savedLib ? JSON.parse(savedLib) : [];

      // 2. Lấy danh sách ID của các game vừa mua
      const newGameIds = gamesToBuy.map(g => g.id);

      // 3. Hợp nhất vào Thư viện (Sử dụng Set để tránh trùng lặp ID)
      const updatedLib = [...new Set([...libIds, ...newGameIds])];
      await AsyncStorage.setItem('library', JSON.stringify(updatedLib));

      // 4. Nếu thanh toán từ Giỏ hàng, tiến hành xóa các game đã mua khỏi Giỏ hàng
      if (fromCart) {
        const savedCart = await AsyncStorage.getItem('cart');
        let cartIds = savedCart ? JSON.parse(savedCart) : [];
        const remainingCart = cartIds.filter(id => !newGameIds.includes(id));
        await AsyncStorage.setItem('cart', JSON.stringify(remainingCart));
      }

      // 5. Thông báo và chuyển hướng
      Alert.alert(
        "Thành công", 
        "Giao dịch hoàn tất! Trò chơi đã được thêm vào thư viện của bạn.",
        [{ text: "Đến Thư viện", onPress: () => navigation.navigate('Library') }]
      );

    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      Alert.alert("Lỗi", "Không thể hoàn tất thanh toán. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>XÁC NHẬN THANH TOÁN</Text>

        {/* Danh sách các game đang chờ thanh toán */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DANH SÁCH SẢN PHẨM ({gamesToBuy.length})</Text>
          {gamesToBuy.map((game) => (
            <View key={game.id} style={styles.itemCard}>
              <Image 
                source={GAME_IMAGES[game.image]} 
                style={styles.gameImage} 
              />
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle} numberOfLines={1}>{game.title}</Text>
                <Text style={styles.studioText}>{game.studio}</Text>
                <Text style={styles.priceText}>{game.price === 0 ? "Miễn phí" : formatPrice(game.price)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Phương thức thanh toán */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PHƯƠNG THỨC THANH TOÁN</Text>
          <TouchableOpacity 
            style={styles.paymentMethod} 
            onPress={() => setSelectedMethod('momo')}
          >
            <View style={selectedMethod === 'momo' ? styles.radioActive : styles.radioInactive} />
            <Text style={styles.methodText}>Ví điện tử (Momo / ZaloPay)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.paymentMethod} 
            onPress={() => setSelectedMethod('visa')}
          >
            <View style={selectedMethod === 'visa' ? styles.radioActive : styles.radioInactive} />
            <Text style={styles.methodText}>Thẻ Visa / Mastercard</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.paymentMethod} 
            onPress={() => setSelectedMethod('bank')}
          >
            <View style={selectedMethod === 'bank' ? styles.radioActive : styles.radioInactive} />
            <Text style={styles.methodText}>Tài khoản ngân hàng</Text>
          </TouchableOpacity>
        </View>

        {/* Tổng tiền */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Số lượng:</Text>
            <Text style={styles.summaryValue}>{gamesToBuy.length} game</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Giá gốc:</Text>
            <Text style={styles.summaryValue}>{formatPrice(totalAmount)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>TỔNG CỘNG:</Text>
            <Text style={styles.totalValue}>{formatPrice(totalAmount)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Nút Thanh toán ở Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payBtn}
          onPress={handleConfirmPayment}
        >
          <Text style={styles.payBtnText}>XÁC NHẬN VÀ THANH TOÁN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scrollContent: { padding: 20 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  
  /* Card Game */
  itemCard: { 
    flexDirection: 'row', 
    backgroundColor: '#1f1f1f', 
    borderRadius: 12, 
    padding: 12, 
    marginBottom: 10 
  },
  gameImage: { width: 60, height: 80, borderRadius: 6 },
  gameInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  gameTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  studioText: { color: '#888', fontSize: 13, marginVertical: 2 },
  priceText: { color: '#00f5ff', fontSize: 15, fontWeight: 'bold' },

  /* Sections */
  section: { marginBottom: 25 },
  sectionTitle: { color: '#555', fontSize: 12, fontWeight: 'bold', marginBottom: 15, letterSpacing: 1 },
  paymentMethod: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#1f1f1f', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  radioActive: { width: 18, height: 18, borderRadius: 9, borderWidth: 5, borderColor: '#00f5ff' },
  radioInactive: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#444' },
  methodText: { color: '#fff', marginLeft: 15, fontSize: 15 },

  /* Summary */
  summaryContainer: { backgroundColor: '#1f1f1f', padding: 20, borderRadius: 12, marginBottom: 30 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { color: '#888' },
  summaryValue: { color: '#fff' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#333', paddingTop: 15, marginTop: 5 },
  totalLabel: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  totalValue: { color: '#00f5ff', fontWeight: 'bold', fontSize: 20 },

  /* Footer */
  footer: { padding: 20, backgroundColor: '#121212', borderTopWidth: 1, borderTopColor: '#222' },
  payBtn: { backgroundColor: '#2563eb', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  payBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});