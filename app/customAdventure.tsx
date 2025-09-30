import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';

export type CustomAdventureValues = {
  genre: string;
  plot: string;
  characterTitle: string;
  characterName: string;
  characterDesc: string;
};

export type CustomAdventureModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: CustomAdventureValues) => void;
};

const GOLD = '#BF9C77';

export const CustomAdventureModal = ({
  visible,
  onClose,
  onSubmit,
}: CustomAdventureModalProps) => {
  const [genre, setGenre] = useState('');
  const [plot, setPlot] = useState('');
  const [characterTitle, setCharacterTitle] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [characterDesc, setCharacterDesc] = useState('');

  const canProceed =
    genre.trim().length > 0 &&
    plot.trim().length > 0 &&
    characterTitle.trim().length > 0 &&
    characterName.trim().length > 0 &&
    characterDesc.trim().length > 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop to dim the background. Tapping it will close the modal. */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Centered wrapper. overflow: 'visible' allows inputs or
          dropdowns to extend outside of the card if needed. */}
      <View style={styles.centerWrap} pointerEvents="box-none">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Custom Adventure</Text>

          {/* Genre input */}
          <View style={styles.inputWrap}>
            <TextInput
              value={genre}
              onChangeText={setGenre}
              placeholder="Genre*"
              placeholderTextColor="#c9c9c9"
              style={styles.input}
            />
          </View>

          {/* Plot description input (multi‑line) */}
          <View style={styles.inputWrap}>
            <TextInput
              value={plot}
              onChangeText={setPlot}
              placeholder="Plot Description*…"
              placeholderTextColor="#c9c9c9"
              style={[styles.input, styles.multiLineInput]}
              multiline
            />
          </View>

          {/* Character title input */}
          <View style={styles.inputWrap}>
            <TextInput
              value={characterTitle}
              onChangeText={setCharacterTitle}
              placeholder="Character Title (Knight/Wizard/Fairy…)*"
              placeholderTextColor="#c9c9c9"
              style={styles.input}
            />
          </View>

          {/* Character name input */}
          <View style={styles.inputWrap}>
            <TextInput
              value={characterName}
              onChangeText={setCharacterName}
              placeholder="Character Name*"
              placeholderTextColor="#c9c9c9"
              style={styles.input}
            />
          </View>

          {/* Character description input (multi‑line) */}
          <View style={styles.inputWrap}>
            <TextInput
              value={characterDesc}
              onChangeText={setCharacterDesc}
              placeholder="Character Description*…"
              placeholderTextColor="#c9c9c9"
              style={[styles.input, styles.multiLineInput]}
              multiline
            />
          </View>

          {/* Proceed button */}
          <View style={styles.actions}>
            <Pressable
              style={[styles.btn, !canProceed && { opacity: 0.6 }]}
              onPress={() =>
                canProceed &&
                onSubmit({
                  genre: genre.trim(),
                  plot: plot.trim(),
                  characterTitle: characterTitle.trim(),
                  characterName: characterName.trim(),
                  characterDesc: characterDesc.trim(),
                })
              }
            >
              <Text style={styles.btnText}>Proceed</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    overflow: 'visible',
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
  cardTitle: {
    textAlign: 'center',
    fontFamily: 'El Messiri',
    fontSize: 22,
    color: GOLD,
    marginVertical: 16,
    fontWeight: '700',
  },
  inputWrap: {
    marginHorizontal: 20,
    marginBottom: 18,
  },
  input: {
    minHeight: 60,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 18,
    backgroundColor: '#2B2626',
  },
  multiLineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  actions: {
    paddingHorizontal: 20,
    marginTop: 8,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: GOLD,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 3,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 180,
  },
  btnText: {
    color: '#000',
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: 'El Messiri',
  },
});