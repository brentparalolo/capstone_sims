import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { AppState, Linking, Platform, SafeAreaView, StatusBar, StyleSheet, Alert, View, Animated, } from "react-native";
import { Overlay } from "./Overlay";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraViewReady, setCameraViewReady] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const cameraOpacity = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      if (status !== "granted") {
        Alert.alert("Camera Access Denied", "Enable it in settings to scan QR codes.");
      }
    })();
  }, []);

  useEffect(() => { 
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Animate camera preview opacity & show overlay with delay
  useEffect(() => {
    if (cameraReady && cameraViewReady) {
      Animated.timing(cameraOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      const timeout = setTimeout(() => {
        setShowOverlay(true);
      }, 600); // Show overlay slightly after fade-in

      return () => clearTimeout(timeout);
    } else {
      setShowOverlay(false);
      cameraOpacity.setValue(0);
    }
  }, [cameraReady, cameraViewReady]);

  // Animate overlay opacity based on showOverlay
  useEffect(() => {
    if (showOverlay) {
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showOverlay]);

  if (hasPermission === false) {
    return null;
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <Stack.Screen options={{ title: "Scanner", headerShown: false }} />
      {Platform.OS === "android" && <StatusBar hidden />}

      <View style={StyleSheet.absoluteFill} onLayout={() => setCameraViewReady(true)}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: cameraOpacity }]}>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            onCameraReady={() => setCameraReady(true)}
            onBarcodeScanned={({ data }) => {
              if (data && !qrLock.current) {
                qrLock.current = true;

                setTimeout(async () => {
                  try {
                    await Linking.openURL(data);
                  } catch (e) {
                    Alert.alert("Invalid QR Code", "Could not open the scanned link.");
                  } finally {
                    qrLock.current = false;
                  }
                }, 400);
              }
            }}
          />
        </Animated.View>
      </View>

      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: overlayOpacity }]}
        pointerEvents={showOverlay ? "auto" : "none"}
      >
        <Overlay />
      </Animated.View>
    </SafeAreaView>
  );
}
