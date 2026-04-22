import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Image, 
  TouchableOpacity, FlatList, Animated, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import data from '../data/games'; 
import { GAME_IMAGES } from '../constants/images';
import { useAuth } from '../nav_bar/navigation_bar'; // Đảm bảo đường dẫn này đúng với dự án của bạn

const Home = ({ navigation }) => {
  const { isLoggedIn, isDarkMode } = useAuth();
  const allGames = data?.games || [];

  // Logic Auto-slide Banner
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideData = allGames.slice(0, 5);

  // --- CẤU HÌNH THEME ---
  const theme = {
    bg: isDarkMode ? '#121212' : '#f8f9fa',
    cardBg: isDarkMode ? '#1e1e1e' : '#ffffff',
    textMain: isDarkMode ? '#fff' : '#000',
    textSub: isDarkMode ? '#aaa' : '#666',
    border: isDarkMode ? '#333' : '#e0e0e0',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 800, useNativeDriver: true }).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slideData.length);
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentGame = slideData[currentIndex] || {};

  const handleGamePress = (item) => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
    } else {
      // Lưu ý: Tên 'GameDetail' phải khớp với tên trong Stack.Screen của bạn
      navigation.navigate('GameDetail', { game: item });
    }
  };

  const renderPrice = (price) => {
    if (price === 0) {
      return <Text style={[styles.priceText, { color: '#00f5ff' }]}>Miễn phí</Text>;
    }
    return <Text style={[styles.priceText, { color: theme.textSub }]}>{price.toLocaleString('vi-VN')} đ</Text>;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        {/* BANNER NỔI BẬT */}
        <TouchableOpacity 
          style={styles.heroContainer} 
          activeOpacity={0.9}
          onPress={() => handleGamePress(currentGame)}
        >
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Image 
              source={GAME_IMAGES[currentGame.image]} 
              style={styles.heroImage} 
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <View style={styles.tagContainer}>
                <Text style={styles.heroTag}>NỔI BẬT</Text>
              </View>
              <Text style={styles.heroTitle}>{currentGame.title}</Text>
              <Text style={styles.heroPrice}>
                {currentGame.price === 0 ? "Miễn phí" : currentGame.price.toLocaleString('vi-VN') + " đ"}
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

        {/* SECTION: Game Phổ Biến (Ngang) */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Game Phổ Biến</Text>
          <FlatList 
            data={allGames.slice(5, 12)}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.card} onPress={() => handleGamePress(item)}>
                <Image source={GAME_IMAGES[item.image]} style={styles.cardImage} />
                <Text style={[styles.gameTitle, { color: theme.textMain }]} numberOfLines={1}>
                  {item.title}
                </Text>
                {renderPrice(item.price)}
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        {/* SECTION: Gợi ý cho bạn (Dọc) */}
        <View style={[styles.sectionContainer, { marginBottom: 20 }]}>
          <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Gợi ý cho bạn</Text>
          {allGames.slice(12, 17).map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.listItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]} 
              onPress={() => handleGamePress(item)}
            >
              <Image source={GAME_IMAGES[item.image]} style={styles.listImage} />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={[styles.listTitle, { color: theme.textMain }]} numberOfLines={1}>
                  {item.title}
                </Text>
                {renderPrice(item.price)}
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textSub} />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  // Bố cục Banner
  heroContainer: { 
    margin: 15, 
    borderRadius: 15, 
    overflow: 'hidden', 
    height: 380,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  heroImage: { 
    width: '100%', 
    height: '100%' 
  },
  heroOverlay: { 
    position: 'absolute', 
    bottom: 0, 
    padding: 20, 
    width: '100%', 
    backgroundColor: 'rgba(0,0,0,0.7)' 
  },
  tagContainer: {
    backgroundColor: '#00f5ff22',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 5
  },
  heroTag: { 
    color: '#00f5ff', 
    fontSize: 10, 
    fontWeight: 'bold',
    letterSpacing: 1
  },
  heroTitle: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 5
  },
  heroPrice: { 
    color: '#00f5ff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },

  // Bố cục Section chung
  sectionContainer: { 
    marginTop: 20, 
    paddingLeft: 15 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 15 
  },

  // Bố cục Card ngang
  card: { 
    width: 140, 
    marginRight: 15 
  },
  cardImage: { 
    width: 140, 
    height: 190, 
    borderRadius: 10,
    backgroundColor: '#333'
  },
  gameTitle: { 
    fontSize: 14, 
    marginTop: 8, 
    fontWeight: '600' 
  },
  priceText: { 
    fontSize: 13, 
    fontWeight: '500',
    marginTop: 2
  },

  // Bố cục Danh sách dọc
  listItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12, 
    padding: 12,
    borderRadius: 12,
    marginRight: 15,
    borderWidth: 1,
  },
  listImage: { 
    width: 50, 
    height: 65, 
    borderRadius: 8 
  },
  listTitle: { 
    fontSize: 15, 
    fontWeight: '600',
    marginBottom: 3
  },
});

export default Home;