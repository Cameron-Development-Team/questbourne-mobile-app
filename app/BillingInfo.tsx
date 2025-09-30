// app/billingInfo.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';

import AppHeader from './appHeader';
import AccountModal from './account';

type BillingValues = {
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip: string;
};

const BG = '#161616';
const PANEL_BG = '#1a1716';
const GOLD = '#BF9C77';
const BORDER = '#BF9C77';
const WHITE = '#FFFFFF';
const WHITE_SOFT = 'rgba(255,255,255,0.92)';
const MUTED = 'rgba(255,255,255,0.6)';
const HAIR = '#2b2623';
const CANCEL_BG = '#8E8E8E';

export default function BillingInfoScreen() {
  const router = useRouter();
  const [showAccount, setShowAccount] = useState(false);

  const [values, setValues] = useState<BillingValues>({
    firstName: 'Ruthcelyn',
    lastName: 'Hernández',
    address: 'Address goes here',
    country: 'Peru',
    state: 'Lima',
    city: 'San Miguel',
    zip: '00000',
  });

  const setField =
    (key: keyof BillingValues) =>
    (text: string) =>
      setValues((v) => ({ ...v, [key]: text }));

  const handleCancel = () => router.push('/profile');
  const handleSave = () => {
    // TODO: persistir cambios en tu API / contexto
    console.log('Saving billing info:', values);
    router.back();
  };

  return (
    <>
      <AppHeader onHamburgerPress={() => setShowAccount(true)} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.pageTitle}>Billing Information</Text>

        <View style={styles.panel}>
          <FieldRow label="*Customer first Name" value={values.firstName} onChangeText={setField('firstName')} />
          <FieldRow label="Last Name" value={values.lastName} onChangeText={setField('lastName')} />
          <FieldRow label="*Address" value={values.address} onChangeText={setField('address')} />
          <FieldRow label="*Country" value={values.country} onChangeText={setField('country')} />
          <FieldRow label="*State/province/region" value={values.state} onChangeText={setField('state')} />
          <FieldRow label="*City" value={values.city} onChangeText={setField('city')} />
          <FieldRow
            label="Zip/Postal code"
            value={values.zip}
            onChangeText={setField('zip')}
            keyboardType="number-pad"
          />

          {/* Botones */}
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

      <AccountModal visible={showAccount} onClose={() => setShowAccount(false)} />
    </>
  );
}

function FieldRow({
  label,
  value,
  onChangeText,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'decimal-pad';
}) {
  return (
    <View style={rowStyles.wrap}>
      <View style={rowStyles.row}>
        <Text style={rowStyles.label} numberOfLines={2}>
          {label}
        </Text>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={rowStyles.input}
          placeholderTextColor={MUTED}
          keyboardType={keyboardType}
        />
      </View>
      <View style={rowStyles.underline} />
    </View>
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
    borderColor: BORDER,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actions: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 16,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: { fontWeight: '700', fontSize: 16 },
  btnCancel: { backgroundColor: CANCEL_BG },
  btnCancelText: { color: '#161616' },
  btnSave: { backgroundColor: GOLD },
  btnSaveText: { color: '#161616', fontWeight: '800', fontSize: 16, fontFamily: 'El Messiri' },
});

const rowStyles = StyleSheet.create({
  wrap: { paddingVertical: 10 },
  row: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    color: WHITE_SOFT,
    fontSize: 16,
    fontWeight: '400',
    flexShrink: 1,
    paddingRight: 8,
  },
  input: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    paddingVertical: 6,
  },
  underline: {
    height: 1,
    width: '100%',
    backgroundColor: HAIR,
  },
});