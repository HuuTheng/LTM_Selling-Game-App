import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { GAME_IMAGES } from '../constants/images';

const { width } = Dimensions.get('window');

const formatPrice = (price) => {
  if (price === 0) return "Miễn phí";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};

export default function GameDetail({ route }) {
  const { game } = route.params;
  const [activeMedia, setActiveMedia] = useState(game.youtube_id ? 'video' : 'image');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Media Section */}
        <View style={styles.mediaContainer}>
          <View style={styles.mainMedia}>
            {activeMedia === 'video' && game.youtube_id ? (
              <YoutubePlayer
                height={width * 9 / 16}
                play={false}
                videoId={game.youtube_id}
              />
            ) : (
              <Image 
                source={GAME_IMAGES[game.image]} 
                style={styles.video} 
                resizeMode="cover" 
              />
            )}
          </View>

          <View style={styles.thumbnailRow}>
            {game.youtube_id && (
              <TouchableOpacity onPress={() => setActiveMedia('video')} style={[styles.thumbnailBtn, activeMedia === 'video' && styles.activeThumb]}>
                <View style={styles.thumbPlaceholder}><Text style={styles.thumbText}>TRAILER</Text></View>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setActiveMedia('image')} style={[styles.thumbnailBtn, activeMedia === 'image' && styles.activeThumb]}>
              <Text style={[styles.thumbText, {textAlign: 'center', marginTop: 12}]}>ẢNH</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.gameName}>{game.title}</Text>
          <Text style={styles.studioText}>{game.studio}</Text>
          <Text style={styles.priceText}>{formatPrice(game.price)}</Text>
          <TouchableOpacity style={styles.buyNowBtn}><Text style={styles.buyNowText}>MUA NGAY</Text></TouchableOpacity>
        </View>

        {/* Description & Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GIỚI THIỆU TRÒ CHƠI</Text>
          <Text style={styles.descriptionText}>{game.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>THỂ LOẠI</Text>
          <View style={styles.categoryContainer}>
            {game.categories.map((cat, index) => (
              <View key={index} style={styles.categoryBadge}><Text style={styles.categoryText}>{cat}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scrollContent: { paddingBottom: 50 },
  mediaContainer: { marginBottom: 20 },
  mainMedia: { width: width, height: width * 9 / 16, backgroundColor: '#000' },
  video: { flex: 1 },
  thumbnailRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, gap: 10 },
  thumbnailBtn: { width: 80, height: 45, borderRadius: 4, backgroundColor: '#222', borderWidth: 1, borderColor: '#444' },
  activeThumb: { borderColor: '#00f5ff' },
  thumbPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  thumbText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  infoSection: { paddingHorizontal: 20, marginBottom: 20 },
  gameName: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  studioText: { color: '#888', fontSize: 14, marginBottom: 10 },
  priceText: { color: '#00f5ff', fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  buyNowBtn: { backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buyNowText: { color: '#fff', fontWeight: 'bold' },
  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10, borderLeftWidth: 3, borderLeftColor: '#00f5ff', paddingLeft: 10 },
  descriptionText: { color: '#ccc', lineHeight: 22 },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryBadge: { backgroundColor: '#333', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  categoryText: { color: '#00f5ff', fontSize: 12 },
});