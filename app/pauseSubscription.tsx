// app/pauseSubscription.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';

import AppHeader from './appHeader';
import AccountModal from './account';

const BG = '#161616';
const PANEL_BG = '#1a1716';
const GOLD = '#BF9C77';
const WHITE = '#FFFFFF';
const WHITE_SOFT = 'rgba(255,255,255,0.92)';
const HAIR = '#2b2623';
const MUTED = 'rgba(255,255,255,0.7)';
const CANCEL_BG = '#8E8E8E';

export default function PauseSubscriptionScreen() {
  const router = useRouter();
  const [showAccount, setShowAccount] = useState(false);

  const goBackToProfile = () => router.back();

  const handlePause = () => {
    // TODO: call your API to pause the subscription
    console.log('Pause subscription requested');
    router.back();
  };

  return (
    <>
      <AppHeader onHamburgerPress={() => setShowAccount(true)} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
        {/* Header Row */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Pause Subscription</Text>

          {/* Close → back to profile */}
          <Pressable onPress={goBackToProfile} hitSlop={8} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </View>

        {/* Card / Panel */}
        <View style={styles.panel}>
          {/* Days Left pill */}
          <View style={styles.pill}>
            <Text style={styles.pillText}>90 Days Left</Text>
          </View>

          {/* Timeline */}
          <View style={styles.timelineCard}>
            {/* bar */}
            <View style={styles.timelineBar}>
              <View style={[styles.tick, { left: 0 }]} />
              <View style={[styles.tick, { left: '50%' }]} />
              <View style={[styles.tick, { left: '100%' }]} />
            </View>

            {/* labels */}
            <View style={styles.timelineLabels}>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineTitle}>Active</Text>
                <Text style={styles.timelineSub}>Oct 28th, 2024</Text>
              </View>

              <View style={[styles.timelineItem, { alignItems: 'center' }]}>
                <Text style={styles.timelineTitle}>Pause</Text>
                <Text style={styles.timelineSub}>Without Premium content for 90 days</Text>
              </View>

              <View style={[styles.timelineItem, { alignItems: 'flex-end' }]}>
                <Text style={styles.timelineTitle}>Resume</Text>
                <Text style={styles.timelineSub}>Jan 26th, 2025</Text>
              </View>
            </View>
          </View>

          {/* Copy */}
          <Text style={styles.body}>
            Pause your subscription for up to 90 alternating or consecutive days, as many times as needed.
          </Text>

          <Text style={styles.sectionHeader}>When a subscription is paused:</Text>
          <View style={styles.bullets}>
            <Text style={styles.bullet}>• Your perks and credits are on hold.</Text>
            <Text style={styles.bullet}>• The payment date shifts accordingly.</Text>
            <Text style={styles.bullet}>• It can be restarted anytime from Subscription.</Text>
            <Text style={styles.bullet}>• After 90 days, it will automatically resume.</Text>
          </View>

          <Text style={styles.body}>
            For more details about pausing a subscription,{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://example.com/article')}
            >
              see this article.
            </Text>
          </Text>

          <View style={styles.divider} />

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.btnGhost]} onPress={goBackToProfile}>
              <Text style={[styles.btnGhostText]}>Keep Active</Text>
            </Pressable>

            <Pressable style={[styles.btn, styles.btnGold]} onPress={handlePause}>
              <Text style={styles.btnGoldText}>Pause Subscription</Text>
            </Pressable>
          </View>
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
    marginBottom: 12,
  },
  pageTitle: {
    flex: 1,
    color: GOLD,
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'El Messiri',
  },
  closeBtn: { padding: 6, marginLeft: 10 },
  closeText: { color: GOLD, fontSize: 24, fontWeight: '700' },

  panel: {
    backgroundColor: PANEL_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GOLD,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#6b5f53',
    borderRadius: 8,
    marginBottom: 16,
  },
  pillText: { color: WHITE, fontWeight: '700' },

  timelineCard: {
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#2A2626',
  },
  timelineBar: {
    height: 4,
    backgroundColor: HAIR,
    borderRadius: 2,
    position: 'relative',
    marginHorizontal: 6,
  },
  tick: {
    position: 'absolute',
    top: -4,
    width: 2,
    height: 12,
    backgroundColor: GOLD,
    transform: [{ translateX: -1 }],
  },
  timelineLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  timelineItem: { flex: 1 },
  timelineTitle: { color: GOLD, fontWeight: '700' },
  timelineSub: { color: WHITE_SOFT, fontSize: 12 },

  body: {
    color: WHITE_SOFT,
    lineHeight: 20,
    marginBottom: 12,
  },
  sectionHeader: {
    color: GOLD,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 8,
  },
  bullets: { gap: 6, marginBottom: 12 },
  bullet: { color: WHITE_SOFT },

  link: { color: GOLD, textDecorationLine: 'underline' },

  divider: {
    height: 1,
    backgroundColor: HAIR,
    marginTop: 8,
    marginBottom: 14,
  },

  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnGhost: {
    backgroundColor: CANCEL_BG,
  },
  btnGhostText: {
    color: '#161616',
    fontWeight: '800',
  },
  btnGold: {
    backgroundColor: GOLD,
  },
  btnGoldText: {
    color: '#161616',
    fontWeight: '800',
    fontFamily: 'El Messiri',
  },
});