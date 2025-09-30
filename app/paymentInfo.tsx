// app/paymentInfo.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import AppHeader from './appHeader';
import AccountModal from './account';

const BG = '#161616';
const PANEL_BG = '#1a1716';
const GOLD = '#BF9C77';
const WHITE = '#FFFFFF';
const WHITE_SOFT = 'rgba(255,255,255,0.92)';
const HAIR = '#2b2623';
const CANCEL_BG = '#8E8E8E';

export default function PaymentInfoScreen() {
  const router = useRouter();
  const [showAccount, setShowAccount] = useState(false);
  const [selected, setSelected] = useState<'card' | 'paypal' | null>(null);

  const selectCard = () => {
    setSelected('card');
    console.log('Card selected');
  };

  const selectPayPal = () => {
    setSelected('paypal');
    console.log('PayPal selected');
  };

  const handleCancel = () => router.push('/profile');
  const handleSave = () => {
    // TODO: persistir cambios en tu API / contexto
    console.log('Save pressed, selected:', selected);
  };

  return (
    <>
      <AppHeader onHamburgerPress={() => setShowAccount(true)} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
        {/* Título de página */}
        <Text style={styles.pageTitle}>Update Payment Details</Text>

        {/* Panel con las opciones */}
        <View style={styles.panel}>
          <Text style={styles.subtitle}>Select a Payment Method.</Text>

          {/* Opción: Credit / Debit Card */}
          <Pressable
            onPress={selectCard}
            style={({ pressed }) => [
              styles.option,
              selected === 'card' && styles.optionActive,
              pressed && { opacity: 0.9 },
            ]}
          >
            <View style={styles.optionRow}>
              <View style={styles.leftRow}>
                <Ionicons name="card-outline" size={20} color={WHITE} />
                <Text style={styles.optionText}>Credit / Debit Card</Text>
              </View>

              {/* Badges (VISA / MC / AMEX) */}
              <View style={styles.badgesRow}>
                <View style={styles.badge}><Text style={styles.badgeText}>VISA</Text></View>
                <View style={styles.badge}><Text style={styles.badgeText}>MC</Text></View>
                <View style={styles.badge}><Text style={styles.badgeText}>AMEX</Text></View>
              </View>
            </View>
          </Pressable>

          {/* Opción: PayPal */}
          <Pressable
            onPress={selectPayPal}
            style={({ pressed }) => [
              styles.optionLarge,
              selected === 'paypal' && styles.optionActive,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Text style={styles.paypalText}>PayPal</Text>
          </Pressable>

          {/* Botones de acción */}
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.btnCancel]} onPress={handleCancel}>
              <Text style={[styles.btnText, styles.btnCancelText]}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.btnSave]} onPress={handleSave}>
              <Text style={styles.btnSaveText}>Save Changes</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Modal de cuenta (overlay) */}
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

  subtitle: {
    color: WHITE_SOFT,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 22,
  },

  option: {
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  optionLarge: {
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 14,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionActive: {
    shadowColor: GOLD,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: '600',
  },

  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#2A2626',
    borderWidth: 1,
    borderColor: HAIR,
  },
  badgeText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '700',
  },

  paypalText: {
    color: WHITE,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },

  actions: {
    marginTop: 22,
    flexDirection: 'row',
    gap: 16,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '700',
    fontSize: 16,
  },
  btnCancel: {
    backgroundColor: CANCEL_BG,
  },
  btnCancelText: {
    color: '#161616',
  },
  btnSave: {
    backgroundColor: GOLD,
  },
  btnSaveText: {
    color: '#161616',
    fontWeight: '800',
    fontSize: 16,
    fontFamily: 'El Messiri',
  },
});