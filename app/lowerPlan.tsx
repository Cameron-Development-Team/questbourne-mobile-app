// app/lowerPlan.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import AppHeader from './appHeader';
import AccountModal from './account';

const BG = '#161616';
const PANEL_BG = '#1a1716';
const GOLD = '#BF9C77';
const WHITE = '#FFFFFF';
const WHITE_SOFT = 'rgba(255,255,255,0.92)';
const MUTED = 'rgba(255,255,255,0.7)';
const HAIR = '#2b2623';
const INPUT_BG = '#2A2626';
const BTN_NEUTRAL = '#C8B8A5';

export default function LowerPlanScreen() {
  const router = useRouter();
  const [showAccount, setShowAccount] = useState(false);
  const [promo, setPromo] = useState('');

  const onConfirm = () => {
    // TODO: call backend to switch plan & charge
    console.log('Confirm lower plan with promo:', promo);
  };

  return (
    <>
      <AppHeader onHamburgerPress={() => setShowAccount(true)} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Title + close */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Switch to a Lower Plan</Text>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Text style={styles.closeX}>✕</Text>
          </Pressable>
        </View>

        <View style={styles.panel}>
          {/* Current (target) plan summary */}
          <Text style={styles.sectionLabel}>Essential Subscription</Text>

          {/* Token progress (static sample pill) */}
          <View style={styles.pill}>
            <Text style={styles.pillText}>18000 / 18000 monthly image tokens</Text>
          </View>

          <Pressable onPress={() => console.log('View All Plans')} hitSlop={6}>
            <Text style={styles.link}>View All Plans</Text>
          </Pressable>

          {/* Promo code */}
          <View style={[styles.rowBetween, { marginTop: 18 }]}>
            <Text style={styles.question}>Do you have a Promo Code?</Text>
            <Text style={styles.chev}>▾</Text>
          </View>

          <TextInput
            value={promo}
            onChangeText={setPromo}
            placeholder="Add Code Here"
            placeholderTextColor={MUTED}
            style={styles.input}
          />

          {/* Line item: new plan price */}
          <View style={styles.hair} />
          <View style={[styles.rowBetween, { paddingVertical: 12 }]}>
            <Text style={styles.lineText}>Legend Subscription Monthly Plan</Text>
            <Text style={styles.lineTextBold}>$80USD</Text>
          </View>
          <View style={styles.hair} />

          {/* Charged Today */}
          <View style={{ marginTop: 16 }}>
            <Text style={styles.chargedLabel}>Charged Today</Text>
            <Text style={styles.chargedAmount}>$80USD</Text>
          </View>

          {/* Payment method */}
          <View style={{ marginTop: 14 }}>
            <Text style={styles.payLine}>
              Pay with paypal ending in{'\n'}
              <Text style={{ fontWeight: '700', color: WHITE_SOFT }}>emailaccount@emaildomain.com</Text>
            </Text>
          </View>

          {/* CTA */}
          <Pressable style={styles.primaryBtn} onPress={onConfirm}>
            <Text style={styles.primaryText}>Confirm and Pay</Text>
          </Pressable>

          {/* Legal footnote */}
          <Text style={styles.footnote}>
            By clicking <Text style={{ fontWeight: '700' }}>Confirm and pay</Text> you agree to our{' '}
            <Text style={styles.link}>Terms of use</Text>.{'\n'}
            <Text style={{ fontWeight: '700' }}>Automatic annual renewal:</Text> You will automatically be charged{'\n'}
            <Text style={{ fontWeight: '700' }}>$80USD</Text> every month for your subscription.{'\n'}
            Cancel or pause: You can cancel or pause your subscription{'\n'}
            anytime from <Text style={{ fontWeight: '700' }}>Subscription &gt; Plan</Text>.
          </Text>
        </View>
      </ScrollView>

      <AccountModal visible={showAccount} onClose={() => setShowAccount(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pageTitle: {
    color: GOLD,
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'El Messiri',
  },
  closeX: { color: GOLD, fontSize: 24, fontWeight: '700' },

  panel: {
    backgroundColor: PANEL_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GOLD,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  sectionLabel: {
    color: WHITE,
    fontWeight: '800',
    fontSize: 14,
    marginBottom: 10,
  },

  pill: {
    borderWidth: 1,
    borderColor: GOLD,
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  pillText: {
    color: WHITE_SOFT,
    fontSize: 14,
  },

  link: {
    color: GOLD,
    fontWeight: '700',
    marginTop: 10,
  },

  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700',
  },
  chev: { color: WHITE_SOFT, fontSize: 16 },

  input: {
    marginTop: 10,
    backgroundColor: INPUT_BG,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: WHITE,
    fontSize: 14,
  },

  hair: { height: 1, backgroundColor: HAIR, marginTop: 16 },

  lineText: { color: WHITE_SOFT, fontSize: 14 },
  lineTextBold: { color: WHITE_SOFT, fontSize: 14, fontWeight: '800' },

  chargedLabel: { color: WHITE_SOFT, fontSize: 16, fontWeight: '700' },
  chargedAmount: { color: WHITE, fontSize: 22, fontWeight: '900', marginTop: 6 },

  payLine: { color: WHITE_SOFT, fontSize: 13, lineHeight: 18 },

  primaryBtn: {
    marginTop: 16,
    backgroundColor: GOLD,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: {
    color: '#161616',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'El Messiri',
  },

  footnote: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 14,
  },
});