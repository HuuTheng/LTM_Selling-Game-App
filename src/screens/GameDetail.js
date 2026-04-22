import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  StatusBar, 
  FlatList 
} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { GAME_IMAGES } from '../constants/images';

const { width } = Dimensions.get('window');

const formatPrice = (price, isOwned) => {
  if (isOwned) return "Đã có sẵn";
  if (price === 0) return "Miễn phí";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};

export default function GameDetail({ route }) {
  const { game } = route.params;
  
  // State quản lý media hiện tại
  const [activeIndex, setActiveIndex] = useState(0);

  // Chuẩn bị danh sách media
  const mediaData = [
    ...(game.youtube_id ? [{ id: 'trailer', type: 'video', youtube_id: game.youtube_id }] : []),
    { id: 'main_img', type: 'image', uri: game.image }
  ];

  const flatListRef = useRef(null);

  // Xử lý khi vuốt thay đổi media
  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    if (index !== activeIndex && index >= 0 && index < mediaData.length) {
      setActiveIndex(index);
    }
  };

  // Render media lớn (có thể vuốt)
  const renderMainMedia = ({ item, index }) => {
    return (
      <View style={styles.mainMediaContainer}>
        {item.type === 'video' ? (
          <YoutubePlayer
            height={width * 9 / 16}
            play={false}
            videoId={item.youtube_id}
          />
        ) : (
          <Image 
            source={GAME_IMAGES[item.uri]} 
            style={styles.mainImage} 
            resizeMode="cover" 
          />
        )}
      </View>
    );
  };

  // Render thumbnail nhỏ
  const renderThumbnail = ({ item, index }) => {
    const isActive = index === activeIndex;

    return (
      <TouchableOpacity
        onPress={() => {
          setActiveIndex(index);
          flatListRef.current?.scrollToIndex({ 
            index, 
            animated: true,
            viewPosition: 0.5 
          });
        }}
        style={[styles.thumbnailBtn, isActive && styles.activeThumb]}
      >
        {item.type === 'video' ? (
          <View style={styles.thumbPlaceholder}>
            <Text style={styles.thumbText}>TRAILER</Text>
          </View>
        ) : (
          <Image
            source={GAME_IMAGES[item.uri]}
            style={styles.thumbImage}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Media Section - Có thể vuốt ngang */}
        <View style={styles.mediaContainer}>
          <FlatList
            ref={flatListRef}
            data={mediaData}
            renderItem={renderMainMedia}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            snapToAlignment="center"
            decelerationRate="fast"
            style={styles.mainMediaFlatList}
          />

          {/* Thumbnails - nằm giữa */}
          <View style={styles.thumbnailContainer}>
            <FlatList
              data={mediaData}
              renderItem={renderThumbnail}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailList}
            />
          </View>
        </View>

        {/* Info Section */}
        {/* Info Section - Đã tích hợp logic Đã có sẵn */}
        <View style={styles.infoSection}>
          <Text style={styles.gameName}>{game.title}</Text>
          <Text style={styles.studioText}>{game.studio}</Text>
          
          {/* Giá tiền: Chuyển sang màu xám nếu đã sở hữu */}
          <Text style={[styles.priceText, game.isOwned && { color: '#888' }]}>
            {formatPrice(game.price, game.isOwned)}
          </Text>

          {/* Nút bấm: Đổi màu xám nhạt, đổi chữ và khóa khi đã có sẵn */}
          <TouchableOpacity 
            style={[
              styles.buyNowBtn, 
              game.isOwned && { backgroundColor: '#555' } 
            ]}
            disabled={game.isOwned}
          >
            <Text style={styles.buyNowText}>
              {game.isOwned ? "ĐÃ CÓ SẴN" : "MUA NGAY"}
            </Text>
          </TouchableOpacity>

          {/* Chỉ hiển thị nút Thêm vào giỏ hàng nếu chưa có game */}
          {!game.isOwned && (
            <TouchableOpacity style={styles.addToCartBtn}>
              <Text style={styles.addToCartText}>THÊM VÀO GIỎ HÀNG</Text>
            </TouchableOpacity>
          )}
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
              <View key={index} style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{cat}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  scrollContent: { 
    paddingBottom: 50 
  },

  /* === MEDIA SECTION === */
  mediaContainer: { 
    marginBottom: 20 
  },
  mainMediaFlatList: {
    height: width * 9 / 16,
  },
  mainMediaContainer: {
    width: width,
    height: width * 9 / 16,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  mainImage: { 
    width: '100%', 
    height: '100%' 
  },

  /* === THUMBNAILS === */
  thumbnailContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  thumbnailList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  thumbnailBtn: { 
    width: 80, 
    height: 45, 
    borderRadius: 4, 
    backgroundColor: '#222', 
    borderWidth: 1, 
    borderColor: '#444',
    overflow: 'hidden',
  },
  activeThumb: { 
    borderColor: '#00f5ff',
    borderWidth: 2,
  },
  thumbPlaceholder: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#1a1a1a' 
  },
  thumbText: { 
    color: '#fff', 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },

  /* === INFO SECTION === */
  infoSection: { 
    paddingHorizontal: 20, 
    marginBottom: 20 
  },
  gameName: { 
    color: '#fff', 
    fontSize: 26, 
    fontWeight: 'bold' 
  },
  studioText: { 
    color: '#888', 
    fontSize: 14, 
    marginBottom: 10 
  },
  priceText: { 
    color: '#00f5ff', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 15 
  },
  buyNowBtn: { 
    backgroundColor: '#2563eb', 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  buyNowText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  addToCartBtn: { 
    backgroundColor: 'transparent',
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#00f5ff'
  },
  addToCartText: { 
    color: '#00f5ff',
    fontWeight: 'bold',
    fontSize: 10 
  },
  
  /* === OTHER SECTIONS === */
  section: { 
    paddingHorizontal: 20, 
    marginTop: 25 
  },
  sectionTitle: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    borderLeftWidth: 3, 
    borderLeftColor: '#00f5ff', 
    paddingLeft: 10 
  },
  descriptionText: { 
    color: '#ccc', 
    lineHeight: 22 
  },
  categoryContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10 
  },
  categoryBadge: { 
    backgroundColor: '#333', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20 
  },
  categoryText: { 
    color: '#00f5ff', 
    fontSize: 12 
  },
});s