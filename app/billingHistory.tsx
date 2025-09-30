// app/billingHistory.tsx
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

const BG = '#161616';
const PANEL_BG = '#1a1716';
const GOLD = '#BF9C77';
const WHITE = '#FFFFFF';
const WHITE_SOFT = 'rgba(255,255,255,0.92)';
const HAIR = '#2b2623';
const ROW_BG = 'rgba(255,255,255,0.06)';

type Invoice = {
  id: string;
  product: string;
  ref: string;
  date: string;    // ISO string or display string
  amount: string;  // display-friendly (e.g. $100)
  status: 'paid' | 'unpaid' | 'refunded';
};

const MOCK: Invoice[] = [
  { id: '1', product: 'Legend', ref: 'INV-2024-OCT', date: '2024-10-28', amount: '$100', status: 'paid' },
  { id: '2', product: 'Legend', ref: 'INV-2024-SEP', date: '2024-09-28', amount: '$100', status: 'paid' },
  { id: '3', product: 'Legend', ref: 'INV-2024-AUG', date: '2024-08-28', amount: '$100', status: 'paid' },
];

export default function BillingHistoryScreen() {
  const router = useRouter();
  const [showAccount, setShowAccount] = useState(false);

  const goBack = () => router.back();

  const onDownload = (inv: Invoice) => {
    // TODO: wire real download / deep link later
    console.log('Download invoice', inv.ref);
  };

  return (
    <>
      <AppHeader onHamburgerPress={() => setShowAccount(true)} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Title row with close */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Invoices</Text>
          <Pressable onPress={goBack} hitSlop={10}>
            <Text style={styles.closeX}>✕</Text>
          </Pressable>
        </View>

        {/* Panel */}
        <View style={styles.panel}>
          {MOCK.map((inv, idx) => (
            <View key={inv.id} style={{ marginBottom: idx === MOCK.length - 1 ? 0 : 18 }}>
              {/* Product line */}
              <View style={styles.line}>
                <Text style={styles.k}>Product:</Text>
                <Text style={styles.vBold}>{inv.product}</Text>
              </View>

              <View style={styles.hair} />

              {/* Header labels */}
              <View style={[styles.headerRow]}>
                <Text style={[styles.headLabel, { flex: 1.4 }]}>Ref.</Text>
                <Text style={[styles.headLabel, { flex: 1.2, textAlign: 'center' }]}>Date</Text>
                <Text style={[styles.headLabel, { width: 80, textAlign: 'right' }]}>Amount</Text>
              </View>

              {/* Values row */}
              <View style={styles.valuesRow}>
                <Text style={[styles.cellText, { flex: 1.4 }]}>{inv.ref}</Text>
                <Text style={[styles.cellText, { flex: 1.2, textAlign: 'center' }]}>{inv.date}</Text>
                <Text style={[styles.cellText, { width: 80, textAlign: 'right' }]}>{inv.amount}</Text>
              </View>

              {/* Status / Download */}
              <View style={styles.statusRow}>
                <Text style={styles.statusText}>
                  Status:{' '}
                  <Text style={{ color: inv.status === 'paid' ? GOLD : WHITE_SOFT }}>
                    {inv.status === 'paid' ? '✓ Paid' : inv.status}
                  </Text>
                </Text>

                <Pressable style={styles.downloadBtn} onPress={() => onDownload(inv)} hitSlop={8}>
                  <Text style={styles.downloadText}>Download</Text>
                  <Text style={styles.downloadIcon}>📄</Text>
                </Pressable>
              </View>

              {/* Separator between items */}
              {idx !== MOCK.length - 1 && <View style={styles.itemDivider} />}
            </View>
          ))}
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
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'El Messiri',
  },
  closeX: {
    color: GOLD,
    fontSize: 24,
    fontWeight: '700',
  },

  panel: {
    backgroundColor: PANEL_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GOLD,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  line: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 10,
  },
  k: { color: WHITE, fontWeight: '800', fontSize: 14 },
  vBold: { color: WHITE_SOFT, fontSize: 14, fontWeight: '700' },

  hair: {
    height: 1,
    backgroundColor: HAIR,
    marginBottom: 10,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.9,
    marginBottom: 6,
  },
  headLabel: {
    color: WHITE_SOFT,
    fontSize: 12,
    letterSpacing: 0.3,
  },

  valuesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ROW_BG,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  cellText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  statusText: {
    color: WHITE_SOFT,
    fontSize: 13,
  },

  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  downloadText: {
    color: GOLD,
    fontWeight: '700',
    fontSize: 13,
  },
  downloadIcon: {
    color: GOLD,
    fontSize: 12,
  },

  itemDivider: {
    height: 1,
    backgroundColor: HAIR,
    marginTop: 14,
  },
});