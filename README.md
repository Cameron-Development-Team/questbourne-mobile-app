# QuestBourne Realms - Build & Deployment Guide

This guide provides the **exact steps** to build and publish the QuestBourne Realms mobile app from the repository to production using Expo and EAS.

---

## 🧭 Overview
The **QuestBourne Realms** mobile app is built with **React Native (Expo Managed Workflow)**. It uses **Expo Application Services (EAS)** for building and deployment. The project supports both **Android** and **iOS** builds.

---

## 🧱 1. Clone the Repository

```bash
git clone https://github.com/Cameron-Development-Team/questbourne-mobile-app.git
cd questbourne-mobile-app
```

If you use SSH:
```bash
git clone git@github.com:Cameron-Development-Team/questbourne-mobile-app.git
```

---

## ⚙️ 2. Install Dependencies

Ensure you have **Node.js v18+** and **npm** or **yarn** installed.

Install dependencies:
```bash
npm install
# or
yarn install
```

If you run into dependency issues:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 📁 3. Project Structure (Key Files)

```
questbourne-mobile-app/
├── app/                 # Screens and navigators
├── assets/              # Images, fonts, and static assets
├── components/          # Reusable UI components
├── constants/           # App constants and theme
├── package.json         # Dependencies and scripts
├── app.json             # Expo configuration
├── eas.json             # EAS build profiles
├── .env.example         # Example environment variables
└── README.md            # Project documentation
```

---

## 🧩 4. Environment Variables

If your app uses API keys or other variables, copy the example file:
```bash
cp .env.example .env
```
Then update the variables with real values.

Typical example:
```
API_URL=https://api.questbourne.com
SUPABASE_KEY=your_supabase_key_here
```

Ensure the app references these via `expo-constants` or `react-native-dotenv`.

---

## 🧪 5. Test & Lint (Optional)

Before building:
```bash
npm run lint
npm run test
```

---

## 📱 6. Run Locally (Development Mode)

Start Expo development server:
```bash
npx expo start
```

- Scan the QR code with the **Expo Go** app on your device.
- Press `i` to run on an iOS simulator (Mac only).
- Press `a` to run on an Android emulator.

---

## 🚀 7. Build with EAS

The project uses **EAS Build** for creating production-ready binaries.

### Login to Expo
```bash
eas login
```

### Configure EAS
If not configured yet:
```bash
eas build:configure
```

### Build for Android
```bash
eas build --platform android --profile production
```

### Build for iOS
```bash
eas build --platform ios --profile production
```

### View Build Status
```bash
eas build:list
```

Once the build completes, EAS will generate a download link for the `.aab` (Android) or `.ipa` (iOS) file.

---

## 🌐 8. Publish Over-the-Air Updates (OTA)

To deploy app updates without a full rebuild:
```bash
npx expo publish
```

For environment-specific updates:
```bash
eas update --branch production --message "UI fixes and performance improvements"
```

---

## 🧾 9. Store Release Process

### Android (Play Store)
1. Download `.aab` from EAS.
2. Go to [Google Play Console](https://play.google.com/console/).
3. Create a new release in **Production**.
4. Upload `.aab` → Add changelog → Submit for review.

### iOS (App Store)
1. Download `.ipa` from EAS.
2. Open **Transporter** on macOS.
3. Sign in with your Apple Developer Account.
4. Upload `.ipa` → Submit via App Store Connect.

---

## 🧰 10. Common Commands

| Action | Command |
|--------|----------|
| Start dev server | `npx expo start` |
| Clean cache | `expo start -c` |
| Android build | `eas build --platform android` |
| iOS build | `eas build --platform ios` |
| Publish OTA update | `npx expo publish` |
| View builds | `eas build:list` |

---

## 🔧 11. Troubleshooting

**Metro bundler stuck or not loading**  
```bash
expo start -c
```

**Gradle or build errors on Android**  
```bash
npm install -g eas-cli
rm -rf android
npx eas build:configure
```

**Apple certificate or provisioning errors**  
```bash
eas credentials
```
Then regenerate or upload your Apple credentials.

---

## 👤 Maintainers
Developed by the **Cameron Development Team**  
For issues, open a ticket in the GitHub repo or contact the maintainer.

---

✅ **End of README**
