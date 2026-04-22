import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
// Import hook để xử lý vùng an toàn thay cho SafeAreaView cũ
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get("window");

export default function Rnews({ route, navigation }) {
  // Hook lấy thông số tai thỏ/vùng an toàn của thiết bị
  const insets = useSafeAreaInsets();
  
  const article = route?.params?.article;

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: '#fff' }}>Không tìm thấy bài viết...</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#00f5ff', marginTop: 20 }}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* NÚT BACK - Sử dụng insets.top để tự động cách mép tai thỏ chuẩn xác */}
      <View style={[styles.backButtonContainer, { top: insets.top > 0 ? insets.top : 20 }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* HÌNH ẢNH ĐẦU BÀI */}
        <Image source={{ uri: article.thumbnail }} style={styles.topImage} />

        <View style={styles.headerContent}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{article.tags?.[0]?.toUpperCase() || "TIN TỨC"}</Text>
          </View>
          <Text style={styles.mainTitle}>{article.title}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.authorName}>{article.author}</Text>
            <Text style={styles.dotSeparator}>•</Text>
            <Text style={styles.dateText}>22 THÁNG 4, 2026</Text>
          </View>

          {/* TÓM TẮT BÀI VIẾT */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>{article.summary}</Text>
          </View>
        </View>

        {/* NỘI DUNG CHI TIẾT */}
        <View style={styles.bodyContent}>
          {article.content && article.content.map((block, index) => {
            if (block.type === "text") {
              return (
                <Text key={`text-${index}`} style={styles.paragraph}>
                  {block.data}
                </Text>
              );
            } 
            if (block.type === "image") {
              return (
                <View key={`img-${index}`} style={styles.bodyImageContainer}>
                  <Image 
                    source={{ uri: block.data }} 
                    style={styles.bodyImage} 
                    resizeMode="cover"
                  />
                </View>
              );
            }
            return null;
          })}
        </View>

        {/* Khoảng trống cuối trang tùy chỉnh theo vùng an toàn dưới cùng */}
        <View style={{ height: insets.bottom + 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#0a0a0a" },
  errorContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  
  backButtonContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 100,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.6)', 
    width: 45, 
    height: 45,
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  backIcon: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginLeft: -2 },
  
  topImage: { width: width, height: 380, resizeMode: 'cover' },
  
  headerContent: { padding: 25 },
  tagBadge: { 
    backgroundColor: '#00f5ff', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: 4, 
    marginBottom: 15 
  },
  tagText: { color: '#000', fontSize: 11, fontWeight: '900' },
  mainTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', lineHeight: 36 },
  
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 25 },
  authorName: { color: '#00f5ff', fontSize: 14, fontWeight: 'bold' },
  dotSeparator: { color: '#444', marginHorizontal: 10 },
  dateText: { color: '#666', fontSize: 14 },

  summaryBox: { 
    backgroundColor: '#111', 
    padding: 18, 
    borderRadius: 12,
    borderLeftWidth: 4, 
    borderLeftColor: '#00f5ff' 
  },
  summaryText: { color: '#ccc', fontSize: 16, fontStyle: 'italic', lineHeight: 26 },

  bodyContent: { paddingHorizontal: 25, paddingTop: 10 },
  paragraph: { 
    color: '#eee', 
    fontSize: 18, 
    lineHeight: 32, 
    marginBottom: 25, 
    textAlign: 'justify', 
    letterSpacing: 0.3 
  },
  bodyImageContainer: { 
    marginVertical: 15, 
    borderRadius: 15, 
    overflow: 'hidden',
    backgroundColor: '#1a1a1a' 
  },
  bodyImage: { width: '100%', height: 250 },
});