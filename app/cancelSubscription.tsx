// app/cancelSubscription.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import AppHeader from './appHeader';
import AccountModal from './account';

const BG         = '#161616';
const PANEL_BG   = '#1a1716';
const GOLD       = '#BF9C77';
const WHITE      = '#FFFFFF';
const WHITE_SOFT = 'rgba(255,255,255,0.92)';
const HAIR       = '#2b2623';
const GREY_BTN   = '#9A9A9A';

export default function CancelSubscriptionScreen() {
  const router = useRouter();
  const [showAccount, setShowAccount] = useState(false);

  const goPause = () => router.push('/pauseSubscription');
  const doCancel = () => {
    // TODO: call your cancel endpoint / confirm modal
    console.log('Cancel subscription requested');
    router.back();
  };

  return (
    <>
      <AppHeader onHamburgerPress={() => setShowAccount(true)} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
        <Text style={styles.pageTitle}>Cancel Subscription</Text>

        <View style={styles.panel}>
          {/* Top notice / linky paragraph */}
          <Text style={styles.intro}>
            <Text style={styles.link}>Before you cancel, did you know you have the option to pause your subscription for up to 90 days per year?</Text>{' '}
            This can be useful if you temporarily want to suspend your subscription.
          </Text>

          <Pressable style={[styles.btn, styles.btnGrey]} onPress={goPause}>
            <Text style={[styles.btnText, styles.btnTextDark]}>Pause Subscription</Text>
          </Pressable>

          {/* Section: Pause */}
          <Text style={styles.sectionTitle}>Pause subscription</Text>
          <Text style={styles.body}>
            Ready for a break from your subscription? Pause it and take up to 90 days off, but remember, your subscription will automatically restart after this period. Alternatively, you can reactivate it anytime by going to the My subscription page.
          </Text>

          {/* Section: Cancel */}
          <Text style={styles.sectionTitle}>Cancel subscription</Text>
          <Text style={styles.body}>
            You can still enjoy previous benefits until the end of your subscription. Afterward, you will be limited to 10 downloads daily and lose access to exclusive assets, online editing tools, and an ad-free screen.
          </Text>

          <Pressable style={[styles.btn, styles.btnGold]} onPress={doCancel}>
            <Text style={[styles.btnText, styles.btnTextDark]}>Cancel Subscription</Text>
          </Pressable>
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
  pageTitle: {
    color: GOLD,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 18,
    fontFamily: 'El Messiri',
  },

  panel: {
    backgroundColor: PANEL_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GOLD,
    paddingVertical: 22,
    paddingHorizontal: 16,
  },

  intro: {
    color: WHITE_SOFT,
    fontSize: 12,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    color: WHITE_SOFT,
    fontWeight: '700',
  },

  sectionTitle: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'El Messiri',
    marginTop: 10,
    marginBottom: 10,
  },
  body: {
    color: WHITE_SOFT,
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 10,
  },

  btn: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  btnGrey: {
    backgroundColor: GREY_BTN,
  },
  btnGold: {
    backgroundColor: GOLD,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'El Messiri',
  },
  btnTextDark: {
    color: '#161616',
  },

  hr: {
    height: 1,
    backgroundColor: HAIR,
    marginVertical: 12,
  },
});