import React, { useState } from 'react';
import { Text, ScrollView, View, StyleSheet, TextInput, Image, Pressable } from 'react-native';

const logo = require('../assets/logo2.png');
const iconGoogle = require('../assets/iconGoogle.png');
const iconFacebook = require('../assets/iconFacebook.png');

export default function SignUpScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.heading}>Forgot Password</Text>
       <Text style={styles.subheading}>Enter your credentials to join an adventure</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput placeholder="Text your email" style={styles.input} placeholderTextColor="#ccc" />
      </View>

     
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>CONFIRM</Text>
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
    color: '#fff',
    fontFamily: 'Maven Pro',
    fontWeight: 'bold',
    marginBottom: 32,
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
  button: {
    backgroundColor: '#BF9C77',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#000',
    fontSize: 19,
    fontFamily: 'El Messiri',
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
    marginBottom: 12,
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
  socialText: {
    color: '#fff',
    fontFamily: 'Maven Pro',
  },
});