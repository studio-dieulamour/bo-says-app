#!/bin/bash

# Android SDK Environment Setup Script
export ANDROID_HOME=/home/philhosophy/Android/sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

echo "✅ Android SDK environment variables set:"
echo "   ANDROID_HOME: $ANDROID_HOME"
echo "   ADB Version: $(adb version | head -1)"
echo ""
echo "📱 To connect your Android phone:"
echo "   1. Enable Developer Options on your phone"
echo "   2. Enable USB Debugging"
echo "   3. Connect your phone via USB"
echo "   4. Run: adb devices"
echo "   5. Run: npx expo start --android"
echo ""
echo "📲 Or use Expo Go app:"
echo "   1. Install Expo Go from Google Play Store"
echo "   2. Run: npx expo start"
echo "   3. Scan the QR code with Expo Go"
echo ""