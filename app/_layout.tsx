import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

const homeIcon = require('../assets/icon1.png');
const aboutIcon = require('../assets/icon2.png');
const accountIcon = require('../assets/icon3.png');

export default function RootLayout() {
  return (
    <View style={styles.wrapper}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#BF9C77',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: styles.tabBar,
          headerShown: false,
          animation: 'fade',
        }}
      >
        {/* Tus tres pestañas reales */}
        <Tabs.Screen
          name="index"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <Image
                source={homeIcon}
                style={[styles.icon, { tintColor: color, opacity: focused ? 1 : 0.6 }]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <Image
                source={aboutIcon}
                style={[styles.icon, { tintColor: color, opacity: focused ? 1 : 0.6 }]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="signup"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <Image
                source={accountIcon}
                style={[styles.icon, { tintColor: color, opacity: focused ? 1 : 0.6 }]}
              />
            ),
          }}
        />

        {/* Ocultamos las demás pantallas de la carpeta (tabs) para que no muestren flechas */}
        <Tabs.Screen name="chat" options={{ href: null }} />
        <Tabs.Screen name="login" options={{ href: null }} />
        <Tabs.Screen name="forgotPassword" options={{ href: null }} />
        <Tabs.Screen name="openEndedSimulator" options={{ href: null }} />
        <Tabs.Screen name="randomAdventure" options={{ href: null }} />
        <Tabs.Screen name="resumeAdventure" options={{ href: null }} />
        <Tabs.Screen name="terminatedAdventures" options={{ href: null }} />
        <Tabs.Screen name="account" options={{ href: null }} />
        <Tabs.Screen name="appHeader" options={{ href: null }} />
        <Tabs.Screen name="BillingInfo" options={{ href: null }} />
        <Tabs.Screen name="paymentInfo" options={{ href: null }} />
        <Tabs.Screen name="cancelSubscription" options={{ href: null }} />
        <Tabs.Screen name="profile" options={{ href: null }} />
        <Tabs.Screen name="subTiers" options={{ href: null }} />
        <Tabs.Screen name="upgradePlan" options={{ href: null }} />
        <Tabs.Screen name="lowerPlan" options={{ href: null }} />
        <Tabs.Screen name="pauseSubscription" options={{ href: null }} />
        <Tabs.Screen name="billingHistory" options={{ href: null }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 40,
    paddingTop: 20,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    borderTopWidth: 0,
  },
  icon: {
    width: 32,
    height: 32,
  },
});