// app/account.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AccountModal({ visible, onClose }: Props) {
  const router = useRouter();

  if (!visible) return null;

  const goToPayment = () => {
    onClose();
    router.push('/paymentInfo'); // ← abre paymentInfo.tsx
  };

  const goToProfile = () => {
    onClose();
    router.push('/profile'); // ← abre profile.tsx
  };
  const goSubTiers = () => {
    onClose();
    router.push('/subTiers'); // ← abre subTiers.tsx
  };
  const goUpgradePlan = () => {
    onClose();
    router.push('/upgradePlan'); // ← abre upgradePlan.tsx
  };

  return (
    <View style={styles.modalRoot} pointerEvents="box-none">
      {/* Backdrop – tap to close */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Centered sheet */}
      <View style={styles.centerWrap} pointerEvents="box-none">
        <View style={styles.sheet}>
          <View style={styles.headerBand} />
          <View style={styles.avatarWrap}>
            <View style={styles.avatar} />
          </View>

          <Text style={styles.username}>Username</Text>
          <Text style={styles.email}>emailaccount@emaildomain.com</Text>

          <View style={styles.divider} />

          <Pressable style={styles.row} onPress={goSubTiers}>
            <Text style={styles.rowText}>Manage your tier</Text>
          </Pressable>

          {/* Update payment methods → abre paymentInfo.tsx */}
          <Pressable style={styles.row} onPress={goToPayment}>
            <Text style={styles.rowText}>Update your payment methods</Text>
          </Pressable>

          {/* Edit profile info → abre profile.tsx */}
          <Pressable style={styles.row} onPress={goToProfile}>
            <Text style={styles.rowText}>Edit your profile information</Text>
          </Pressable>

          <View style={styles.tokensWrap}>
            <Text style={styles.tokensNumber}>212561 / 216000</Text>
            <Text style={styles.tokensLabel}>Image Tokens Left</Text>
          </View>

          <Pressable style={styles.cta} onPress={goUpgradePlan}>
            <Text style={styles.ctaText}>Upgrade Plan</Text>
          </Pressable>

          <Pressable style={styles.close} onPress={onClose}>
            <Text style={{ color: '#BF9C77' }}>Close</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const GOLD = '#BF9C77';

const styles = StyleSheet.create({
  modalRoot: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,          // ensure it overlays
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  centerWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sheet: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#2B2727',
    borderWidth: 1,
    borderColor: GOLD,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  headerBand: { height: 64, backgroundColor: '#47423E' },
  avatarWrap: { alignItems: 'center', marginTop: -32 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#cfcfcf' },
  username: { color: GOLD, fontSize: 28, marginTop: 16, marginHorizontal: 24, fontFamily: 'El Messiri', fontWeight: '700' },
  email: { color: '#fff', opacity: 0.9, marginHorizontal: 24, marginTop: 8, paddingBottom: 12, fontFamily: 'Maven Pro', fontSize: 16 },
  divider: { height: 1, backgroundColor: '#3b332f', marginHorizontal: 24, marginTop: 12 },
  row: { paddingHorizontal: 24, paddingVertical: 20 },
  rowText: { color: '#fff', fontSize: 16, fontFamily: 'Maven Pro' },
  tokensWrap: { marginTop: 8, marginHorizontal: 24 },
  tokensNumber: { color: '#fff', fontSize: 18, fontWeight: '600' },
  tokensLabel: { color: '#fff', opacity: 0.8 },
  cta: { marginHorizontal: 24, marginTop: 16, backgroundColor: GOLD, borderRadius: 4, alignItems: 'center', paddingVertical: 14 },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 16, fontFamily: 'El Messiri' },
  close: { alignSelf: 'center', marginTop: 12 },
});