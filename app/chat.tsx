import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  LayoutChangeEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Msg = { id: string; text: string; me?: boolean };
type TabKey = 'images' | 'inventory' | 'character' | 'memories';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();

  // --- Tabs / dropdown overlay ---
  const tabsRef = useRef<View>(null);
  const [dropdownOpen, setDropdownOpen] = useState<TabKey | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top?: number; bottom?: number }>({}); // abre abajo/arriba

  // --- Mensajes ---
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 'w1', text: 'Welcome to QuestBourne! How can I help?', me: false },
  ]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const toggleDropdown = (key: TabKey) => {
    if (dropdownOpen === key) {
      setDropdownOpen(null);
      return;
    }
    // medir posición en pantalla del contenedor de tabs para decidir si abre arriba o abajo
    tabsRef.current?.measureInWindow((x, y, width, height) => {
      const screenH = Dimensions.get('window').height;
      const panelH = 180; // alto aprox del panel
      const below = y + height + 8;
      if (below + panelH <= screenH) {
        setDropdownPos({ top: below });
      } else {
        // abre hacia arriba
        const above = screenH - y + 8; // usando bottom
        setDropdownPos({ bottom: above });
      }
      setDropdownOpen(key);
    });
  };

  const handleSend = () => {
    const txt = message.trim();
    if (!txt) return;
    setMsgs(prev => [...prev, { id: String(Date.now()), text: txt, me: true }]);
    setMessage('');
    setTimeout(() => {
      setMsgs(prev => [...prev, { id: String(Date.now() + 1), text: 'Noted!', me: false }]);
    }, 500);
  };

  const renderMsg = ({ item }: { item: Msg }) => {
    if (item.me) {
      // Mensajes tuyos (me)
      return (
        <View style={[styles.bubble, styles.bubbleMe]}>
          <Text style={styles.bubbleText}>{item.text}</Text>
        </View>
      );
    }

    // Mensajes NPC
    return (
      <View style={styles.npcContainer}>
        <Image source={require('../assets/logo1.png')} style={styles.npcLogo} />
        <View style={[styles.bubble, styles.bubbleNpc]}>
          <Text style={styles.bubbleText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require('../assets/background-chat.png')}
            style={styles.background}
            resizeMode="cover"
          >
            <View style={styles.inner}>
              {/* === Header + Tabs con un SOLO overlay === */}
              <View style={styles.topArea}>
                <View style={styles.topOverlay} pointerEvents="none" />

                {/* Header */}
                <View style={styles.headerRow}>
                  <Pressable onPress={() => router.push('/home')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#BF9C77" />
                  </Pressable>
                  <Image source={require('../assets/logo2.png')} style={styles.logo} />
                </View>

                {/* Tabs */}
                <View ref={tabsRef} style={styles.tabsRow}>
                  {(['images', 'inventory', 'character', 'memories'] as TabKey[]).map(section => (
                    <Pressable
                      key={section}
                      onPress={() => toggleDropdown(section)}
                      style={[styles.tabBtn, dropdownOpen === section && styles.tabBtnActive]}
                    >
                      <Text style={styles.tab}>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.content}>
                {/* Title */}
                <ImageBackground
                  source={require('../assets/background-title.png')}
                  style={styles.titleBackground}
                  resizeMode="contain"
                >
                  <Text style={styles.title}>Name Of Adventure goes here</Text>
                </ImageBackground>

                {/* Chat area */}
                <ImageBackground
                  source={require('../assets/background-chatbox.png')}
                  style={styles.chatboxBackground}
                  resizeMode="stretch"
                >
                  <View style={styles.chatContentWrapper}>
                    <FlatList
                      data={[...msgs].reverse()} 
                      keyExtractor={m => m.id}
                      renderItem={renderMsg}
                      inverted
                      style={styles.messagesList}
                      contentContainerStyle={styles.messagesContent}
                      showsVerticalScrollIndicator={true}
                    />

                    <View style={styles.inputArea}>
                      <TextInput
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type here..."
                        placeholderTextColor="#aaa"
                        style={styles.input}
                        multiline
                      />
                      <Pressable style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendText}>SEND</Text>
                      </Pressable>
                    </View>
                  </View>
                </ImageBackground>

                {/* Action Buttons */}
                {!keyboardVisible && (
                  <View style={styles.actionButtons}>
                    {['Summarize', 'Load Memories', 'Load Inventory', 'Visualize Current', 'Listen', 'Show Me...'].map(
                      label => (
                        <Pressable key={label} style={styles.action}>
                          <Text style={styles.actionText}>{label}</Text>
                        </Pressable>
                      ),
                    )}
                  </View>
                )}
              </View>

              {dropdownOpen && (
                <>
                  <Pressable style={styles.dropdownBackdrop} onPress={() => setDropdownOpen(null)} />
                  <View style={[styles.dropdownPanel, dropdownPos]}>
                    <Text style={styles.dropdownItem}>• Sample content for {dropdownOpen}</Text>
                    <Text style={styles.dropdownItem}>• Item 2 for {dropdownOpen}</Text>
                    <Text style={styles.dropdownItem}>• Item 3 for {dropdownOpen}</Text>
                  </View>
                </>
              )}
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  background: { flex: 1, width: '100%', height: '100%' },

  inner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  topArea: {
    position: 'relative',
    marginBottom: 5,
    overflow: 'hidden',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  topOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 0,
  },
  headerRow: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    flexWrap: 'wrap',
    paddingVertical: 8,
    paddingHorizontal: 10,
    zIndex: 1,
  },

  header: {
    position: 'relative',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  backButton: { position: 'absolute', left: 0, top: '50%', transform: [{ translateY: -12 }] },
  logo: { width: 200, height: 60, resizeMode: 'contain' },

  content: { flex: 1 },

  topTabsBar: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  topTabsRow: { flexDirection: 'row', justifyContent: 'space-around', gap: 10, flexWrap: 'wrap' },
  tabBtn: { paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8 },
  tabBtnActive: { backgroundColor: 'rgba(191,156,119,0.15)' },
  tab: { color: '#fff', fontSize: 14, fontWeight: '600' },

  titleBackground: { width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' },
  title: { color: '#BF9C77', fontSize: 16, fontWeight: '700', textAlign: 'center', fontFamily: 'El Messiri' },

  chatboxBackground: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  chatContentWrapper: { width: '90%', gap: 16, paddingVertical: 20, paddingHorizontal: 16 },

  messagesList: { height: 260 },
  messagesContent: { paddingBottom: 20 },

  // Burbujas
  bubble: { maxWidth: '90%', paddingVertical: 20, paddingHorizontal: 12 },
  bubbleMe: { alignSelf: 'flex-start' },
  npcContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  npcLogo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 10,
  },
  bubbleNpc: {
    borderLeftColor: '#BF9C77',  
    borderLeftWidth: 2,
    alignSelf: 'flex-start',
  },
  bubbleText: { color: '#fff', fontSize: 14 },

  // Input
  inputArea: {
    backgroundColor: '#2B2727',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BF9C77',
    padding: 10,
  },
  input: { color: '#fff', minHeight: 60 },
  sendButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    backgroundColor: '#BF9C77',
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  sendText: { color: '#000', fontWeight: 'bold', fontFamily: 'El Messiri' },

  // Actions
  actionButtons: { flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', gap: 0 },
  action: { backgroundColor: '#BF9C77', paddingVertical: 5, paddingHorizontal: 16, borderRadius: 2, marginVertical: 4 },
  actionText: { fontWeight: 'bold', color: '#000', fontFamily: 'El Messiri' },

  // Dropdown overlay
  dropdownBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 5,
  },
  dropdownPanel: {
    position: 'absolute',
    left: 16,
    right: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 10,
    zIndex: 6,
    borderWidth: 1,
    borderColor: '#BF9C77',
  },
  dropdownItem: { color: '#fff', fontSize: 12, marginBottom: 4 },
});