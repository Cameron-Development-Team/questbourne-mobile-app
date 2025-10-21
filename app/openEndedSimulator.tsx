// app/openEndedSimulator.tsx
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
  Modal,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
const GOLD = '#BF9C77';

type Character = {
  id: string;
  name: string;
  race: string;
  gender: string;
  age: number;
};

export default function OpenEndedSimulatorScreen() {
  // Strongly type state to avoid “never” issues
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [showCharacterPicker, setShowCharacterPicker] = useState<boolean>(false);

  // Example saved characters (replace with your source of truth)
  const existingCharacters: Character[] = [
    { id: '1', name: 'Eira Shadowglow', race: 'Human', gender: 'Female', age: 25 },
    { id: '2', name: 'Zha\'thik "The Echokeeper"', race: 'Custom', gender: 'Non-binary', age: 65 },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/home')} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color={GOLD} />
        </Pressable>
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
      </View>

      {/* Title + Character selection actions */}
      <View style={styles.beginSection}>
        <Text style={styles.sectionTitle}>Open Ended Simulators</Text>

        {/* Selected Character preview (if any) */}
        {selectedCharacter && (
          <Text style={styles.selectedCharacter}>
            Selected Character:{' '}
            <Text style={styles.characterName}>{selectedCharacter.name}</Text>
          </Text>
        )}

        {/* Action buttons row */}
        <View style={styles.actionsRow}>
          <Pressable
            style={[styles.actionBtn, styles.actionBtnGhost]}
            onPress={() => router.push('/characterCreation')}
          >
            <Text style={[styles.actionBtnText, styles.actionBtnGhostText]}>
              CREATE NEW CHARACTER
            </Text>
          </Pressable>

          <Pressable
            style={styles.actionBtn}
            onPress={() => setShowCharacterPicker(true)}
          >
            <Text style={styles.actionBtnText}>USE EXISTING CHARACTER</Text>
          </Pressable>
        </View>
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

      {/* Character Picker Modal */}
      <Modal
        visible={showCharacterPicker}
        animationType="fade"
        transparent
        onRequestClose={() => setShowCharacterPicker(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select a Character</Text>

            <FlatList<Character>
              data={existingCharacters}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isActive = selectedCharacter?.id === item.id;
                return (
                  <Pressable
                    style={[styles.characterCard, isActive && styles.characterCardActive]}
                    onPress={() => {
                      setSelectedCharacter(item);
                      setShowCharacterPicker(false);
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.characterNameText}>{item.name}</Text>
                      <Text style={styles.characterDetails}>
                        {item.race} • {item.gender} • Age {item.age}
                      </Text>
                    </View>
                    {isActive && <Icon name="checkmark-circle" size={22} color={GOLD} />}
                  </Pressable>
                );
              }}
            />

            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setShowCharacterPicker(false)}
            >
              <Text style={styles.modalCloseText}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

/* ---------------------- STYLES ---------------------- */
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
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'El Messiri',
    color: GOLD,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  selectedCharacter: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  characterName: {
    color: GOLD,
    fontWeight: 'bold',
  },

  /* Action buttons under title */
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginBottom: 6,
  },
  actionBtn: {
    flexGrow: 1,
    maxWidth: 220,
    borderRadius: 24,
    backgroundColor: GOLD,
    paddingHorizontal: 16,
    minHeight: 44,
    justifyContent: 'center', // vertical center
    alignItems: 'center', // horizontal center
  },
  actionBtnText: {
    color: '#161616',
    fontFamily: 'El Messiri',
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
  },
  actionBtnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: GOLD,
  },
  actionBtnGhostText: {
    color: GOLD,
  },

  /* Cards */
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
    borderColor: GOLD,
    overflow: 'hidden',
    marginBottom: 6,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardTitle: {
    color: GOLD,
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
    borderColor: GOLD,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  playText: {
    color: GOLD,
    fontWeight: 'bold',
  },

  /* Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#1f1b1b',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GOLD,
    padding: 16,
  },
  modalTitle: {
    fontFamily: 'El Messiri',
    color: GOLD,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  characterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3c3530',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#2b2626',
  },
  characterCardActive: {
    borderColor: GOLD,
    backgroundColor: '#3a3431',
  },
  characterNameText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'El Messiri',
    fontSize: 16,
  },
  characterDetails: {
    color: '#bbb',
    fontSize: 12,
    marginTop: 4,
  },
  modalCloseButton: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 20,
  },
  modalCloseText: {
    color: GOLD,
    fontWeight: 'bold',
  },
});