// app/archiveAdventure.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

export default function ArchiveAdventureScreen() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/home')} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#BF9C77" />
        </Pressable>
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
      </View>

      {/* Section title */}
      <View style={styles.beginSection}>
        <Text style={styles.sectionTitle}>Open Ended Simulators</Text>
      </View>

      {/* Cards */}
      <View style={styles.cardGrid}>
        {[
          { img: require('../assets/img1.png'), title: 'Battlefield Simulator' },
          { img: require('../assets/img2.png'), title: 'Empire Mode' },
          { img: require('../assets/img3.png'), title: 'Pirate Captain Simulator' },
          { img: require('../assets/img4.png'), title: 'Space Mercenaries Simulator' },
          { img: require('../assets/img5.png'), title: 'Medieval Mercenaries' },
          { img: require('../assets/img6.png'), title: 'Monster Hunter Simulator' },
        ].map((item, idx) => (
          <View style={styles.card} key={idx}>
            <View style={styles.cardImageWrapper}>
              <ImageBackground
                source={item.img}
                style={styles.cardImage}
                imageStyle={{ borderRadius: 12 }}
              />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
            <Pressable
              style={styles.playButton}
              onPress={() => router.push('/chat')}
            >
              <Text style={styles.playText}>PLAY</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
  },
  header: {
    position: 'relative',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  beginSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'El Messiri',
    color: '#BF9C77',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 20,
    width: (screenWidth - 48) / 2,
  },
  cardImageWrapper: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BF9C77',
    overflow: 'hidden',
    marginBottom: 6,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardTitle: {
    color: '#BF9C77',
    fontFamily: 'El Messiri',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardDescription: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 12,
  },
  playButton: {
    borderColor: '#BF9C77',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  playText: {
    color: '#BF9C77',
    fontWeight: 'bold',
  },
});