// app/characterCreation.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

import AppHeader from './appHeader';
import AccountModal from './account';

const BG = '#161616';
const PANEL_BG = '#1a1716';
const GOLD = '#BF9C77';
const BORDER = '#BF9C77';
const WHITE = '#FFFFFF';
const WHITE_SOFT = 'rgba(255,255,255,0.92)';
const MUTED = 'rgba(255,255,255,0.7)';
const HAIR = '#2b2623';

type LevelKey = 'generic' | 'balanced' | 'creative';

export default function CharacterCreationScreen() {
  const [showAccount, setShowAccount] = useState(false);

  /* Tabs */
  const [tab, setTab] = useState<'random' | 'custom'>('random');

  /* Random tab */
  const [level, setLevel] = useState<LevelKey>('generic');
  const levelSubtitle = useMemo(
    () =>
      ({
        generic: 'Quick & Familiar',
        balanced: 'Enhanced & Interesting',
        creative: 'Unique & Wild',
      } as const),
    []
  );
  const onCreateRandom = () => {
    console.log('Create Random Character → level:', level);
    // TODO: hook into your generation flow or navigation
  };

  /* Custom tab */
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Non-binary' | 'Other'>('Male');
  const [race, setRace] = useState<'Human' | 'Elf' | 'Dwarf' | 'Orc' | 'Other'>('Human');
  const [appearance, setAppearance] = useState('');
  const [personality, setPersonality] = useState('');

  const onPreviewCustom = () => {
    // Light validation
    if (!name.trim()) return alert('Please enter a character name.');
    console.log('Preview Character', { name, age, gender, race, appearance, personality });
    // router.push('/previewCharacter'); // if you add a preview screen
  };

  const onCreateCustom = () => {
    if (!name.trim()) return alert('Please enter a character name.');
    console.log('Create Character', { name, age, gender, race, appearance, personality });
    // TODO: submit to your backend / store and navigate
  };

  const goHome = () => router.push('/home');

  return (
    <>
      <AppHeader onHamburgerPress={() => setShowAccount(true)} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
        {/* Back to Home 
        <Pressable onPress={goHome} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Back to Home</Text>
        </Pressable>
            */}
        <Text style={styles.pageTitle}>Character Generation</Text>

        {/* Main panel */}
        <View style={styles.panel}>
          <Text style={styles.panelHeading}>Create New Character</Text>

          {/* Tabs */}
          <View style={styles.tabsRow}>
            <TabButton label="Random Character" active={tab === 'random'} onPress={() => setTab('random')} />
            <TabButton label="Custom Character" active={tab === 'custom'} onPress={() => setTab('custom')} />
          </View>

          {/* RANDOM TAB */}
          {tab === 'random' && (
            <>
              <Text style={styles.helper}>
                Generate a completely random character with different levels of creativity.
              </Text>

              <Text style={styles.sectionLabel}>Character Randomness Level:</Text>

              <View style={styles.levelRow}>
                <ChoiceCard
                  label="Generic"
                  subtitle={levelSubtitle.generic}
                  selected={level === 'generic'}
                  onPress={() => setLevel('generic')}
                />
                <ChoiceCard
                  label="Balanced"
                  subtitle={levelSubtitle.balanced}
                  selected={level === 'balanced'}
                  onPress={() => setLevel('balanced')}
                />
                <ChoiceCard
                  label="Creative"
                  subtitle={levelSubtitle.creative}
                  selected={level === 'creative'}
                  onPress={() => setLevel('creative')}
                />
              </View>

              <Pressable style={styles.primaryBtn} onPress={onCreateRandom}>
                <Text style={styles.primaryBtnText}>Create Random Character</Text>
              </Pressable>
            </>
          )}

          {/* CUSTOM TAB */}
          {tab === 'custom' && (
            <>
              {/* Row: Name / Gender */}
              <View style={styles.twoCol}>
                <View style={styles.col}>
                  <FieldLabel>Character Name *</FieldLabel>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    placeholderTextColor={MUTED}
                    style={styles.input}
                  />
                </View>
                <View style={styles.col}>
                  <FieldLabel>Gender</FieldLabel>
                  <View style={styles.pickerWrap}>
                    <Picker
                      selectedValue={gender}
                      onValueChange={(v) => setGender(v as any)}
                      dropdownIconColor={GOLD}
                      style={styles.picker}
                    >
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                      <Picker.Item label="Non-binary" value="Non-binary" />
                      <Picker.Item label="Other" value="Other" />
                    </Picker>
                  </View>
                </View>
              </View>

              {/* Row: Age / Race */}
              <View style={styles.twoCol}>
                <View style={styles.col}>
                  <FieldLabel>Age</FieldLabel>
                  <TextInput
                    value={age}
                    onChangeText={setAge}
                    placeholder="e.g. 20"
                    placeholderTextColor={MUTED}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.col}>
                  <FieldLabel>Race</FieldLabel>
                  <View style={styles.pickerWrap}>
                    <Picker
                      selectedValue={race}
                      onValueChange={(v) => setRace(v as any)}
                      dropdownIconColor={GOLD}
                      style={styles.picker}
                    >
                      <Picker.Item label="Human" value="Human" />
                      <Picker.Item label="Elf" value="Elf" />
                      <Picker.Item label="Dwarf" value="Dwarf" />
                      <Picker.Item label="Orc" value="Orc" />
                      <Picker.Item label="Other" value="Other" />
                    </Picker>
                  </View>
                </View>
              </View>

              {/* Appearance */}
              <FieldLabel>Appearance</FieldLabel>
              <TextInput
                value={appearance}
                onChangeText={setAppearance}
                placeholder="Describe your character’s appearance (Optional – AI will generate if empty)"
                placeholderTextColor={MUTED}
                style={[styles.input, styles.textarea]}
                multiline
              />

              {/* Personality */}
              <FieldLabel>Personality Traits</FieldLabel>
              <TextInput
                value={personality}
                onChangeText={setPersonality}
                placeholder="Describe your character’s personality (Optional – AI will generate if empty)"
                placeholderTextColor={MUTED}
                style={[styles.input, styles.textarea]}
                multiline
              />

              {/* Actions */}
              <View style={styles.actionsRow}>
                <Pressable style={[styles.ghostBtn]} onPress={onPreviewCustom}>
                  <Text style={styles.ghostBtnText}>Preview Character</Text>
                </Pressable>
                <Pressable style={[styles.primaryBtn, { flex: 1 }]} onPress={onCreateCustom}>
                  <Text style={styles.primaryBtnText}>Create Character</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>

        {/* My Characters */}
        <View style={styles.panelSmall}>
          <Text style={styles.myTitle}>My Characters (0)</Text>
          <Text style={styles.myEmpty}>
            No characters created yet. Create your first character above!
          </Text>
        </View>
      </ScrollView>

      <AccountModal visible={showAccount} onClose={() => setShowAccount(false)} />
    </>
  );
}

/* ----------------------------- Small components ---------------------------- */

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabBtn, active ? styles.tabBtnActive : styles.tabBtnIdle]}
    >
      <Text style={[styles.tabBtnText, active && styles.tabBtnTextActive]}>{label}</Text>
    </Pressable>
  );
}

function ChoiceCard({
  label,
  subtitle,
  selected,
  onPress,
}: {
  label: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.choiceCard, selected && styles.choiceCardActive]}
    >
      <Text style={styles.choiceLabel}>{label}</Text>
      <Text style={styles.choiceSub}>{subtitle}</Text>
    </Pressable>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.fieldLabel}>{children}</Text>;
}

/* ---------------------------------- Styles --------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 6,
    marginBottom: 12,
  },
  backText: {
    color: GOLD,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'El Messiri',
  },

  pageTitle: {
    color: GOLD,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 14,
    fontFamily: 'El Messiri',
    textAlign: 'center',
  },

  panel: {
    backgroundColor: PANEL_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 14,
  },

  panelHeading: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },

  tabsRow: { flexDirection: 'row', gap: 10, alignSelf: 'center', marginBottom: 12 },
  tabBtn: {
    minWidth: 150,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  tabBtnIdle: { borderColor: GOLD, backgroundColor: 'transparent' },
  tabBtnActive: { borderColor: GOLD, backgroundColor: 'rgba(191,156,119,0.15)' },
  tabBtnText: { color: WHITE, fontWeight: '700' },
  tabBtnTextActive: { color: WHITE },

  helper: {
    color: WHITE_SOFT,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 12,
    lineHeight: 18,
  },
  sectionLabel: {
    color: WHITE,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },

  levelRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  choiceCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: HAIR,
    borderRadius: 10,
    backgroundColor: '#23201E',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  choiceCardActive: {
    borderColor: GOLD,
    shadowColor: GOLD,
    shadowOpacity: 0.22,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  choiceLabel: { color: WHITE, fontWeight: '800', fontSize: 14 },
  choiceSub: { color: MUTED, fontSize: 12, marginTop: 4 },

  /* Custom form */
  twoCol: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },

  fieldLabel: {
    color: WHITE_SOFT,
    fontSize: 13,
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#23201E',
    borderWidth: 1,
    borderColor: HAIR,
    borderRadius: 8,
    color: WHITE,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
  },
  textarea: {
    minHeight: 92,
    textAlignVertical: 'top',
    marginBottom: 12,
  },

  pickerWrap: {
    backgroundColor: '#23201E',
    borderWidth: 1,
    borderColor: HAIR,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: WHITE,
    height: 44,
  },

  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 8 },

  primaryBtn: {
    backgroundColor: GOLD,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryBtnText: {
    color: '#161616',
    fontWeight: '800',
    fontSize: 16,
    fontFamily: 'El Messiri',
  },

  ghostBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ghostBtnText: {
    color: GOLD,
    fontWeight: '800',
    fontSize: 16,
    fontFamily: 'El Messiri',
  },

  /* My Characters panel */
  panelSmall: {
    backgroundColor: PANEL_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  myTitle: {
    color: WHITE,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  myEmpty: { color: WHITE_SOFT, textAlign: 'center' },
});