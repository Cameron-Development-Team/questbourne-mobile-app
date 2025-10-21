// components/Modals.tsx
import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* --------------------------- Types & Props --------------------------- */

export type RandomAdventureValues = {
  genre: string | null;
  includeMagic: boolean | null;
  characterName: string;        // resolved from either new or existing
  selectedCharacterId?: string; // present when "existing" was used
};

export type ExistingCharacter = {
  id: string;
  name: string;
  race?: string;
  gender?: string;
  age?: number;
  tags?: string[]; // e.g. ["Combat Archery","Naturalist"]
};

type RandomAdventureModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: RandomAdventureValues) => void;

  genres?: string[];
  existingCharacters?: ExistingCharacter[];
  /** Optional: navigate to characterCreation.tsx */
  onCreateNewCharacter?: () => void;
};

/* ----------------------------- Component ---------------------------- */

export function RandomAdventureModal({
  visible,
  onClose,
  onSubmit,
  existingCharacters = [],
  onCreateNewCharacter,
  genres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Medieval', 'Horror', 'Western'],
}: RandomAdventureModalProps) {
  // story
  const [genreOpen, setGenreOpen] = useState(false);
  const [genre, setGenre] = useState<string | null>(null);
  const [includeMagic, setIncludeMagic] = useState<boolean | null>(null);

  // character tabs
  const [tab, setTab] = useState<'new' | 'existing'>('new');

  // "new character" inline field (simple name)
  const [characterName, setCharacterName] = useState('');

  // "existing character" selection
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedChar = useMemo(
    () => existingCharacters.find(c => c.id === selectedId) || null,
    [existingCharacters, selectedId]
  );

  const canSubmit =
    !!genre &&
    includeMagic !== null &&
    (tab === 'new'
      ? characterName.trim().length > 0
      : !!selectedChar);

  const handlePickGenre = (g: string) => {
    setGenre(g);
    setGenreOpen(false);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    const name = tab === 'new'
      ? characterName.trim()
      : (selectedChar?.name ?? '');

    onSubmit({
      genre,
      includeMagic,
      characterName: name,
      selectedCharacterId: tab === 'existing' ? selectedChar?.id : undefined,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={() => setGenreOpen(false)}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.centerWrap} pointerEvents="box-none">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Random Adventure</Text>

          {/* Genre */}
          <View style={styles.fieldWrap}>
            <Pressable style={styles.select} onPress={() => setGenreOpen(v => !v)}>
              <Text style={[styles.selectText, !genre && styles.placeholder]}>
                {genre ?? 'Select Story Genre*'}
              </Text>
              <Ionicons name={genreOpen ? 'chevron-up' : 'chevron-down'} size={20} color={GOLD} />
            </Pressable>

            {genreOpen && (
              <View style={styles.dropdown}>
                <FlatList
                  data={genres}
                  keyExtractor={(g) => g}
                  renderItem={({ item }) => (
                    <Pressable style={styles.option} onPress={() => handlePickGenre(item)}>
                      <Text style={styles.optionText}>{item}</Text>
                    </Pressable>
                  )}
                />
              </View>
            )}
          </View>

          {/* Include Magic */}
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Include Magic/Fantasy</Text>
            <View style={styles.toggleRow}>
              <Pressable
                style={[
                  styles.toggleChip,
                  includeMagic === true && styles.toggleChipActive,
                ]}
                onPress={() => setIncludeMagic(true)}
              >
                <Text
                  style={[
                    styles.toggleText,
                    includeMagic === true && styles.toggleTextActive,
                  ]}
                >
                  Yes
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.toggleChip,
                  includeMagic === false && styles.toggleChipActive,
                ]}
                onPress={() => setIncludeMagic(false)}
              >
                <Text
                  style={[
                    styles.toggleText,
                    includeMagic === false && styles.toggleTextActive,
                  ]}
                >
                  No
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Character tabs */}
          <View style={styles.tabsRow}>
            <Pressable
              style={[styles.tabBtn, tab === 'new' && styles.tabBtnActive]}
              onPress={() => setTab('new')}
            >
              <Text style={[styles.tabText, tab === 'new' && styles.tabTextActive]}>
                CREATE NEW CHARACTER
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tabBtn, tab === 'existing' && styles.tabBtnActive]}
              onPress={() => setTab('existing')}
            >
              <Text style={[styles.tabText, tab === 'existing' && styles.tabTextActive]}>
                USE EXISTING CHARACTER
              </Text>
            </Pressable>
          </View>

          {tab === 'new' ? (
            <>
              {/* Inline simple name field (you can keep this even if you also navigate) */}
              <View style={styles.inputWrap}>
                <TextInput
                  value={characterName}
                  onChangeText={setCharacterName}
                  placeholder="Character Name*"
                  placeholderTextColor="#bfbfbf"
                  style={styles.input}
                />
              </View>

              {onCreateNewCharacter && (
                <Pressable style={styles.linkBtn} onPress={onCreateNewCharacter}>
                  <Ionicons name="open-outline" size={16} color={GOLD} />
                  <Text style={styles.linkBtnText}>Open full Character Creator</Text>
                </Pressable>
              )}
            </>
          ) : (
            <View style={styles.listWrap}>
              {existingCharacters.length === 0 ? (
                <Text style={styles.emptyText}>
                  No saved characters yet. Switch to “Create New Character” to add one.
                </Text>
              ) : (
                <FlatList
                  data={existingCharacters}
                  keyExtractor={(c) => c.id}
                  contentContainerStyle={{ paddingBottom: 8 }}
                  renderItem={({ item }) => {
                    const active = selectedId === item.id;
                    return (
                      <Pressable
                        onPress={() => setSelectedId(item.id)}
                        style={[styles.cardRow, active && styles.cardRowActive]}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.rowTitle}>{item.name}</Text>
                          <Text style={styles.rowSubtitle}>
                            {(item.race ?? 'Custom')}
                            {item.gender ? ` • ${item.gender}` : ''}
                            {typeof item.age === 'number' ? ` • Age ${item.age}` : ''}
                          </Text>

                          {!!item.tags?.length && (
                            <View style={styles.badgesRow}>
                              {item.tags.slice(0, 3).map((t, i) => (
                                <View key={`${item.id}-tag-${i}`} style={styles.badge}>
                                  <Text style={styles.badgeText}>{t}</Text>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>

                        <Ionicons
                          name={active ? 'checkmark-circle' : 'ellipse-outline'}
                          size={22}
                          color={active ? GOLD : '#6f6a66'}
                        />
                      </Pressable>
                    );
                  }}
                />
              )}
            </View>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.btnGhost]} onPress={onClose}>
              <Text style={[styles.btnText, styles.btnGhostText]}>CANCEL</Text>
            </Pressable>
            <Pressable style={[styles.btn, !canSubmit && { opacity: 0.6 }]} onPress={handleSubmit}>
              <Text style={styles.btnText}>SUBMIT</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/* --------------------------- Simple Confirm -------------------------- */

type ConfirmModalProps = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  visible,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmLabel = 'OK',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop} />
      <View style={styles.centerWrap} pointerEvents="box-none">
        <View style={styles.cardSmall}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.body}>{message}</Text>
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.btnGhost]} onPress={onCancel}>
              <Text style={[styles.btnText, styles.btnGhostText]}>{cancelLabel}</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={onConfirm}>
              <Text style={styles.btnText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/* ------------------------------- Styles ------------------------------ */

const GOLD = '#BF9C77';

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  centerWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },

  card: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: '#2B2626',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GOLD,
    paddingBottom: 18,
  },
  cardSmall: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: '#2B2626',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GOLD,
    padding: 16,
  },
  cardTitle: {
    textAlign: 'center',
    fontFamily: 'El Messiri',
    fontSize: 22,
    color: GOLD,
    marginVertical: 16,
    fontWeight: '700',
  },
  body: { color: '#fff', fontSize: 14, textAlign: 'center' },

  fieldWrap: { marginHorizontal: 20, marginBottom: 18 },
  select: {
    minHeight: 60,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 6,
    paddingHorizontal: 16,
    backgroundColor: '#2B2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: { color: GOLD, fontSize: 18, fontWeight: '700', fontFamily: 'El Messiri' },
  placeholder: { opacity: 0.8 },

  dropdown: {
    position: 'absolute',
    top: 66,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 10,
    backgroundColor: '#1f1b1b',
    overflow: 'hidden',
  },
  option: { paddingVertical: 12, paddingHorizontal: 16 },
  optionText: { color: '#fff', fontSize: 16 },

  rowBetween: { marginHorizontal: 20, marginBottom: 18 },
  label: { color: '#fff', fontSize: 16, marginBottom: 10 },

  /* Toggle chips (Yes/No) */
  toggleRow: { flexDirection: 'row', gap: 12 },
  toggleChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#6f6a66',
    backgroundColor: 'transparent',
  },
  toggleChipActive: { borderColor: GOLD, backgroundColor: '#3a3431' },
  toggleText: { color: '#e6e0dd', fontSize: 14, fontWeight: '600' },
  toggleTextActive: { color: GOLD },

  /* Tabs */
  tabsRow: {
    marginHorizontal: 20,
    marginBottom: 14,
    flexDirection: 'row',
    gap: 10,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GOLD,
    backgroundColor: '#3a3431',
    alignItems: 'center',
  },
  tabBtnActive: { backgroundColor: GOLD },
  tabText: {
    color: GOLD,
    fontWeight: '800',
    fontFamily: 'El Messiri',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  tabTextActive: { color: '#161616' },

  /* New */
  inputWrap: { marginHorizontal: 20, marginBottom: 14 },
  input: {
    minHeight: 56,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 6,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  linkBtn: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  linkBtnText: { color: GOLD, fontWeight: '700', fontFamily: 'El Messiri', fontSize: 12 },

  /* Existing */
  listWrap: { marginHorizontal: 12, marginBottom: 4, maxHeight: 260 },
  emptyText: { color: '#cfc7c3', paddingHorizontal: 8, paddingVertical: 6 },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4b433e',
    backgroundColor: '#2c2724',
  },
  cardRowActive: { borderColor: GOLD, backgroundColor: '#332e2b' },
  rowTitle: { color: '#fff', fontWeight: '800', fontSize: 16, marginBottom: 2, fontFamily: 'El Messiri' },
  rowSubtitle: { color: '#e6e0dd', opacity: 0.9, marginBottom: 8, fontSize: 12 },
  badgesRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#423b37',
    borderWidth: 1,
    borderColor: '#524a45',
  },
  badgeText: { color: '#e8e0da', fontSize: 11, fontWeight: '700' },

  /* Footer actions */
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 20,
    marginTop: 14,
  },
  btn: {
    flex: 1,
    backgroundColor: GOLD,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#000', fontWeight: '800', fontFamily: 'El Messiri' },
  btnGhost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: GOLD },
  btnGhostText: { color: GOLD },
});