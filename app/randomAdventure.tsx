// components/Modals.tsx
import React, { useState } from 'react';
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

type RandomAdventureValues = {
  genre: string | null;
  includeMagic: boolean | null;
  characterName: string;
};

type RandomAdventureModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: RandomAdventureValues) => void;
  genres?: string[];
};

export function RandomAdventureModal({
  visible,
  onClose,
  onSubmit,
  genres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Medieval', 'Horror', 'Western'],
}: RandomAdventureModalProps) {
  const [genreOpen, setGenreOpen] = useState(false);
  const [genre, setGenre] = useState<string | null>(null);
  const [includeMagic, setIncludeMagic] = useState<boolean | null>(null);
  const [characterName, setCharacterName] = useState('');

  const canSubmit = !!genre && includeMagic !== null && characterName.trim().length > 0;

  const handlePick = (g: string) => {
    setGenre(g);
    setGenreOpen(false);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={() => { setGenreOpen(false); }}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.centerWrap} pointerEvents="box-none">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Random Adventure</Text>

          {/* Select Story Genre */}
          <View style={styles.fieldWrap}>
            <Pressable style={styles.select} onPress={() => setGenreOpen(v => !v)}>
              <Text style={[styles.selectText, !genre && styles.placeholder]}>
                {genre ?? 'Select Story Genre*'}
              </Text>
              <Ionicons name={genreOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#BF9C77" />
            </Pressable>

            {genreOpen && (
              <View style={styles.dropdown}>
                <FlatList
                  data={genres}
                  keyExtractor={(g) => g}
                  renderItem={({ item }) => (
                    <Pressable style={styles.option} onPress={() => handlePick(item)}>
                      <Text style={styles.optionText}>{item}</Text>
                    </Pressable>
                  )}
                />
              </View>
            )}
          </View>

          {/* Include Magic/Fantasy */}
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Include Magic/Fantasy</Text>
            <View style={styles.radioRow}>
              <Pressable style={styles.radioItem} onPress={() => setIncludeMagic(true)}>
                <View style={[styles.radioOuter, includeMagic === true && styles.radioOuterActive]}>
                  {includeMagic === true && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>Yes</Text>
              </Pressable>

              <Pressable style={styles.radioItem} onPress={() => setIncludeMagic(false)}>
                <View style={[styles.radioOuter, includeMagic === false && styles.radioOuterActive]}>
                  {includeMagic === false && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>No</Text>
              </Pressable>
            </View>
          </View>

          {/* Character Name */}
          <View style={styles.inputWrap}>
            <TextInput
              value={characterName}
              onChangeText={setCharacterName}
              placeholder="Character Name*"
              placeholderTextColor="#bfbfbf"
              style={styles.input}
            />
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.btnGhost]} onPress={onClose}>
              <Text style={[styles.btnText, styles.btnGhostText]}>CANCEL</Text>
            </Pressable>
            <Pressable
              style={[styles.btn, !canSubmit && { opacity: 0.6 }]}
              onPress={() => canSubmit && onSubmit({ genre, includeMagic, characterName: characterName.trim() })}
            >
              <Text style={styles.btnText}>SUBMIT</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

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

const GOLD = '#BF9C77';

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GOLD,
    paddingBottom: 18,
    overflow: 'visible',
  },
  cardSmall: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: '#2B2626',
    borderRadius: 6,
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
    borderRadius: 3,
    paddingHorizontal: 16,
    backgroundColor: '#2B2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: { color: '#BF9C77', fontSize: 18, fontWeight: '700', fontFamily: 'El Messiri' },
  placeholder: { color: '#BF9C77' },

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

  rowBetween: {
    marginHorizontal: 20,
    marginBottom: 18,
  },
  label: { color: '#fff', fontSize: 18, fontWeight: '400', marginBottom: 8 },

  radioRow: { flexDirection: 'row', alignItems: 'center', gap: 26 },
  radioItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  radioOuter: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  radioOuterActive: { borderColor: '#fff' },
  radioInner: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#fff' },
  radioText: { color: '#fff', fontSize: 18 },

  inputWrap: { marginHorizontal: 20, marginBottom: 22 },
  input: {
    minHeight: 64,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 3,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    backgroundColor: 'transparent',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 20,
  },
  btn: {
    flex: 1,
    backgroundColor: GOLD,
    paddingVertical: 5,
    borderRadius: 3,
    alignItems: 'center',
  },
  btnText: { color: '#000', fontWeight: '700', fontFamily: 'El Messiri' },
  btnGhost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: GOLD },
  btnGhostText: { color: GOLD },
});