// app/subTiers.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import AppHeader from './appHeader';
import AccountModal from './account';

const BG = '#161616';
const PANEL_BG = '#1a1716';
const GOLD = '#BF9C77';
const WHITE = '#FFFFFF';
const WHITE_SOFT = 'rgba(255,255,255,0.92)';
const HAIR = '#2b2623';

type FeatureRow = { label: string; value: string; icon: any };
type Tier = {
  id: string;
  name: string;
  priceMonthly?: string;
  priceYearly?: string;
  features: FeatureRow[];
  ctaLabel: string;
};


const ICONS = {
  manualImages: require('../assets/icon-images.png'),
  tokens: require('../assets/icon-tokens.png'),
  memories: require('../assets/icon-memories.png'),
  creator: require('../assets/icon-creator.png'),
  portrait: require('../assets/icon-portrait.png'),
  gm: require('../assets/icon-gm.png'),
  voice: require('../assets/icon-voice.png'),
  badge: require('../assets/icon-badge.png'),
  featured: require('../assets/icon-featured.png'),
  loyalty: require('../assets/icon-gifts.png'), 
  multiplayer: require('../assets/icon-multiplayer.png'),
  music: require('../assets/icon-music.png'),
};

const TIERS: Tier[] = [
  {
    id: 'free',
    name: 'Free',
    features: [
      { label: 'Manual Images', value: '1', icon: ICONS.manualImages },
      { label: 'Max Context Tokens', value: '2000', icon: ICONS.tokens },
      { label: 'Memories', value: '1', icon: ICONS.memories },
      { label: 'Character Creator', value: 'Limited', icon: ICONS.creator },
      { label: 'Character Portrait', value: 'Limited', icon: ICONS.portrait },
      { label: 'GM Section Access', value: 'Limited', icon: ICONS.gm },
      { label: 'Voice to Image', value: 'No', icon: ICONS.voice },
      { label: 'Badge', value: 'No', icon: ICONS.badge },
      { label: 'Featured Users', value: 'No', icon: ICONS.featured },
      { label: 'Loyalty Gifts', value: 'No', icon: ICONS.loyalty },
      { label: 'Multiplayer Access', value: 'Yes', icon: ICONS.multiplayer },
      { label: 'Music', value: 'Yes', icon: ICONS.music },
    ],
    ctaLabel: 'Play for Free',
  },
  {
    id: 'basic',
    name: 'Basic',
    priceMonthly: '$6.50',
    priceYearly: '$65.00',
    features: [
      { label: 'Manual Images', value: '10', icon: ICONS.manualImages },
      { label: 'Max Context Tokens', value: '4000', icon: ICONS.tokens },
      { label: 'Memories', value: '3', icon: ICONS.memories },
      { label: 'Character Creator', value: 'Standard', icon: ICONS.creator },
      { label: 'Character Portrait', value: 'Standard', icon: ICONS.portrait },
      { label: 'GM Section Access', value: 'Standard', icon: ICONS.gm },
      { label: 'Voice to Image', value: 'No', icon: ICONS.voice },
      { label: 'Badge', value: 'No', icon: ICONS.badge },
      { label: 'Featured Users', value: 'No', icon: ICONS.featured },
      { label: 'Loyalty Gifts', value: 'No', icon: ICONS.loyalty },
      { label: 'Multiplayer Access', value: 'Yes', icon: ICONS.multiplayer },
      { label: 'Music', value: 'Yes', icon: ICONS.music },
    ],
    ctaLabel: 'Proceed For Payment',
  },
  {
    id: 'silver',
    name: 'Silver',
    priceMonthly: '$12.99',
    priceYearly: '$129.99',
    features: [
      { label: 'Manual Images', value: '25', icon: ICONS.manualImages },
      { label: 'Max Context Tokens', value: '8000', icon: ICONS.tokens },
      { label: 'Memories', value: '5', icon: ICONS.memories },
      { label: 'Character Creator', value: 'Standard', icon: ICONS.creator },
      { label: 'Character Portrait', value: 'Standard', icon: ICONS.portrait },
      { label: 'GM Section Access', value: 'Standard', icon: ICONS.gm },
      { label: 'Voice to Image', value: 'Limited', icon: ICONS.voice },
      { label: 'Badge', value: 'No', icon: ICONS.badge },
      { label: 'Featured Users', value: 'No', icon: ICONS.featured },
      { label: 'Loyalty Gifts', value: 'No', icon: ICONS.loyalty },
      { label: 'Multiplayer Access', value: 'Yes', icon: ICONS.multiplayer },
      { label: 'Music', value: 'Yes', icon: ICONS.music },
    ],
    ctaLabel: 'Proceed For Payment',
  },
  {
    id: 'gold',
    name: 'Gold',
    priceMonthly: '$24.99',
    priceYearly: '$249.99',
    features: [
      { label: 'Manual Images', value: '50', icon: ICONS.manualImages },
      { label: 'Max Context Tokens', value: '16000', icon: ICONS.tokens },
      { label: 'Memories', value: '7', icon: ICONS.memories },
      { label: 'Character Creator', value: 'Standard', icon: ICONS.creator },
      { label: 'Character Portrait', value: 'Premium', icon: ICONS.portrait },
      { label: 'GM Section Access', value: 'Premium', icon: ICONS.gm },
      { label: 'Voice to Image', value: 'Yes', icon: ICONS.voice },
      { label: 'Badge', value: 'No', icon: ICONS.badge },
      { label: 'Featured Users', value: 'No', icon: ICONS.featured },
      { label: 'Loyalty Gifts', value: 'Small Gifts', icon: ICONS.loyalty },
      { label: 'Multiplayer Access', value: 'Yes', icon: ICONS.multiplayer },
      { label: 'Music', value: 'Yes', icon: ICONS.music },
    ],
    ctaLabel: 'Proceed For Payment',
  },
  {
    id: 'max',
    name: 'Max',
    priceMonthly: '$49.99',
    priceYearly: '$499.99',
    features: [
      { label: 'Manual Images', value: '200', icon: ICONS.manualImages },
      { label: 'Max Context Tokens', value: '32000', icon: ICONS.tokens },
      { label: 'Memories', value: '10', icon: ICONS.memories },
      { label: 'Character Creator', value: 'Standard', icon: ICONS.creator },
      { label: 'Character Portrait', value: 'Premium', icon: ICONS.portrait },
      { label: 'GM Section Access', value: 'Premium', icon: ICONS.gm },
      { label: 'Voice to Image', value: 'Yes', icon: ICONS.voice },
      { label: 'Badge', value: 'Yes', icon: ICONS.badge },
      { label: 'Featured Users', value: 'Yes', icon: ICONS.featured },
      { label: 'Loyalty Gifts', value: 'Premium', icon: ICONS.loyalty },
      { label: 'Multiplayer Access', value: 'Yes', icon: ICONS.multiplayer },
      { label: 'Music', value: 'Yes', icon: ICONS.music },
    ],
    ctaLabel: 'Proceed For Payment',
  },
];

export default function SubTiersScreen() {
  const [showAccount, setShowAccount] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <>
      <AppHeader onHamburgerPress={() => setShowAccount(true)} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
        <Text style={styles.pageTitle}>Subscription</Text>

        {TIERS.map((tier) => {
          const open = openId === tier.id;
          return (
            <View key={tier.id} style={styles.card}>
              <Pressable style={styles.cardHeader} onPress={() => toggle(tier.id)}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tierName}>{tier.name}</Text>
                  {(tier.priceMonthly || tier.priceYearly) && (
                    <Text style={styles.tierSub}>
                      {tier.priceMonthly ? `Monthly: ${tier.priceMonthly}` : ''}
                      {tier.priceMonthly && tier.priceYearly ? '   ' : ''}
                      {tier.priceYearly ? `Yearly: ${tier.priceYearly}` : ''}
                    </Text>
                  )}
                </View>

                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={GOLD}
                  style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
                />
              </Pressable>

              {open && (
                <View style={styles.expanded}>
                  {tier.features.map((f, idx) => (
                    <View key={`${tier.id}-${idx}`} style={styles.featRow}>
                      <Image source={f.icon} style={styles.iconImg} />
                      <Text style={styles.featLabel}>{f.label}</Text>
                      <Text style={styles.featValue}>{f.value}</Text>
                    </View>
                  ))}

                  <Pressable style={styles.cta}>
                    <Text style={styles.ctaText}>{tier.ctaLabel}</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <AccountModal visible={showAccount} onClose={() => setShowAccount(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG, paddingHorizontal: 18, paddingTop: 12 },
  pageTitle: { color: GOLD, fontSize: 20, fontWeight: '700', marginBottom: 12, fontFamily: 'El Messiri' },

  card: {
    backgroundColor: PANEL_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GOLD,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tierName: { color: WHITE, fontSize: 24, fontWeight: '800', fontFamily: 'El Messiri' },
  tierSub: { marginTop: 6, color: WHITE_SOFT, fontSize: 12 },

  expanded: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: HAIR,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },

  featRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: HAIR,
    paddingVertical: 10,
    gap: 10,
  },
  iconImg: { width: 18, height: 18, resizeMode: 'contain' },
  featLabel: { flex: 1, color: WHITE_SOFT, fontSize: 14 },
  featValue: { color: WHITE, fontSize: 14, fontWeight: '700' },

  cta: {
    marginTop: 16,
    backgroundColor: GOLD,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: { color: '#161616', fontWeight: '800', fontSize: 16, fontFamily: 'El Messiri' },
});