import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';

import AppHeader from './appHeader';
import AccountModal from './account';                 

import { RandomAdventureModal } from './randomAdventure';
import { CustomAdventureModal } from './customAdventure';

const screenWidth = Dimensions.get('window').width;

type AdventureCardProps = {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  character?: ImageSourcePropType;
  isTerminated?: boolean;
  onPress?: () => void;
};

function AdventureCard({
  title,
  subtitle,
  image,
  character,
  isTerminated,
  onPress,
}: AdventureCardProps) {
  return (
    <Pressable style={styles.cardWrapper} onPress={onPress}>
      <View style={styles.card}>
        <Image source={image} style={styles.cardImage} />
        {character && !isTerminated && (
          <Image source={character} style={styles.characterImage} />
        )}
        <View style={styles.cardOverlay}>
          <Text style={styles.cardTitle}>{title}</Text>
          {isTerminated ? (
            <View style={styles.inputPlaceholder}>
              <Text style={styles.cardSubtitle}>
                Go back to a terminated adventure
              </Text>
            </View>
          ) : (
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default function AdventureScreen() {
  const [showRandom, setShowRandom] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [showAccount, setShowAccount] = useState(false);  // ← add this

  return (
    <ImageBackground
      source={require('../assets/adventureSelectorBG.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 🔹 Global Header (opens account modal) */}
      <AppHeader onHamburgerPress={() => setShowAccount(true)} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>
          Choose your adventure path{'\n'}for today’s journey
        </Text>

        <View style={styles.cardGrid}>
          <AdventureCard
            title="Custom Adventure"
            subtitle="Start A Custom Adventure"
            image={require('../assets/card1.png')}
            character={require('../assets/character1.png')}
            onPress={() => setShowCustom(true)}
          />

          <AdventureCard
            title="Open-End Simulator"
            subtitle="Start An Open-End Adventure"
            image={require('../assets/card2.png')}
            character={require('../assets/character2.png')}
            onPress={() => router.push('/openEndedSimulator')}
          />

          <AdventureCard
            title="Random Adventure"
            subtitle="Start A Random Adventure"
            image={require('../assets/card3.png')}
            character={require('../assets/character3.png')}
            onPress={() => setShowRandom(true)}
          />

          <AdventureCard
            title="Resume Adventure"
            subtitle="Continue Your Existing Adventure"
            image={require('../assets/card4.png')}
            character={require('../assets/character4.png')}
            onPress={() => router.push('/resumeAdventure')}
          />

          <AdventureCard
            title="Terminated Adventure"
            subtitle="Go back to a terminated adventure"
            image={require('../assets/card5.png')}
            character={require('../assets/character5.png')}
            onPress={() => router.push('/terminatedAdventures')}
          />
          <AdventureCard
            title="Character Creation"
            subtitle="Create your characters"
            image={require('../assets/card5.png')}
            character={require('../assets/character5.png')}
            onPress={() => router.push('/characterCreation')}
          />
        </View>
      </ScrollView>

      {/* Random Adventure Modal */}
      <RandomAdventureModal
        visible={showRandom}
        onClose={() => setShowRandom(false)}
        onSubmit={(values) => {
          setShowRandom(false);
          console.log('Random Adventure ->', values);
        }}
      />

      {/* Custom Adventure Modal */}
      <CustomAdventureModal
        visible={showCustom}
        onClose={() => setShowCustom(false)}
        onSubmit={(values) => {
          setShowCustom(false);
          console.log('Custom Adventure ->', values);
        }}
      />

      {/* Account Modal (same behavior as random/custom) */}
      <AccountModal
        visible={showAccount}
        onClose={() => setShowAccount(false)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BF9C77',
    marginTop: 12, // smaller top margin because header is now above
    marginBottom: 40,
    fontFamily: 'El Messiri',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: (screenWidth - 48) / 2,
    marginBottom: 60,
    position: 'relative',
    alignItems: 'center',
  },
  card: {
    borderRadius: 8,
    width: '100%',
    height: 140,
    backgroundColor: '#222',
    zIndex: 3,
  },
  cardImage: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8,
    backgroundColor: '#222628',
    zIndex: 4,
  },
  cardTitle: {
    color: '#BF9C77',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'el messiri',
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Maven Pro',
  },
  characterImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 160,
    height: 200,
    resizeMode: 'contain',
    zIndex: 2,
  },
  inputPlaceholder: {
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: 'transparent',
    borderColor: '#3a3a3a',
    borderWidth: 1,
    borderRadius: 4,
  },
  archiveButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#BF9C77',
    paddingVertical: 14,
    borderRadius: 40,
  },
  archiveText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'El Messiri',
  },
});