// app/profile.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import AppHeader from './appHeader';
import AccountModal from './account';

export default function ProfileScreen() {
  const gold = '#BF9C77';
  const [showAccount, setShowAccount] = useState(false);

  return (
    <>
      {/* Global Header */}
      <AppHeader onHamburgerPress={() => setShowAccount(true)} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Page Title */}
        <Text style={styles.pageTitle}>Subscription</Text>

        {/* Header: avatar + username + email + logout */}
        <View style={styles.headerBlock}>
          <View style={styles.headerRow}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.username}>Username</Text>
                <Pressable style={styles.iconBtn}>
                  <Ionicons name="pencil" size={18} color={gold} />
                </Pressable>
              </View>

              <View style={styles.emailRow}>
                <Text style={styles.email}>emailaccount@emaildomain.com</Text>
                <Pressable style={styles.iconBtn}>
                  <Ionicons name="pencil" size={16} color={gold} />
                </Pressable>
              </View>
            </View>
          </View>

          <Pressable style={styles.logoutRow}>
            <Ionicons name="log-out-outline" size={18} color={gold} />
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>

          <View style={styles.hr} />
        </View>

        {/* TOKENS */}
        <Text style={styles.sectionTitle}>Tokens</Text>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>212561 / 216000 Monthly Image Tokens</Text>
          <Text style={styles.panelHint}>Tokens reset every month</Text>
        </View>

        {/* BILLING INFORMATION */}
        <Text style={styles.sectionTitle}>Billing Information</Text>
        <View style={styles.panel}>
          <View style={[styles.rowBetween, { marginBottom: 8 }]}>
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.boldWhite}>Ruthcelyn Hernández</Text>
              <Text style={styles.whiteMuted}>emailaccount@domain.com</Text>
            </View>

            {/* Billing History */}
            <Pressable onPress={() => router.push('/billingHistory')} hitSlop={8}>
              <Text style={styles.linkRight}>Billing History</Text>
            </Pressable>
          </View>

          {/* Change Billing Information */}
          <Pressable onPress={() => router.push('/BillingInfo')} hitSlop={8}>
            <Text style={styles.linkRight}>Change Billing Information</Text>
          </Pressable>
        </View>

        {/* PAYMENT DETAILS */}
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.panel}>
          <View style={[styles.rowBetween, { marginBottom: 6 }]}>
            <View style={styles.payRow}>
              <Image
                source={require('../assets/paypal-placeholder.png')}
                style={styles.payIcon}
              />
              <Text style={styles.whiteMuted}>emailaccount@domain.com</Text>
            </View>

            {/* Update Payment Details */}
            <Pressable onPress={() => router.push('/paymentInfo')} hitSlop={8}>
              <Text style={styles.linkRight}>Update Payment Details</Text>
            </Pressable>
          </View>
        </View>

        {/* PLAN */}
        <Text style={styles.sectionTitle}>Plan</Text>
        <View style={styles.panel}>
          <Text style={styles.planName}>PREMIUM</Text>
          <Text style={styles.planPrice}>$100.00USD/MONTH</Text>

          <View style={{ height: 12 }} />

          {/* Upgrade Plan */}
          <Pressable onPress={() => router.push('/upgradePlan')}>
            <Text style={styles.linkRight}>Upgrade plan</Text>
          </Pressable>

          {/* Switch to a Lower Plan */}
          <Pressable onPress={() => router.push('/lowerPlan')}>
            <Text style={styles.linkRight}>Switch to a lower plan</Text>
          </Pressable>

          {/* Pause Subscription */}
          <Pressable onPress={() => router.push('/pauseSubscription')}>
            <Text style={styles.linkRight}>Pause subscription</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Account modal */}
      <AccountModal visible={showAccount} onClose={() => setShowAccount(false)} />
    </>
  );
}

const BG = '#161616';
const PANEL_BG = '#1a1716';
const GOLD = '#BF9C77';
const BORDER = '#BF9C77';
const WHITE = '#FFFFFF';
const WHITE_MUTE = 'rgba(255,255,255,0.9)';
const HAIR = '#2b2623';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  pageTitle: {
    color: GOLD,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 18,
    fontFamily: 'El Messiri',
  },
  headerBlock: { marginBottom: 18 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#d9d9d9',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  username: {
    color: GOLD,
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'El Messiri',
  },
  iconBtn: { padding: 4 },
  emailRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  email: { color: WHITE_MUTE, fontSize: 14 },

  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  logoutText: { color: GOLD, fontSize: 14 },
  hr: { height: 1, backgroundColor: HAIR, marginTop: 10 },

  sectionTitle: {
    color: GOLD,
    fontWeight: '700',
    fontSize: 18,
    marginTop: 18,
    marginBottom: 8,
  },

  panel: {
    backgroundColor: PANEL_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  panelTitle: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  panelHint: { color: WHITE_MUTE, fontSize: 13 },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  boldWhite: { color: WHITE, fontWeight: '700', fontSize: 16 },
  whiteMuted: { color: WHITE_MUTE, fontSize: 14 },

  linkRight: {
    color: GOLD,
    fontSize: 14,
    fontFamily: 'El Messiri',
    fontWeight: '700',
  },

  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  payIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: WHITE,
  },

  planName: { color: WHITE, fontSize: 18, fontWeight: '800' },
  planPrice: { color: WHITE, fontSize: 16, fontWeight: '700', marginTop: 4 },
});