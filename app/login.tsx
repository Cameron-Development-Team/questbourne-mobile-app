import React, { useState } from 'react';
import { Text, ScrollView, View, StyleSheet, TextInput, Image, Pressable, Switch } from 'react-native';

const logo = require('../assets/logo2.png');

export default function LoginScreen() {
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const iconGoogle = require('../assets/iconGoogle.png');
  const iconFacebook = require('../assets/iconFacebook.png');

  return (
    <ScrollView style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.heading}>Welcome Back Adventurer</Text>
      <Text style={styles.subheading}>Enter your credentials to join an adventure</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput placeholder="Text your email" style={styles.input} placeholderTextColor="#ccc" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput placeholder="Text your password" style={styles.input} placeholderTextColor="#ccc" secureTextEntry />
      </View>

      <View style={styles.optionsRow}>
        <View style={styles.checkboxRow}>
          <Switch value={keepSignedIn} onValueChange={setKeepSignedIn} thumbColor="green" />
          <Text style={styles.optionText}>Keep me signed in</Text>
        </View>
        <Text style={styles.forgot}>Forgot password?</Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>CONTINUE</Text>
      </Pressable>

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>

       <Pressable style={styles.socialButton}>
        <View style={styles.socialContent}>
          <Image source={iconGoogle} style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </View>
      </Pressable>

      <Pressable style={styles.socialButton}>
        <View style={styles.socialContent}>
          <Image source={iconFacebook} style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logo: {
    width: 300,
    height: 120,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    color: '#BF9C77',
    textAlign: 'left',
    fontFamily: 'El Messiri',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subheading: {
    color: '#fff',
    fontFamily: 'Maven Pro',
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#fff',
    marginBottom: 4,
    fontFamily: 'Maven Pro',
  },
  input: {
    backgroundColor: '#2B2727',
    padding: 12,
    borderRadius: 16,
    color: '#fff',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    color: '#ccc',
    marginLeft: 6,
  },
  forgot: {
    color: '#aaa',
  },
  button: {
    backgroundColor: '#BF9C77',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#000',
    fontSize: 19,
    fontFamily: 'El Messiri',
    fontWeight: 'regular',
  },
  socialContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
},
socialIcon: {
  width: 20,
  height: 20,
  resizeMode: 'contain',
},
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  orText: {
    color: '#999',
    marginHorizontal: 10,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  socialText: {
    color: '#fff',
  },
});