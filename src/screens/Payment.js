import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { GAME_IMAGES } from '../constants/images';

const { width } = Dimensions.get('window');

export default function Payment({ route, navigation }) {
  // Lấy dữ liệu game truyền từ màn hình Detail sang
  const { game } = route.params;
  const [selectedMethod, setSelectedMethod] = React.useState('momo');

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>XÁC NHẬN THANH TOÁN</Text>

        {/* Thông tin Game */}
        <View style={styles.itemCard}>
          <Image 
            source={GAME_IMAGES[game.image]} 
            style={styles.gameImage} 
          />
          <View style={styles.gameInfo}>
            <Text style={styles.gameTitle} numberOfLines={1}>{game.title}</Text>
            <Text style={styles.studioText}>{game.studio}</Text>
            <Text style={styles.priceText}>{formatPrice(game.price)}</Text>
          </View>
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
            <Text style={styles.summaryLabel}>Giá gốc:</Text>
            <Text style={styles.summaryValue}>{formatPrice(game.price)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Giảm giá:</Text>
            <Text style={styles.summaryValue}>- 0 đ</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>TỔNG CỘNG:</Text>
            <Text style={styles.totalValue}>{formatPrice(game.price)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Nút Thanh toán */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payBtn}
          onPress={() => alert('Thanh toán thành công!')}
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
    marginBottom: 25 
  },
  gameImage: { width: 80, height: 100, borderRadius: 8 },
  gameInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  gameTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  studioText: { color: '#888', fontSize: 14, marginVertical: 4 },
  priceText: { color: '#00f5ff', fontSize: 16, fontWeight: 'bold' },

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
  summaryContainer: { backgroundColor: '#1f1f1f', padding: 20, borderRadius: 12 },
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