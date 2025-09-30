// app/appHeader.tsx
import React from 'react';
import { View, Image, StyleSheet, Pressable, SafeAreaView } from 'react-native';

const LOGO = require('../assets/logo2.png');
const NOTIFICATION_ICON = require('../assets/notificationIcon.png');
const CART_ICON = require('../assets/cartIcon.png');
const HAMBURGER = require('../assets/hamburger.png');

type Props = {
  onHamburgerPress?: () => void;
};

export default function AppHeader({ onHamburgerPress }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.row}>
        <Pressable style={styles.circleBtn} onPress={onHamburgerPress}>
          <Image source={HAMBURGER} style={styles.icon} resizeMode="contain" />
        </Pressable>

        <View style={styles.logoWrap}>
          <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.rightCluster}>
          <Pressable style={styles.circleBtn} onPress={() => console.log('Notifications')}>
            <Image source={NOTIFICATION_ICON} style={styles.icon} resizeMode="contain" />
          </Pressable>
          <Pressable style={styles.circleBtn} onPress={() => console.log('Cart')}>
            <Image source={CART_ICON} style={styles.icon} resizeMode="contain" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const BG = '#161616';
const BTN_BG = '#2A2626';
const styles = StyleSheet.create({
  safe: { backgroundColor: BG },
  row: {
    height: 72, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 12,
  },
  logoWrap: { flex: 1, alignItems: 'center' },
  logo: { width: 220, height: 40 },
  circleBtn: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: BTN_BG,
    alignItems: 'center', justifyContent: 'center', marginHorizontal: 6,
  },
  icon: { width: 24, height: 24, tintColor: '#fff' },
  rightCluster: { flexDirection: 'row', alignItems: 'center' },
});