// app/resumeAdventure.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

export default function ResumeAdventureScreen() {
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

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Banner */}
      <ImageBackground
        source={require('../assets/bannerBG.png')}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <View>
            <Text style={styles.bannerTitle}>Start New Adventure</Text>
            <Text style={styles.bannerText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
          </View>
          <View>
            <Pressable style={styles.beginButton} onPress={() => router.push('/chat')}>
              <Text style={styles.beginText}>BEGIN</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      {/* Section */}
      <View style={styles.beginSection}>
        <Image source={require('../assets/titleLogo.png')} style={styles.titleLogo} />
        <Text style={styles.sectionTitle}>Resume Your Previous Adventure</Text>
      </View>

      {/* Picker */}
      <Pressable style={styles.pickerButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.pickerButtonText}>
          {selectedGenre ? selectedGenre : 'Select Adventure Genre'}
        </Text>
      </Pressable>

      <Modal visible={showPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={selectedGenre}
              onValueChange={(itemValue) => {
                setSelectedGenre(itemValue);
                setShowPicker(false);
              }}
              dropdownIconColor="#BF9C77"
            >
              <Picker.Item label="Select Adventure Genre" value="" />
              <Picker.Item label="Test 1" value="Test 1" />
              <Picker.Item label="Test 2" value="Test 2" />
              <Picker.Item label="Test 3" value="Test 3" />
            </Picker>
          </View>
        </View>
      </Modal>

      {/* Cards */}
      <View style={styles.cardGrid}>
        {[1, 2, 3, 4].map((_, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardImageWrapper}>
              <ImageBackground
                source={require('../assets/adventurePlaceholder.jpg')}
                style={styles.cardImage}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.cardHeaderInfo}>
                  <Image
                    source={require('../assets/userPlaceholder.png')}
                    style={styles.userAvatar}
                  />
                  <Text style={styles.cardUsername}>Questbourne</Text>
                </View>
              </ImageBackground>
            </View>
            <Text style={styles.cardTitle}>Name Of Adventure</Text>
            <Text style={styles.cardDate}>a month ago</Text>
            <View style={styles.cardIcons}>
              <Image source={require('../assets/iconLike.png')} style={styles.icon} />
              <Text style={styles.iconText}>000</Text>
              <Image source={require('../assets/iconPlay.png')} style={styles.icon} />
              <Text style={styles.iconText}>000</Text>
              <Image source={require('../assets/iconBookmark.png')} style={styles.icon} />
              <Text style={styles.iconText}>000</Text>
            </View>
            <Text style={styles.cardDescription}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
            <Pressable
              style={styles.playButton}
              onPress={() => router.push('/chat')} // ✅ navigate to chat.tsx
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
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 16 },
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
  logo: { width: 200, height: 60, resizeMode: 'contain' },
  searchBar: {
    backgroundColor: '#2b2b2b',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchInput: { color: '#fff' },
  banner: {
    resizeMode: 'cover',
    width: '100%',
    height: 180,
    marginBottom: 24,
    justifyContent: 'flex-end',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  bannerTitle: { fontFamily: 'El Messiri', color: '#BF9C77', fontSize: 18, fontWeight: 'bold' },
  bannerText: { color: '#fff', fontSize: 12, marginBottom: 10, maxWidth: '77%' },
  beginButton: {
    backgroundColor: '#BF9C77',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  beginText: { color: '#000', fontWeight: 'bold', fontFamily: 'El Messiri' },
  beginSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleLogo: { width: 30, height: 30, resizeMode: 'cover' },
  sectionTitle: {
    fontFamily: 'El Messiri',
    color: '#BF9C77',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pickerButton: {
    backgroundColor: '#2b2b2b',
    height: 50,
    borderRadius: 8,
    borderColor: '#BF9C77',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  pickerButtonText: { color: '#fff' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: { backgroundColor: '#fff' },
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { marginBottom: 20, width: (screenWidth - 48) / 2 },
  cardImageWrapper: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BF9C77',
    overflow: 'hidden',
    marginBottom: 6,
  },
  cardImage: { width: '100%', height: 160 },
  cardHeaderInfo: {
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 6,
  },
  userAvatar: { width: 24, height: 24, borderRadius: 12, marginRight: 8 },
  cardUsername: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  cardTitle: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  cardDate: { color: '#aaa', fontSize: 12, marginBottom: 10 },
  cardIcons: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  icon: { width: 16, height: 16, marginRight: 4, tintColor: '#aaa' },
  iconText: { color: '#aaa', marginRight: 12, fontSize: 10 },
  cardDescription: { color: '#ccc', fontSize: 12, marginBottom: 12 },
  playButton: {
    borderColor: '#BF9C77',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  playText: { color: '#BF9C77', fontWeight: 'bold' },
});