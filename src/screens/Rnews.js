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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { NEWS_IMAGES } from "../constants/images"; 

const { width } = Dimensions.get("window");

export default function Rnews({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const article = route?.params?.article;

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: '#fff' }}>Không tìm thấy bài viết...</Text>
        <TouchableOpacity style={styles.errorBtn} onPress={() => navigation.goBack()}>
          <Text style={{ color: '#00f5ff' }}>Quay lại trang chủ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* NÚT BACK */}
      <View style={[styles.backButtonContainer, { top: insets.top > 0 ? insets.top + 10 : 20 }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        
        {/* PHẦN ẢNH THUMBNAIL */}
        <View style={[styles.thumbnailWrapper, { marginTop: insets.top + 70 }]}>
          <View style={styles.imageContainer}>
            <Image 
              source={NEWS_IMAGES[article.thumbnail]} 
              style={styles.topImage} 
            />
            {/* LỚP PHỦ GRADIENT */}
            <LinearGradient
              colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.2)', 'transparent']}
              style={styles.gradientOverlay}
            />
          </View>
        </View>

        {/* PHẦN NỘI DUNG TIÊU ĐỀ */}
        <View style={styles.headerContent}>
          <Text style={styles.mainTitle}>{article.title}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{article.tags?.[0]?.toUpperCase() || "TIN TỨC"}</Text>
            </View>
            <Text style={styles.dotSeparator}>•</Text>
            <Text style={styles.authorName}>{article.author}</Text>
          </View>

          {/* BOX TÓM TẮT */}
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
                    source={NEWS_IMAGES[block.data]} 
                    style={styles.bodyImage} 
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)']}
                    style={[styles.gradientOverlay, {top: undefined, bottom: 0, height: 60}]}
                  />
                </View>
              );
            }
            return null;
          })}
        </View>

        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#0a0a0a" },
  errorContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  errorBtn: { marginTop: 20, padding: 10, borderWidth: 1, borderColor: '#00f5ff', borderRadius: 8 },
  
  backButtonContainer: { position: 'absolute', left: 20, zIndex: 100 },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.15)', 
    width: 45, height: 45, borderRadius: 22.5, 
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.3)'
  },
  backIcon: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginLeft: -2 },
  
  thumbnailWrapper: { width: width, paddingHorizontal: 20, marginBottom: 30 },
  imageContainer: { borderRadius: 16, overflow: 'hidden', position: 'relative' },
  topImage: { width: '100%', height: 230, resizeMode: 'cover', backgroundColor: '#1a1a1a' },
  
  // Style cho Gradient
  gradientOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 100, // Độ cao của hiệu ứng đổ bóng
  },
  
  headerContent: { paddingHorizontal: 25 },
  mainTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold', lineHeight: 34, marginBottom: 15 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  tagBadge: { backgroundColor: '#00f5ff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  tagText: { color: '#000', fontSize: 10, fontWeight: '900' },
  authorName: { color: '#00f5ff', fontSize: 14, fontWeight: 'bold' },
  dotSeparator: { color: '#444', marginHorizontal: 8 },

  summaryBox: { 
    backgroundColor: 'rgba(255,255,255,0.06)', 
    padding: 18, borderRadius: 12,
    borderLeftWidth: 4, borderLeftColor: '#00f5ff' 
  },
  summaryText: { color: '#bbb', fontSize: 16, fontStyle: 'italic', lineHeight: 24 },

  bodyContent: { paddingHorizontal: 25, paddingTop: 20 },
  paragraph: { color: '#ddd', fontSize: 17, lineHeight: 28, marginBottom: 20, textAlign: 'justify' },
  bodyImageContainer: { marginVertical: 20, borderRadius: 12, overflow: 'hidden', position: 'relative' },
  bodyImage: { width: '100%', height: 220, backgroundColor: '#1a1a1a' },
});